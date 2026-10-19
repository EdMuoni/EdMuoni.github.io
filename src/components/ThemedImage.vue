<script setup lang="ts">
import type { Screenshot } from '@/data/projects'

// A screenshot that follows the site's theme: the dark version for dark-theme visitors, when there
// is one. Both are in the HTML and CSS shows the right one, like the theme button's icons; the
// browser only downloads the one it shows. Width and height keep the picture's place before it loads.
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
