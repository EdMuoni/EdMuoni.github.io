<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CircuitBackground from '@/components/CircuitBackground.vue'
import ContactCta from '@/components/ContactCta.vue'
import HeroRotator from '@/components/HeroRotator.vue'
import OhmMascot from '@/components/OhmMascot.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TerminalWindow from '@/components/TerminalWindow.vue'
import TypeText from '@/components/TypeText.vue'
import HeaderBackdrop from '@/components/HeaderBackdrop.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { contactLinks, profile } from '@/data/profile'

const pitch =
  'Electrical work taught me to find the cause of a fault before fixing anything. ' +
  'I bring the same habit to software: trace the bug, fix the cause, and prove the fix with a test.'

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

// Signposts to the other pages.
const nextPages = [
  {
    to: '/what-i-bring',
    title: 'What I bring',
    text: 'Skills, results, and how I would be useful to your team.',
  },
  {
    to: '/now-building',
    title: 'Now building',
    text: 'VoltVibe: my diploma thesis, growing into a product.',
  },
  {
    to: '/work',
    title: 'Finished work',
    text: 'The thesis, the AI nurse assistant and the Defence Forces internship.',
  },
  {
    to: '/school',
    title: 'School projects',
    text: 'Course projects grouped by course, several of which you can open and play.',
  },
]
</script>

<template>
  <section class="hero on-photo">
    <HeaderBackdrop :photo="headerPhotos.home" />
    <span class="header-glow" aria-hidden="true"></span>
    <CircuitBackground seed="home" />
    <div class="container hero-grid">
      <div class="hero-text">
        <TypeText as="span" class="kicker" :text="`${profile.role} · ${profile.location}`" :speed="22" />
        <TypeText as="h1" :text="profile.name" :speed="55" :delay="300" />
        <TypeText as="p" class="pitch" :text="pitch" :speed="9" :delay="900" />
        <HeroRotator :lines="['I find the cause.', 'I fix it.', 'I prove it with a test.']" />
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
      <OhmMascot :lines="mascot.home.lines" :readout="mascot.home.readout" />
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading kicker="My path" title="From electrician to developer" />
      <ol class="path">
        <li v-for="(step, i) in path" :key="step.period" v-reveal="i">
          <span class="period">{{ step.period }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading kicker="How I work" title="Cause first, then the fix, then the test" />
      <div class="how">
        <div v-reveal class="how-text">
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
        <TerminalWindow v-reveal="1" />
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading kicker="Read on" title="Where to look next" />
      <ul class="next-pages">
        <li v-for="(page, i) in nextPages" :key="page.to" v-reveal="i">
          <RouterLink :to="page.to" class="next-card lift">
            <span class="next-title">{{ page.title }} <span aria-hidden="true">→</span></span>
            <span class="muted">{{ page.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container outside">
      <TypeText as="span" class="kicker" text="Outside work" :speed="22" when-visible />
      <p v-reveal>
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
  position: relative;
  overflow: hidden;
  padding: 56px 0 48px;
  background: linear-gradient(to bottom, var(--tint), var(--bg));
  border-bottom: 1px solid var(--border);
}

/* Above the moving background. */
.hero-grid {
  position: relative;
  display: grid;
  gap: 32px;
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr) 280px;
    align-items: center;
    gap: 48px;
  }
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
  gap: 24px 40px;
  align-items: start;
}

.next-pages {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 12px;
}

.next-card {
  position: relative;
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
  .path {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .next-pages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .how {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
