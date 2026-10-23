<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/data/projects'
import ThemedImage from './ThemedImage.vue'
import TypeText from './TypeText.vue'

// The main part of a project page. Parts a project doesn't have are left out.
const props = defineProps<{ project: Project }>()

const hasStory = computed(() =>
  Boolean(props.project.problem || props.project.built?.length || props.project.next?.length),
)
</script>

<template>
  <article class="case-study" :class="{ 'no-story': !hasStory }">
    <div class="cs-body">
      <div v-if="hasStory" v-reveal class="cs-main">
        <template v-if="project.problem">
          <TypeText as="h2" text="The problem" :speed="26" when-visible />
          <p>{{ project.problem }}</p>
        </template>

        <template v-if="project.built?.length">
          <TypeText as="h2" :text="project.problem ? 'What I built' : 'What it does'" :speed="26" when-visible />
          <ul>
            <li v-for="item in project.built" :key="item">{{ item }}</li>
          </ul>
        </template>

        <template v-if="project.next?.length">
          <TypeText as="h2" text="What I’d do next" :speed="26" when-visible />
          <ul>
            <li v-for="item in project.next" :key="item">{{ item }}</li>
          </ul>
        </template>
      </div>

      <aside v-reveal="1" class="cs-side">
        <template v-if="project.proof?.length">
          <h2 class="side-title">Highlights</h2>
          <ul class="proof">
            <li v-for="item in project.proof" :key="item">{{ item }}</li>
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
      </aside>
    </div>

    <div v-if="project.screenshots.length" class="shots">
      <figure v-for="(shot, i) in project.screenshots" :key="shot.src" v-reveal="i">
        <ThemedImage :shot="shot" />
        <figcaption v-if="shot.caption">{{ shot.caption }}</figcaption>
      </figure>
    </div>
  </article>
</template>

<style scoped>
.case-study {
  padding: 48px 0;
}

.cs-body {
  display: grid;
  gap: 28px;
}

.cs-main {
  max-width: var(--reading);
}

.cs-main h2 {
  font-size: 1.35rem;
  margin-top: 28px;
}

.cs-main h2:first-child {
  margin-top: 0;
}

.cs-main li + li {
  margin-top: 6px;
}

.cs-side {
  align-self: start;
  padding: 20px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: var(--radius);
  background: var(--surface);
}

.side-title {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-text);
  margin: 0 0 10px;
}

.side-title:not(:first-child) {
  margin-top: 22px;
}

.proof {
  margin: 0;
  padding-left: 1.1em;
  font-size: 0.97rem;
}

.proof li + li {
  margin-top: 8px;
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

.shots {
  display: grid;
  gap: 16px;
  margin-top: 32px;
}

.shots figure {
  margin: 0;
}

.shots img {
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.shots figcaption {
  font-size: 0.9rem;
  color: var(--muted);
  margin-top: 6px;
}

@media (min-width: 900px) {
  .cs-body {
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 48px;
  }

  /* With nothing to tell in the main column, the side box takes a sensible width on its own. */
  .no-story .cs-body {
    grid-template-columns: minmax(0, 520px);
  }

  .shots {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
