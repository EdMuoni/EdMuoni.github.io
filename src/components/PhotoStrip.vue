<script setup lang="ts">
import { stripPhotos } from '@/data/photos'

// A row of photos above the footer on every page, each with a line in one colour of the palette.
// Decoration only, so screen readers skip it.
</script>

<template>
  <div class="photo-strip" aria-hidden="true">
    <img
      v-for="photo in stripPhotos"
      :key="photo.file"
      :src="photo.file"
      :class="`hue-${photo.hue}`"
      width="640"
      height="480"
      alt=""
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style scoped>
.photo-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  background: var(--forest-950);
}

img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-bottom: 5px solid var(--hue);
}

@media (min-width: 720px) {
  img {
    aspect-ratio: 4 / 3;
  }
}
</style>
