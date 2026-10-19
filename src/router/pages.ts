// The site's top-level pages: their URL, browser-tab title and the description that search engines
// and link previews (LinkedIn, Slack, e-mail) show.
//
// Two places read this file, so a page is only ever described here:
// - src/router/index.ts, which shows the right page in the browser;
// - vite.config.ts, which writes a real HTML file for every page at build time, so GitHub Pages
//   answers "200 OK" (not "404") and a shared link shows that page's own title.
// It must stay plain data with no imports, because vite.config.ts runs in Node.js, not the browser.

export interface PageInfo {
  path: string
  title: string
  description: string
}

export const pages = {
  home: {
    path: '/',
    title: 'Edgar Muoni · Full-stack developer',
    description:
      'Edgar Muoni, full-stack developer in Tallinn. From electrician to developer: I find the cause, fix it and prove the fix with a test.',
  },
  whatIBring: {
    path: '/what-i-bring',
    title: 'What I bring · Edgar Muoni',
    description: 'Skills, results and experience, and how I would be useful to your team.',
  },
  nowBuilding: {
    path: '/now-building',
    title: 'Now building · Edgar Muoni',
    description: 'VoltVibe, the electrical panel calculator I am growing from my thesis into a product.',
  },
  work: {
    path: '/work',
    title: 'Finished work · Edgar Muoni',
    description:
      'My diploma thesis, an AI nurse assistant, a Defence Forces internship and the projects you can open and play.',
  },
} satisfies Record<string, PageInfo>
