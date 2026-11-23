<script setup lang="ts">
import { contactLinks } from '@/data/profile'
import TypeText from './TypeText.vue'

// The closing block on a page: one sentence and the ways to reach me.
withDefaults(defineProps<{ heading?: string }>(), {
  heading: 'Let’s talk',
})
</script>

<template>
  <section class="section contact-cta on-photo">
    <span class="ohm" aria-hidden="true">Ω</span>
    <div class="container">
      <TypeText as="h2" :text="heading" :speed="40" when-visible />
      <p class="lead">
        I’m looking for a developer job in Estonia, elsewhere in the EU or anywhere in the world.
        Email is the quickest way to reach me.
      </p>
      <ul v-reveal class="contact-list">
        <li v-for="link in contactLinks" :key="link.label">
          <span class="label">{{ link.label }}</span>
          <a :href="link.href">{{ link.detail }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* A dark closing band in both themes, with a big faded Ω behind the text. */
.contact-cta {
  position: relative;
  overflow: hidden;
  border-top: 0;
  background: radial-gradient(circle at 80% 30%, rgb(255 81 0 / 0.16), transparent 55%), var(--forest-900);
}

.ohm {
  position: absolute;
  right: -0.06em;
  bottom: -0.32em;
  font-family: var(--font-serif);
  font-size: clamp(14rem, 42vw, 28rem);
  line-height: 1;
  color: var(--orange-bright);
  opacity: 0.08;
  pointer-events: none;
  user-select: none;
}

.contact-cta .container {
  position: relative;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: grid;
  gap: 10px;
}

.contact-list li {
  display: grid;
  gap: 0 16px;
}

.label {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.contact-list a {
  font-weight: 500;
  overflow-wrap: anywhere;
}

@media (min-width: 560px) {
  .contact-list li {
    grid-template-columns: 90px 1fr;
    align-items: baseline;
  }
}
</style>
