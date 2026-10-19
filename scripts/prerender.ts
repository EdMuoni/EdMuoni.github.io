// Pre-rendering: the last step of `npm run build`. Node.js runs this file directly (it strips the
// TypeScript types itself), after Vite has built the browser app into dist/ and the server copy of
// the app into dist-ssr/.
//
// For every address it renders the page to HTML and writes it as a real file:
// dist/index.html, dist/work/index.html, and so on. Two reasons:
// - GitHub Pages only serves files. Without dist/work/index.html it would answer /work from
//   404.html with the status "404 Not Found", and link previews and search engines would skip it.
// - The page's text is in the file itself, so the site reads fine with JavaScript turned off, and
//   when JavaScript runs, Vue attaches to this HTML instead of drawing the page again.
// dist/404.html gets the "page not found" view, for addresses that really don't exist.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_URL = 'https://edmuoni.github.io'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')

// The same shapes as src/entry-server.ts exports. Repeated here because this script runs in plain
// Node.js and loads the built JavaScript file, not the TypeScript source.
interface RenderedPage {
  html: string
  title: string
  description: string
}
interface ServerEntry {
  addresses: string[]
  render(url: string): Promise<RenderedPage>
}

const server = (await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)) as ServerEntry

// The fonts the first screen of every page uses: body text, menu and links (Inter 400 and 500),
// headings and the small labels. Without a hint the browser finds them only after reading the CSS,
// draws the page in a fallback font first and then re-wraps the text when they arrive, which moves
// things (layout shift). "preload" tells it to fetch them together with the page. Vite adds a hash
// to each file name, so they are looked up in dist/assets.
const preloadFonts = [
  'inter-latin-400-normal',
  'inter-latin-500-normal',
  'source-serif-4-latin-700-normal',
  'jetbrains-mono-latin-500-normal',
]
const assets = readdirSync(join(dist, 'assets'))
const fontLinks = preloadFonts.map((name) => {
  const file = assets.find((f) => f.startsWith(`${name}-`) && f.endsWith('.woff2'))
  if (!file) throw new Error(`prerender: no font file for ${name} in dist/assets`)
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`
})

const template = readFileSync(join(dist, 'index.html'), 'utf8').replace(
  '</head>',
  `  ${fontLinks.join('\n    ')}\n  </head>`,
)

// Characters that would break an HTML attribute or tag if they appeared in a title or description.
function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Replace one piece of the template. Fails the build if the piece is missing, so a changed
// index.html can never silently ship pages with the wrong title or no content.
function replaceOrFail(html: string, pattern: RegExp, value: string, what: string): string {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${what} in dist/index.html`)
  return html.replace(pattern, (_match, start: string, end: string) => start + value + end)
}

// The built index.html with one page's content inside #app and its own title, description and
// address in the <head>, which is what link previews and search engines read.
function fillTemplate(page: RenderedPage, url: string): string {
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  let html = template
  html = replaceOrFail(html, /(<div id="app")><!--app-html-->(<\/div>)/, ` data-prerendered>${page.html}`, 'the #app placeholder')
  html = replaceOrFail(html, /(<title>)[^<]*(<\/title>)/, title, '<title>')
  html = replaceOrFail(html, /(<meta name="description" content=")[^"]*(")/, description, 'meta description')
  html = replaceOrFail(html, /(<meta property="og:title" content=")[^"]*(")/, title, 'og:title')
  html = replaceOrFail(html, /(<meta property="og:description" content=")[^"]*(")/, description, 'og:description')
  html = replaceOrFail(html, /(<meta property="og:url" content=")[^"]*(")/, url, 'og:url')
  return html
}

function write(file: string, html: string) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

for (const address of server.addresses) {
  const page = await server.render(address)
  const isHome = address === '/'
  const file = isHome ? join(dist, 'index.html') : join(dist, address, 'index.html')
  write(file, fillTemplate(page, isHome ? `${SITE_URL}/` : `${SITE_URL}${address}/`))
}

// Any address the router doesn't know renders the "page not found" view.
write(join(dist, '404.html'), fillTemplate(await server.render('/404'), `${SITE_URL}/404`))

console.log(`prerender: wrote ${server.addresses.length} pages and 404.html`)
