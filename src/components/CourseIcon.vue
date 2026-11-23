<script setup lang="ts">
import type { CourseIconName } from '@/data/projects'

// A line icon for a course on the School page. It takes the text colour of where it sits.
defineProps<{ name: CourseIconName }>()
</script>

<template>
  <svg class="course-icon" viewBox="0 0 48 48" aria-hidden="true">
    <template v-if="name === 'browser'">
      <rect x="5" y="9" width="38" height="30" rx="4" />
      <path d="M5 17h38M17 25l-5 4 5 4M31 25l5 4-5 4" />
    </template>
    <template v-else-if="name === 'board'">
      <rect x="5" y="7" width="38" height="34" rx="4" />
      <path d="M18 7v34M31 7v34M9 14h5M22 14h5M35 14h4M9 21h5M22 21h5" />
    </template>
    <template v-else-if="name === 'shield'">
      <path d="M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11Z" />
      <path d="M16 24l6 6 11-12" />
    </template>
    <path v-else-if="name === 'code'" d="M17 14 7 24l10 10M31 14l10 10-10 10M27 9l-6 30" />
    <template v-else-if="name === 'phone'">
      <rect x="14" y="4" width="20" height="40" rx="4" />
      <path d="M21 38h6" />
    </template>
    <template v-else-if="name === 'database'">
      <ellipse cx="24" cy="11" rx="15" ry="5" />
      <path d="M9 11v26c0 3 7 5 15 5s15-2 15-5V11M9 24c0 3 7 5 15 5s15-2 15-5" />
    </template>
    <template v-else>
      <path d="M14 16h20a9 9 0 0 1 9 9v2a7 7 0 0 1-12 5l-2-2H19l-2 2a7 7 0 0 1-12-5v-2a9 9 0 0 1 9-9Z" />
      <path d="M14 21v7M10.5 24.5h7M31 23h.01M35 27h.01" />
    </template>
  </svg>
</template>

<style scoped>
.course-icon {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
