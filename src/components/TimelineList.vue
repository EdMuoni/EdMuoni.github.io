<script setup lang="ts">
import type { TimelineEntry } from '@/data/career'

defineProps<{ entries: TimelineEntry[] }>()
</script>

<template>
  <ol class="timeline">
    <li v-for="entry in entries" :key="entry.period + entry.title">
      <span class="period">{{ entry.period }}</span>
      <div>
        <p class="title">{{ entry.title }}</p>
        <p class="place">{{ entry.place }}</p>
        <p v-if="entry.text" class="text">{{ entry.text }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 2px solid var(--border);
}

.timeline li {
  position: relative;
  display: grid;
  gap: 2px;
  padding: 0 0 24px 20px;
}

/* The orange dot on the line. */
.timeline li::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent);
}

.timeline p {
  margin: 0;
}

.period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-text);
}

.title {
  font-weight: 600;
}

.place {
  color: var(--muted);
}

.text {
  margin-top: 4px !important;
  font-size: 0.97rem;
}

@media (min-width: 720px) {
  .timeline li {
    grid-template-columns: 130px 1fr;
    gap: 16px;
  }
}
</style>
