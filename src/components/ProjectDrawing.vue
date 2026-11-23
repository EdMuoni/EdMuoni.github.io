<script setup lang="ts">
// A line drawing for a project that has no screenshot. No real numbers and no internal details:
// a bill whose sums are checked, and two identical requests where only the first gets through.
defineProps<{ slug: string }>()
</script>

<template>
  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <template v-if="slug === 'bill-watcher'">
      <rect x="105" y="22" width="110" height="156" rx="8" />
      <path d="M122 52h50M184 52h14M122 76h50M184 76h14M122 100h50M184 100h14" />
      <path d="M122 124h76" stroke-dasharray="4 7" />
      <path d="M122 148h40M178 148h20" />
      <circle class="ok" cx="240" cy="148" r="16" />
      <path class="ok" d="M232 148l6 6 10-12" />
    </template>
    <template v-else>
      <path d="M180 58v84" />
      <path d="M200 100h56M246 90l10 10-10 10" />
      <circle class="ok" cx="282" cy="72" r="14" />
      <path class="ok" d="M275 72l5 5 9-10" />
      <path d="M60 100h104M154 90l10 10-10 10" />
      <path class="no" d="M138 60l14 14M152 60l-14 14" />
    </template>
  </svg>
</template>

<style scoped>
svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: #e4e4e7;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ok {
  stroke: var(--hue-bright, #fb923c);
}

.no {
  stroke: #a1a1aa;
}
</style>
