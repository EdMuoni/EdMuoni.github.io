<script setup lang="ts">
import CaseStudy from '@/components/CaseStudy.vue'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { finishedCaseStudies, moreProjects } from '@/data/projects'
</script>

<template>
  <PageIntro
    kicker="Finished work"
    title="Work I have finished"
    lead="Three larger projects, each told as problem → what I built → proof. Below them, smaller projects from my studies, several of which you can open and play."
  >
    <nav class="jump" aria-label="On this page">
      <a v-for="study in finishedCaseStudies" :key="study.id" :href="`#${study.id}`">{{ study.title }}</a>
      <a href="#more-projects">More projects</a>
    </nav>
  </PageIntro>

  <div class="container">
    <CaseStudy v-for="study in finishedCaseStudies" :key="study.id" :study="study" />
  </div>

  <section id="more-projects" class="section more">
    <div class="container">
      <span class="kicker">From my studies</span>
      <h2>More projects</h2>
      <p class="muted">“Open it” runs the project right in your browser; “Code” shows the source on GitHub.</p>
      <div class="grid">
        <ProjectCard v-for="project in moreProjects" :key="project.title" :project="project" />
      </div>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.jump {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 8px;
  font-weight: 500;
  font-size: 0.95rem;
}

.more {
  background: var(--surface);
  border-top: 1px solid var(--border);
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
