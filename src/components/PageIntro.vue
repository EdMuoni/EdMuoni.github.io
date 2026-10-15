<script setup lang="ts">
// The top block of every page: a small label, the page heading and one introductory paragraph.
defineProps<{
  kicker: string
  title: string
  lead?: string
}>()
</script>

<template>
  <section class="page-intro">
    <div class="container">
      <span class="kicker">{{ kicker }}</span>
      <h1>{{ title }}</h1>
      <p v-if="lead" class="lead">{{ lead }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.page-intro {
  padding: 48px 0 40px;
  background: linear-gradient(to bottom, var(--tint), var(--bg));
  border-bottom: 1px solid var(--border);
}

.page-intro h1 {
  max-width: 20ch;
}

@media (min-width: 720px) {
  .page-intro {
    padding: 72px 0 56px;
  }
}
</style>
