import type { Directive } from 'vue'
import { motionAllowed } from '@/composables/useMotion'

// v-reveal: the element fades and slides in the first time it scrolls into view.
//
// - Only elements that start below the visible part of the screen are hidden, at the moment the
//   app starts. Something already on screen is never hidden, so nothing blinks out and back.
// - Without JavaScript, during the build and with reduced motion, nothing is hidden at all.
// - The value, if given, is the element's place in a row (v-reveal="i"), so cards in a row arrive
//   one after another instead of all at once.
// - The browser's IntersectionObserver reports when an element enters the screen, so the page
//   doesn't have to check on every scroll. One observer serves every element.

const DURATION = 600 // milliseconds; matches the transition in styles/motion.css
let observer: IntersectionObserver | undefined

function show(el: HTMLElement) {
  observer?.unobserve(el)
  el.classList.remove('reveal-hidden')
  // Once it has arrived, drop the reveal styles, so the delay doesn't slow later hover effects.
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
  // Nothing to add to the pre-rendered HTML: the element starts visible.
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

// Lets TypeScript check v-reveal in templates.
declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
