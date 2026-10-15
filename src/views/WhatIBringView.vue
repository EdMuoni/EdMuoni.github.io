<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import TimelineList from '@/components/TimelineList.vue'
import { education, experience, languages, skillGroups, stats, strengths } from '@/data/career'
</script>

<template>
  <PageIntro
    kicker="What I bring"
    title="What your team gets"
    lead="A developer who reproduces a bug before fixing it, works in small reviewed steps, and knows the electrical domain from the inside."
  />

  <section class="section">
    <div class="container">
      <h2 class="sr-only">In numbers</h2>
      <ul class="stats">
        <li v-for="stat in stats" :key="stat.label">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="kicker">How I would be useful</span>
      <h2>Five things I do on every job</h2>
      <ol class="strengths">
        <li v-for="(item, i) in strengths" :key="item.title">
          <span class="num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <p class="evidence"><span class="evidence-label">Proof:</span> {{ item.evidence }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <span class="kicker">Skills</span>
      <h2>What I have used in real projects</h2>
      <p class="muted intro">
        Every item below appears in a project on
        <RouterLink to="/now-building">Now building</RouterLink> or
        <RouterLink to="/work">Finished work</RouterLink>.
      </p>
      <dl class="skills">
        <div v-for="group in skillGroups" :key="group.name" class="skill-group">
          <dt>{{ group.name }}</dt>
          <dd>
            <ul class="chips">
              <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="container columns">
      <div>
        <span class="kicker">Experience</span>
        <h2>Where I have worked</h2>
        <TimelineList :entries="experience" />
      </div>
      <div>
        <span class="kicker">Education</span>
        <h2>What I have learned</h2>
        <TimelineList :entries="education" />
        <p><strong>Languages:</strong> {{ languages }}</p>
      </div>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
.stats {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.stats li {
  display: grid;
  gap: 4px;
  padding: 18px;
  border-radius: var(--radius);
  background: var(--tint);
}

.stat-value {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  line-height: 1.1;
}

.stat-label {
  font-size: 0.92rem;
  color: var(--muted);
}

.strengths {
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 28px;
}

.strengths li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  max-width: 820px;
}

.num {
  font-family: var(--font-mono);
  font-weight: 500;
  color: var(--accent-text);
  padding-top: 4px;
}

.strengths h3 {
  margin-bottom: 6px;
}

.strengths p {
  margin: 0 0 8px;
}

.evidence {
  font-size: 0.95rem;
  color: var(--muted);
  padding-left: 12px;
  border-left: 3px solid var(--accent);
}

.evidence-label {
  font-weight: 600;
  color: var(--ink);
}

.intro {
  margin-bottom: 24px;
}

.skills {
  margin: 0;
  display: grid;
  gap: 18px;
}

.skill-group dt {
  font-weight: 600;
  margin-bottom: 6px;
}

.skill-group dd {
  margin: 0;
}

.columns {
  display: grid;
  gap: 40px;
}

@media (min-width: 720px) {
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .skill-group {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: start;
  }
}

@media (min-width: 960px) {
  .columns {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
  }
}
</style>
