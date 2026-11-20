<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { motionAllowed, useMotion } from '@/composables/useMotion'
import { photoWidths, withReferral, type HeaderPhoto } from '@/data/photos'

// Header photo under a dark shade, with a slow zoom. It is decoration (empty alt), the credit
// below it is real text. The parent needs the class "on-photo".
const props = defineProps<{ photo: HeaderPhoto }>()

const file = (width: number) => `/img/headers/${props.photo.name}-${width}.jpg`
const srcset = computed(() => photoWidths.map((width) => `${file(width)} ${width}w`).join(', '))

// The video only starts in the browser, on wide screens, with animations on and no data saver.
// Everyone else (and the pre-rendered page) keeps the photo.
const playVideo = ref(false)
const ready = ref(false)
const { motionOn } = useMotion()
function decide() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  ready.value = false
  playVideo.value =
    !!props.photo.video && motionAllowed() && !saveData && window.matchMedia('(min-width: 900px)').matches
}
onMounted(decide)
watch(motionOn, decide)

const credit = computed(() =>
  playVideo.value && props.photo.video
    ? { kind: 'Video', author: props.photo.video.author, url: props.photo.video.url, site: 'Pexels', home: 'https://www.pexels.com/' }
    : { kind: 'Photo', author: props.photo.author, url: withReferral(props.photo.url), site: 'Unsplash', home: withReferral('https://unsplash.com/') },
)
</script>

<template>
  <div class="backdrop" :class="{ 'has-video': ready }" aria-hidden="true">
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
    <video
      v-if="playVideo && photo.video"
      class="backdrop-video"
      :class="{ ready }"
      :src="photo.video.file"
      autoplay
      muted
      loop
      playsinline
      @canplay="ready = true"
    ></video>
    <span class="backdrop-shade"></span>
  </div>
  <p class="photo-credit">
    {{ credit.kind }}:
    <a :href="credit.url">{{ credit.author }}</a>
    /
    <a :href="credit.home">{{ credit.site }}</a>
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

/* Fades in over the photo once it can play, so there is never a black frame. */
.backdrop-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease-out;
}

.backdrop-video.ready {
  opacity: 1;
}

/* Darkest on the left, where the text is; lighter towards the right, where Ohm stands. */
.backdrop-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgb(9 9 11 / 0.55), transparent 45%),
    linear-gradient(90deg, rgb(9 9 11 / 0.93) 0%, rgb(9 9 11 / 0.86) 50%, rgb(9 9 11 / 0.7) 100%);
}

/* With the video playing, the right side (behind Ohm) is lighter so the motion shows. */
.has-video .backdrop-shade {
  background:
    linear-gradient(to top, rgb(9 9 11 / 0.5), transparent 40%),
    linear-gradient(90deg, rgb(9 9 11 / 0.92) 0%, rgb(9 9 11 / 0.84) 50%, rgb(9 9 11 / 0.35) 100%);
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
  bottom: clamp(26px, 4vw, 50px);
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
