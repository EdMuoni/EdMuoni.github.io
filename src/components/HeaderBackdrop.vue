<script setup lang="ts">
import { computed } from 'vue'
import { photoWidths, withReferral, type HeaderPhoto } from '@/data/photos'

// A page header's photo: it fills the header behind everything else, under a dark shade so the
// text on top stays easy to read, and zooms in very slowly. The parent header carries the class
// "on-photo" (tokens.css), which switches its text and colours to the dark set in both themes.
//
// - The photo is decoration, so it has an empty alt text; the credit below it is real text.
// - It is absolutely positioned, so it never pushes anything around while it loads.
// - srcset lists the three widths and the browser downloads only the one that fits the screen.
const props = defineProps<{ photo: HeaderPhoto }>()

const file = (width: number) => `/img/headers/${props.photo.name}-${width}.jpg`
const srcset = computed(() => photoWidths.map((width) => `${file(width)} ${width}w`).join(', '))
</script>

<template>
  <div class="backdrop" aria-hidden="true">
    <img
      class="backdrop-photo"
      :src="file(1280)"
      :srcset="srcset"
      sizes="100vw"
      :width="photo.width"
      :height="photo.height"
      alt=""
      fetchpriority="high"
      decoding="async"
    />
    <span class="backdrop-shade"></span>
  </div>
  <p class="photo-credit">
    Photo:
    <a :href="withReferral(photo.url)">{{ photo.author }}</a>
    /
    <a :href="withReferral('https://unsplash.com/')">Unsplash</a>
  </p>
</template>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.backdrop-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform-origin: 60% 40%;
  /* Ken Burns: a slow zoom in and back out. At rest (animations off) the photo simply stands. */
  animation: photo-zoom 28s ease-in-out infinite alternate;
}

/* Darkest on the left, where the text is; lighter towards the right, where Ohm stands. */
.backdrop-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgb(9 9 11 / 0.55), transparent 45%),
    linear-gradient(90deg, rgb(9 9 11 / 0.93) 0%, rgb(9 9 11 / 0.86) 50%, rgb(9 9 11 / 0.7) 100%);
}

/* Phones: the text runs the full width, so the shade is strong everywhere. */
@media (max-width: 899px) {
  .backdrop-shade {
    background: rgb(9 9 11 / 0.88);
  }
}

.photo-credit {
  position: absolute;
  right: 12px;
  bottom: 8px;
  z-index: 1;
  margin: 0;
  font-size: 0.72rem;
  color: var(--muted);
}

.photo-credit a {
  color: inherit;
}

.photo-credit a:hover {
  color: var(--ink);
}

@keyframes photo-zoom {
  to {
    transform: scale(1.1);
  }
}
</style>
