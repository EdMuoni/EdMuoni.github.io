// Fonts are bundled with the site (npm @fontsource/*) instead of loaded from Google Fonts,
// so no visitor data goes to a third party and the site works offline once cached.
import '@fontsource/source-serif-4/600.css'
import '@fontsource/source-serif-4/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/500.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/motion.css'

import { createApp } from './app'

const container = document.getElementById('app')!

// A built page arrives with its HTML already inside #app (scripts/prerender.ts marks it with
// data-prerendered), so Vue hydrates it. Under `npm run dev` #app is empty and Vue draws the page.
const { app, router } = createApp(container.hasAttribute('data-prerendered'))

// Wait until the router has loaded the current page's code, so the first render matches the HTML.
// "app-ready" tells the safety net in index.html that the app started (see that file).
router.isReady().then(() => {
  app.mount(container)
  document.documentElement.classList.add('app-ready')
})
