import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

const STORAGE_KEY = 'motion' // index.html uses the same key
const reduceQuery = '(prefers-reduced-motion: reduce)'

/** False during the build and when reduced motion is on. */
export function motionAllowed(): boolean {
  return typeof document !== 'undefined' && document.documentElement.dataset.motion !== 'reduced'
}

function storedChoice(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function applyMotion(on: boolean) {
  document.documentElement.dataset.motion = on ? 'on' : 'reduced'
  motionOn.value = on
}

// Starts as true to match the pre-rendered HTML; the real value is read in onMounted.
const motionOn = ref(true)
let followingSystem = false

export function useMotion() {
  onMounted(() => {
    motionOn.value = motionAllowed()

    // Follow the system setting if it changes, unless the visitor used the motion button.
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
      // storage can be blocked (private window)
    }
  }

  return { motionOn, toggle }
}

/** Pauses CSS animations inside `target` while it is far off screen. */
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
