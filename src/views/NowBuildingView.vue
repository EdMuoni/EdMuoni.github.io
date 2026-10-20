<script setup lang="ts">
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { isCaseStudy, projectsIn } from '@/data/projects'

const current = projectsIn('now')
</script>

<template>
  <PageIntro
    kicker="Now building"
    title="What I am working on now"
    lead="I am growing my diploma thesis into VoltVibe: a web shop for electrical components with the panel calculator built in."
    :mascot="mascot.nowBuilding"
    :photo="headerPhotos.nowBuilding"
  />

  <section class="section">
    <div class="container">
      <SectionHeading kicker="In progress" title="On my bench" />
      <div class="grid">
        <ProjectCard
          v-for="(project, i) in current"
          :key="project.slug"
          v-reveal="i"
          :project="project"
          :large="isCaseStudy(project)"
        />
      </div>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    align-items: start;
  }
}
</style>
