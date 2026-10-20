<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TimelineList from '@/components/TimelineList.vue'
import { education, experience, languages, outcomes, skillGroups, strengths } from '@/data/career'
import { mascot } from '@/data/mascot'
import { headerPhotos } from '@/data/photos'
</script>

<template>
  <PageIntro
    kicker="What I bring"
    title="What your team gets"
    lead="A developer who reproduces a bug before fixing it, works in small reviewed steps, and knows the electrical domain from the inside."
    :mascot="mascot.whatIBring"
    :photo="headerPhotos.whatIBring"
  />

  <section class="section">
    <div class="container">
      <h2 class="sr-only">Results you can expect</h2>
      <ul class="outcomes">
        <li v-for="(item, i) in outcomes" :key="item.title" v-reveal="i">
          <h3 class="outcome-title">{{ item.title }}</h3>
          <p class="outcome-text">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading kicker="How I would be useful" title="How I work on every job" />
      <ol class="strengths">
        <li v-for="(item, i) in strengths" :key="item.title" v-reveal>
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
      <SectionHeading kicker="Skills" title="What I have used in real projects" />
      <p class="muted intro">
        Every item below appears in a project on
        <RouterLink to="/now-building">Now building</RouterLink> or
        <RouterLink to="/work">Finished work</RouterLink>.
      </p>
      <dl class="skills">
        <div v-for="group in skillGroups" :key="group.name" v-reveal class="skill-group">
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
        <SectionHeading kicker="Experience" title="Where I have worked" />
        <TimelineList :entries="experience" />
      </div>
      <div>
        <SectionHeading kicker="Education" title="What I have learned" />
        <TimelineList :entries="education" />
        <p><strong>Languages:</strong> {{ languages }}</p>
      </div>
    </div>
  </section>

  <ContactCta />
</template>

<style scoped>
/* Four result tiles: one column on phones, two on tablets, four in a row on wide screens. */
.outcomes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.outcomes li {
  padding: 20px;
  border-radius: var(--radius);
  border-top: 4px solid var(--accent);
  background: var(--tint);
}

.outcome-title {
  font-size: 1.2rem;
  margin: 0 0 8px;
}

.outcome-text {
  margin: 0;
  font-size: 0.97rem;
  color: var(--muted);
}

@media (min-width: 640px) {
  .outcomes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1000px) {
  .outcomes {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
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
