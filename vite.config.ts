import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// `npm run build` runs Vite twice and then scripts/prerender.ts (see package.json):
// 1. `vite build` builds the browser app into dist/;
// 2. `vite build --ssr src/entry-server.ts` builds a copy of the app that runs in Node.js into
//    dist-ssr/ (isSsrBuild is true for this one);
// 3. scripts/prerender.ts uses that copy to write every page's finished HTML into dist/.
export default defineConfig(({ isSsrBuild }) => ({
  // The site is served from the root of edmuoni.github.io (a GitHub "user site").
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // `HYDRATION_DEBUG=1 npm run build` makes Vue explain in the console when the browser's first
    // render differs from the pre-rendered HTML. Off by default, because it adds code.
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: process.env.HYDRATION_DEBUG === '1',
  },
  build: isSsrBuild
    ? // Its own folder, so this second build doesn't wipe the browser build in dist/.
      { outDir: 'dist-ssr' }
    : // One CSS file for the whole site, linked from every page's <head>. With one file per page
      // (Vite's default), a page's styles would only load through JavaScript, and the
      // pre-rendered HTML would look unstyled with JavaScript off.
      { cssCodeSplit: false },
}))
