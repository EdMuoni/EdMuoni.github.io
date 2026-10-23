<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MotionToggle from './MotionToggle.vue'
import ThemeToggle from './ThemeToggle.vue'
import { profile } from '@/data/profile'

// Menu order.
const pages = [
  { to: '/', label: 'About Me' },
  { to: '/what-i-bring', label: 'What I bring' },
  { to: '/now-building', label: 'Now building' },
  { to: '/work', label: 'Finished work' },
  { to: '/school', label: 'School' },
]
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="brand">
        {{ profile.name }}
        <span class="brand-role">{{ profile.role }}</span>
      </RouterLink>
      <div class="tools">
        <MotionToggle />
        <ThemeToggle />
      </div>
      <!-- RouterLink adds aria-current="page" to the link of the page you are on. -->
      <nav class="nav" aria-label="Pages">
        <RouterLink v-for="page in pages" :key="page.to" :to="page.to" class="nav-link">
          {{ page.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Sticky only on wide screens, where the header is one row. */
.site-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

@media (min-width: 1024px) {
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
  }
}

/* Phone: name and the two buttons on the first row, the links on a second row. */
.bar {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 6px 16px;
  padding-top: 10px;
  padding-bottom: 6px;
}

.brand {
  display: flex;
  flex-direction: column;
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.15;
  color: var(--ink);
  text-decoration: none;
}

.brand-role {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent-text);
}

/* Phones: links in two rows (3 + 2) on a six-column grid. */
.nav {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0 4px;
}

.nav-link {
  grid-column: span 2;
}

.nav-link:nth-child(n + 4) {
  grid-column: span 3;
}

.tools {
  display: flex;
  gap: 8px;
}

/* Tablets: the links in one row under the name. */
@media (min-width: 720px) {
  .nav {
    display: flex;
    gap: 4px;
  }
}

.nav-link {
  flex: none;
  padding: 8px 10px;
  border-bottom: 3px solid transparent;
  color: var(--muted);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--ink);
}

.nav-link[aria-current='page'] {
  color: var(--ink);
  border-bottom-color: var(--accent);
}

/* Wide screens: everything on one row, links before the buttons. */
@media (min-width: 1024px) {
  .bar {
    grid-template-columns: auto 1fr auto;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .nav {
    grid-column: 2;
    grid-row: 1;
    justify-content: flex-end;
  }

  .tools {
    grid-column: 3;
    grid-row: 1;
  }
}
</style>
