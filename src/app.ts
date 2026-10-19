import { createApp as createClientApp, createSSRApp } from 'vue'

import App from './App.vue'
import { reveal } from './directives/reveal'
import { createAppRouter } from './router'

// Builds the Vue app and its router. Two places use it:
// - src/entry-server.ts, which the build runs in Node.js to turn every page into finished HTML;
// - src/main.ts, which starts the app in the visitor's browser.
//
// `hydrate` is true when the page's HTML is already there (every built page). Vue then
// "hydrates" it: it attaches to the existing HTML instead of drawing the page a second time.
export function createApp(hydrate: boolean) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App)
  const router = createAppRouter()
  app.use(router)
  // v-reveal: slide things in as they scroll into view (src/directives/reveal.ts).
  app.directive('reveal', reveal)
  return { app, router }
}
