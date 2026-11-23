<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectRow from '@/components/ProjectRow.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { findProject, isCaseStudy, projectsIn } from '@/data/projects'

const caseStudies = projectsIn('finished').filter(isCaseStudy)

// Three school projects you can play right away, as a taste of the School page.
const playable = ['space-invaders', 'candy-crush', 'bicycle-website'].map((slug) => findProject(slug)!)
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
      <div class="more-head">
        <div><SectionHeading kicker="From my studies" title="School projects" /></div>
        <RouterLink to="/school" class="view-all">
          View all<span class="sr-only"> school projects</span> <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
      <div class="grid">
        <ProjectCard v-for="(project, i) in playable" :key="project.slug" v-reveal="i" :project="project" />
      </div>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.more {
  background: var(--surface);
}

/* The heading on the left, "View all" on the right, like a row of a project gallery. */
.more-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px 24px;
}

.view-all {
  margin-bottom: 0.6em;
  font-weight: 600;
  text-decoration: none;
  color: var(--accent-text);
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
