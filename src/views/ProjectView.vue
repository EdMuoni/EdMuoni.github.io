<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CaseStudy from '@/components/CaseStudy.vue'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import { mascotForProject } from '@/data/mascot'
import { findProject, groups, hueOf, neighbours, projectPath } from '@/data/projects'

// One project's own page, e.g. /projects/voltvibe. Everything on it comes from src/data/projects.ts.
const route = useRoute()

// The router only opens this page for a slug that exists (see beforeEnter in router/index.ts).
const project = computed(() => findProject(String(route.params.slug))!)
const overview = computed(() => groups[project.value.group])
const around = computed(() => neighbours(project.value))
const ohm = computed(() => mascotForProject(project.value))
const kicker = computed(() =>
  project.value.course ? `${overview.value.label} · ${project.value.course}` : overview.value.label,
)

// The problem in three parts: before, the marked words, after. Null when nothing is marked.
const problemParts = computed(() => {
  const { problem, problemMark } = project.value
  if (!problem || !problemMark) return null
  const i = problem.indexOf(problemMark)
  return i < 0 ? null : [problem.slice(0, i), problemMark, problem.slice(i + problemMark.length)]
})
</script>

<template>
  <!-- With a problem band below, the header's wave is drawn in navy so it flows into the band. -->
  <PageIntro
    :kicker="kicker"
    :title="project.title"
    :lead="project.summary"
    :back="{ to: overview.to, label: overview.label }"
    :mascot="ohm"
    :style="project.problem ? { '--page-bg': 'var(--navy)' } : undefined"
  >
    <p v-if="project.context" class="context">{{ project.context }}</p>
    <div v-if="project.live || project.code" class="btn-row">
      <a v-if="project.live" :href="project.live" class="btn btn-primary">
        Open it <span aria-hidden="true">↗</span>
      </a>
      <a v-if="project.code" :href="project.code" class="btn">
        Code on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  </PageIntro>

  <section v-if="project.problem" class="section statement problem-band on-photo" :class="`hue-${hueOf(project)}`">
    <div class="container">
      <h2 class="kicker">The problem</h2>
      <p v-reveal class="statement-text">
        <template v-if="problemParts">{{ problemParts[0] }}<mark>{{ problemParts[1] }}</mark>{{ problemParts[2] }}</template>
        <template v-else>{{ project.problem }}</template>
      </p>
    </div>
  </section>

  <div class="container" :class="`hue-${hueOf(project)}`">
    <CaseStudy :project="project" />
  </div>

  <nav class="container more" aria-label="More projects">
    <RouterLink v-if="around.previous" :to="projectPath(around.previous)" class="step lift">
      <span class="step-label">Previous</span>
      <span class="step-title"><span aria-hidden="true">← </span>{{ around.previous.title }}</span>
    </RouterLink>
    <RouterLink v-if="around.next" :to="projectPath(around.next)" class="step step-next lift">
      <span class="step-label">Next</span>
      <span class="step-title">{{ around.next.title }}<span aria-hidden="true"> →</span></span>
    </RouterLink>
  </nav>

  <ContactCta />
</template>

<style scoped>
/* Long problems read better left-aligned and a little smaller than Home's band. */
.statement.problem-band {
  text-align: left;
}

.problem-band .statement-text {
  margin: 0;
  max-width: 40ch;
  font-size: clamp(1.25rem, 2.8vw, 1.7rem);
}

.context {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--muted);
  max-width: var(--reading);
}

.more {
  display: grid;
  gap: 12px;
  padding-bottom: 16px;
}

.step {
  position: relative;
  display: grid;
  gap: 2px;
  padding: 14px 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-raised);
  text-decoration: none;
  color: var(--ink);
}

.step:hover {
  border-color: var(--accent);
}

.step-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.step-title {
  font-weight: 600;
  color: var(--accent-text);
}

@media (min-width: 720px) {
  .more {
    grid-template-columns: 1fr 1fr;
  }

  .step-next {
    grid-column: 2;
    text-align: right;
  }
}
</style>
