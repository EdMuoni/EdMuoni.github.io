import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

// Each route carries its own browser-tab title and search-result description in `meta`.
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Edgar Muoni · Full-stack developer',
        description:
          'Edgar Muoni, full-stack developer in Tallinn. Ten years of electrical work, now building and testing software.',
      },
    },
    {
      path: '/what-i-bring',
      name: 'what-i-bring',
      // Loaded only when visited, so the first page stays small.
      component: () => import('@/views/WhatIBringView.vue'),
      meta: {
        title: 'What I bring · Edgar Muoni',
        description: 'Skills, results with numbers, experience and how I would be useful to your team.',
      },
    },
    {
      path: '/now-building',
      name: 'now-building',
      component: () => import('@/views/NowBuildingView.vue'),
      meta: {
        title: 'Now building · Edgar Muoni',
        description: 'VoltVibe, the electrical panel calculator I am growing from my thesis into a product.',
      },
    },
    {
      path: '/work',
      name: 'work',
      component: () => import('@/views/WorkView.vue'),
      meta: {
        title: 'Finished work · Edgar Muoni',
        description:
          'My diploma thesis, an AI nurse assistant, a Defence Forces internship and the projects you can open and play.',
      },
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
