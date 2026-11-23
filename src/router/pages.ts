// The main pages with their URL, tab title and description (used by search engines and link
// previews). The router and the pre-render step both read this list.

export interface PageInfo {
  path: string
  title: string
  description: string
}

export const pages = {
  home: {
    path: '/',
    title: 'Edgar Muoni · Full-Stack Developer + AI Engineer | QA | Software Tester',
    description:
      'Edgar Muoni, full-stack developer, AI engineer and software tester in Tallinn, and a former electrician. Vue 3, TypeScript, C# / .NET and Rust.',
  },
  whatIBring: {
    path: '/what-i-bring',
    title: 'What I bring · Edgar Muoni',
    description: 'My strengths, skills, work history and education.',
  },
  nowBuilding: {
    path: '/now-building',
    title: 'Now building · Edgar Muoni',
    description: 'VoltVibe, a web shop growing from my thesis, and Bill Watcher, which reads bills.',
  },
  work: {
    path: '/work',
    title: 'Finished work · Edgar Muoni',
    description: 'My diploma thesis, an AI assistant for nurses and my internship with the Defence Forces.',
  },
  school: {
    path: '/school',
    title: 'School projects · Edgar Muoni',
    description:
      'Projects from my software development courses: web apps, APIs, browser tests, mobile apps and games.',
  },
} satisfies Record<string, PageInfo>
