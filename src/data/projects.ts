// Every project on the "Now building" and "Finished work" pages comes from this file.
// To add or change a project, edit the data here; the pages render whatever is in these lists.

export interface Link {
  label: string
  href: string
}

export interface Screenshot {
  /** Path under public/, e.g. '/img/voltvibe-calculator.jpg'. */
  src: string
  /** Describes what the picture shows, for screen readers and if the image fails to load. */
  alt: string
  caption?: string
}

/** A large project told as a short story: problem → what I built → stack → proof → next. */
export interface CaseStudy {
  id: string
  title: string
  /** One line under the title: where, when, what role. */
  context: string
  problem: string
  built: string[]
  stack: string[]
  proof: string[]
  next: string[]
  links: Link[]
  /** Why there is no code link, when there isn't one. */
  codeNote?: string
  screenshots: Screenshot[]
}

/** A smaller project shown as a card. */
export interface SmallProject {
  title: string
  summary: string
  stack: string[]
  /** A page you can open in the browser right now (game or website). */
  live?: string
  code: string
}

const projectsRepo = 'https://github.com/EdMuoni/Projects/tree/main'

export const nowBuilding: CaseStudy[] = [
  {
    id: 'voltvibe',
    title: 'VoltVibe',
    context: 'My diploma thesis, grown into a product · since 2026 · solo developer',
    problem:
      'Before an electrician can quote a job, someone has to work out which breakers, how much cable, ' +
      'which residual-current device and what size of panel enclosure the building needs, and then ' +
      'look up every price. That is normally a cost estimator’s job. I know these parts from working ' +
      'as an electrician; VoltVibe turns the routine into a web shop with the calculator built in.',
    built: [
      'Enter the building type, rooms, sockets, lights and whether there is an electric cooker; get a priced bill of materials from a real product catalogue.',
      'Every line shows its circuit type and cable cross-section, so an electrician can check the result instead of trusting it.',
      'Since the thesis: a new interface in Tailwind CSS 4 and TypeScript, available in Estonian, English, Finnish, Swedish and Norwegian so it can serve customers across the Nordics, and orders that are saved with stock reserved.',
      'The goal is a Nordic wholesale web shop for electrical components, with the calculator as its main feature.',
    ],
    stack: [
      'ASP.NET Core 9 MVC',
      'ASP.NET Core Identity',
      'EF Core 9',
      'SQL Server',
      'Razor',
      'Tailwind CSS 4',
      'TypeScript',
      'esbuild',
      'xUnit',
      'GitHub Actions',
    ],
    proof: [
      'Automated tests run by GitHub Actions on every push, so a change that breaks something is caught at once, not by a customer.',
      'A security-check script repeats real attack attempts against the running app: login, CSRF protection, open redirects and input validation.',
      'Every page works without JavaScript; TypeScript only makes it more convenient.',
      'Layered solution (Core, Data, ApplicationServices, Web, Tests): the calculation rules sit apart from the web pages, so either can change without breaking the other.',
    ],
    next: [
      'Payments and order e-mails.',
      'Putting it online; today it runs on my machine.',
      'Checking every calculation rule against the exact clauses of EVS-HD 60364.',
      'Native speakers to review the Finnish, Swedish and Norwegian translations.',
    ],
    links: [{ label: 'Where it started: the thesis code', href: 'https://github.com/EdMuoni/Elektrikilbi-ja--tarvete-komponentide-kalkulaator' }],
    codeNote: 'VoltVibe’s code is private because I am building it as a business.',
    screenshots: [],
  },
]

