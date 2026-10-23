import type { Directive } from 'vue'
import { motionAllowed } from '@/composables/useMotion'

// v-reveal: fades and slides an element in the first time it scrolls into view.
// Elements that are already on screen at start are left alone. v-reveal="i" staggers a row.

const DURATION = 600 // same as the transition in motion.css
let observer: IntersectionObserver | undefined

function show(el: HTMLElement) {
  observer?.unobserve(el)
  el.classList.remove('reveal-hidden')
  // Remove the reveal class afterwards so its delay doesn't affect hover effects.
  const delay = parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0
  window.setTimeout(() => el.classList.remove('reveal'), DURATION + delay + 50)
}

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) show(entry.target as HTMLElement)
    },
    { rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),

  mounted(el, binding) {
    if (!motionAllowed() || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    el.style.setProperty('--reveal-delay', `${Math.min(binding.value ?? 0, 5) * 80}ms`)
    el.classList.add('reveal', 'reveal-hidden')
    getObserver().observe(el)
  },

  beforeUnmount(el) {
    observer?.unobserve(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
