<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <!-- Lets keyboard users jump past the header straight to the page content. -->
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <!-- Changing pages fades the old page out and the new one in (classes in styles/motion.css).
         The key makes Vue build a fresh page even between two pages of the same kind, e.g. one
         project to the next, so each page's animations play from the start. -->
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <div :key="route.path" class="page">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: 16px;
  top: -60px;
  z-index: 20;
  padding: 10px 14px;
  background: var(--ink);
  color: var(--bg);
  border-radius: var(--radius);
}

.skip-link:focus {
  top: 12px;
}

main:focus {
  outline: none;
}
</style>
