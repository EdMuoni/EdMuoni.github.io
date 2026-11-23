<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectRow from '@/components/ProjectRow.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { isCaseStudy, projectsIn } from '@/data/projects'

const caseStudies = projectsIn('finished').filter(isCaseStudy)
</script>

<template>
  <PageIntro
    kicker="Finished work"
    title="Work I have finished"
    lead="My thesis, an AI assistant for nurses and my Defence Forces internship."
    :mascot="mascot.work"
    :photo="headerPhotos.work"
  />

  <section class="section">
    <div class="container">
      <SectionHeading kicker="Case studies" title="The big ones" />
      <ProjectRow
        v-for="(project, i) in caseStudies"
        :key="project.slug"
        v-reveal
        :project="project"
        :flip="i % 2 === 1"
      />
    </div>
  </section>

  <section class="section more">
    <div class="container">
      <SectionHeading kicker="From my studies" title="School projects" />
      <p class="muted">
        Web apps, APIs, browser tests, mobile apps and a few games from my courses. Some of them run
        right in your browser.
      </p>
      <RouterLink to="/school" class="btn btn-primary">See the school projects <span aria-hidden="true">→</span></RouterLink>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.more {
  background: var(--surface);
}

.grid {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 980px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
