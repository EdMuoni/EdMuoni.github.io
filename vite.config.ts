import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// The build runs twice: once for the browser (dist/) and once with --ssr (dist-ssr/) for
// scripts/prerender.ts.
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // Set HYDRATION_DEBUG=1 to see hydration mismatch details in the console.
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: process.env.HYDRATION_DEBUG === '1',
  },
  build: isSsrBuild
    ? { outDir: 'dist-ssr' }
    : // One CSS file, so pre-rendered pages are styled even without JavaScript.
      { cssCodeSplit: false },
}))
