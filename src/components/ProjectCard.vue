<script setup lang="ts">
import type { SmallProject } from '@/data/projects'

defineProps<{ project: SmallProject }>()
</script>

<template>
  <article class="card">
    <h3>{{ project.title }}</h3>
    <p class="muted">{{ project.summary }}</p>
    <ul class="chips">
      <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
    </ul>
    <div class="card-links">
      <a v-if="project.live" :href="project.live" class="btn btn-primary">
        Open it<span class="sr-only"> ({{ project.title }}, opens the live page)</span>
      </a>
      <a :href="project.code" class="btn">
        Code<span class="sr-only"> for {{ project.title }} on GitHub</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-raised);
  box-shadow: var(--shadow);
}

.card h3,
.card p {
  margin: 0;
}

.card-links {
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
</style>
