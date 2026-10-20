<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { MascotScript } from '@/data/mascot'
import type { HeaderPhoto } from '@/data/photos'
import CircuitBackground from './CircuitBackground.vue'
import HeaderBackdrop from './HeaderBackdrop.vue'
import OhmMascot from './OhmMascot.vue'
import TypeText from './TypeText.vue'

// The top block of every page: a small label, the page heading and one introductory paragraph,
// typing themselves in that order as the page opens.
// `back` adds a link above them, e.g. from a project page to its overview page.
// `mascot` is what Ohm says on this page; Ohm stands beside the text on wide screens, below it on phones.
// `photo` puts a darkened photo behind the header, with its credit.
defineProps<{
  kicker: string
  title: string
  lead?: string
  back?: { to: string; label: string }
  mascot?: MascotScript
  photo?: HeaderPhoto
}>()
</script>

<template>
  <section class="page-intro" :class="{ 'on-photo': photo }">
    <HeaderBackdrop v-if="photo" :photo="photo" />
    <!-- Moving background: a soft drifting light and circuit traces that draw themselves. -->
    <span class="header-glow" aria-hidden="true"></span>
    <CircuitBackground :seed="title" />
    <div class="container intro-grid">
      <div class="intro-text">
        <RouterLink v-if="back" :to="back.to" class="back">
          <span aria-hidden="true">←</span> {{ back.label }}
        </RouterLink>
        <TypeText as="span" class="kicker" :text="kicker" :speed="22" />
        <TypeText as="h1" :text="title" :speed="24" :delay="220" />
        <TypeText v-if="lead" as="p" class="lead" :text="lead" :speed="9" :delay="600" />
        <slot />
      </div>
      <OhmMascot v-if="mascot" class="intro-mascot" :lines="mascot.lines" :readout="mascot.readout" />
    </div>
  </section>
</template>

<style scoped>
.page-intro {
  position: relative;
  overflow: hidden;
  padding: 48px 0 40px;
  background: linear-gradient(to bottom, var(--tint), var(--bg));
  border-bottom: 1px solid var(--border);
}

.page-intro h1 {
  max-width: 20ch;
}

/* Above the moving background. */
.intro-grid {
  position: relative;
  display: grid;
  gap: 28px;
}

/* Text and Ohm side by side; Ohm stands at the bottom of the block. */
@media (min-width: 900px) {
  .intro-grid {
    grid-template-columns: minmax(0, 1fr) 260px;
    align-items: end;
    gap: 40px;
  }
}

.back {
  display: table;
  margin-bottom: 18px;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
}

.back:hover {
  text-decoration: underline;
}

@media (min-width: 720px) {
  .page-intro {
    padding: 72px 0 56px;
  }
}
</style>
