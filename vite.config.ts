import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

import { pages, type PageInfo } from './src/router/pages'

const SITE_URL = 'https://edmuoni.github.io'

// Characters that would break an HTML attribute or tag if they appeared in a title or description.
function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Replace one piece of the page's <head>. Fails the build if the tag is missing, so a changed
// index.html can never silently ship pages with the wrong title.
function replaceOrFail(html: string, pattern: RegExp, value: string, what: string): string {
  if (!pattern.test(html)) throw new Error(`github-pages-files: could not find ${what} in index.html`)
  return html.replace(pattern, (_match, start: string, end: string) => start + value + end)
}

// The built index.html with one page's own title, description and address in the <head>.
// This is what link previews and search engines read; they don't run the Vue app.
function htmlForPage(html: string, page: PageInfo): string {
  const url = page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}/`
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  html = replaceOrFail(html, /(<title>)[^<]*(<\/title>)/, title, '<title>')
  html = replaceOrFail(html, /(<meta name="description" content=")[^"]*(")/, description, 'meta description')
  html = replaceOrFail(html, /(<meta property="og:title" content=")[^"]*(")/, title, 'og:title')
  html = replaceOrFail(html, /(<meta property="og:description" content=")[^"]*(")/, description, 'og:description')
  html = replaceOrFail(html, /(<meta property="og:url" content=")[^"]*(")/, url, 'og:url')
  return html
}

// GitHub Pages only serves files. Without a file for /work, GitHub would answer that address with
// 404.html and the status "404 Not Found": the app still appears, but link previews and search
// engines treat the page as missing. So after every build this writes a real file per page
// (dist/work/index.html and so on, each with that page's title) and GitHub answers "200 OK".
// 404.html stays a copy of the app for addresses that really don't exist; Vue Router then shows
// the "page not found" view.
function githubPagesFiles(): Plugin {
  let outDir = ''
  return {
    name: 'github-pages-files',
    apply: 'build',
    // Read the real output folder from Vite's settings ("dist" by default, but --outDir can change it).
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const built = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const page of Object.values(pages)) {
        const file = page.path === '/' ? join(outDir, 'index.html') : join(outDir, page.path, 'index.html')
        mkdirSync(join(file, '..'), { recursive: true })
        writeFileSync(file, htmlForPage(built, page))
      }
      copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // The site is served from the root of edmuoni.github.io (a GitHub "user site").
  base: '/',
  plugins: [vue(), githubPagesFiles()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
