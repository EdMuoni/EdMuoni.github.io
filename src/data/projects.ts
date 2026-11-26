// All projects on the site. Each one shows up as a card on its overview page and gets its own
// page at /projects/<slug>.

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

/** A colour from the palette in tokens.css (used as the class hue-<name>). */
export type Hue = 'orange' | 'blue' | 'teal' | 'green' | 'violet' | 'pink' | 'yellow'

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
  /** The project's colour. School projects take their course's colour instead. */
  hue?: Hue
  /** One sentence for the card, the project page's lead and link previews. */
  summary: string
  /** One line under the title: where, when, what role. */
  context?: string
  /** Three short lines for the big rows on Now building and Finished work. */
  highlights?: string[]

  // Case study parts, all optional.
  problem?: string
  /** A few words of `problem` shown on a highlight. */
  problemMark?: string
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
    hue: 'orange',
    mascotLine: 'This is the big one: his diploma thesis, growing into a real web shop.',
    title: 'VoltVibe',
    group: 'now',
    highlights: [
      'Turns a building’s details into a priced parts list',
      'In Estonian, English, Finnish, Swedish and Norwegian',
      'Tested on every push, attacked on purpose',
    ],
    summary:
      'A web shop for electrical parts, with a calculator that turns a building’s details into a priced parts list.',
    context: 'My diploma thesis, grown into a product · since 2026 · solo developer',
    problemMark: 'works it out for you',
    problem:
      'An electrician can’t quote a job until someone works out the breakers, how much cable, the ' +
      'residual-current device and the panel enclosure, then looks up every price. Usually a cost ' +
      'estimator does that. I know these parts from my electrician years, so I built a web shop ' +
      'that works it out for you.',
    built: [
      'You enter the building type, how many rooms, sockets and lights it has, and whether there’s an electric cooker. Out comes a priced parts list from a real product catalogue.',
      'Every line shows the circuit type and the cable cross-section, so an electrician can check the numbers.',
      'After the thesis I rebuilt the interface in Tailwind CSS 4 and TypeScript. It now speaks Estonian, English, Finnish, Swedish and Norwegian, and an order reserves its stock.',
      'The plan is a wholesale web shop for electrical parts in the Nordic countries, with the calculator at the centre.',
    ],
    proof: [
      'GitHub Actions runs the automated tests on every push.',
      'A security script tries real attacks on the running app: login, CSRF, open redirects and bad input.',
      'Every page also works with JavaScript turned off.',
      'The calculation rules live in their own layer, apart from the web pages, so they can be tested alone.',
    ],
    next: [
      'Payments and order e-mails.',
      'Putting it online. Right now it only runs on my computer.',
      'Checking every calculation rule against the exact clauses of EVS-HD 60364.',
      'Getting native speakers to check the Finnish, Swedish and Norwegian texts.',
    ],
    stack: [
      'ASP.NET Core 9 MVC',
      'SQL Server',
      'ASP.NET Core Identity',
      'EF Core 9',
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
          'The building details next to the priced parts list. I left the product photos out of this screenshot.',
      },
    ],
  },
  {
    slug: 'bill-watcher',
    hue: 'violet',
    title: 'Bill Watcher',
    group: 'now',
    highlights: [
      'Reads bills with an AI model',
      'Checks that the numbers add up',
      'Grades each AI model on test bills',
    ],
    summary:
      'A service that reads household and small-business bills and will warn you when they change.',
    context: 'My next product · in development · solo developer',
    problemMark: 'easy to miss',
    problem: 'Bills change quietly. A new fee or a higher price is easy to miss when nobody reads the small print.',
    built: [
      'Reads a bill with an AI model and checks that the numbers add up before anything is trusted.',
      'Scores each AI model on the same test bills, so I pick the model on results.',
      'Accounts with sign-in, and a web app you can install on a phone.',
      'Automatic checks on every push, and the server setup scripted for a European host.',
    ],
    next: [
      'The customer screens: upload a bill and see what changed.',
      'Alerts for price rises, new fees, ended discounts and notice deadlines.',
      'A free beta on the web and Google Play.',
    ],
    stack: ['Rust', 'actix-web', 'SQLite', 'Vue 3', 'Quasar', 'TypeScript', 'Gemini', 'Mistral', 'GitHub Actions', 'Docker'],
    codeNote: 'The code is private while the product is being built.',
    screenshots: [],
    mascotLine: 'His next product. The AI reads the bill and his code checks the sums.',
  },
  {
    slug: 'portfolio-website',
    hue: 'teal',
    mascotLine: 'You’re looking at it right now.',
    title: 'This website',
    group: 'now',
    summary:
      'The site you are on now, made with Vue 3 and TypeScript. Every page also works without JavaScript.',
    context: 'Personal project · 2026 · solo developer',
    built: [
      'All projects come from one data file. The cards, the overview pages and each project page are made from it.',
      'The build writes every page out as plain HTML first. The text is there before any JavaScript runs, and a shared link shows the right title.',
    ],
    proof: [
      'GitHub Actions type-checks, builds and publishes the site on every push to main.',
      'If I mistype a field in the data file, TypeScript stops the build before a broken page goes live.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Vue Router', 'Vite', 'GitHub Actions', 'GitHub Pages'],
    code: 'https://github.com/EdMuoni/EdMuoni.github.io',
    screenshots: [
      {
        src: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The top of this site’s home page: my name, a short intro and Ohm the mascot.',
      },
    ],
  },

  // ---------------------------------------------------------------- Finished work
  {
    slug: 'panel-calculator-thesis',
    hue: 'blue',
    mascotLine: 'This is where VoltVibe started.',
    title: 'Electrical Panel and Supplies Component Calculator',
    group: 'finished',
    highlights: [
      'Works out a building’s breakers and cable',
      'Picks the cheapest suitable part in stock',
      'Tested on every push, security included',
    ],
    summary:
      'My diploma thesis: a web app that turns basic building data into a priced list of electrical panel components.',
    context:
      'Diploma thesis (ElektriKalkulaator) · Tallinna Tehnoloogiakolledž, 2026 · supervisor Kalle Olumets',
    problemMark: 'do the routine part reliably',
    problem:
      'An estimator needs time and a good knowledge of the wiring standard to price the parts for an ' +
      'electrical panel. My thesis asked if a web app could do the routine part reliably, from a real ' +
      'product catalogue.',
    built: [
      'A web app that groups the building’s loads into circuits the way designers usually do, and picks the cheapest suitable breaker and cable that is in stock.',
      'The result is a priced bill of materials: breakers, cable quantity, residual-current device and panel enclosure.',
      'A product catalogue with stock, an admin login and a shopping basket around the calculator.',
    ],
    proof: [
      'Unit and integration tests run in GitHub Actions on every push.',
      'Security tests for authentication, CSRF, open redirects and input validation.',
      'Split into layers (Core, Data, ApplicationServices, Web, Tests), so the calculation rules can be tested on their own.',
      'The code is public, and the changelog says why each change was made.',
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
    screenshots: [
      {
        src: '/img/projects/thesis-architecture.jpg',
        width: 1800,
        height: 1120,
        alt: 'Four boxes from top to bottom: the web project, ApplicationServices, Data and Core, with arrows pointing down, and Tests beside them.',
        caption: 'Four layers. The web project calculates nothing itself.',
      },
      {
        src: '/img/projects/thesis-calculator.jpg',
        width: 1280,
        height: 842,
        alt: 'The calculator: the building details on the left, the priced list of breakers and cables on the right.',
        caption: 'The calculator and its result. Product photos: Wikimedia Commons, CC BY-SA.',
      },
      {
        src: '/img/projects/thesis-stock-warning.jpg',
        width: 712,
        height: 547,
        alt: 'A yellow warning above the parts list: one cable is short in stock, and the line shows how much is missing.',
        caption: 'It warns before you order more than the stock has. Product photos: Wikimedia Commons, CC BY-SA.',
      },
      {
        src: '/img/projects/thesis-assumptions.jpg',
        width: 712,
        height: 317,
        alt: 'Three cards above a short list of the assumptions the result is based on.',
        caption: 'Every result says what it assumes.',
      },
      {
        src: '/img/projects/thesis-tests.jpg',
        width: 660,
        height: 450,
        alt: 'Visual Studio Test Explorer with every test class ticked green.',
        caption: 'The test run: all green.',
      },
      {
        src: '/img/projects/thesis-flow.jpg',
        width: 1200,
        height: 1600,
        alt: 'A flowchart from the form, through the calculation rules, circuits, breaker and cable, to the bill of materials.',
        caption: 'How one calculation runs.',
      },
    ],
  },
  {
    slug: 'achiral-nurse-assistant',
    hue: 'pink',
    mascotLine: 'An AI assistant for nurses, built during his Erasmus+ internship in Sicily.',
    title: 'aChiral Nurse Assistant',
    group: 'finished',
    highlights: [
      'Patient data and care guides in one chat',
      'Looks up the nursing guide before answering',
      'English, French and Italian interface',
    ],
    summary:
      'An AI chat assistant that gives nurses a patient’s data and the right care guide, in English, French and Italian.',
    context:
      'Erasmus+ internship · Techdgiteasy, San Cataldo, Italy · April–May 2026 · working language English',
    problemMark: 'the right care guide, fast',
    problem:
      'A nurse needs a patient’s vital signs and the right care guide, fast. The company wondered if ' +
      'an AI chat could give both.',
    built: [
      'I took it from an idea to a working prototype during the internship.',
      'A nurse picks a patient and asks. A Flowise agent fetches the records from a test database, and a Groq model answers in plain language.',
      'RAG search (the model looks up relevant text before answering) with Pinecone and Gemini text embeddings over the nursing guide.',
      'Interface designed in Figma and built in HTML, CSS and JavaScript, fully translated into English, French and Italian so staff can use it in their own language.',
    ],
    proof: [
      'My first version was one big file. I split it into modules: API, UI, app logic, config, guides and translations.',
      'I fixed the bugs that turned up while doing that.',
      'Wrote a workflow diagram, a role-based access matrix and a code analysis report.',
    ],
    next: [
      'The prototype fed the model data two ways at once, from the database and through RAG search, and they got in each other’s way. Next time I’d take patient data only from the database and use vector search only for the guides.',
    ],
    stack: ['Flowise', 'Groq LLM', 'Pinecone', 'Gemini embeddings', 'JavaScript', 'HTML / CSS', 'json-server', 'Figma'],
    code: 'https://github.com/EdMuoni/aChiral-Nurse-Assistant',
    codeNote: 'The public copy leaves out the company’s server address and its user-guide texts.',
    screenshots: [
      {
        src: '/img/projects/achiral-flowchart.jpg',
        width: 1600,
        height: 1119,
        alt: 'The assistant’s flowchart: how a nurse’s question goes to the patient data or the care guide and back as an answer.',
        caption: 'The flowchart I drew for the assistant.',
      },
    ],
  },
  {
    slug: 'defence-forces-internship',
    hue: 'green',
    mascotLine: 'Internal project, so no code or screenshots. Ask him about the race condition.',
    title: 'Messaging app for military personnel (KOLT-chat)',
    group: 'finished',
    highlights: [
      'Took tickets in Vue 3 and Rust',
      'Tracked down and blocked a race condition',
      'A Playwright test keeps it fixed',
    ],
    summary:
      'Full-stack work in a team building a messaging app for military personnel, with a Vue 3 front end and a Rust back end.',
    context: 'Software Development Intern, full-stack · Estonian Defence Forces · June–September 2026',
    problemMark: 'could run twice at the same time',
    problem:
      'The team’s messaging app had a race condition: the same action could run twice at the same time.',
    built: [
      'I fixed the race condition with a guard that stops a second run, then fired the same request at it many times, fast.',
      'I tracked down state bugs in Vue DevTools by comparing the store before and after an action.',
      'When a security policy blocked a library, I got the development container working again.',
    ],
    proof: [
      'I wrote a Playwright end-to-end test for the race condition.',
      'Daily grooming at 8:50. Every ticket went through its own branch, a pull request and a review before it reached main.',
      'I reviewed other people’s pull requests, and they reviewed mine.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'Quasar', 'Rust', 'Actix-web', 'SQLite', 'Playwright', 'Azure DevOps'],
    codeNote: 'Internal project: no code, screenshots or internal details are published.',
    screenshots: [],
  },

  // ---------------------------------------------------------------- School projects, by course
  {
    slug: 'shop-targe24',
    title: 'ShopTARge24',
    group: 'school',
    course: 'Web development',
    summary:
      'Manage kindergartens, real estate and spaceships in one ASP.NET Core web app, with picture uploads.',
    built: [
      'Create, view, edit and delete kindergartens, real-estate listings and spaceships.',
      'Upload several images for a record and delete them again. Real-estate images are saved in the database.',
      'Real-estate forms check their input before anything is saved.',
      'I added fixed ids to the pages so my Selenium tests could find the buttons and fields.',
    ],
    proof: [
      'The same layers my thesis uses: Core, Data, ApplicationServices and the web project, joined by dependency injection.',
      'xUnit tests check the services against an in-memory database.',
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
      'Pick a school from the list and see its details. React in front, an ASP.NET Core API behind it.',
    built: [
      'The API returns all schools, or one school by its id, or “404 Not Found” when there is none.',
      'React pages show the schools in a table and open a details page for each one, using React Router.',
      'The data comes from SQL Server through EF Core.',
      'The back end has the same layers as my bigger .NET projects: Core, Data, ApplicationServices and Server.',
    ],
    next: ['Adding, editing and deleting schools.'],
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
    screenshots: [
      {
        src: '/img/projects/accessories-website.jpg',
        width: 1280,
        height: 800,
        alt: 'The shop’s home page with its welcome text.',
      },
    ],
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
    screenshots: [
      {
        src: '/img/projects/bicycle-website.jpg',
        width: 1280,
        height: 800,
        alt: 'The magazine’s home page: a bicycle photo inside a big triangle, with short articles beside it.',
      },
    ],
  },
  {
    slug: 'salary-calculator',
    title: 'Salary Calculator',
    group: 'school',
    course: 'Web development',
    summary: 'Enter a yearly gross salary to see the monthly pay after Estonian income tax.',
    built: [
      'Shows the monthly gross salary, the tax-free income, the income tax and the net salary.',
      'The tax-free allowance shrinks as income grows, and invalid input gets a clear message.',
      'It is simplified: unemployment insurance and pension payments are left out.',
    ],
    stack: ['HTML', 'JavaScript'],
    code: 'https://github.com/EdMuoni/SalaryCalculator',
    screenshots: [],
  },
  {
    slug: 'cocktail-recipes',
    title: 'Cocktail recipe site and API',
    group: 'school',
    course: 'Agile software development',
    summary:
      'Browse cocktail recipes, sign up and rate them. An Express API with a Vue front end.',
    context: 'Course project · planned as user stories, one Git branch per story',
    built: [
      'A REST API in Express and Sequelize on MariaDB: recipes, users, ratings, registration, login and logout.',
      'Passwords are saved as bcrypt hashes, and logins are kept as sessions in the database.',
      'API documentation in Swagger (OpenAPI), served by the API itself.',
      'A Vue 3 front end: recipes with ratings, registration and login, and an admin page to add, edit and delete recipes.',
    ],
    proof: [
      'Planned in LiteTracker as user stories. Every story got its own Git branch named after it, and the commits name the story they deliver.',
      'Database settings come from environment variables. The repo has an example file and the real one stays out of Git.',
    ],
    next: [
      'Check admin rights on the server too, so only an admin can change recipes.',
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
      'My tests take over Firefox and click through my web app: create, edit, delete, then check it refuses bad input.',
    built: [
      'NUnit tests drive Firefox through Selenium against my ShopTARge24 web app.',
      'For kindergartens and spaceships: create a record, check its details, edit it and delete it.',
      'Negative tests: text typed into a number field must not create a record, and the form must stay open.',
      'I added the ids the tests need to the app’s pages.',
    ],
    next: ['Page objects, proper waits in place of fixed pauses, and closing the browser after each test.'],
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
      'Pieces fall and you move and turn them with the arrow keys. Full lines disappear.',
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
      'Click a square to put your X there, and the computer answers with an O.',
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
      'Starts with plain tables and works up to stored procedures, views, indexes, triggers and cursors.',
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
    screenshots: [
      {
        src: '/img/projects/space-invaders.jpg',
        width: 600,
        height: 620,
        alt: 'The game at the start: aliens at the top, the player’s green ship at the bottom.',
      },
    ],
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
    screenshots: [
      {
        src: '/img/projects/candy-crush.jpg',
        width: 1280,
        height: 800,
        alt: 'The board full of candies, with the score above it.',
      },
    ],
  },
]

// A typo in a highlight would silently drop it, so stop the build instead.
for (const p of projects) {
  if (p.problemMark && !p.problem?.includes(p.problemMark)) throw new Error(`problemMark not in problem: ${p.slug}`)
}

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

const courseHues: Record<Course, Hue> = {
  'Web development': 'blue',
  'Agile software development': 'teal',
  'Software testing': 'green',
  'Programming basics': 'violet',
  'Mobile apps': 'pink',
  Databases: 'yellow',
  'JavaScript practice': 'orange',
}

/** The icon of each course on the School page (see CourseIcon.vue). */
export type CourseIconName = 'browser' | 'board' | 'shield' | 'code' | 'phone' | 'database' | 'gamepad'

const courseIcons: Record<Course, CourseIconName> = {
  'Web development': 'browser',
  'Agile software development': 'board',
  'Software testing': 'shield',
  'Programming basics': 'code',
  'Mobile apps': 'phone',
  Databases: 'database',
  'JavaScript practice': 'gamepad',
}

export const courseIcon = (course: Course): CourseIconName => courseIcons[course]

/** The colour of a course's section on the School page. */
export const courseHue = (course: Course): Hue => courseHues[course]

/** The colour of a project: its own, or its course's. */
export const hueOf = (project: Project): Hue =>
  project.hue ?? (project.course ? courseHues[project.course] : 'orange')

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
