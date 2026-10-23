// Last build step: renders every page to HTML and writes it to dist/<address>/index.html,
// so GitHub Pages serves real files (200, not 404) and the text works without JavaScript.

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE_URL = 'https://edmuoni.github.io'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')

// Same shapes as in src/entry-server.ts (this script loads the built JS, not the TS source).
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

// Preload the fonts used on the first screen, so the text doesn't jump when they arrive.
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

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Fail the build if a tag is missing from index.html.
function replaceOrFail(html: string, pattern: RegExp, value: string, what: string): string {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${what} in dist/index.html`)
  return html.replace(pattern, (_match, start: string, end: string) => start + value + end)
}

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

write(join(dist, '404.html'), fillTemplate(await server.render('/404'), `${SITE_URL}/404`))

console.log(`prerender: wrote ${server.addresses.length} pages and 404.html`)
