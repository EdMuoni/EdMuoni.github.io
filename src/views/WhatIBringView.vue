<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ContactCta from '@/components/ContactCta.vue'
import PageIntro from '@/components/PageIntro.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TimelineList from '@/components/TimelineList.vue'
import { education, experience, languages, outcomes, skillGroups, strengths } from '@/data/career'
import { mascot } from '@/data/mascot'
import { headerPhotos, sidePhoto, withReferral } from '@/data/photos'
</script>

<template>
  <PageIntro
    kicker="What I bring"
    title="What your team gets"
    lead="What I can do for your team, where I learned it and the tools I have used."
    :mascot="mascot.whatIBring"
    :photo="headerPhotos.whatIBring"
  />

  <section class="section">
    <div class="container">
      <h2 class="sr-only">In short</h2>
      <ul class="outcomes">
        <li v-for="(item, i) in outcomes" :key="item.title" v-reveal="i" :class="['hue-green', 'hue-blue', 'hue-violet'][i]">
          <h3 class="outcome-title">{{ item.title }}</h3>
          <p class="outcome-text">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading kicker="Strengths" title="What I am good at" />
      <div class="strengths-wrap">
        <ol class="strengths">
          <li v-for="(item, i) in strengths" :key="item.title" v-reveal>
            <span class="num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
              <p class="evidence">{{ item.evidence }}</p>
            </div>
          </li>
        </ol>
        <figure v-reveal class="side-photo hue-green">
          <div class="side-frame">
            <img
              :src="sidePhoto.src"
              :srcset="`${sidePhoto.srcSmall} 640w, ${sidePhoto.src} 1280w`"
              sizes="(min-width: 960px) 420px, 100vw"
              :width="sidePhoto.width"
              :height="sidePhoto.height"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            Photo: <a :href="withReferral(sidePhoto.url)">{{ sidePhoto.author }}</a> /
            <a :href="withReferral('https://unsplash.com/')">Unsplash</a>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHeading kicker="Skills" title="What I have used in real projects" />
      <p class="muted intro">
        You can find all of these in my projects under
        <RouterLink to="/now-building">Now building</RouterLink> and
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
/* One column on phones, three in a row on wider screens. */
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
  border-top: 4px solid var(--hue);
  background: var(--hue-tint);
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

@media (min-width: 800px) {
  .outcomes {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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

/* The strengths next to a photo with a coloured block behind it; the photo goes under them on phones. */
.strengths-wrap {
  display: grid;
  gap: 40px;
  margin-top: 24px;
}

.strengths-wrap .strengths {
  margin: 0;
}

.side-photo {
  margin: 0 14px 0 0;
}

.side-frame {
  position: relative;
}

.side-frame::before {
  content: '';
  position: absolute;
  inset: 14px -14px -14px 14px;
  border-radius: var(--radius);
  background: var(--hue);
}

.side-frame img {
  position: relative;
  width: 100%;
  border-radius: var(--radius);
}

.side-photo figcaption {
  margin-top: 22px;
  font-size: 0.75rem;
  color: var(--muted);
}

.side-photo figcaption a {
  color: inherit;
}

@media (min-width: 960px) {
  .strengths-wrap {
    grid-template-columns: minmax(0, 1fr) 380px;
    align-items: start;
  }

  .side-photo {
    position: sticky;
    top: 96px;
  }
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
