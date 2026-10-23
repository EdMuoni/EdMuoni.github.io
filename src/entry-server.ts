// Entry for the pre-render build. scripts/prerender.ts calls render() for every address.

import { renderToString } from 'vue/server-renderer'

import { createApp } from './app'
import { projectPath, projects } from './data/projects'
import { titleAndDescription } from './router'
import { pages } from './router/pages'

export interface RenderedPage {
  html: string
  title: string
  description: string
}

export const addresses: string[] = [
  ...Object.values(pages).map((page) => page.path),
  ...projects.map(projectPath),
]

export async function render(url: string): Promise<RenderedPage> {
  const { app, router } = createApp(true)
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const { title, description } = titleAndDescription(router.currentRoute.value)
  return { html, title, description }
}
