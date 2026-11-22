// Text for the "What I bring" page.

export interface Strength {
  title: string
  text: string
  /** Where I did it, shown under the text. */
  evidence: string
}

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
    title: 'I look for the cause first',
    text: 'I make the bug happen again before I change anything, then fix what causes it.',
    evidence:
      'Defence Forces: I found a race condition, stopped it with a guard and backed it with a Playwright test.',
  },
  {
    title: 'I work in small steps',
    text: 'One ticket, one branch, one pull request. Easy to review, easy to undo.',
    evidence: 'Daily grooming and code reviews in Azure DevOps, my code and other developers’ code.',
  },
  {
    title: 'I know the electrical side',
    text: 'I am a qualified electrician (level 4), so I can check an app against the electrical rules myself.',
    evidence: 'My diploma thesis and VoltVibe.',
  },
  {
    title: 'I tidy up as I go',
    text: 'When a file gets messy, I split it into parts that make sense and write down how they fit.',
    evidence:
      'aChiral Nurse Assistant: one big file became modules, with a workflow diagram and an access matrix for the next developer.',
  },
]

export const outcomes: Outcome[] = [
  {
    title: 'Tests with every fix',
    text: 'Every fix comes with a test that runs on every change.',
  },
  {
    title: 'Unclear tasks are fine',
    text: 'I split the problem, pick an approach and show something running early.',
  },
  {
    title: 'Fewer surprises',
    text: 'Small reviewed changes, input checks and short docs.',
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
    name: 'Chatbots and search',
    skills: ['Flowise', 'Groq', 'RAG with Pinecone', 'Gemini embeddings'],
  },
  { name: 'Also', skills: ['Python', 'Figma', 'Vue DevTools'] },
]

export const experience: TimelineEntry[] = [
  {
    period: 'Jun – Sep 2026',
    title: 'Software Development Intern (full-stack)',
    place: 'Estonian Defence Forces',
    text: 'I worked in a team building a messaging app for military personnel. Vue 3 and TypeScript on the front end, Rust on the back end.',
  },
  {
    period: 'Apr – May 2026',
    title: 'Software Development Intern (Erasmus+)',
    place: 'Techdgiteasy · San Cataldo, Italy',
    text: 'I took the aChiral Nurse Assistant from first idea to working prototype, all in English.',
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
