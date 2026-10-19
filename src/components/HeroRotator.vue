<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motionAllowed, useMotion } from '@/composables/useMotion'

// The home page's rotating line: types a line, holds it, deletes it, types the next, and so on.
//
// - Every line sits invisibly in the same spot, so the block is as big as the longest line from
//   the start and nothing below it moves when the line changes.
// - Screen readers get all lines once, as one sentence; the moving copy is hidden from them.
// - The pre-rendered HTML and reduced motion show the first line and nothing moves.
const props = defineProps<{ lines: string[] }>()

const TYPE_SPEED = 38 // milliseconds per character typed
const DELETE_SPEED = 14 // milliseconds per character deleted
const HOLD = 1700 // how long a finished line stays

const index = ref(0)
const line = computed(() => props.lines[index.value] ?? '')
const count = ref(line.value.length)
const shown = computed(() => line.value.slice(0, count.value))

let timer = 0

// One tick of the cycle: decides what happens next from where the line stands.
function tick(deleting: boolean) {
  if (deleting) {
    if (count.value > 0) {
      count.value--
      timer = window.setTimeout(() => tick(true), DELETE_SPEED)
    } else {
      index.value = (index.value + 1) % props.lines.length
      timer = window.setTimeout(() => tick(false), 200)
    }
  } else if (count.value < line.value.length) {
    count.value++
    timer = window.setTimeout(() => tick(false), TYPE_SPEED)
  } else {
    timer = window.setTimeout(() => tick(true), HOLD)
  }
}

function run() {
  clearTimeout(timer)
  if (motionAllowed() && props.lines.length > 1) timer = window.setTimeout(() => tick(true), HOLD)
}

onMounted(run)
onBeforeUnmount(() => clearTimeout(timer))

// Animations switched off: stop and show the whole current line. Switched on again: carry on.
const { motionOn } = useMotion()
watch(motionOn, (on) => {
  clearTimeout(timer)
  count.value = line.value.length
  if (on) run()
})
</script>

<template>
  <p class="rotator">
    <span class="sr-only">{{ lines.join(' ') }}</span>
    <span class="stack" aria-hidden="true">
      <span v-for="ghost in lines" :key="ghost" class="ghost">{{ ghost }}</span>
      <span class="live">{{ shown }}<span class="tw-cursor"></span></span>
    </span>
  </p>
</template>

<style scoped>
.rotator {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(1rem, 2.6vw, 1.25rem);
  color: var(--accent-text);
}

/* All lines in one grid cell: the cell is as large as the largest line. */
.stack {
  display: inline-grid;
}

.ghost,
.live {
  grid-area: 1 / 1;
}

.ghost {
  visibility: hidden;
}

.live::before {
  content: '> ';
  color: var(--muted);
}

.ghost::before {
  content: '> ';
}
</style>
