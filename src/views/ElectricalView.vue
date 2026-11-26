<script setup lang="ts">
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'

// My own photos from my electrician years. Kept out on purpose: building plans (the client's) and
// anything with other people's names.
const photos = [
  {
    file: 'distribution-board',
    width: 1280,
    height: 960,
    alt: 'A new distribution board: a residual-current device, a row of circuit breakers and terminal blocks.',
    caption: 'A distribution board before the cables go in.',
  },
  {
    file: 'board-wired',
    width: 900,
    height: 1200,
    alt: 'A short DIN rail on a workbench with a residual-current device, circuit breakers and two relays, all wired.',
    caption: 'Breakers, a residual-current device and two relays, wired on the bench.',
  },
  {
    file: 'relay-rig',
    width: 1280,
    height: 960,
    alt: 'Cables, two lamps and two relays connected with push-in connectors on a workbench.',
    caption: 'Lamps switched through relays, tested on the bench first.',
  },
  {
    file: 'junction-box',
    width: 900,
    height: 1200,
    alt: 'An open junction box with several cables joined by push-in connectors.',
    caption: 'A junction box, before the lid goes on.',
  },
  {
    file: 'sockets-switches',
    width: 900,
    height: 1200,
    alt: 'Two sockets and two switches connected to one cable.',
    caption: 'Sockets and switches on one circuit.',
  },
  {
    file: 'five-pole-plug',
    width: 1280,
    height: 960,
    alt: 'A five-pole plug in a gloved hand, its pins marked N, earth, L1, L2 and L3.',
    caption: 'A five-pole plug: neutral, earth and three phases.',
  },
]
</script>

<template>
  <PageIntro
    kicker="Electrician"
    title="Electrical work"
    lead="Before I wrote code, I wired buildings and ships. A few pieces from the bench."
  />

  <section class="section">
    <div class="container gallery">
      <figure v-for="(photo, i) in photos" :key="photo.file" v-reveal="i % 3">
        <a :href="`/img/electrical/${photo.file}.jpg`">
          <img
            :src="`/img/electrical/${photo.file}.jpg`"
            :width="photo.width"
            :height="photo.height"
            :alt="photo.alt"
            loading="lazy"
            decoding="async"
          />
        </a>
        <figcaption>{{ photo.caption }}</figcaption>
      </figure>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
/* Photos keep their own shape, stacked in columns. */
.gallery {
  columns: 1;
  column-gap: 18px;
}

figure {
  break-inside: avoid;
  margin: 0 0 22px;
}

img {
  width: 100%;
  border-radius: var(--radius);
  border-bottom: 5px solid var(--yellow);
}

figcaption {
  margin-top: 8px;
  font-size: 0.92rem;
  color: var(--muted);
}

@media (min-width: 640px) {
  .gallery {
    columns: 2;
  }
}

@media (min-width: 980px) {
  .gallery {
    columns: 3;
  }
}
</style>
