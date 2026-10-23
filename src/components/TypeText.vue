<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { motionAllowed, useMotion } from '@/composables/useMotion'

// Text that types itself very fast. The whole text is always in the element (the untyped part is
// transparent), so the size never changes and screen readers get all of it. With reduced motion
// the text is simply shown.
const props = withDefaults(
  defineProps<{
    text: string
    /** Which HTML element to render, e.g. 'h1', 'p', 'span'. */
    as?: string
    /** Milliseconds per character. */
    speed?: number
    /** Milliseconds to wait before starting, to let a heading go before its paragraph. */
    delay?: number
    /** Start when the text scrolls into view instead of when the page opens. */
    whenVisible?: boolean
  }>(),
  { as: 'span', speed: 20, delay: 0, whenVisible: false },
)

const emit = defineEmits<{ done: [] }>()

const root = ref<HTMLElement | null>(null)
// Visible characters. Starts at all of them, like the pre-rendered HTML.
const count = ref(props.text.length)
const typing = ref(false)
const typed = computed(() => props.text.slice(0, count.value))
const rest = computed(() => props.text.slice(count.value))

let frame = 0
let timer = 0
let observer: IntersectionObserver | undefined

function stop() {
  cancelAnimationFrame(frame)
  clearTimeout(timer)
  observer?.disconnect()
}

function finish() {
  stop()
  count.value = props.text.length
  typing.value = false
  emit('done')
}

// The count comes from elapsed time, so the speed is the same on slow and fast devices.
function type() {
  typing.value = true
  const start = performance.now()
  const step = (now: number) => {
    count.value = Math.min(props.text.length, Math.floor((now - start) / props.speed) + 1)
    if (count.value < props.text.length) frame = requestAnimationFrame(step)
    else finish()
  }
  frame = requestAnimationFrame(step)
}

/** Hide the text (keeping its place) and type it again, e.g. when the mascot says a new line. */
function start() {
  stop()
  if (!motionAllowed()) return finish()
  count.value = 0
  const begin = () => {
    timer = window.setTimeout(type, props.delay)
  }
  if (props.whenVisible && root.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect()
          begin()
        }
      },
      // Start a little after the text enters the screen, so the reader sees it being typed.
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(root.value)
  } else {
    begin()
  }
}

onMounted(start)
onBeforeUnmount(stop)

// New text (e.g. the mascot's next line): type it.
watch(() => props.text, start)

// Animations switched off in the middle of typing: show everything at once.
const { motionOn } = useMotion()
watch(motionOn, (on) => {
  if (!on) finish()
})

defineExpose({ start })
</script>

<template>
  <component :is="as" ref="root" class="tw" :class="{ 'tw-typing': typing }">
    <span class="tw-typed">{{ typed }}</span>
    <span v-if="typing" class="tw-cursor" aria-hidden="true"></span>
    <span class="tw-rest">{{ rest }}</span>
  </component>
</template>

<style>
/* Not scoped: the classes are shared by every TypeText and by the rule in motion.css. */

/* The part not typed yet: invisible, but it holds its place. */
.tw-rest {
  color: transparent;
}

/* Blinking cursor with no width, so it never changes where lines break. */
.tw-cursor {
  position: relative;
}

.tw-cursor::after {
  content: '';
  position: absolute;
  left: 0.04em;
  top: 0.1em;
  height: 1em;
  width: 0.09em;
  background: var(--accent);
  animation: tw-blink 0.9s steps(1) infinite;
}

@keyframes tw-blink {
  50% {
    opacity: 0;
  }
}
</style>
