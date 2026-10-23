// What Ohm says on each page. A click on Ohm shows the next line.
// `readout` is the short text on Ohm's chest.

import type { Project } from './projects'

export interface MascotScript {
  lines: string[]
  readout: string
}

export const mascot = {
  home: {
    readout: '230 V',
    lines: [
      'Hi, I’m Ohm. Edgar used to wire buildings. Now he wires software.',
      'The menu at the top has everything. “What I bring” is a good place to start.',
      'Click me again any time for another tip.',
    ],
  },
  whatIBring: {
    readout: 'OK',
    lines: [
      'His skills are a bit further down, and his work history is at the bottom.',
      'Each point here comes from a real project. Ask him about any of them.',
    ],
  },
  nowBuilding: {
    readout: 'LIVE',
    lines: [
      'This is what he is working on at the moment.',
      'VoltVibe turns a building’s data into a priced parts list. My kind of project.',
    ],
  },
  work: {
    readout: 'DONE',
    lines: [
      'These are his bigger projects. Pick one and I’ll show you around.',
      'Every card opens a page with the full story.',
    ],
  },
  school: {
    readout: '101',
    lines: [
      'Everything he made during his studies, sorted by course.',
      'Some of these run in your browser. Look for “Open it”.',
    ],
  },
  notFound: {
    readout: '404',
    lines: [
      'No current on this line. This page doesn’t exist.',
      'Try the menu at the top, or go back to the start page.',
    ],
  },
} satisfies Record<string, MascotScript>

/** Ohm's lines on a project page, made from the project's data. */
export function mascotForProject(project: Project): MascotScript {
  const [first, second] = project.stack
  const builtWith = second ? `Built with ${first} and ${second}.` : `Built with ${first}.`
  const tryIt = project.live
    ? `${builtWith} Press “Open it” to try it in your browser.`
    : project.code
      ? `${builtWith} The code is one click away.`
      : builtWith
  const lines = [project.mascotLine ?? tryIt, 'Use “Previous” and “Next” at the bottom to see the others.']
  if (project.mascotLine) lines.splice(1, 0, tryIt)
  return { readout: '</>', lines }
}
