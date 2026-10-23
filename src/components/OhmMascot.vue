<script setup lang="ts">
import { computed, ref } from 'vue'
import TypeText from './TypeText.vue'

// Ohm, the mascot: an SVG robot animated with CSS. A click shows his next line.
// The bubble is sized for the longest line, so nothing moves when the text changes.
const props = defineProps<{
  /** What Ohm says, first line first. */
  lines: string[]
  /** The few characters on Ohm's chest display, e.g. '230 V'. */
  readout: string
}>()

const index = ref(0)
const line = computed(() => props.lines[index.value] ?? '')
const bubbleHidden = ref(false)

// A CSS animation only restarts under a new name, so clicks switch between press-a and press-b.
const presses = ref(0)
const pressClass = computed(() => (presses.value === 0 ? '' : presses.value % 2 ? 'press-a' : 'press-b'))

function next() {
  if (bubbleHidden.value) bubbleHidden.value = false
  else index.value = (index.value + 1) % props.lines.length
  presses.value++
}
</script>

<template>
  <aside class="mascot" aria-label="Ohm, the site’s mascot">
    <div class="bubble" :class="{ 'bubble-hidden': bubbleHidden }">
      <!-- Every line sits invisibly in the same spot, so the bubble fits the longest one. -->
      <span v-for="ghost in lines" :key="ghost" class="ghost" aria-hidden="true">{{ ghost }}</span>
      <TypeText as="p" class="said" :text="line" :speed="16" :delay="1100" />
      <button
        type="button"
        class="bubble-hide needs-js"
        aria-label="Hide Ohm’s message"
        title="Hide"
        @click="bubbleHidden = true"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>

    <button
      type="button"
      class="ohm-button"
      :class="pressClass"
      :aria-label="bubbleHidden ? 'Show Ohm’s message' : 'Ohm: say something else'"
      @click="next"
    >
      <svg class="ohm" viewBox="0 0 140 172" aria-hidden="true">
        <!-- Shadow on the floor; shrinks as Ohm floats up. -->
        <ellipse class="ohm-shadow" cx="70" cy="164" rx="30" ry="5" />

        <g class="ohm-float">
          <!-- Cable tail ending in a plug, with "current" running along it. -->
          <path class="ohm-cable" d="M32 118 C 8 124, 4 146, 22 156" />
          <path class="ohm-current" d="M32 118 C 8 124, 4 146, 22 156" />
          <g class="ohm-plug" transform="translate(24 157) rotate(40)">
            <rect x="-8" y="-6" width="16" height="11" rx="3.5" />
            <line x1="-3.5" y1="5" x2="-3.5" y2="11" />
            <line x1="3.5" y1="5" x2="3.5" y2="11" />
          </g>

          <!-- Antenna with a glowing bulb and a spark. -->
          <line class="ohm-stroke" x1="70" y1="42" x2="70" y2="24" />
          <circle class="ohm-glow" cx="70" cy="18" r="11" />
          <circle class="ohm-bulb" cx="70" cy="18" r="6" />
          <path class="ohm-spark" d="M84 8 l-5 6 h5 l-5 6 M56 8 l5 6 h-5 l5 6" />

          <!-- Arms (behind the body). The right one waves. -->
          <rect class="ohm-part ohm-arm-left" x="17" y="92" width="14" height="32" rx="7" />
          <rect class="ohm-part ohm-arm-right" x="109" y="92" width="14" height="32" rx="7" />

          <!-- Body, with screws at the sides. -->
          <rect class="ohm-part" x="28" y="40" width="84" height="98" rx="30" />
          <circle class="ohm-screw" cx="35" cy="74" r="2.4" />
          <circle class="ohm-screw" cx="105" cy="74" r="2.4" />

          <!-- Face screen: LED eyes that blink, and a smile. -->
          <rect class="ohm-screen" x="40" y="54" width="60" height="38" rx="12" />
          <g class="ohm-eyes">
            <rect x="54" y="63" width="9" height="15" rx="4.5" />
            <rect x="77" y="63" width="9" height="15" rx="4.5" />
          </g>
          <path class="ohm-smile" d="M62 83 q8 5 16 0" />

          <!-- Chest display, like a multimeter's. -->
          <rect class="ohm-screen" x="44" y="101" width="52" height="22" rx="5" />
          <text class="ohm-readout" x="70" y="116.5" text-anchor="middle">{{ readout }}</text>
        </g>
      </svg>
    </button>
  </aside>
</template>

<style scoped>
/* Phones: Ohm on the left and the bubble on the right. Wide screens: bubble above Ohm. */
.mascot {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: center;
  gap: 4px 14px;
}

.bubble {
  order: 2;
  position: relative;
  display: grid;
  padding: 12px 34px 12px 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface-raised);
  box-shadow: var(--shadow);
  font-size: 0.95rem;
  line-height: 1.45;
}

.bubble-hidden {
  visibility: hidden;
}

/* The bubble's tail, pointing at Ohm. */
.bubble::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 50%;
  width: 12px;
  height: 12px;
  margin-top: -6px;
  background: inherit;
  border-left: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transform: rotate(45deg);
}

.ghost,
.said {
  grid-area: 1 / 1;
  margin: 0;
}

.ghost {
  visibility: hidden;
}

.bubble-hide {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--muted);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.bubble-hide:hover {
  color: var(--ink);
  background: var(--tint);
}

