<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactCta from '@/components/ContactCta.vue'
import { contactLinks, profile } from '@/data/profile'

// Three steps from electrician to developer.
const path = [
  {
    period: '2015 – 2025',
    title: 'Electrician',
    text: 'Electrical installation, assembly and technical work in shipbuilding, construction and manufacturing.',
  },
  {
    period: '2024 – 2026',
    title: 'Software development studies',
    text: 'Tallinna Tehnoloogiakolledž. Diploma thesis: a calculator that prices the components of an electrical panel. Professional certificate Noorem tarkvaraarendaja, tase 4.',
  },
  {
    period: '2026',
    title: 'Internships',
    text: 'In Italy (Erasmus+) I took an AI nurse assistant from idea to a working prototype. On a Defence Forces development team I delivered frontend and backend tickets through code review.',
  },
]

// Signposts to the other three pages.
const nextPages = [
  {
    to: '/what-i-bring',
    title: 'What I bring',
    text: 'Skills, results with numbers, and how I would be useful to your team.',
  },
  {
    to: '/now-building',
    title: 'Now building',
    text: 'VoltVibe: my diploma thesis, growing into a product.',
  },
  {
    to: '/work',
    title: 'Finished work',
    text: 'The thesis, the AI nurse assistant, the Defence Forces internship, and projects you can open and play.',
  },
]
</script>

<template>
  <section class="hero">
    <div class="container">
      <span class="kicker">{{ profile.role }} · {{ profile.location }}</span>
      <h1>{{ profile.name }}</h1>
      <p class="pitch">
        Electrical work taught me to find the cause of a fault before fixing anything.
        I bring the same habit to software: trace the bug, fix the cause, and prove the fix with a test.
      </p>
      <p class="stack" aria-label="Main technologies">
        <span v-for="(tech, i) in profile.stack" :key="tech">
          {{ tech }}<span v-if="i < profile.stack.length - 1" aria-hidden="true"> · </span>
        </span>
      </p>
      <div class="btn-row">
        <RouterLink to="/what-i-bring" class="btn btn-primary">What I bring</RouterLink>
        <a v-for="link in contactLinks" :key="link.label" :href="link.href" class="btn">{{ link.label }}</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="kicker">My path</span>
      <h2>From electrician to developer</h2>
      <ol class="path">
        <li v-for="step in path" :key="step.period">
          <span class="period">{{ step.period }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="kicker">How I work</span>
      <h2>Cause first, then the fix, then the test</h2>
      <div class="how">
        <p>
          An electrician who swaps parts until the fault goes away has not fixed anything; the fault
          comes back. Software is the same. I reproduce a bug before I touch the code, fix what caused
          it, and add a test so it cannot return unnoticed.
        </p>
        <p>
          I work in small steps: one ticket, one branch, one pull request, reviewed before it reaches
          main.
          The decisions are mine, and nothing stays until the running app and the tests agree.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="kicker">Read on</span>
      <h2>Where to look next</h2>
      <ul class="next-pages">
        <li v-for="page in nextPages" :key="page.to">
          <RouterLink :to="page.to" class="next-card">
            <span class="next-title">{{ page.title }} <span aria-hidden="true">→</span></span>
            <span class="muted">{{ page.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container outside">
      <span class="kicker">Outside work</span>
      <p>
        I volunteer with older people through Seltsilised. Away from the
        keyboard: disc golf, swimming, long walks, board games, and books (science fiction, crime and
        popular science).
      </p>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.hero {
  padding: 56px 0 48px;
  background: linear-gradient(to bottom, var(--tint), var(--bg));
  border-bottom: 1px solid var(--border);
}

.hero h1 {
  font-size: clamp(2.6rem, 9vw, 4.6rem);
  margin-bottom: 16px;
}

.pitch {
  font-size: clamp(1.15rem, 2.4vw, 1.4rem);
  max-width: 40ch;
  line-height: 1.5;
}

.stack {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--muted);
  margin-bottom: 28px;
}

.path {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 16px;
  counter-reset: step;
}

.path li {
  padding: 20px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: var(--radius);
  background: var(--surface);
}

.path h3 {
  margin: 6px 0 8px;
}

.path p {
  margin: 0;
}

.period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent-text);
}

.how {
  display: grid;
  gap: 0 40px;
  max-width: 1000px;
}

.next-pages {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 12px;
}

.next-card {
  display: grid;
  gap: 4px;
  height: 100%;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-raised);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: var(--ink);
}

.next-card:hover {
  border-color: var(--accent);
}

.next-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--accent-text);
}

.outside p {
  max-width: var(--reading);
  margin: 0;
}

@media (min-width: 720px) {
  .hero {
    padding: 96px 0 72px;
  }
}

@media (min-width: 860px) {
  .path,
  .next-pages {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .how {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
