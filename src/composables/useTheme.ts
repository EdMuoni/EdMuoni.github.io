import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme' // index.html uses the same key
const darkQuery = '(prefers-color-scheme: dark)'

function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia(darkQuery).matches ? 'dark' : 'light'
}

// Starts as 'light' so the first render matches the pre-rendered HTML. The real value is read in
// onMounted. The colours themselves are already set by index.html.
const theme = ref<Theme>('light')
let followingSystem = false

export function useTheme() {
  onMounted(() => {
    theme.value = currentTheme()

    // The CSS follows the system setting if it changes, so the button has to as well. Once the
    // visitor has used the button, currentTheme() returns their choice and nothing changes.
    if (!followingSystem) {
      followingSystem = true
      window.matchMedia(darkQuery).addEventListener('change', () => {
        theme.value = currentTheme()
      })
    }
  })

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = theme.value
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      // storage can be blocked (private window)
    }
  }

  return { theme, toggle }
}
