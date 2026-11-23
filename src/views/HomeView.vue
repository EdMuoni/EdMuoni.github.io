<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CircuitBackground from '@/components/CircuitBackground.vue'
import ContactCta from '@/components/ContactCta.vue'
import HeroRotator from '@/components/HeroRotator.vue'
import OhmMascot from '@/components/OhmMascot.vue'
import RoleCards from '@/components/RoleCards.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TerminalWindow from '@/components/TerminalWindow.vue'
import TypeText from '@/components/TypeText.vue'
import WaveEdge from '@/components/WaveEdge.vue'
import WorkCollage from '@/components/WorkCollage.vue'
import HeaderBackdrop from '@/components/HeaderBackdrop.vue'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
import { contactLinks, profile } from '@/data/profile'

const pitch =
  'I used to wire ships and buildings. That taught me to find the fault before I swap any parts. ' +
  'Now the parts are code.'

// Three steps from electrician to developer, each a badge with its own icon and colour.
const path = [
  {
    period: '2015 – 2025',
    title: 'Electrician',
    text: 'Shipbuilding, construction and manufacturing.',
    icon: 'bolt',
    hue: 'yellow',
  },
  {
    period: '2024 – 2026',
    title: 'Software development',
    text: 'Tallinna Tehnoloogiakolledž. My thesis grew into VoltVibe.',
    icon: 'cap',
    hue: 'blue',
  },
  {
    period: '2026',
    title: 'Internships',
    text: 'An AI nurse assistant in Sicily, then a Defence Forces messaging app.',
    icon: 'globe',
    hue: 'pink',
  },
]

// Off the keyboard, each with an icon and a colour.
const hobbies = [
  { label: 'Disc golf', icon: 'disc', hue: 'green' },
  { label: 'Swimming', icon: 'wave', hue: 'blue' },
  { label: 'Long walks', icon: 'path', hue: 'teal' },
  { label: 'Board games', icon: 'die', hue: 'yellow' },
  { label: 'Books', icon: 'book', hue: 'violet' },
]

