import { createRouter, createWebHistory } from 'vue-router'

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page not found · Edgar Muoni', description: 'This page does not exist.' },
    },
  ],
  // A new page starts at the top; the browser's Back button returns to where you were.
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', to.meta.description)
})

export default router
