<script setup lang="ts">
import CaseStudy from '@/components/CaseStudy.vue'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import { nowBuilding } from '@/data/projects'
</script>

<template>
  <PageIntro
    kicker="Now building"
    title="What I am working on now"
    lead="I am growing my diploma thesis into VoltVibe: a web shop for electrical components with the panel calculator built in."
  />

  <div class="container">
    <CaseStudy v-for="study in nowBuilding" :key="study.id" :study="study" />
  </div>

  <section class="section">
    <div class="container this-site">
      <span class="kicker">Also in progress</span>
      <h2>This website</h2>
      <p>
        Built with Vue 3, TypeScript, Vue Router and Vite. Every project on these pages comes from
        one typed data file, and GitHub Actions builds and publishes the site on every push.
      </p>
      <a href="https://github.com/EdMuoni/EdMuoni.github.io" class="btn">
        Code on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.this-site p {
  max-width: var(--reading);
}
</style>
