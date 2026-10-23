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

// Tab title and description for each route.
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
  }
}

// Paths, titles and descriptions come from pages.ts.
const meta = (page: PageInfo) => ({ title: page.title, description: page.description })

const notFound = { title: 'Page not found · Edgar Muoni', description: 'This page does not exist.' }

/** Tab title and description for any route. Project pages take them from the project data. */
export function titleAndDescription(route: RouteLocationNormalized): { title: string; description: string } {
  if (route.name === 'project') {
    const project = findProject(String(route.params.slug))
    if (project) return { title: `${project.title} · Edgar Muoni`, description: project.summary }
  }
  return { title: route.meta.title, description: route.meta.description }
}

// A factory, because pre-rendering needs a new router for every page.
export function createAppRouter(): Router {
  const router = createRouter({
    // Memory history while pre-rendering, there is no address bar in Node.js.
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
        // Title and description come from the project (see titleAndDescription).
        meta: notFound,
        // Unknown slug: show the 404 view but keep the typed address.
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
    // New pages start at the top, Back restores the old position.
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: 96 }
      return { top: 0 }
    },
  })

  // Update the tab title in the browser. Pre-rendering writes it into the HTML instead.
  if (!import.meta.env.SSR) {
    router.afterEach((to) => {
      const { title, description } = titleAndDescription(to)
      document.title = title
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    })
  }

  return router
}
