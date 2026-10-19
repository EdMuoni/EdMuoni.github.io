// The build's way into the app: `vite build --ssr src/entry-server.ts` turns this file into
// dist-ssr/entry-server.js, and scripts/prerender.ts calls render() once per address to get that
// page's finished HTML. This file never reaches the visitor's browser.

import { renderToString } from 'vue/server-renderer'

import { createApp } from './app'
import { projectPath, projects } from './data/projects'
import { titleAndDescription } from './router'
import { pages } from './router/pages'

export interface RenderedPage {
  /** The page's HTML, which goes inside <div id="app">. */
  html: string
  title: string
  description: string
}

/** Every address that gets its own HTML file: the top pages, then one page per project. */
export const addresses: string[] = [
  ...Object.values(pages).map((page) => page.path),
  ...projects.map(projectPath),
]

/** Renders one address, e.g. '/work', to HTML, the same way the browser would draw it. */
export async function render(url: string): Promise<RenderedPage> {
  const { app, router } = createApp(true)
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const { title, description } = titleAndDescription(router.currentRoute.value)
  return { html, title, description }
}
