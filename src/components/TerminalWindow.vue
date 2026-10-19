<script setup lang="ts">
import TypeText from './TypeText.vue'

// A small terminal window that plays out the way I work when it scrolls into view: a failing test
// reproduces the bug, the cause gets a fix on its own branch, the tests pass, a pull request opens.
// Commands type themselves; the computer's answers appear a moment later.
//
// Every line is a TypeText, so the same rules hold as for all typed text: the pre-rendered HTML
// shows the whole session, screen readers read it at once, the window has its final size from the
// start, and with reduced motion everything is simply there.

interface Line {
  kind: 'command' | 'fail' | 'pass' | 'note'
  text: string
}

const lines: Line[] = [
  { kind: 'command', text: 'npm test' },
  { kind: 'fail', text: '✗ saves the order once, even on a double click' },
  { kind: 'note', text: '# cause: nothing stops the second request' },
  { kind: 'command', text: 'git switch -c fix/double-submit' },
  { kind: 'command', text: 'git commit -m "Ignore a second request while the first runs"' },
  { kind: 'command', text: 'npm test' },
  { kind: 'pass', text: '✓ all tests pass' },
  { kind: 'command', text: 'gh pr create --fill' },
]

const COMMAND_SPEED = 26 // milliseconds per character a command takes to type
const PAUSE = 350 // milliseconds before the next line

// When each line starts: a command (with its "$ " prompt) takes as long as its characters, an
// answer is instant.
const timed = lines.reduce<{ line: Line; text: string; delay: number; speed: number }[]>((list, line) => {
  const previous = list[list.length - 1]
  const delay = previous ? previous.delay + previous.text.length * previous.speed + PAUSE : 200
  const text = line.kind === 'command' ? `$ ${line.text}` : line.text
  list.push({ line, text, delay, speed: line.kind === 'command' ? COMMAND_SPEED : 1 })
  return list
}, [])
</script>

<template>
  <figure class="terminal">
    <div class="bar" aria-hidden="true">
      <span class="light"></span><span class="light"></span><span class="light"></span>
      <span class="title">~/project</span>
    </div>
    <figcaption class="sr-only">A terminal session: reproduce the bug with a test, fix it, prove it.</figcaption>
    <div class="screen">
      <div v-for="(item, i) in timed" :key="i" class="line" :class="item.line.kind">
        <TypeText :text="item.text" :speed="item.speed" :delay="item.delay" when-visible />
      </div>
    </div>
  </figure>
</template>

<style scoped>
/* Dark in both themes, like a real terminal. */
.terminal {
  margin: 0;
  border-radius: var(--radius);
  overflow: hidden;
  background: #0d0d10;
  border: 1px solid #2e2e33;
  box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.6);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  line-height: 1.7;
  color: #e4e4e7;
}

.bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 12px;
  background: #18181b;
  border-bottom: 1px solid #2e2e33;
}

.light {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #3f3f46;
}

.light:first-child {
  background: #ff5100;
}

.title {
  margin-left: 8px;
  color: #a1a1aa;
  font-size: 0.75rem;
}

.screen {
  padding: 14px 16px 16px;
  overflow-x: auto;
}

.line {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.command {
  color: #fed7aa;
}

.fail {
  color: #fca5a5;
}

.pass {
  color: #86efac;
}

.note {
  color: #a1a1aa;
}
</style>
