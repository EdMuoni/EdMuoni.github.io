<script setup lang="ts">
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { courses, projectsIn } from '@/data/projects'

// Every school project, under the course it was made for, in the order of `courses`.
const school = projectsIn('school')
const byCourse = courses
  .map((course) => ({
    course,
    // An address-friendly id for the course's section, e.g. 'web-development'.
    id: course.toLowerCase().replace(/[^a-z]+/g, '-'),
    projects: school.filter((project) => project.course === course),
  }))
  .filter((group) => group.projects.length > 0)
</script>

<template>
  <PageIntro
    kicker="School projects"
    title="What I built while studying"
    lead="Projects from my software development courses, sorted by course. Click a card for the details, or press “Open it” to try a project in your browser."
    :mascot="mascot.school"
    :photo="headerPhotos.school"
  >
    <nav class="jump" aria-label="Courses on this page">
      <a v-for="group in byCourse" :key="group.id" :href="`#${group.id}`">{{ group.course }}</a>
    </nav>
  </PageIntro>

  <section v-for="group in byCourse" :id="group.id" :key="group.id" class="section">
    <div class="container">
      <SectionHeading :kicker="group.course === 'JavaScript practice' ? 'Practice' : 'Course'" :title="group.course" />
      <div class="grid">
        <ProjectCard
          v-for="(project, i) in group.projects"
          :key="project.slug"
          v-reveal="i % 3"
          :project="project"
        />
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
