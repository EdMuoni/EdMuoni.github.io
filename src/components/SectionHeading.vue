<script setup lang="ts">
import TypeText from './TypeText.vue'

// A section's small label and heading. Both type themselves when the section scrolls into view.
defineProps<{ kicker?: string; title: string }>()
</script>

<template>
  <TypeText v-if="kicker" as="span" class="kicker" :text="kicker" :speed="22" when-visible />
  <TypeText as="h2" :text="title" :speed="20" :delay="kicker ? 160 : 0" when-visible />
</template>
