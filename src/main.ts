import { createApp } from 'vue'

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

import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
