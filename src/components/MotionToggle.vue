<script setup lang="ts">
import { computed } from 'vue'
import { useMotion } from '@/composables/useMotion'

// Turns animations off and on. The choice is saved, like the theme.
const { motionOn, toggle } = useMotion()

// The button names what a click will do.
const label = computed(() => (motionOn.value ? 'Turn animations off' : 'Turn animations on'))
</script>

<template>
  <button
    type="button"
    class="motion-toggle needs-js"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <!-- Both icons are always in the HTML and CSS shows the right one (see ThemeToggle.vue). -->
    <!-- Pause: shown while things move -->
    <svg class="icon-pause" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
      <rect x="14" y="5" width="3.5" height="14" rx="1" />
    </svg>
    <!-- Play: shown while animations are off -->
    <svg class="icon-play" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l10.5-6.5z" />
    </svg>
  </button>
</template>

<style scoped>
.motion-toggle {
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

.motion-toggle:hover {
  border-color: var(--ink);
}

svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.icon-play {
  display: none;
}

:root[data-motion='reduced'] .icon-play {
  display: block;
}

:root[data-motion='reduced'] .icon-pause {
  display: none;
}
</style>
