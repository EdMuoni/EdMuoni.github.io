// What Ohm, the site's mascot, says on each page (OhmMascot.vue). The first line greets the visitor;
// pressing Ohm brings the next one. `readout` is the few characters on Ohm's chest display.

import type { Project } from './projects'

export interface MascotScript {
  lines: string[]
  readout: string
}

export const mascot = {
  home: {
    readout: '230 V',
    lines: [
      'Hi, I’m Ohm. Edgar used to wire buildings. Now he wires software, and tests every connection.',
      'The menu up top has everything. “What I bring” is a good place to start.',
      'I run on 230 volts and good tests.',
    ],
  },
  whatIBring: {
    readout: 'OK',
    lines: [
      'Short version: he finds the cause, fixes it, and proves the fix with a test.',
      'Every claim on this page has a project behind it. Ask him about any of them.',
    ],
  },
  nowBuilding: {
    readout: 'LIVE',
    lines: [
      'Live wire. This is what’s on his bench right now.',
      'VoltVibe turns a building’s data into a priced parts list. My kind of project.',
    ],
  },
  work: {
    readout: 'DONE',
    lines: [
      'Finished, tested, shipped. Pick one and I’ll show you around.',
      'Each card opens its own page: the problem, what he built and the proof.',
    ],
  },
  school: {
    readout: '101',
    lines: [
      'This is where the rewiring happened: course projects, grouped by subject.',
      'Some of these run right in your browser. Look for “Open it”.',
    ],
  },
  notFound: {
    readout: '404',
    lines: [
      'No current on this line. The page doesn’t exist.',
      'Try the menu up top, or head back to the start page.',
    ],
  },
} satisfies Record<string, MascotScript>

/** Ohm's lines for a project's own page, made from the project's data. */
export function mascotForProject(project: Project): MascotScript {
  const [first, second] = project.stack
  const builtWith = second ? `Built with ${first} and ${second}.` : `Built with ${first}.`
  const tryIt = project.live
    ? `${builtWith} Press “Open it” to try it right in your browser.`
    : project.code
      ? `${builtWith} The code is one click away.`
      : builtWith
  const lines = [project.mascotLine ?? tryIt, 'Use “Previous” and “Next” at the bottom to walk through the rest.']
  if (project.mascotLine) lines.splice(1, 0, tryIt)
  return { readout: '</>', lines }
}
