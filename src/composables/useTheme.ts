import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme' // index.html reads the same key before the page paints

// What the page shows right now: the visitor's own choice if they made one, otherwise their system setting.
function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Shared by every component that calls useTheme(), so they all agree on the theme.
// It starts as 'light' everywhere: the pre-rendered HTML is built without knowing the visitor's
// theme, and Vue's first render in the browser must match that HTML. The real theme is read right
// after, in onMounted. The colours themselves never wait for this: index.html and tokens.css set
// them before the page paints.
const theme = ref<Theme>('light')

/** Call from a component's setup. */
export function useTheme() {
  onMounted(() => {
    theme.value = currentTheme()
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme.value
    // Private windows and blocked storage throw here; the theme still changes for this visit.
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      /* nothing to do */
    }
  }

  return { theme, toggle }
}
