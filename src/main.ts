// Fonts come from npm, not from Google Fonts.
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

// Built pages already have their HTML in #app, so Vue hydrates them. In dev mode #app is empty.
const { app, router } = createApp(container.hasAttribute('data-prerendered'))

router.isReady().then(() => {
  app.mount(container)
  document.documentElement.classList.add('app-ready')
})
