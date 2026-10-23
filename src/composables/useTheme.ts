import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme' // index.html uses the same key

function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme
  if (chosen === 'light' || chosen === 'dark') return chosen
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Starts as 'light' so the first render matches the pre-rendered HTML. The real value is read in
// onMounted. The colours themselves are already set by index.html.
const theme = ref<Theme>('light')

export function useTheme() {
  onMounted(() => {
    theme.value = currentTheme()
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
