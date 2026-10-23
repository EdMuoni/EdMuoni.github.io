<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/data/projects'
import CircuitBackground from './CircuitBackground.vue'
import ThemedImage from './ThemedImage.vue'

// Top of a project card: the screenshot if there is one, otherwise a drawn code window with the
// project's main technology. Decoration only.
const props = defineProps<{ project: Project }>()

// The file extension and the large label for the first technology in the stack we know.
const known: [match: RegExp, extension: string, label: string][] = [
  [/^(C#|ASP\.NET)/, 'cs', 'C#'],
  [/^Python/, 'py', 'Python'],
  [/^Vue/, 'vue', 'Vue'],
  [/^React/, 'tsx', 'React'],
  [/^TypeScript/, 'ts', 'TS'],
  [/^(JavaScript|Node\.js)/, 'js', 'JS'],
  [/^(SQL Server|T-SQL)/, 'sql', 'SQL'],
  [/^HTML/, 'html', 'HTML'],
]

const badge = computed(() => {
  for (const tech of props.project.stack) {
    const hit = known.find(([match]) => match.test(tech))
    if (hit) return { extension: hit[1], label: hit[2] }
  }
  return { extension: 'md', label: '</>' }
})
</script>

<template>
  <div v-if="project.screenshots[0]" class="cover shot" aria-hidden="true">
    <ThemedImage :shot="project.screenshots[0]" />
  </div>
  <div v-else class="cover" aria-hidden="true">
    <CircuitBackground :seed="project.slug" />
    <div class="cover-bar">
      <span class="light"></span><span class="light"></span><span class="light"></span>
      <span class="file">{{ project.slug }}.{{ badge.extension }}</span>
    </div>
    <span class="label">{{ badge.label }}</span>
  </div>
</template>

<style scoped>
/* Dark in both themes, like a code editor. */
.cover {
  --circuit: rgb(251 146 60 / 0.4);
  --circuit-pad: #0d0d10;
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 6;
  border-radius: calc(var(--radius) - 3px);
  background:
    radial-gradient(circle at 85% 30%, rgb(255 81 0 / 0.18), transparent 60%),
    #0d0d10;
  border: 1px solid #2e2e33;
}

.shot :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
}

.cover-bar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-bottom: 1px solid #23232a;
  background: rgb(24 24 27 / 0.8);
}

.light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3f3f46;
}

.light:first-child {
  background: #ff5100;
}

.file {
  margin-left: 6px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: #a1a1aa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label {
  position: absolute;
  left: 14px;
  bottom: 8px;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  line-height: 1;
  color: #fb923c;
}

/* The pulses of current run only while the card is pointed at, so a page full of cards stays calm. */
.cover :deep(.pulse) {
  animation-play-state: paused;
}

:global(.lift:hover) .cover :deep(.pulse),
:global(.lift:focus-within) .cover :deep(.pulse) {
  animation-play-state: running;
}
</style>
