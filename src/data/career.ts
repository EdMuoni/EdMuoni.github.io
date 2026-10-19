// Content for the "What I bring" page: the results a team gets, how I work, skills,
// experience and education. Only claims that a project on this site can back up.

export interface Strength {
  title: string
  text: string
  /** The project that proves it, shown under the text. */
  evidence: string
}

/** A result a company gets from hiring me, shown as a tile at the top of the page. */
export interface Outcome {
  title: string
  text: string
}

export interface SkillGroup {
  name: string
  skills: string[]
}

export interface TimelineEntry {
  period: string
  title: string
  place: string
  text?: string
}

export const strengths: Strength[] = [
  {
    title: 'I find the cause before I fix anything',
    text:
      'Electrical installation and testing taught me that a fix without a cause ' +
      'is a guess. In software I reproduce the bug first, then fix it, then prove it with a test.',
    evidence:
      'Defence Forces team: found a race condition, blocked it with a guard, proved it with rapid repeated requests and locked it in with a Playwright test.',
  },
  {
    title: 'I work in small, reviewed steps',
    text:
      'One ticket, one branch, one pull request. Small changes are easier to review, easier to test ' +
      'and easier to undo, so the team can trust what reaches main.',
    evidence:
      'Defence Forces team: daily grooming, branch per ticket, pull requests and reviews in Azure DevOps, in both directions.',
  },
  {
    title: 'I understand the domain I build for',
    text:
      'I am a qualified electrician (level 4). When software has to follow an electrical standard, ' +
      'I can read the rules and check the result myself instead of guessing what the customer meant.',
    evidence:
      'Diploma thesis and VoltVibe: a calculator that does a cost estimator’s routine work for electrical panels.',
  },
  {
    title: 'I leave code easier to change',
    text:
      'Tangled code slows down every change that comes after it. I split it into clear parts and ' +
      'write down how it works, so the next person does not have to guess.',
    evidence:
      'aChiral Nurse Assistant: a tangled single-file app split into clear modules, its bugs fixed, and a workflow diagram and access matrix written for the next developer.',
  },
]

// Written as results for the business, not as hours or counts: what changes for a team
// when I am on it.
export const outcomes: Outcome[] = [
  {
    title: 'Bugs fixed at the root',
    text:
      'I reproduce a fault, find what really causes it and fix that, so the same problem does ' +
      'not come back and cost the team time again.',
  },
  {
    title: 'Changes protected by tests',
    text:
      'Unit and end-to-end tests run automatically on every change, so errors are caught before ' +
      'a customer ever sees them.',
  },
  {
    title: 'Problems turned into solutions',
    text:
      'Give me an unclear problem and I break it down, choose a workable approach and deliver ' +
      'something that runs, then improve it from feedback.',
  },
  {
    title: 'Less risk in what ships',
    text:
      'Small reviewed changes, security checks on login and user input, and clear documentation ' +
      'mean fewer surprises in production and code others can maintain.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['Vue 3', 'TypeScript', 'Pinia', 'Quasar', 'Tailwind CSS', 'JavaScript', 'HTML / CSS', 'Bootstrap'],
  },
  {
    name: 'Backend',
    skills: ['C# / ASP.NET Core MVC', 'EF Core', 'ASP.NET Core Identity', 'Rust', 'Actix-web'],
  },
  { name: 'Databases', skills: ['SQL Server', 'SQLite'] },
  {
    name: 'Testing and delivery',
    skills: ['xUnit', 'Playwright', 'GitHub Actions', 'Azure DevOps', 'Git', 'Code review'],
  },
  { name: 'Mobile', skills: ['.NET MAUI'] },
  {
    name: 'AI',
    skills: ['Flowise', 'Groq', 'RAG with Pinecone', 'Gemini embeddings'],
  },
  { name: 'Also', skills: ['Python', 'Figma', 'Vue DevTools'] },
]

export const experience: TimelineEntry[] = [
  {
    period: 'Jun – Sep 2026',
    title: 'Software Development Intern (full-stack)',
    place: 'Estonian Defence Forces',
    text: 'Development team building a messaging app for military personnel. Vue 3 + TypeScript frontend, Rust backend.',
  },
  {
    period: 'Apr – May 2026',
    title: 'Software Development Intern (Erasmus+)',
    place: 'Techdgiteasy · San Cataldo, Italy',
    text: 'Took the aChiral Nurse Assistant from idea to a working prototype, working in English.',
  },
  {
    period: '2015 – 2025',
    title: 'Electrical installation, assembly and technical work',
    place: 'Shipbuilding (LTH Baas), construction and manufacturing',
    text: 'Mostly electrical installation and testing.',
  },
]

export const education: TimelineEntry[] = [
  {
    period: '2024 – 2026',
    title: 'Software development',
    place: 'Tallinna Tehnoloogiakolledž (Techno TLN), group TARge24',
  },
  {
    period: '2026',
    title: 'Professional certificate: Noorem tarkvaraarendaja, tase 4',
    place: 'Estonian professional register (kutseregister)',
  },
  {
    period: '2017 – 2019',
    title: 'Electrician, indoor installations, level 4',
    place: 'Tallinna Ehituskool',
  },
  {
    period: '2014 – 2015',
    title: 'Conscript service',
    place: 'Estonian Defence Forces',
  },
]

export const languages = 'Estonian, English, Russian C1 · German A1'
