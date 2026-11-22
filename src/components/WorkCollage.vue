<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { findProject, hueOf, projectPath } from '@/data/projects'
import SectionHeading from './SectionHeading.vue'
import ThemedImage from './ThemedImage.vue'

// Six pictures of my own work on one coloured panel. Each opens its project.
// Short names, so the label fits on a phone-sized picture.
const short: Record<string, string> = { 'panel-calculator-thesis': 'Thesis calculator', 'achiral-nurse-assistant': 'aChiral' }
const picks = ['voltvibe', 'panel-calculator-thesis', 'achiral-nurse-assistant', 'bicycle-website', 'candy-crush', 'space-invaders']
  .map((slug) => findProject(slug)!)
  // The title under the picture names the link, so the picture itself stays silent.
  .map((project) => ({
    project,
    shot: { ...project.screenshots[0]!, alt: '' },
    label: short[project.slug] ?? project.title,
  }))
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="panel">
        <div class="intro">
          <SectionHeading kicker="My work" title="Things I have built" />
          <p>From a web shop for electrical parts to games you can play in the browser.</p>
          <RouterLink to="/work" class="btn">See finished work <span aria-hidden="true">→</span></RouterLink>
        </div>
        <ul class="collage">
          <li v-for="({ project, shot, label }, i) in picks" :key="project.slug" v-reveal="i" :class="`hue-${hueOf(project)}`">
            <RouterLink :to="projectPath(project)" class="tile">
              <ThemedImage :shot="shot" />
              <span class="label">{{ label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Blue to violet in both themes, white text on it. */
.panel {
  display: grid;
  gap: 28px;
  padding: 28px 20px 32px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--blue), var(--violet));
  color: #fff;
}

.intro {
  --hue-text: #fde68a;
  align-self: center;
}

.intro p {
  margin: 0 0 20px;
  max-width: 34ch;
}

.collage {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

/* Slightly tilted, like prints on a board; straight again when pointed at. */
.tile {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 22px rgb(11 21 48 / 0.35);
  transform: rotate(-1.5deg);
  transition: transform 0.3s ease-out;
}

li:nth-child(even) .tile {
  transform: rotate(1.5deg);
}

.tile:hover,
.tile:focus-visible {
  transform: rotate(0) scale(1.03);
}

.tile :deep(img) {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: top;
  background: #fff;
}

.label {
  position: absolute;
  left: 8px;
  bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: calc(100% - 16px);
  padding: 3px 10px 3px 8px;
  border-radius: 999px;
  background: rgb(11 21 48 / 0.88);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
}

.label::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hue-bright);
}

@media (min-width: 860px) {
  .panel {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 40px;
    padding: 44px 40px 48px;
  }

  .collage {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .label {
    font-size: 0.8rem;
  }
}
</style>
