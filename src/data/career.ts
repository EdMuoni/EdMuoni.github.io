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
    text:
      'As an electrician I learned that replacing parts until the fault goes away fixes nothing. ' +
      'With software I do it the same way. First I make the bug happen again, then I fix what causes it.',
    evidence:
      'At the Defence Forces I found a race condition, stopped it with a guard and checked it by firing the same request many times in a row. After that I wrote a Playwright test for it.',
  },
  {
    title: 'I work in small steps',
    text:
      'A ticket gets its own branch and its own pull request. Small changes are easy to review ' +
      'and easy to undo if something goes wrong.',
    evidence:
      'Daily grooming with the team, a branch for every ticket, and code reviews in Azure DevOps. Other developers reviewed my code and I reviewed theirs.',
  },
  {
    title: 'I know the electrical side',
    text:
      'I am a qualified electrician (level 4). When an app has to follow an electrical standard, ' +
      'I can read the rules myself and see if the result makes sense.',
    evidence: 'My diploma thesis and VoltVibe, a calculator for electrical panel parts.',
  },
  {
    title: 'I tidy up as I go',
    text:
      'Messy code makes every later change slower. If I work in a file like that, I split it into ' +
      'parts that make sense and write down how they fit together.',
    evidence:
      'My first version of the aChiral Nurse Assistant was one big file. I split it into modules, fixed the bugs I found on the way and drew a workflow diagram and an access matrix for the next developer.',
  },
]

export const outcomes: Outcome[] = [
  {
    title: 'Tests with every fix',
    text: 'When I fix something, a test comes with it. It runs on every change, so the bug does not quietly come back.',
  },
  {
    title: 'Unclear tasks are fine',
    text:
      'Give me a problem without a ready answer. I will split it into pieces, pick an approach and ' +
      'have something running early, then improve it with your feedback.',
  },
  {
    title: 'Fewer surprises',
    text: 'Small reviewed changes, input checks and short docs. That keeps the code safe to change later.',
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
    text: 'I built the aChiral Nurse Assistant from the first idea to a working prototype. Everything at work was in English.',
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