// Signposts to the other pages.
const nextPages = [
  {
    to: '/what-i-bring',
    title: 'What I bring',
    text: 'Skills, results and how I work.',
  },
  {
    to: '/now-building',
    title: 'Now building',
    text: 'VoltVibe and Bill Watcher, both in progress.',
  },
  {
    to: '/work',
    title: 'Finished work',
    text: 'The thesis, the nurse assistant and the Defence Forces work.',
  },
  {
    to: '/school',
    title: 'School projects',
    text: 'Course projects, some you can open and play.',
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
        <HeroRotator
          :lines="[
            'I build web apps from the database up to the buttons.',
            'I work in Estonian, English or Russian, your pick.',
            'Ask me about the race condition I tracked down.',
          ]"
        />
        <p class="stack" aria-label="Main technologies">
          <span v-for="(tech, i) in profile.stack" :key="tech">
            {{ tech }}<span v-if="i < profile.stack.length - 1" aria-hidden="true"> · </span>
          </span>
        </p>
        <div class="hero-actions">
          <RouterLink to="/what-i-bring" class="btn btn-primary btn-big">
            What I bring <span aria-hidden="true">→</span>
          </RouterLink>
          <p class="hero-links">
            <template v-for="(link, i) in contactLinks" :key="link.label">
              <a :href="link.href">{{ link.label }}</a
              ><span v-if="i < contactLinks.length - 1" aria-hidden="true"> · </span>
            </template>
          </p>
        </div>
      </div>
      <OhmMascot :lines="mascot.home.lines" :readout="mascot.home.readout" />
    </div>
    <WaveEdge />
  </section>

  <WorkCollage />

  <section class="section">
    <div class="container">
      <SectionHeading kicker="What I do" title="Where I can help your team" />
      <RoleCards />
    </div>
  </section>

  <section class="section path-band">
    <div class="container">
      <SectionHeading kicker="My path" title="From electrician to developer" />
      <ol class="path">
        <li v-for="(step, i) in path" :key="step.period" v-reveal="i" :class="`hue-${step.hue}`">
          <svg class="badge" viewBox="0 0 48 48" aria-hidden="true">
            <path v-if="step.icon === 'bolt'" d="M27 5 11 27h12l-3 16 17-23H25Z" />
            <template v-else-if="step.icon === 'cap'">
              <path d="M4 18 24 9l20 9-20 9Z" />
              <path d="M12 22v9c0 3 5 6 12 6s12-3 12-6v-9M44 18v11" />
            </template>
            <template v-else>
              <circle cx="24" cy="24" r="18" />
              <path d="M6 24h36M24 6c-7 7-7 29 0 36M24 6c7 7 7 29 0 36" />
            </template>
          </svg>
          <span class="period">{{ step.period }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="section statement on-photo">
    <HeaderBackdrop :photo="headerPhotos.howIWork" below />
    <div class="container">
      <h2 class="kicker">How I work</h2>
      <p v-reveal class="statement-text">
        Reset a tripping breaker without finding out why, and you’ll be back tomorrow. I’d rather
        <mark>fix it once</mark>. Then a test keeps it fixed.
      </p>
      <p v-reveal class="statement-sub">
        Small changes, each one reviewed. I call it done when it runs in the real app and the tests
        are green.
      </p>
      <TerminalWindow v-reveal="1" class="statement-term" />
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
      <p v-reveal>I volunteer with older people through Seltsilised.</p>
      <ul class="hobbies" aria-label="Off the keyboard">
        <li v-for="(hobby, i) in hobbies" :key="hobby.label" v-reveal="i" :class="`hue-${hobby.hue}`">
          <svg class="hobby-icon" viewBox="0 0 48 48" aria-hidden="true">
            <template v-if="hobby.icon === 'disc'">
              <ellipse cx="24" cy="26" rx="18" ry="7" />
              <path d="M8 24c3-5 29-5 32 0M14 12c4-2 8-3 12-3" />
            </template>
            <path
              v-else-if="hobby.icon === 'wave'"
              d="M4 20c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4M4 31c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4"
            />
            <template v-else-if="hobby.icon === 'path'">
              <path d="M16 43c0-8 18-8 18-16S16 19 16 11" />
              <circle cx="16" cy="7" r="2" />
            </template>
            <template v-else-if="hobby.icon === 'die'">
              <rect x="9" y="9" width="30" height="30" rx="6" />
              <path d="M17 17h.01M31 17h.01M24 24h.01M17 31h.01M31 31h.01" class="pip" />
            </template>
            <template v-else>
              <path d="M6 12c6-2 12-2 18 2 6-4 12-4 18-2v26c-6-2-12-2-18 2-6-4-12-4-18-2Z" />
              <path d="M24 14v26" />
            </template>
          </svg>
          {{ hobby.label }}
        </li>
      </ul>
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

/* My path: a band of three round badges joined by a line. */
.path-band {
  background: var(--surface);
}

.path {
  position: relative;
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: grid;
  gap: 28px;
  text-align: center;
}

.path li {
  position: relative;
  display: grid;
  align-content: start;
  justify-items: center;
}

.badge {
  width: 84px;
  height: 84px;
  padding: 18px;
  margin-bottom: 12px;
  border: 3px solid var(--hue);
  border-radius: 50%;
  background: var(--hue-tint);
  fill: none;
  stroke: var(--hue-text);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.path h3 {
  margin: 4px 0 4px;
}

.path p {
  margin: 0;
  max-width: 30ch;
  color: var(--muted);
}

.period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--hue-text);
}

/* How I work: the band itself is in base.css. The short marked phrase stays on one line here. */
.statement mark {
  white-space: nowrap;
}

.statement-term {
  max-width: 620px;
  margin: 0 auto;
  text-align: left;
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

.hobbies {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
}

.hobbies li {
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 6px;
  width: 88px;
  text-align: center;
  font-size: 0.9rem;
}

.hobby-icon {
  width: 60px;
  height: 60px;
  padding: 12px;
  border: 3px solid var(--hue);
  border-radius: 50%;
  background: var(--hue-tint);
  fill: none;
  stroke: var(--hue-text);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hobby-icon .pip {
  stroke-width: 5;
}

/* One big button for the main next step, the contact links as plain links under it. */
.btn-big {
  min-height: 52px;
  padding: 14px 28px;
  font-size: 1.1rem;
  box-shadow: 0 10px 28px -12px var(--accent);
}

.hero-links {
  margin: 14px 0 0;
  font-weight: 600;
}

.hero-links a {
  display: inline-block;
  padding: 8px 0;
}

@media (max-width: 560px) {
  .btn-big {
    width: 100%;
    justify-content: center;
  }
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

  /* The line through the middle of the badges, behind them. */
  .path::before {
    content: '';
    position: absolute;
    top: 42px;
    left: 16%;
    right: 16%;
    border-top: 2px dashed var(--border);
  }

  .next-pages {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
