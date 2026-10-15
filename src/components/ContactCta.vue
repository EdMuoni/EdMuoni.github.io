<script setup lang="ts">
import { contactLinks } from '@/data/profile'

// The closing block on a page: one sentence and the ways to reach me.
withDefaults(defineProps<{ heading?: string }>(), {
  heading: 'Let’s talk',
})
</script>

<template>
  <section class="section contact-cta">
    <div class="container">
      <h2>{{ heading }}</h2>
      <p class="lead">
        I am looking for a developer role in Estonia. The quickest way to reach me is e-mail.
      </p>
      <ul class="contact-list">
        <li v-for="link in contactLinks" :key="link.label">
          <span class="label">{{ link.label }}</span>
          <a :href="link.href">{{ link.detail }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
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
