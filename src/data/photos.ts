// Header photos from Unsplash (Unsplash License). They are credited in the header, the footer and
// CREDITS.md. Each one is stored in three widths in public/img/headers/.

export interface HeaderPhoto {
  /** The file name without its width, e.g. 'circuit-board' for circuit-board-1280.jpg. */
  name: string
  /** Size of the 1280px file, so the layout doesn't jump while it loads. */
  width: number
  height: number
  /** What the photo shows, for the credits. */
  subject: string
  author: string
  /** The photo's own page on Unsplash. */
  url: string
}

export const photoWidths = [640, 1280, 1920] as const

export const headerPhotos = {
  home: {
    name: 'circuit-board',
    width: 1280,
    height: 853,
    subject: 'Close-up of a black circuit board',
    author: 'Alexandre Debiève',
    url: 'https://unsplash.com/photos/macro-photography-of-black-circuit-board-FO7JIlwjOtU',
  },
  whatIBring: {
    name: 'code-screen',
    width: 1280,
    height: 854,
    subject: 'Code on a screen',
    author: 'Chris Ried',
    url: 'https://unsplash.com/photos/a-computer-screen-with-a-bunch-of-code-on-it-ieic5Tq8YMk',
  },
  nowBuilding: {
    name: 'circuit-breakers',
    width: 1280,
    height: 761,
    subject: 'Wiring and terminal blocks in an electrical panel (cropped)',
    author: 'Mark Kats',
    url: 'https://unsplash.com/photos/white-circuit-breakers-oj1zW_PNI4k',
  },
  work: {
    name: 'network-cables',
    width: 1280,
    height: 853,
    subject: 'Blue network cables in a server rack',
    author: 'Scott Rodgerson',
    url: 'https://unsplash.com/photos/a-bunch-of-blue-wires-connected-to-each-other-PSpf_XgOM5w',
  },
  school: {
    name: 'keyboard',
    width: 1280,
    height: 853,
    subject: 'A keyboard in front of two screens of code',
    author: 'Fotis Fotopoulos',
    url: 'https://unsplash.com/photos/black-computer-keyboard-DuHKoV44prg',
  },
} satisfies Record<string, HeaderPhoto>

/** Unsplash asks that links back to it say where they come from. */
export const withReferral = (url: string) => `${url}?utm_source=edmuoni_portfolio&utm_medium=referral`
