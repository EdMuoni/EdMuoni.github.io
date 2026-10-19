<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { profile } from '@/data/profile'

// The four pages, in the order a recruiter should read them.
const pages = [
  { to: '/', label: 'About Me' },
  { to: '/what-i-bring', label: 'What I bring' },
  { to: '/now-building', label: 'Now building' },
  { to: '/work', label: 'Finished work' },
]
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="brand">
        {{ profile.name }}
        <span class="brand-role">{{ profile.role }}</span>
      </RouterLink>
      <ThemeToggle />
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
/* Scrolls away on phones, where two rows of header would eat a fifth of the screen;
   stays pinned on wider screens, where it is one slim row. */
.site-header {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
}

@media (min-width: 860px) {
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
  }
}

/* Phone: name and theme button on the first row, the four links on a second row. */
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

/* Narrow phones: the four links as a 2 × 2 grid, so none of them is hidden off-screen. */
.nav {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 4px;
}

@media (min-width: 520px) {
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

/* Wider screens: everything on one row, links before the theme button. */
@media (min-width: 860px) {
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

  /* The theme button's root element also carries this component's scoped style attribute. */
  .theme-toggle {
    grid-column: 3;
    grid-row: 1;
  }
}
</style>
