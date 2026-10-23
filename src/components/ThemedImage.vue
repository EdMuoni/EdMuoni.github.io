<script setup lang="ts">
import type { Screenshot } from '@/data/projects'

// Screenshot that follows the theme. CSS shows the light or dark image, and the browser only
// downloads the one it shows.
defineProps<{ shot: Screenshot; loading?: 'lazy' | 'eager' }>()
</script>

<template>
  <img
    :src="shot.src"
    :alt="shot.alt"
    :width="shot.width"
    :height="shot.height"
    :loading="loading ?? 'lazy'"
    decoding="async"
    :class="{ 'only-light': shot.srcDark }"
  />
  <img
    v-if="shot.srcDark"
    :src="shot.srcDark"
    :alt="shot.alt"
    :width="shot.width"
    :height="shot.height"
    :loading="loading ?? 'lazy'"
    decoding="async"
    class="only-dark"
  />
</template>

<style scoped>
.only-dark {
  display: none;
}

:root[data-theme='dark'] .only-dark {
  display: block;
}

:root[data-theme='dark'] .only-light {
  display: none;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .only-dark {
    display: block;
  }

  :root:not([data-theme='light']) .only-light {
    display: none;
  }
}
</style>
