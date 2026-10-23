<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePauseOffscreen } from '@/composables/useMotion'

// Circuit traces behind a page header. They draw themselves and small pulses run along some of
// them. The pattern comes from `seed`, so it is the same on every visit and in the build.
const props = defineProps<{ seed: string }>()

const WIDTH = 1200
const HEIGHT = 400
const GRID = 20 // every line sits on a 20-unit grid, like tracks on a real circuit board

// Turns a text into a number, so a page title can be a seed.
function hash(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

// mulberry32: a tiny, well-known generator of repeatable random numbers between 0 and 1.
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Trace {
  d: string
  end: { x: number; y: number }
  delay: number
  /** Seconds one pulse takes to run the line, or 0 for no pulse. */
  pulse: number
  pulseDelay: number
}

const traces = computed<Trace[]>(() => {
  const rnd = random(hash(props.seed))
  const pick = (min: number, max: number) => min + Math.floor(rnd() * (max - min + 1))
  const list: Trace[] = []

  for (let i = 0; i < 14; i++) {
    // Traces start at the right edge. A mask fades them out before they reach the text.
    const dir = -1
    let x = WIDTH
    let y = pick(1, HEIGHT / GRID - 1) * GRID
    let d = `M${x} ${y}`
    const turns = pick(1, 3)

    for (let t = 0; t <= turns; t++) {
      x += dir * pick(3, 9) * GRID
      d += ` H${x}`
      if (t < turns) {
        // A 45° bend up or down, then straight on.
        let dy = pick(1, 3) * GRID * (rnd() < 0.5 ? -1 : 1)
        if (y + dy < GRID || y + dy > HEIGHT - GRID) dy = -dy
        x += dir * Math.abs(dy)
        y += dy
        d += ` L${x} ${y}`
      }
    }

    list.push({
      d,
      end: { x, y },
      delay: 0.15 + i * 0.09,
      pulse: rnd() < 0.55 ? 1.8 + rnd() * 1.6 : 0,
      pulseDelay: 1.6 + rnd() * 4,
    })
  }
  return list
})

const svg = ref<HTMLElement | null>(null)
usePauseOffscreen(svg)
</script>

<template>
  <svg
    ref="svg"
    class="circuit"
    :viewBox="`0 0 ${WIDTH} ${HEIGHT}`"
    preserveAspectRatio="xMaxYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <g v-for="(trace, i) in traces" :key="i">
      <path class="trace" :d="trace.d" pathLength="1" :style="{ animationDelay: `${trace.delay}s` }" />
      <circle
        class="pad"
        :cx="trace.end.x"
        :cy="trace.end.y"
        r="5"
        :style="{ animationDelay: `${trace.delay + 1.1}s` }"
      />
      <path
        v-if="trace.pulse"
        class="pulse"
        :d="trace.d"
        pathLength="1"
        :style="{ animationDuration: `${trace.pulse}s`, animationDelay: `${trace.pulseDelay}s` }"
      />
    </g>
  </svg>
</template>

<style scoped>
.circuit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* Fade the traces out towards the left, so they never run behind the text. */
  -webkit-mask-image: linear-gradient(to right, transparent 30%, #000 75%);
  mask-image: linear-gradient(to right, transparent 30%, #000 75%);
}

/* Phones: the text is full width, so the traces stay faint everywhere. */
@media (max-width: 899px) {
  .circuit {
    opacity: 0.6;
  }
}

.trace {
  fill: none;
  stroke: var(--circuit);
  stroke-width: 2;
  stroke-linejoin: round;
  /* With pathLength="1" a dash of 1 is the whole line; sliding it in draws the line. */
  stroke-dasharray: 1;
  animation: trace-draw 1.4s ease-out both;
}

.pad {
  /* The page colour, so a pad looks like a hole in the board; a dark cover sets its own. */
  fill: var(--circuit-pad, var(--bg));
  stroke: var(--circuit);
  stroke-width: 2;
  animation: pad-in 0.4s ease-out both;
}

/* One short bright dash that runs from the start of the line to its end, then again. Invisible
   at rest, so with animations off there are no frozen dashes on the lines. */
.pulse {
  fill: none;
  stroke: var(--accent);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 0.05 2;
  opacity: 0;
  animation: pulse-run 2.4s linear infinite;
}

@keyframes trace-draw {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pad-in {
  from {
    transform: scale(0);
  }
}

@keyframes pulse-run {
  from {
    stroke-dashoffset: 0.05;
    opacity: 1;
  }
  to {
    stroke-dashoffset: -1;
    opacity: 1;
  }
}

.pad {
  transform-box: fill-box;
  transform-origin: center;
}
</style>
