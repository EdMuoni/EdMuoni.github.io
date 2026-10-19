// Every project on the site comes from this file. The overview pages (Now building, Finished work,
// School projects) show them as cards, and every project also gets its own page at /projects/<slug>, which the build
// pre-renders like any other page. To add or change a project, edit the list below.

export interface Link {
  label: string
  href: string
}

export interface Screenshot {
  /** Path under public/, e.g. '/img/voltvibe-calculator.jpg'. */
  src: string
  /** The same view in the dark theme, shown to visitors who use the dark theme. */
  srcDark?: string
  /** The picture's size in pixels, so the page keeps its place for it before it loads. */
  width: number
  height: number
  /** Describes what the picture shows, for screen readers and if the image fails to load. */
  alt: string
  caption?: string
}

/** Which overview page a project appears on. */
export type ProjectGroup = 'now' | 'finished' | 'school'

/**
 * One project. Only `slug`, `title`, `group`, `summary` and `stack` are required; a small project
 * leaves the case-study parts out and its page simply shows less.
 */
export interface Project {
  /** The project's address: /projects/<slug>. Lower case and hyphens; changing it breaks old links. */
  slug: string
  title: string
  group: ProjectGroup
  /** School projects only: the course it was made for. */
  course?: Course
  /** One sentence for the card, the project page's lead and link previews. */
  summary: string
  /** One line under the title: where, when, what role. */
  context?: string

  // The case study, always told in this order: problem → what I built → proof → what's next.
  problem?: string
  built?: string[]
  proof?: string[]
  next?: string[]

  stack: string[]
  /** A page you can open in the browser right now (game or website). */
  live?: string
  /** The source code on GitHub. */
  code?: string
  /** Any other useful link. */
  links?: Link[]
  /** Why there is no code link, when there isn't one. */
  codeNote?: string
  screenshots: Screenshot[]
  /** What Ohm, the mascot, says first on this project's page (see src/data/mascot.ts). */
  mascotLine?: string
}

