<script setup lang="ts">
import ContactCta from '@/components/ContactCta.vue'
import CourseIcon from '@/components/CourseIcon.vue'
import PageIntro from '@/components/PageIntro.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { courseHue, courseIcon, courses, projectsIn } from '@/data/projects'

// Every school project, under the course it was made for, in the order of `courses`.
const school = projectsIn('school')
const byCourse = courses
  .map((course) => ({
    course,
    // An address-friendly id for the course's section, e.g. 'web-development'.
    id: course.toLowerCase().replace(/[^a-z]+/g, '-'),
    projects: school.filter((project) => project.course === course),
    hue: courseHue(course),
    icon: courseIcon(course),
  }))
  .filter((group) => group.projects.length > 0)
</script>

<template>
  <PageIntro
    kicker="School projects"
    title="What I built while studying"
    lead="From Tetris to browser tests, sorted by course. The ones with “Open it” run right in your browser."
    :mascot="mascot.school"
    :photo="headerPhotos.school"
  />

  <!-- Pill-shaped course links sitting on the header's wave, each with its course's icon. -->
  <nav id="courses" class="container tabs" aria-label="Courses on this page">
    <ul>
      <li v-for="group in byCourse" :key="group.id" :class="`hue-${group.hue}`">
        <a :href="`#${group.id}`"><CourseIcon :name="group.icon" />{{ group.course }}</a>
      </li>
    </ul>
  </nav>

  <!-- Every other course on a band tinted in its colour. -->
  <section
    v-for="(group, i) in byCourse"
    :id="group.id"
    :key="group.id"
    class="section course"
    :class="[`hue-${group.hue}`, { band: i % 2 === 0 }]"
  >
    <div class="container">
      <div class="course-head">
        <CourseIcon :name="group.icon" class="course-badge" />
        <SectionHeading :title="group.course" />
        <a href="#courses" class="to-top">
          <span aria-hidden="true">↑</span><span class="sr-only">Back to the course list</span>
        </a>
      </div>
      <div class="grid">
        <ProjectCard
          v-for="(project, j) in group.projects"
          :key="project.slug"
          v-reveal="j % 3"
          :project="project"
        />
      </div>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.tabs ul {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: -24px 0 0;
  padding: 0;
  list-style: none;
}

.tabs a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface-raised);
  box-shadow: var(--shadow);
  color: var(--ink);
  font-weight: 500;
  font-size: 0.92rem;
  text-decoration: none;
}

.tabs svg {
  width: 18px;
  height: 18px;
  color: var(--hue-text);
}

.tabs a:hover,
.tabs a:focus-visible {
  background: var(--hue-tint);
  color: var(--hue-text);
}

.course {
  scroll-margin-top: 16px;
}

.band {
  background: var(--hue-tint);
}

.section.band,
.band + .section {
  border-top: 0;
}

.course-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.course-head :deep(h2) {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
}

.course-badge {
  flex: none;
  width: 56px;
  height: 56px;
  padding: 12px;
  border: 3px solid var(--hue);
  border-radius: 50%;
  background: var(--hue-tint);
  color: var(--hue-text);
}

.band .course-badge {
  background: var(--surface-raised);
}

.to-top {
  flex: none;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 2px solid var(--hue);
  border-radius: 50%;
  color: var(--hue-text);
  text-decoration: none;
}

.grid {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

@media (max-width: 639px) {
  .course-badge {
    width: 48px;
    height: 48px;
    padding: 10px;
  }
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

/* The header stays on top while scrolling on wide screens, so jumps stop below it. */
@media (min-width: 1024px) {
  .course {
    scroll-margin-top: 80px;
  }
}
</style>
