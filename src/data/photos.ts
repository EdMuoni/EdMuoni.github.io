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
  /** A short muted loop (Pexels License) that plays over the photo on wide screens. */
  video?: { file: string; author: string; url: string }
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
    video: {
      file: '/video/circuit-board.mp4',
      author: 'Tima Miroshnichenko',
      url: 'https://www.pexels.com/video/printed-circuit-board-close-up-6754820/',
    },
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
    video: {
      file: '/video/network-cables.mp4',
      author: 'MrColo',
      url: 'https://www.pexels.com/video/a-close-up-video-of-cable-wires-connected-on-a-motherboard-7140937/',
    },
  },
  /** Not a page header: the background of the How I work band on Home. */
  howIWork: {
    name: 'code-glow',
    width: 1280,
    height: 820,
    subject: 'Code on two screens with a warm glow',
    author: 'Fotis Fotopoulos',
    url: 'https://unsplash.com/photos/smartphone-and-computer-monitors-with-code-6sAl6aQ4OWI',
    video: {
      file: '/video/code-typing.mp4',
      author: 'kaboompics',
      url: 'https://www.pexels.com/video/woman-typing-codes-6346228/',
    },
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

/** The photo next to the strengths on What I bring (Unsplash License). */
export const sidePhoto = {
  src: '/img/photos/panel-test-1280.jpg',
  srcSmall: '/img/photos/panel-test-640.jpg',
  width: 1280,
  height: 960,
  author: 'Toolmash Expo',
  url: 'https://unsplash.com/photos/electrician-testing-electrical-panel-with-multimeter-PkHf7BUWbtk',
}

/** The strip of photos above the footer (Unsplash License, which needs no credit; listed here). */
export const stripPhotos = [
  { file: '/img/photos/strip-multimeter.jpg', hue: 'orange', author: 'Nekhil R', url: 'https://unsplash.com/photos/black-and-red-digital-device-g8Pr-LbVbjU' },
  { file: '/img/photos/strip-server-fans.jpg', hue: 'violet', author: 'Winston Chen', url: 'https://unsplash.com/photos/close-up-of-server-cooling-fans-in-a-vibrant-data-center-iZe21DzHnUg' },
  { file: '/img/photos/strip-green-board.jpg', hue: 'green', author: 'Akshat Sharma', url: 'https://unsplash.com/photos/close-up-of-a-green-circuit-board-with-components-mrTVz_fosMY' },
  { file: '/img/photos/strip-network-switch.jpg', hue: 'blue', author: 'Albert Stoynov', url: 'https://unsplash.com/photos/a-close-up-of-a-network-with-wires-connected-to-it-dyUp7WPu5q4' },
  { file: '/img/photos/strip-fiber.jpg', hue: 'yellow', author: 'Ronald Crow', url: 'https://unsplash.com/photos/a-bunch-of-yellow-and-green-wires-and-wires-8oR7XykOjk4' },
]

/** Unsplash asks that links back to it say where they come from. */
export const withReferral = (url: string) => `${url}?utm_source=edmuoni_portfolio&utm_medium=referral`
