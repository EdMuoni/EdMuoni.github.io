// Personal details shown in the header, on the home page and in the footer.
// Deliberately no phone number, address, birth date or photo: this page is public.

export interface ContactLink {
  label: string
  href: string
  /** Shown next to the label, e.g. the address the link points to. */
  detail: string
}

export const profile = {
  name: 'Edgar Muoni',
  role: 'Full-stack developer',
  location: 'Tallinn, Estonia',
  stack: ['Vue 3', 'TypeScript', 'Rust', 'C# / .NET', 'Automated testing'],
  email: 'edgar.muoni@gmail.com',
}

export const contactLinks: ContactLink[] = [
  { label: 'Email', href: `mailto:${profile.email}`, detail: profile.email },
  { label: 'GitHub', href: 'https://github.com/EdMuoni', detail: 'github.com/EdMuoni' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/edgar-muoni-7aa691395/',
    detail: 'linkedin.com/in/edgar-muoni',
  },
]
