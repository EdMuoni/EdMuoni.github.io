# Edgar Muoni · portfolio

My portfolio site: **https://edmuoni.github.io/**

It has five main pages (about me, what I bring, what I'm building now, finished work and school
projects), and every project has its own page too.

## Stack

Vue 3 and TypeScript, Vue Router and Vite. GitHub Actions builds the site and publishes it to
GitHub Pages when something is pushed to `main`. The fonts are installed from npm, so the site
doesn't load anything from Google Fonts.

## Running it

You need Node.js 22.18+ or 24.12+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type check, build and pre-render into dist/
npm run preview    # serve the finished build
```

On Windows PowerShell use `npm.cmd` if `npm` is blocked by the execution policy.

## Where things are

- `src/data/` has all the text: `profile.ts`, `career.ts`, `projects.ts`, `mascot.ts` and `photos.ts`.
- `src/views/` has the pages and `src/components/` the parts they are built from.
- `src/router/` decides which address shows which page. `pages.ts` lists the main pages.
- `src/styles/` has the colours, fonts and animations.
- `scripts/prerender.ts` writes every page out as HTML during the build.

To add a project, add it to `src/data/projects.ts`. Its card and its own page are created from that.

## Pre-rendering

`npm run build` builds the app, then builds a second copy that runs in Node.js and uses it to write
each page to `dist/` as a finished HTML file (`dist/work/index.html` and so on). Because of that the
text is in the page even without JavaScript, GitHub Pages answers every address with "200 OK", and
shared links show the right title. In the browser Vue then takes over the HTML that is already there.

Code that runs while a component is set up can't use `window`, `document` or `localStorage`, because
during the build there is no browser. Put that kind of code in `onMounted`.

## Animations

Text types itself, Ohm the robot says hello, circuit lines draw themselves and cards slide in when
you scroll. If someone has reduced motion turned on in their system, or presses the motion button in
the header, everything is shown right away without movement. With JavaScript off the full text is
still there.

## Credits

Photos and fonts are listed in [CREDITS.md](CREDITS.md).
