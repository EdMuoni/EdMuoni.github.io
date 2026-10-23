import { createApp as createClientApp, createSSRApp } from 'vue'

import App from './App.vue'
import { reveal } from './directives/reveal'
import { createAppRouter } from './router'

// Used by main.ts (browser) and entry-server.ts (pre-rendering).
// `hydrate` is true when the page HTML is already there.
export function createApp(hydrate: boolean) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App)
  const router = createAppRouter()
  app.use(router)
  app.directive('reveal', reveal)
  return { app, router }
}
