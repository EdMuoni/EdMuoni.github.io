<script setup lang="ts">
import { computed } from 'vue'
import { courseIcon, type Project } from '@/data/projects'
import CircuitBackground from './CircuitBackground.vue'
import CourseIcon from './CourseIcon.vue'
import ProjectDrawing from './ProjectDrawing.vue'
import ThemedImage from './ThemedImage.vue'

// Top of a project card: the screenshot if there is one, a line drawing for the projects that
// have one, otherwise a drawn code window with the project's main technology. Decoration only.
const props = defineProps<{ project: Project }>()

const drawn = ['bill-watcher', 'defence-forces-internship']

// The file extension and the large label for the first technology in the stack we know.
const known: [match: RegExp, extension: string, label: string][] = [
  [/^(C#|ASP\.NET)/, 'cs', 'C#'],
  [/^Rust/, 'rs', 'Rust'],
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
  <div v-else-if="drawn.includes(project.slug)" class="cover" aria-hidden="true">
    <ProjectDrawing :slug="project.slug" />
  </div>
  <div v-else class="cover" aria-hidden="true">
    <CircuitBackground :seed="project.slug" />
    <div class="cover-bar">
      <span class="light"></span><span class="light"></span><span class="light"></span>
      <span class="file">{{ project.slug }}.{{ badge.extension }}</span>
    </div>
    <span class="label">{{ badge.label }}</span>
    <CourseIcon v-if="project.course" :name="courseIcon(project.course)" class="ghost" />
  </div>
</template>

<style scoped>
/* Dark in both themes, like a code editor. */
.cover {
  --circuit: color-mix(in srgb, var(--hue-bright, #fb923c) 40%, transparent);
  --circuit-pad: var(--forest-950);
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 6;
  border-radius: calc(var(--radius) - 3px);
  background:
    radial-gradient(circle at 85% 30%, color-mix(in srgb, var(--hue, #ff5100) 22%, transparent), transparent 60%),
    var(--forest-950);
  border: 1px solid #1f3d32;
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
  border-bottom: 1px solid #1f3d32;
  background: rgb(15 40 32 / 0.8);
}

.light {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3f3f46;
}

.light:first-child {
  background: var(--hue, #ff5100);
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
  color: var(--hue-bright, #fb923c);
}

/* A school project's course icon, faint on the right of its drawn cover. */
.ghost {
  position: absolute;
  right: 6%;
  top: 50%;
  height: 62%;
  width: auto;
  transform: translateY(-40%);
  color: var(--hue-bright, #fb923c);
  opacity: 0.3;
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