export const finishedCaseStudies: CaseStudy[] = [
  {
    id: 'thesis',
    title: 'Electrical Panel and Supplies Component Calculator',
    context:
      'Diploma thesis (ElektriKalkulaator) · Tallinna Tehnoloogiakolledž, 2026 · supervisor Kalle Olumets',
    problem:
      'Turning basic building data into a priced list of electrical panel components takes an ' +
      'estimator’s time and knowledge of the wiring standard. My thesis asked whether a web app could ' +
      'do the routine part reliably, from a real product catalogue.',
    built: [
      'A web app that groups the building’s loads into circuits, based on the Estonian wiring standard EVS-HD 60364, and picks the cheapest suitable breaker and cable that is in stock.',
      'The result is a priced bill of materials: breakers, cable quantity, residual-current device and panel enclosure.',
      'A product catalogue with stock, an admin login and a shopping basket around the calculator.',
    ],
    stack: [
      'ASP.NET Core 9 MVC',
      'EF Core 9',
      'SQL Server',
      'ASP.NET Core Identity',
      'Bootstrap 5',
      'xUnit',
      'GitHub Actions',
    ],
    proof: [
      'Unit and integration tests run by GitHub Actions on every commit, so a wrong result is caught before anyone relies on it.',
      'Security tests for authentication, CSRF, open redirects and input validation.',
      'Layered solution (Core, Data, ApplicationServices, Web, Tests) that keeps the calculation rules testable on their own.',
      'Public code with a changelog that explains why each change was made.',
    ],
    next: ['This became VoltVibe: see “Now building”.'],
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/EdMuoni/Elektrikilbi-ja--tarvete-komponentide-kalkulaator' },
    ],
    screenshots: [],
  },
  {
    id: 'achiral',
    title: 'aChiral Nurse Assistant',
    context:
      'Erasmus+ internship · Techdgiteasy, San Cataldo, Italy · April–May 2026 · working language English',
    problem:
      'Nurses need a patient’s data and the right care guide quickly. The company wanted to see ' +
      'whether an AI chat assistant could provide both.',
    built: [
      'Took the idea through design to a working prototype within the internship.',
      'A Flowise Tool Agent with a Groq language model, conversation memory per session, and request tools that fetch each kind of patient record from a test database (json-server).',
      'RAG search (the model looks up relevant text before answering) with Pinecone and Gemini text embeddings over the nursing guide.',
      'Interface designed in Figma and built in HTML, CSS and JavaScript, fully translated into English, French and Italian so staff can use it in their own language.',
    ],
    stack: ['Flowise', 'Groq LLM', 'Pinecone', 'Gemini embeddings', 'JavaScript', 'HTML / CSS', 'json-server', 'Figma'],
    proof: [
      'Split a single-file app that had become hard to change into modules (API, UI, app logic, config, guides, translations), so each part can be fixed without breaking the others.',
      'Fixed the bugs found while restructuring it.',
      'Wrote a workflow diagram, a role-based access matrix and a code analysis report.',
    ],
    next: [
      'The prototype fed the model in two ways at once: data fetched from the database and RAG search. They conflicted. Next version: patient data only from the database, vector search only for the guides.',
    ],
    links: [{ label: 'Code on GitHub', href: 'https://github.com/EdMuoni/aChiral-Nurse-Assistant' }],
    codeNote: 'The public copy leaves out the company’s server address and its user-guide texts.',
    screenshots: [],
  },
  {
    id: 'defence-forces',
    title: 'Messaging app for military personnel (KOLT-chat)',
    context: 'Software Development Intern, full-stack · Estonian Defence Forces · June–September 2026',
    problem:
      'A development team building a messaging app for communication between military personnel. ' +
      'I worked on tickets across the whole stack, inside the team’s normal process.',
    built: [
      'Frontend tickets in Vue 3, TypeScript, Pinia and Quasar; backend tickets in Rust with Actix-web and SQLite.',
      'Fixed a race condition (two copies of the same action running at once) with a guard that blocks the second copy, and proved the fix with rapid repeated requests.',
      'Traced state-management bugs with Vue DevTools by comparing the state before and after an action.',
      'Got the development container working again when a security policy blocked a library.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Quasar', 'Rust', 'Actix-web', 'SQLite', 'Playwright', 'Azure DevOps'],
    proof: [
      'Wrote a Playwright end-to-end test so the race condition cannot come back unnoticed.',
      'Daily grooming at 8:50; ticket → own branch → pull request → review → main.',
      'Code review in both directions: my pull requests were reviewed, and I reviewed others’.',
    ],
    next: [],
    links: [],
    codeNote: 'Internal project: no code, screenshots or internal details are published.',
    screenshots: [],
  },
]

export const moreProjects: SmallProject[] = [
  {
    title: 'Space Invaders',
    summary: 'The arcade classic, drawn on an HTML canvas.',
    stack: ['JavaScript', 'Canvas'],
    live: 'https://edmuoni.github.io/Space_Invaders/',
    code: `${projectsRepo}/Space_Invaders`,
  },
  {
    title: 'Candy Crush',
    summary: 'A match-three puzzle game in the browser.',
    stack: ['JavaScript'],
    live: 'https://edmuoni.github.io/Candy_Crush/',
    code: `${projectsRepo}/Candy_Crush`,
  },
  {
    title: 'Accessories website',
    summary: 'A multi-page website.',
    stack: ['HTML', 'Bootstrap'],
    live: 'https://edmuoni.github.io/Aksesuaaride_Veebileht/',
    code: `${projectsRepo}/Aksesuaaride_Veebileht`,
  },
  {
    title: 'Bicycle website',
    summary: 'A website built with plain HTML and CSS.',
    stack: ['HTML', 'CSS'],
    live: 'https://edmuoni.github.io/Jalgratta_Veebileht/',
    code: `${projectsRepo}/Jalgratta_Veebileht`,
  },
  {
    title: 'Concert Journal',
    summary: 'A mobile concert diary with search, sorting, light/dark theme and Excel export and import.',
    stack: ['C#', '.NET MAUI'],
    code: `${projectsRepo}/ConcertJournal`,
  },
  {
    title: 'Mobile apps (TARge24)',
    summary: 'A planet guide, a scientific calculator and a CRUD data manager.',
    stack: ['C#', '.NET MAUI'],
    code: `${projectsRepo}/TARge24MobileApps`,
  },
  {
    title: 'Classical Tetris',
    summary: 'A pair project: user stories, a prototype, then the game with scoring.',
    stack: ['Python', 'Tkinter'],
    code: `${projectsRepo}/tetris-projekt`,
  },
  {
    title: 'Tic-Tac-Toe',
    summary: 'Play against the computer.',
    stack: ['Python'],
    code: `${projectsRepo}/Tic_Tac_Toe`,
  },
  {
    title: 'Salary Calculator',
    summary: 'Calculates an Estonian monthly salary.',
    stack: ['HTML', 'JavaScript'],
    code: `${projectsRepo}/SalaryCalculator`,
  },
  {
    title: 'Databases',
    summary: 'SQL Server coursework on the AdventureWorks sample database.',
    stack: ['SQL Server'],
    code: `${projectsRepo}/TARge24SQL`,
  },
]
