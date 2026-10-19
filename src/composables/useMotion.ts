import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

const STORAGE_KEY = 'motion' // index.html reads the same key before the page paints
const reduceQuery = '(prefers-reduced-motion: reduce)'

/**
 * May things move right now? False during the build (there is no page in Node.js) and when the
 * visitor or their system asked for reduced motion. index.html sets data-motion before the first
 * paint; the motion button changes it.
 */
export function motionAllowed(): boolean {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion !== 'reduced'
}

function storedChoice(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null // private windows and blocked storage
  }
}

function applyMotion(on: boolean) {
  document.documentElement.dataset.motion = on ? 'on' : 'reduced'
  motionOn.value = on
}

// Shared by every component that calls useMotion(). It starts as true everywhere, so the first
// render in the browser matches the pre-rendered HTML; the real setting is read in onMounted.
const motionOn = ref(true)
let followingSystem = false

/** Call from a component's setup. */
export function useMotion() {
  onMounted(() => {
    motionOn.value = motionAllowed()

    // If the visitor changes the system setting while the page is open, follow it, unless they
    // already chose with the motion button. Set up once for the whole page.
    if (!followingSystem) {
      followingSystem = true
      window.matchMedia(reduceQuery).addEventListener('change', (event) => {
        if (storedChoice() === null) applyMotion(!event.matches)
      })
    }
  })

  function toggle() {
    applyMotion(!motionOn.value)
    try {
      localStorage.setItem(STORAGE_KEY, motionOn.value ? 'on' : 'off')
    } catch {
      /* the choice still holds for this visit */
    }
  }

  return { motionOn, toggle }
}

/**
 * Pauses the CSS animations inside `target` while it is far off-screen (adds the class
 * "offscreen", see motion.css), so a long page doesn't keep animating parts nobody can see.
 */
export function usePauseOffscreen(target: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const el = target.value
    if (!el || !('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      ([entry]) => el.classList.toggle('offscreen', !entry?.isIntersecting),
      { rootMargin: '200px' },
    )
    observer.observe(el)
  })

  onBeforeUnmount(() => observer?.disconnect())
}
