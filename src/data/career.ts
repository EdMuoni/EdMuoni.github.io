// Content for the "What I bring" page: what a team gets, the numbers behind it, skills,
// experience and education. Only claims that a project on this site can back up.

export interface Strength {
  title: string
  text: string
  /** The project that proves it, shown under the text. */
  evidence: string
}

export interface Stat {
  value: string
  label: string
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
      'Ten years of electrical installation and testing taught me that a fix without a cause ' +
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
      'aChiral Nurse Assistant: a 1,154-line single file split into modules, 8 bugs fixed, plus a workflow diagram and an access matrix.',
  },
]

export const stats: Stat[] = [
  { value: '3.5 months', label: 'on a Defence Forces development team' },
  { value: '6 weeks', label: 'from idea to a working AI prototype' },
  { value: '218', label: 'automated tests run on every push' },
  { value: '5', label: 'interface languages in VoltVibe' },
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
    text: 'Built the aChiral Nurse Assistant prototype in six weeks, working in English.',
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