.ohm-button {
  order: 1;
  display: block;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  border-radius: 12px;
}

.ohm {
  display: block;
  width: 92px;
  height: auto;
  overflow: visible;
}

@media (min-width: 900px) {
  .mascot {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }

  .bubble {
    order: 1;
    width: 100%;
  }

  .bubble::before {
    left: 50%;
    top: auto;
    bottom: -7px;
    margin: 0 0 0 -6px;
    border-left: 0;
    border-right: 1px solid var(--border);
    transform: rotate(45deg);
  }

  .ohm-button {
    order: 2;
  }

  .ohm {
    width: 128px;
  }
}

/* ---------------------------------------------------------------- Drawing */

.ohm-part {
  fill: var(--ohm-body);
  stroke: var(--ohm-line);
  stroke-width: 3;
}

.ohm-stroke,
.ohm-cable,
.ohm-plug line {
  fill: none;
  stroke: var(--ohm-line);
  stroke-width: 3;
  stroke-linecap: round;
}

.ohm-plug rect {
  fill: var(--ohm-body);
  stroke: var(--ohm-line);
  stroke-width: 3;
}

.ohm-current {
  fill: none;
  stroke: var(--ohm-glow);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 2 12;
}

.ohm-screw {
  fill: var(--ohm-line);
}

.ohm-screen {
  fill: var(--ohm-screen);
}

.ohm-eyes rect {
  fill: var(--ohm-glow);
}

.ohm-smile {
  fill: none;
  stroke: var(--ohm-glow);
  stroke-width: 2.5;
  stroke-linecap: round;
}

.ohm-bulb {
  fill: var(--ohm-glow);
  stroke: var(--ohm-line);
  stroke-width: 3;
}

.ohm-glow {
  fill: var(--ohm-glow);
  opacity: 0.22;
}

.ohm-spark {
  fill: none;
  stroke: var(--ohm-glow);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ohm-readout {
  fill: var(--ohm-glow);
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 500;
}

/* ---------------------------------------------------------------- Motion
   Each element's normal style above is its resting look; these only play the way there and back,
   so with animations off (motion.css) Ohm simply stands still. */

/* SVG parts turn around their own centre unless told otherwise. */
.ohm * {
  transform-box: fill-box;
  transform-origin: center;
}

/* Except the plug, which is placed with its own transform attribute. */
.ohm .ohm-plug {
  transform-box: view-box;
  transform-origin: 0 0;
}

.ohm-float {
  animation: ohm-float 3.2s ease-in-out infinite;
}

.ohm-shadow {
  fill: var(--ohm-line);
  opacity: 0.12;
  animation: ohm-shadow 3.2s ease-in-out infinite;
}

.ohm-eyes rect {
  animation: ohm-blink 5s infinite;
}

.ohm-glow {
  animation: ohm-glow 1.6s ease-in-out infinite;
}

.ohm-spark {
  animation: ohm-spark 2.4s steps(1) infinite;
}

.ohm-current {
  animation: ohm-current 0.9s linear infinite;
}

/* A wave as the page opens, and again when Ohm is pressed. The arm turns at the shoulder. */
.ohm-arm-right {
  transform-origin: 50% 8%;
  animation: ohm-wave 1.6s ease-in-out 0.5s 1;
}

.press-a .ohm-arm-right {
  animation: ohm-wave-a 1.6s ease-in-out 1;
}

.press-b .ohm-arm-right {
  animation: ohm-wave-b 1.6s ease-in-out 1;
}

.press-a .ohm {
  animation: ohm-jump-a 0.5s ease-out 1;
}

.press-b .ohm {
  animation: ohm-jump-b 0.5s ease-out 1;
}

.ohm-button:hover .ohm-glow,
.ohm-button:focus-visible .ohm-glow {
  opacity: 0.45;
}

@keyframes ohm-float {
  50% {
    transform: translateY(-6px);
  }
}

@keyframes ohm-shadow {
  50% {
    transform: scaleX(0.82);
    opacity: 0.07;
  }
}

@keyframes ohm-blink {
  0%,
  92%,
  100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.12);
  }
}

@keyframes ohm-glow {
  50% {
    transform: scale(1.35);
    opacity: 0.08;
  }
}

@keyframes ohm-spark {
  0%,
  40% {
    opacity: 0;
  }
  45%,
  55% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0;
  }
}

@keyframes ohm-current {
  to {
    stroke-dashoffset: -14;
  }
}

@keyframes ohm-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  50%,
  80% {
    transform: rotate(-150deg);
  }
  35%,
  65% {
    transform: rotate(-120deg);
  }
}

/* Copies of the wave and jump under other names, so each press starts them over. */
@keyframes ohm-wave-a {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  50%,
  80% {
    transform: rotate(-150deg);
  }
  35%,
  65% {
    transform: rotate(-120deg);
  }
}

@keyframes ohm-wave-b {
  0%,
  100% {
    transform: rotate(0deg);
  }
  20%,
  50%,
  80% {
    transform: rotate(-150deg);
  }
  35%,
  65% {
    transform: rotate(-120deg);
  }
}

@keyframes ohm-jump-a {
  40% {
    transform: translateY(-10px);
  }
}

@keyframes ohm-jump-b {
  40% {
    transform: translateY(-10px);
  }
}
</style>
