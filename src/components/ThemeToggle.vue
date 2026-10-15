<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()

// The button names the theme it switches TO, which is what a click will do.
const label = computed(() => (theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'))
</script>

<template>
  <button type="button" class="theme-toggle" :aria-label="label" :title="label" @click="toggle">
    <!-- Sun, shown in dark mode -->
    <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path
        d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
      />
    </svg>
    <!-- Moon, shown in light mode -->
    <svg v-else viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface-raised);
  color: var(--ink);
  cursor: pointer;
}

.theme-toggle:hover {
  border-color: var(--ink);
}

svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
