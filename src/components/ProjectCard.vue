<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projectPath, type Project } from '@/data/projects'
import ProjectCover from './ProjectCover.vue'

// One project on an overview page. The whole card opens the project's own page; "Open it" and
// "Code" go straight to the live project and its source. `large` is for the case studies.
// The class "lift" (styles/motion.css) raises the card on hover and runs a spark around its border.
defineProps<{ project: Project; large?: boolean }>()
</script>

<template>
  <article class="card lift" :class="{ large }">
    <ProjectCover :project="project" />
    <p v-if="large && project.context" class="card-context">{{ project.context }}</p>
    <h3 class="card-title">
      <!-- Its ::after covers the whole card, so a click anywhere on the card follows this link. -->
      <RouterLink :to="projectPath(project)" class="card-link">
        {{ project.title }}<span class="arrow" aria-hidden="true"> →</span>
      </RouterLink>
    </h3>
    <p class="muted summary">{{ project.summary }}</p>
    <ul class="chips">
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>
    <div v-if="project.live || project.code" class="card-links">
      <a v-if="project.live" :href="project.live" class="btn btn-primary">
        Open it<span class="sr-only"> ({{ project.title }}, opens the live page)</span>
      </a>
      <a v-if="project.code" :href="project.code" class="btn">
        Code<span class="sr-only"> for {{ project.title }} on GitHub</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-raised);
  box-shadow: var(--shadow);
}

.card:hover,
.card:focus-within {
  border-color: var(--accent);
}

.card h3,
.card p {
  margin: 0;
}

.card-context {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--muted);
}

.card-title {
  font-size: 1.2rem;
}

.large .card-title {
  font-size: clamp(1.35rem, 3vw, 1.7rem);
}

.card-link {
  color: var(--ink);
  text-decoration: none;
}

.card-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
}

/* The card shows the focus ring instead of the small heading link. */
.card-link:focus-visible {
  outline: none;
}

.card:has(.card-link:focus-visible) {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

.arrow {
  color: var(--accent-text);
}

.large .summary {
  font-size: 1.05rem;
}

/* Above the card-wide link, so these buttons stay clickable on their own. */
.card-links {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.card-links .btn {
  min-height: 40px;
  padding: 8px 14px;
  font-size: 0.92rem;
}

.large {
  padding: 24px;
  border-top: 4px solid var(--accent);
}
</style>
