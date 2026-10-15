# Edgar Muoni · portfolio

My portfolio website: **https://edmuoni.github.io/**

Four pages: who I am, what I bring to a team, what I am building now, and work I have finished.

## Stack

- **Vue 3** with `<script setup>` and **TypeScript**
- **Vue Router** for the four pages
- **Vite** for the dev server and the production build
- **GitHub Actions** builds the site and publishes it to **GitHub Pages** on every push to `main`

Fonts (Source Serif 4, Inter, JetBrains Mono) are bundled from npm, so the site makes no requests to
Google Fonts or any other third party.

## Run it locally

Needs Node.js 22.18+ or 24.12+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type check + production build into dist/
npm run preview    # serve the built site from dist/
```

## Where things are

| Path | What it holds |
|---|---|
| `src/data/projects.ts` | Every project on the "Now building" and "Finished work" pages |
| `src/data/career.ts` | Strengths, numbers, skills, experience and education |
| `src/data/profile.ts` | Name, role and contact links |
| `src/views/` | The four pages (plus a 404 page) |
| `src/components/` | Pieces the pages share: header, footer, case study, project card, timeline |
| `src/styles/tokens.css` | All colours and fonts, light and dark |
| `.github/workflows/deploy.yml` | Build and publish to GitHub Pages |

To add a project, add an entry to `src/data/projects.ts`; the pages pick it up automatically.

## Why `404.html` is a copy of `index.html`

GitHub Pages only serves files. Opening `edmuoni.github.io/work` directly asks for a file called
`work`, which does not exist, so GitHub answers with `404.html`. The build copies the app into
`404.html` (see `vite.config.ts`), so that answer is the site itself and Vue Router shows the right page.
