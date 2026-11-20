<script setup lang="ts">
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectRow from '@/components/ProjectRow.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { projectsIn } from '@/data/projects'

// Projects with highlights get a big row, the rest a small card.
const current = projectsIn('now')
const rows = current.filter((project) => project.highlights)
const cards = current.filter((project) => !project.highlights)
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
      <ProjectRow
        v-for="(project, i) in rows"
        :key="project.slug"
        v-reveal
        :project="project"
        :flip="i % 2 === 1"
      />
      <div class="grid">
        <ProjectCard v-for="(project, i) in cards" :key="project.slug" v-reveal="i" :project="project" />
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
