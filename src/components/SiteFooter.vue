<script setup lang="ts">
import { contactLinks, profile } from '@/data/profile'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div>
        <p class="footer-name">{{ profile.name }}</p>
        <p class="muted">{{ profile.role }} · {{ profile.location }}</p>
      </div>
      <ul class="footer-links">
        <li v-for="link in contactLinks" :key="link.label">
          <a :href="link.href">{{ link.label }}</a>
        </li>
      </ul>
      <p class="muted small">
        Built with Vue 3, TypeScript and Vite, deployed by GitHub Actions.
        <a href="https://github.com/EdMuoni/EdMuoni.github.io">Source code</a>.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 40px;
  border-top: 1px solid var(--border);
  background: var(--surface);
  padding: 32px 0 40px;
}

.footer-inner {
  display: grid;
  gap: 16px;
}

.footer-inner p {
  margin: 0;
}

.footer-name {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.1rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 500;
}

.small {
  font-size: 0.88rem;
}

@media (min-width: 720px) {
  .footer-inner {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .footer-inner .small {
    grid-column: 1 / -1;
  }
}
</style>