export const projects: Project[] = [
  // ---------------------------------------------------------------- Now building
  {
    slug: 'voltvibe',
    mascotLine: 'This is the big one: his diploma thesis, growing into a real web shop.',
    title: 'VoltVibe',
    group: 'now',
    summary:
      'A web shop for electrical components with a built-in calculator that turns building data into a priced bill of materials.',
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
    links: [
      {
        label: 'Where it started: the thesis code',
        href: 'https://github.com/EdMuoni/Elektrikilbi-ja--tarvete-komponentide-kalkulaator',
      },
    ],
    codeNote: 'VoltVibe’s code is private because I am building it as a business.',
    screenshots: [
      {
        src: '/img/voltvibe-calculator-light.jpg',
        srcDark: '/img/voltvibe-calculator-dark.jpg',
        width: 1280,
        height: 800,
        alt:
          'VoltVibe’s calculator: a detached house with 5 rooms, 20 sockets, 12 lights and an electric cooker, next to the priced list of breakers and cables it needs.',
        caption:
          'Building details in, a priced bill of materials out. Product photos are left out of this screenshot.',
      },
    ],
  },
  {
    slug: 'portfolio-website',
    mascotLine: 'You are standing in it. Every page here was typed out by the build before you arrived.',
    title: 'This website',
    group: 'now',
    summary:
      'The site you are reading: Vue 3 and TypeScript, pre-rendered so every page also reads without JavaScript.',
    context: 'Personal project · 2026 · solo developer',
    built: [
      'Every project on the site comes from one typed data file; the cards, the overview pages and each project’s own page are generated from it.',
      'The build pre-renders every page to HTML, so the text is there before any JavaScript runs, link previews show each page’s own title, and every page answers “200 OK”.',
    ],
    proof: [
      'GitHub Actions type-checks, builds and publishes the site on every push to main.',
      'TypeScript checks the data file, so a missing or misspelt field stops the build instead of breaking a page.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Vue Router', 'Vite', 'GitHub Actions', 'GitHub Pages'],
    code: 'https://github.com/EdMuoni/EdMuoni.github.io',
    screenshots: [],
  },

  // ---------------------------------------------------------------- Finished work
  {
    slug: 'panel-calculator-thesis',
    mascotLine: 'Where it all started: an electrician’s routine, turned into tested code.',
    title: 'Electrical Panel and Supplies Component Calculator',
    group: 'finished',
    summary:
      'My diploma thesis: a web app that turns basic building data into a priced list of electrical panel components.',
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
    proof: [
      'Unit and integration tests run by GitHub Actions on every commit, so a wrong result is caught before anyone relies on it.',
      'Security tests for authentication, CSRF, open redirects and input validation.',
      'Layered solution (Core, Data, ApplicationServices, Web, Tests) that keeps the calculation rules testable on their own.',
      'Public code with a changelog that explains why each change was made.',
    ],
    next: ['This became VoltVibe: see “Now building”.'],
    stack: [
      'ASP.NET Core 9 MVC',
      'EF Core 9',
      'SQL Server',
      'ASP.NET Core Identity',
      'Bootstrap 5',
      'xUnit',
      'GitHub Actions',
    ],
    code: 'https://github.com/EdMuoni/Elektrikilbi-ja--tarvete-komponentide-kalkulaator',
    screenshots: [],
  },
  {
    slug: 'achiral-nurse-assistant',
    mascotLine: 'An AI assistant for nurses, built during his Erasmus+ internship in Sicily.',
    title: 'aChiral Nurse Assistant',
    group: 'finished',
    summary:
      'An AI chat assistant that gives nurses a patient’s data and the right care guide, in English, French and Italian.',
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
    proof: [
      'Split a single-file app that had become hard to change into modules (API, UI, app logic, config, guides, translations), so each part can be fixed without breaking the others.',
      'Fixed the bugs found while restructuring it.',
      'Wrote a workflow diagram, a role-based access matrix and a code analysis report.',
    ],
    next: [
      'The prototype fed the model in two ways at once: data fetched from the database and RAG search. They conflicted. Next version: patient data only from the database, vector search only for the guides.',
    ],
    stack: ['Flowise', 'Groq LLM', 'Pinecone', 'Gemini embeddings', 'JavaScript', 'HTML / CSS', 'json-server', 'Figma'],
    code: 'https://github.com/EdMuoni/aChiral-Nurse-Assistant',
    codeNote: 'The public copy leaves out the company’s server address and its user-guide texts.',
    screenshots: [],
  },
  {
    slug: 'defence-forces-internship',
    mascotLine: 'An internal project, so no code or screenshots here. What he did is all below.',
    title: 'Messaging app for military personnel (KOLT-chat)',
    group: 'finished',
    summary:
      'Full-stack tickets on a development team building a messaging app for military personnel: Vue 3 frontend, Rust backend.',
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
    proof: [
      'Wrote a Playwright end-to-end test so the race condition cannot come back unnoticed.',
      'Daily grooming at 8:50; ticket → own branch → pull request → review → main.',
      'Code review in both directions: my pull requests were reviewed, and I reviewed others’.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Quasar', 'Rust', 'Actix-web', 'SQLite', 'Playwright', 'Azure DevOps'],
    codeNote: 'Internal project: no code, screenshots or internal details are published.',
    screenshots: [],
  },

  // ---------------------------------------------------------------- School projects, by course
  // Each described from reading its repository's code. Course order: see `courses` below.
  {
    slug: 'shop-targe24',
    title: 'ShopTARge24',
    group: 'school',
    course: 'Web development',
    summary:
      'An ASP.NET Core MVC web app for managing kindergarten groups, real estate and spaceships, with image uploads.',
    built: [
      'Create, view, edit and delete kindergartens, real-estate listings and spaceships.',
      'Upload several images per record and remove them again; real-estate images are stored in the database.',
      'Real-estate forms check their input before anything is saved.',
      'Every form field has a stable id, so automated browser tests can find it (see “Browser tests with Selenium”).',
    ],
    proof: [
      'Layered solution: Core (domain, DTOs, interfaces), Data (EF Core and its migrations), ApplicationServices and the web project, joined by dependency injection.',
      'Unit tests (xUnit) run the services against an in-memory database, so the logic is checked without a real one.',
    ],
    stack: ['C#', 'ASP.NET Core 9 MVC', 'EF Core 9', 'SQL Server', 'xUnit'],
    code: 'https://github.com/EdMuoni/ShopTARge24/tree/Kindergarten',
    screenshots: [],
  },
  {
    slug: 'react-school-list',
    title: 'School list: React and ASP.NET Core',
    group: 'school',
    course: 'Web development',
    summary:
      'A React and TypeScript front end on an ASP.NET Core Web API that lists schools and shows each school’s details.',
    built: [
      'The API returns all schools, or one school by its id, or “404 Not Found” when there is none.',
      'React pages show the schools in a table and open a details page for each one, using React Router.',
      'The data comes from SQL Server through EF Core.',
    ],
    proof: [
      'Layered back end (Core, Data, ApplicationServices, Server), the same structure as my larger .NET projects.',
    ],
    next: ['Creating, editing and deleting schools: the API endpoints and pages for them are the next step.'],
    stack: ['React 19', 'TypeScript', 'Vite', 'ASP.NET Core 9 Web API', 'EF Core 9', 'SQL Server'],
    code: 'https://github.com/EdMuoni/ReactCRUD',
    screenshots: [],
  },
  {
    slug: 'accessories-website',
    title: 'Accessories website',
    group: 'school',
    course: 'Web development',
    summary: 'A shop website in Bootstrap, built to a graded brief.',
    built: [
      'A home page with a picture carousel, product cards with prices, a blog page, a contact page with opening hours and a map, and a login form.',
      'The same design and navigation on every page.',
    ],
    stack: ['HTML', 'CSS', 'Bootstrap'],
    live: 'https://edmuoni.github.io/Aksesuaaride_Veebileht/',
    code: 'https://github.com/EdMuoni/Aksesuaaride_Veebileht',
    screenshots: [],
  },
  {
    slug: 'bicycle-website',
    title: 'Bicycle website',
    group: 'school',
    course: 'Web development',
    summary: 'A multi-page cycling magazine site in plain HTML and CSS.',
    built: ['Home, news, archive, about and contact pages on a grid layout, all linked to each other and back home.'],
    stack: ['HTML', 'CSS'],
    live: 'https://edmuoni.github.io/Jalgratta_Veebileht/',
    code: 'https://github.com/EdMuoni/Jalgratta_Veebileht',
    screenshots: [],
  },
  {
    slug: 'salary-calculator',
    title: 'Salary Calculator',
    group: 'school',
    course: 'Web development',
    summary: 'Works out an Estonian monthly salary after income tax from the yearly gross salary.',
    built: [
      'Shows the monthly gross salary, the tax-free income, the income tax and the net salary.',
      'The tax-free allowance shrinks as income grows, and invalid input gets a clear message.',
      'Simplified on purpose: it leaves out the unemployment-insurance and pension contributions.',
    ],
    stack: ['HTML', 'JavaScript'],
    code: 'https://github.com/EdMuoni/SalaryCalculator',
    screenshots: [],
  },
  {
    slug: 'cocktail-recipes',
    title: 'Cocktail recipes: API and web app',
    group: 'school',
    course: 'Agile software development',
    summary:
      'A cocktail recipe site: a documented REST API with accounts, sessions and ratings, and a Vue front end for visitors and admins.',
    context: 'Course project · planned as user stories, one Git branch per story',
    built: [
      'A REST API in Express and Sequelize on MariaDB: recipes, users, ratings, registration, login and logout.',
      'Passwords stored as bcrypt hashes; logins kept as server-side sessions in the database.',
      'API documentation in Swagger (OpenAPI), served by the API itself.',
      'A Vue 3 front end: recipes with ratings, registration and login, and an admin page to add, edit and delete recipes.',
    ],
    proof: [
      'Planned in LiteTracker as user stories. Every story got its own Git branch named after it, and the commits name the story they deliver.',
      'Database settings come from environment variables; the repository holds an example file, and the real one stays out of Git.',
    ],
    next: [
      'Check permissions on the server as well, not only in the front end, so that only an admin can change recipes.',
      'Automated tests for the API.',
    ],
    stack: ['Node.js', 'Express 5', 'Sequelize', 'MariaDB', 'bcrypt', 'Swagger', 'Vue 3', 'Pinia', 'Vue Router'],
    code: 'https://github.com/EdMuoni/KokteilideretseptuuriNimekiri-API',
    screenshots: [],
  },
  {
    slug: 'selenium-tests',
    title: 'Browser tests with Selenium',
    group: 'school',
    course: 'Software testing',
    summary:
      'Automated browser tests that create, edit and delete records in a web app, and check that bad input is turned away.',
    built: [
      'NUnit tests drive Firefox through Selenium against my ShopTARge24 web app.',
      'For kindergartens and spaceships: create a record, check its details, edit it and delete it.',
      'Negative tests: text typed into a number field must not create a record, and the form must stay open.',
      'The ids the tests rely on were added to the app’s pages for exactly this purpose.',
    ],
    next: ['Page objects, waits that watch the page instead of fixed pauses, and closing the browser after each test.'],
    stack: ['C#', 'NUnit', 'Selenium WebDriver', 'Firefox'],
    code: 'https://github.com/EdMuoni/SeleniumTester',
    screenshots: [],
  },
  {
    slug: 'tetris',
    title: 'Classical Tetris',
    group: 'school',
    course: 'Programming basics',
    summary: 'A pair project: Tetris in Python, with score, levels, music and a restart.',
    built: [
      'Pieces fall, move and turn with the arrow keys; full lines are cleared.',
      'My part: the game loop, the keyboard handling, line clearing, score and levels that speed the game up, the music and the restart.',
      'Planned with user stories and a paper prototype before any code was written.',
    ],
    stack: ['Python', 'Tkinter', 'Pygame'],
    code: 'https://github.com/EdMuoni/Projects/tree/main/tetris-projekt',
    screenshots: [],
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    group: 'school',
    course: 'Programming basics',
    summary: 'Tic-tac-toe in Python and Pygame: you play X against the computer.',
    built: [
      'Click a square to place your X; the computer answers with an O.',
      'Spots a line of three in any row, column or diagonal, and a full board.',
    ],
    stack: ['Python', 'Pygame'],
    code: 'https://github.com/EdMuoni/GroupProject',
    screenshots: [],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile apps in .NET MAUI',
    group: 'school',
    course: 'Mobile apps',
    summary: 'A scientific calculator, a planet guide and a product list stored in SQLite, as .NET MAUI apps.',
    built: [
      'Scientific calculator built with MVVM: the page binds to a view model with a command for each function.',
      'Planet guide: a list and a details page for every planet, the dwarf planets included.',
      'Product list saved in SQLite, with a model that checks its own data: a name is required and the price must be above zero.',
    ],
    stack: ['C#', '.NET MAUI', 'MVVM Toolkit', 'SQLite'],
    code: 'https://github.com/EdMuoni/TARge24MobileApps',
    screenshots: [],
  },
  {
    slug: 'concert-journal',
    title: 'Concert Journal (team project)',
    group: 'school',
    course: 'Mobile apps',
    summary:
      'A team-built .NET MAUI app for logging the concerts you go to. My part: the start page and the statistics panel.',
    built: [
      'The app: concerts with performers, venue, date, rating and notes, statistics, two colour themes, and export and import as an Excel file.',
      'My part during the course: the start page with the concert list, the statistics panel and an early performers page.',
    ],
    stack: ['C#', '.NET MAUI', 'SQLite', 'ClosedXML'],
    code: 'https://github.com/EdMuoni/Projects/tree/main/ConcertJournal',
    screenshots: [],
  },
  {
    slug: 'sql-coursework',
    title: 'SQL Server coursework',
    group: 'school',
    course: 'Databases',
    summary: 'SQL Server course work: tables, joins, stored procedures, functions, views, indexes and triggers.',
    built: [
      'Builds tables step by step and works through joins, grouping, stored procedures, functions, views, indexes, triggers, cursors and temporary tables.',
      'A graded task on Microsoft’s AdventureWorks sample database, with every kind of join explained.',
    ],
    stack: ['SQL Server', 'T-SQL'],
    code: 'https://github.com/EdMuoni/TARge24SQL',
    screenshots: [],
  },
  {
    slug: 'space-invaders',
    title: 'Space Invaders',
    group: 'school',
    course: 'JavaScript practice',
    summary: 'The arcade classic on an HTML canvas: move the ship, shoot the rows of aliens and level up.',
    stack: ['JavaScript', 'Canvas'],
    live: 'https://edmuoni.github.io/Space_Invaders/',
    code: 'https://github.com/EdMuoni/Space_Invaders',
    screenshots: [],
  },
  {
    slug: 'candy-crush',
    title: 'Candy Crush',
    group: 'school',
    course: 'JavaScript practice',
    summary: 'A match-three puzzle in the browser: drag candies to line up three and score points.',
    stack: ['JavaScript'],
    live: 'https://edmuoni.github.io/Candy_Crush/',
    code: 'https://github.com/EdMuoni/Candy_Crush',
    screenshots: [],
  },
]

/** The School projects page lists its projects under these headings, in this order. */
export const courses = [
  'Web development',
  'Agile software development',
  'Software testing',
  'Programming basics',
  'Mobile apps',
  'Databases',
  'JavaScript practice',
] as const

export type Course = (typeof courses)[number]

/** Where each group's projects are listed, for headings and "back" links. */
export const groups: Record<ProjectGroup, { label: string; to: string }> = {
  now: { label: 'Now building', to: '/now-building' },
  finished: { label: 'Finished work', to: '/work' },
  school: { label: 'School projects', to: '/school' },
}

/** The address of a project's own page. */
export const projectPath = (project: Project) => `/projects/${project.slug}`

/** The large projects on an overview page: the ones told as a full case study. */
export const isCaseStudy = (project: Project) => Boolean(project.problem)

export function projectsIn(group: ProjectGroup): Project[] {
  return projects.filter((project) => project.group === group)
}

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** The projects before and after this one on its overview page, for the links at the page's end. */
export function neighbours(project: Project): { previous?: Project; next?: Project } {
  const list = projectsIn(project.group)
  const i = list.indexOf(project)
  return { previous: list[i - 1], next: list[i + 1] }
}
