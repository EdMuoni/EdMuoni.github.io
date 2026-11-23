<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { hueOf, projectPath, type Project } from '@/data/projects'
import ProjectCover from './ProjectCover.vue'

// A big project as a row: picture on one side with a coloured block behind it, a few short lines
// on the other. `flip` puts the picture on the right, so rows alternate down the page.
defineProps<{ project: Project; flip?: boolean }>()
</script>

<template>
  <article class="row" :class="[`hue-${hueOf(project)}`, { flip }]">
    <RouterLink :to="projectPath(project)" class="picture offset-pic" tabindex="-1" aria-hidden="true">
      <ProjectCover :project="project" />
    </RouterLink>
    <div class="text">
      <p v-if="project.context" class="context">{{ project.context }}</p>
      <h3 class="title">
        <RouterLink :to="projectPath(project)">{{ project.title }}</RouterLink>
      </h3>
      <ul v-if="project.highlights" class="ticks">
        <li v-for="item in project.highlights" :key="item">{{ item }}</li>
      </ul>
      <RouterLink :to="projectPath(project)" class="btn btn-primary">
        See the project<span class="sr-only">: {{ project.title }}</span> <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.row {
  display: grid;
  gap: 28px;
  align-items: center;
  padding: 28px 0;
}

/* The coloured block behind the picture comes from .offset-pic in base.css. */
.picture :deep(.cover) {
  aspect-ratio: 16 / 10;
}

.context {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
  margin: 0 0 8px;
}

.title {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  margin: 0 0 14px;
}

.title a {
  color: var(--ink);
  text-decoration: none;
}

.title a:hover {
  color: var(--hue-text);
}

.text .btn {
  margin-top: 6px;
}

@media (min-width: 860px) {
  .row {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 56px;
  }

  .flip .picture {
    order: 2;
  }
}
</style>
