<script setup lang="ts">
import type { CaseStudy } from '@/data/projects'

// One large project, always in the same order so a reader knows where to look:
// problem → what I built → stack → proof → what's next.
defineProps<{ study: CaseStudy }>()
</script>

<template>
  <article :id="study.id" class="case-study">
    <header class="cs-head">
      <h2>{{ study.title }}</h2>
      <p class="cs-context">{{ study.context }}</p>
    </header>

    <div class="cs-body">
      <div class="cs-main">
        <h3>The problem</h3>
        <p>{{ study.problem }}</p>

        <h3>What I built</h3>
        <ul>
          <li v-for="item in study.built" :key="item">{{ item }}</li>
        </ul>

        <template v-if="study.next.length">
          <h3>What I'd do next</h3>
          <ul>
            <li v-for="item in study.next" :key="item">{{ item }}</li>
          </ul>
        </template>
      </div>

      <aside class="cs-side">
        <h3 class="side-title">Proof</h3>
        <ul class="proof">
          <li v-for="item in study.proof" :key="item">{{ item }}</li>
        </ul>

        <h3 class="side-title">Stack</h3>
        <ul class="chips">
          <li v-for="tech in study.stack" :key="tech">{{ tech }}</li>
        </ul>

        <div v-if="study.links.length || study.codeNote" class="cs-links">
          <a v-for="link in study.links" :key="link.href" :href="link.href" class="btn">
            {{ link.label }} <span aria-hidden="true">↗</span>
          </a>
          <p v-if="study.codeNote" class="muted note">{{ study.codeNote }}</p>
        </div>
      </aside>
    </div>

    <div v-if="study.screenshots.length" class="shots">
      <figure v-for="shot in study.screenshots" :key="shot.src">
        <img :src="shot.src" :alt="shot.alt" loading="lazy" />
        <figcaption v-if="shot.caption">{{ shot.caption }}</figcaption>
      </figure>
    </div>
  </article>
</template>

<style scoped>
.case-study {
  padding: 48px 0;
}

.case-study + .case-study {
  border-top: 1px solid var(--border);
}

.cs-head h2 {
  margin-bottom: 6px;
}

.cs-context {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--muted);
  margin-bottom: 24px;
}

.cs-body {
  display: grid;
  gap: 28px;
}

.cs-main {
  max-width: var(--reading);
}

.cs-main h3 {
  margin-top: 20px;
}

.cs-main h3:first-child {
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

  .shots {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
