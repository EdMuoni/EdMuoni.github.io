import { copyFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages only serves files. A visitor who opens edmuoni.github.io/work directly asks for a
// file called "work" that does not exist, and GitHub answers with 404.html. Copying index.html to
// 404.html means that answer is the app itself, and Vue Router then shows the right page.
function githubPagesFallback(): Plugin {
  let outDir = ''
  return {
    name: 'github-pages-fallback',
    apply: 'build',
    // Read the real output folder from Vite's settings ("dist" by default, but --outDir can change it).
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // The site is served from the root of edmuoni.github.io (a GitHub "user site").
  base: '/',
  plugins: [vue(), githubPagesFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
