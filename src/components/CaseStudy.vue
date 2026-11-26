<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/data/projects'
import ProjectCover from './ProjectCover.vue'
import ThemedImage from './ThemedImage.vue'
import TypeText from './TypeText.vue'

// The main part of a project page: the first picture next to what I built, then what comes next,
// the work behind it as icon tiles and the other pictures. "The problem" is the band above this
// (ProjectView.vue). Parts a project doesn't have are left out.
const props = defineProps<{ project: Project }>()

const first = computed(() => props.project.screenshots[0])
const rest = computed(() => props.project.screenshots.slice(1))

// shortcut: a tile's icon is guessed from its words; add an icon field to proof if one comes out wrong.
const icons: [match: RegExp, icon: string][] = [
  [/secur|attack|csrf/i, 'lock'],
  [/layer|module|split/i, 'layers'],
  [/test|playwright/i, 'shield'],
  [/review|pull request|branch|grooming/i, 'branch'],
  [/changelog|diagram|report/i, 'page'],
]
const iconFor = (item: string) => icons.find(([match]) => match.test(item))?.[1] ?? 'bolt'
</script>

<template>
  <article class="case-study">
    <div v-reveal class="built-row">
      <figure class="built-pic">
        <!-- Opens the picture full size, so small text in a screenshot can be read. -->
        <a v-if="first" :href="first.src" class="zoom offset-pic"><ThemedImage :shot="first" loading="eager" /></a>
        <div v-else class="offset-pic"><ProjectCover :project="project" /></div>
        <figcaption v-if="first?.caption">{{ first.caption }}</figcaption>
      </figure>

      <div class="built-text">
        <template v-if="project.built?.length">
          <TypeText as="h2" :text="project.problem ? 'What I built' : 'What it does'" :speed="26" when-visible />
          <ul class="ticks">
            <li v-for="item in project.built" :key="item">{{ item }}</li>
          </ul>
        </template>

        <h2 class="side-title">Stack</h2>
        <ul class="chips">
          <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
        </ul>

        <div v-if="project.links?.length || project.codeNote" class="cs-links">
          <a v-for="link in project.links" :key="link.href" :href="link.href" class="btn">
            {{ link.label }} <span aria-hidden="true">↗</span>
          </a>
          <p v-if="project.codeNote" class="muted note">{{ project.codeNote }}</p>
        </div>
      </div>
    </div>

    <div v-if="project.next?.length" v-reveal class="cs-next">
      <TypeText as="h2" text="What I’d do next" :speed="26" when-visible />
      <ul class="ticks">
        <li v-for="item in project.next" :key="item">{{ item }}</li>
      </ul>
    </div>

    <section v-if="project.proof?.length" class="proof-band">
      <h2 class="side-title">Behind the scenes</h2>
      <ul class="tiles">
        <li v-for="(item, i) in project.proof" :key="item" v-reveal="i" class="tile">
          <svg class="tile-icon" viewBox="0 0 48 48" aria-hidden="true">
            <template v-if="iconFor(item) === 'lock'">
              <rect x="11" y="21" width="26" height="20" rx="4" />
              <path d="M17 21v-6a7 7 0 0 1 14 0v6M24 29v5" />
            </template>
            <template v-else-if="iconFor(item) === 'layers'">
              <path d="M24 6 42 15 24 24 6 15Z" />
              <path d="M6 24l18 9 18-9M6 33l18 9 18-9" />
            </template>
            <template v-else-if="iconFor(item) === 'shield'">
              <path d="M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11Z" />
              <path d="M16 24l6 6 11-12" />
            </template>
            <template v-else-if="iconFor(item) === 'branch'">
              <circle cx="14" cy="10" r="4" />
              <circle cx="14" cy="38" r="4" />
              <circle cx="34" cy="14" r="4" />
              <path d="M14 14v20M34 18c0 9-10 9-18 17" />
            </template>
            <template v-else-if="iconFor(item) === 'page'">
              <path d="M12 5h17l9 9v29H12Z" />
              <path d="M29 5v9h9M18 24h14M18 31h14M18 38h8" />
            </template>
            <path v-else d="M27 5 11 27h12l-3 16 17-23H25Z" />
          </svg>
          <p>{{ item }}</p>
        </li>
      </ul>
    </section>

    <div v-if="rest.length" class="shots">
      <figure v-for="(shot, i) in rest" :key="shot.src" v-reveal="i">
        <a :href="shot.src" class="zoom"><ThemedImage :shot="shot" /></a>
        <figcaption v-if="shot.caption">{{ shot.caption }}</figcaption>
      </figure>
    </div>
  </article>
</template>

<style scoped>
.case-study {
  padding: 48px 0;
}

/* The first picture with the project's colour behind it, next to what I built. */
.built-row {
  display: grid;
  gap: 32px;
  align-items: center;
}

.built-pic {
  margin: 0;
}

.built-pic :deep(.cover) {
  aspect-ratio: 16 / 10;
}

.built-pic figcaption {
  margin-top: 22px;
}

.built-text h2:not(.side-title),
.cs-next h2 {
  font-size: 1.35rem;
}

.built-text li + li,
.cs-next li + li {
  margin-top: 6px;
}

.built-text .ticks + .side-title {
  margin-top: 24px;
}

.side-title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--hue-text, var(--accent-text));
  margin: 0 0 10px;
}

.cs-links {
  margin-top: 22px;
  display: grid;
  gap: 10px;
  justify-items: start;
}

.note {
  margin: 0;
  font-size: 0.92rem;
}

.cs-next {
  max-width: var(--reading);
  margin-top: 48px;
}

/* The work behind the project as tiles, each with an icon in the project's colour. */
.proof-band {
  margin-top: 48px;
}

.tiles {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
}

.tile {
  padding: 20px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--hue);
  border-radius: var(--radius);
  background: linear-gradient(to bottom, var(--hue-tint), var(--surface-raised) 60%);
}

.tile p {
  margin: 12px 0 0;
  font-size: 0.97rem;
}

.tile-icon {
  width: 48px;
  height: 48px;
  padding: 10px;
  border-radius: 12px;
  background: var(--hue);
  fill: none;
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.shots {
  display: grid;
  gap: 16px;
  margin-top: 48px;
}

.shots figure {
  margin: 0;
}

.zoom {
  display: block;
  cursor: zoom-in;
}

.zoom :deep(img) {
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.shots :deep(img) {
  transition: transform 0.3s ease-out, border-color 0.3s;
}

.shots .zoom:hover :deep(img),
.shots .zoom:focus-visible :deep(img) {
  transform: translateY(-3px);
  border-color: var(--hue, var(--accent));
}

figcaption {
  font-size: 0.9rem;
  color: var(--muted);
  margin-top: 6px;
}

@media (min-width: 600px) {
  .tiles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .built-row {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 56px;
  }

  .tiles {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .shots {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
