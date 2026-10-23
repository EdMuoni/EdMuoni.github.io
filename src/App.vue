<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <!-- key = path, so going from one project page to the next replays the animations -->
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
