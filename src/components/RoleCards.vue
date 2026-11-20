<script setup lang="ts">
import { RouterLink } from 'vue-router'

// The three roles from the title, each with an icon, one line and a project that shows it.
const roles = [
  {
    title: 'Full-Stack Developer',
    text: 'Vue 3 and TypeScript in the browser, C# / .NET and Rust on the server.',
    to: '/projects/voltvibe',
    link: 'See VoltVibe',
    icon: 'stack',
  },
  {
    title: 'AI Engineer',
    text: 'Apps where a language model reads real data and answers from it.',
    to: '/projects/bill-watcher',
    link: 'See Bill Watcher',
    icon: 'chip',
  },
  {
    title: 'QA | Software Tester',
    text: 'Browser tests, bugs reproduced before they are fixed, checks on every push.',
    to: '/projects/selenium-tests',
    link: 'See my browser tests',
    icon: 'check',
  },
]
</script>

<template>
  <ul class="roles">
    <li v-for="(role, i) in roles" :key="role.title" v-reveal="i" class="role lift">
      <svg class="icon" viewBox="0 0 48 48" aria-hidden="true">
        <template v-if="role.icon === 'stack'">
          <path pathLength="1" d="M24 6 42 15 24 24 6 15Z" />
          <path pathLength="1" d="M6 24l18 9 18-9" />
          <path pathLength="1" d="M6 33l18 9 18-9" />
        </template>
        <template v-else-if="role.icon === 'chip'">
          <rect pathLength="1" x="13" y="13" width="22" height="22" rx="4" />
          <path pathLength="1" d="M19 6v7M29 6v7M19 35v7M29 35v7M6 19h7M6 29h7M35 19h7M35 29h7" />
          <path pathLength="1" d="M26 18l-5 7h6l-5 7" />
        </template>
        <template v-else>
          <path pathLength="1" d="M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11Z" />
          <path pathLength="1" d="M16 24l6 6 11-12" />
        </template>
      </svg>
      <h3>{{ role.title }}</h3>
      <p>{{ role.text }}</p>
      <RouterLink :to="role.to" class="role-link">{{ role.link }} <span aria-hidden="true">→</span></RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.roles {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.role {
  position: relative;
  padding: 24px;
  border: 1px solid var(--border);
  border-top: 4px solid var(--accent);
  border-radius: var(--radius);
  background: var(--surface-raised);
  box-shadow: var(--shadow);
}

.role h3 {
  margin: 14px 0 6px;
}

.role p {
  margin: 0 0 14px;
  color: var(--muted);
}

.role-link {
  font-weight: 600;
  text-decoration: none;
}

.role-link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.icon {
  width: 56px;
  height: 56px;
  padding: 8px;
  border-radius: 14px;
  background: var(--tint);
  fill: none;
  stroke: var(--accent-text);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* The icon draws itself again when the card is pointed at. */
.role:hover .icon *,
.role:focus-within .icon * {
  stroke-dasharray: 1;
  animation: icon-draw 0.9s ease-out;
}

@keyframes icon-draw {
  from {
    stroke-dashoffset: 1;
  }
}

@media (min-width: 860px) {
  .roles {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
