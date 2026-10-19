import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type Router,
} from 'vue-router'

import { findProject } from '@/data/projects'
import HomeView from '@/views/HomeView.vue'
import { pages, type PageInfo } from './pages'

// Each route carries its own browser-tab title and search-result description in `meta`.
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
  }
}

// Paths, titles and descriptions come from pages.ts, which the build also uses (see that file).
const meta = (page: PageInfo) => ({ title: page.title, description: page.description })

const notFound = { title: 'Page not found · Edgar Muoni', description: 'This page does not exist.' }

/**
 * The tab title and description for any address. A project page takes them from its project
 * (src/data/projects.ts); every other page from its route's `meta`.
 */
export function titleAndDescription(route: RouteLocationNormalized): { title: string; description: string } {
  if (route.name === 'project') {
    const project = findProject(String(route.params.slug))
    if (project) return { title: `${project.title} · Edgar Muoni`, description: project.summary }
  }
  return { title: route.meta.title, description: route.meta.description }
}

// A function rather than one shared router, because the build (scripts/prerender.ts) renders
// every page in turn and each render needs a router of its own.
export function createAppRouter(): Router {
  const router = createRouter({
    // In the browser the address bar drives the router. During the build there is no address bar
    // (the page is rendered in Node.js), so the router keeps its history in memory instead.
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: pages.home.path,
        name: 'home',
        component: HomeView,
        meta: meta(pages.home),
      },
      {
        path: pages.whatIBring.path,
        name: 'what-i-bring',
        // Loaded only when visited, so the first page stays small.
        component: () => import('@/views/WhatIBringView.vue'),
        meta: meta(pages.whatIBring),
      },
      {
        path: pages.nowBuilding.path,
        name: 'now-building',
        component: () => import('@/views/NowBuildingView.vue'),
        meta: meta(pages.nowBuilding),
      },
      {
        path: pages.work.path,
        name: 'work',
        component: () => import('@/views/WorkView.vue'),
        meta: meta(pages.work),
      },
      {
        path: pages.school.path,
        name: 'school',
        component: () => import('@/views/SchoolView.vue'),
        meta: meta(pages.school),
      },
      {
        // One page per project, e.g. /projects/voltvibe.
        path: '/projects/:slug',
        name: 'project',
        component: () => import('@/views/ProjectView.vue'),
        // The title and description come from the project; see titleAndDescription().
        meta: notFound,
        // A slug that isn't in the data shows the "page not found" view. The address stays as it
        // was typed, so the visitor can see what was wrong with it.
        beforeEnter: (to) =>
          findProject(String(to.params.slug))
            ? true
            : {
                name: 'not-found',
                params: { pathMatch: to.path.substring(1).split('/') },
                query: to.query,
                hash: to.hash,
              },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
        meta: notFound,
      },
    ],
    // A new page starts at the top; the browser's Back button returns to where you were.
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: 96 }
      return { top: 0 }
    },
  })

  // The tab title and description change as the visitor moves between pages. Only in the browser:
  // during the build there is no document, and scripts/prerender.ts writes them into each file.
  if (!import.meta.env.SSR) {
    router.afterEach((to) => {
      const { title, description } = titleAndDescription(to)
      document.title = title
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    })
  }

  return router
}
