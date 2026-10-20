import { STORAGE_KEYS } from './helpers';

export const SEED_EMPLOYER = {
  id: 'emp-seed-1',
  name: 'Emma Chen',
  email: 'emma@novatech.io',
  role: 'employer',
};

export const SEED_SEEKER = {
  id: 'seek-seed-1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  role: 'seeker',
};

export const seedUsers = [SEED_EMPLOYER, SEED_SEEKER];

const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

export const seedJobs = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    company: 'Lumen Pay',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$160k – $190k',
    description:
      'Own the customer dashboard experience at Lumen Pay. You will ship accessible React interfaces, partner with design on a new design system, and mentor two mid-level engineers. We move quickly, measure everything, and care deeply about craft.',
    requirements: [
      '5+ years of production React experience',
      'Strong TypeScript and CSS architecture skills',
      'Experience with design systems and accessibility',
      'Comfortable pairing and writing RFCs',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(1),
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    company: 'Northstar',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k – $155k',
    description:
      'Shape the next generation of Northstar’s career coaching product. From discovery interviews to high-fidelity prototypes, you will sit with PMs and engineers and ship weekly.',
    requirements: [
      'Portfolio showing end-to-end product work',
      'Figma fluency and systems thinking',
      'Experience running user research',
      'Clear written communication',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(2),
  },
  {
    id: 'job-3',
    title: 'Full-Stack Intern',
    company: 'Orbit Labs',
    location: 'Austin, TX',
    type: 'Internship',
    salary: '$35 / hour',
    description:
      'A 12-week internship shipping real features on our climate-data platform. You will work with a dedicated mentor, join standups, and present a demo on intern day.',
    requirements: [
      'Coursework or side projects in JavaScript',
      'Curiosity about APIs and databases',
      'Available 30+ hours per week this summer',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(3),
  },
  {
    id: 'job-4',
    title: 'Remote Backend Engineer',
    company: 'Harbor Cloud',
    location: 'Remote — US',
    type: 'Remote',
    salary: '$145k – $170k',
    description:
      'Build reliable Node and Postgres services that power Harbor’s multi-tenant cloud. On-call is light, docs are required, and we prefer boring technology that works.',
    requirements: [
      '3+ years building APIs in Node or Go',
      'Postgres, queues, and observability experience',
      'Strong debugging instincts',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(4),
  },
  {
    id: 'job-5',
    title: 'Marketing Operations Specialist',
    company: 'Brightline',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85k – $100k',
    description:
      'Own HubSpot, campaign reporting, and the lifecycle funnel for Brightline’s B2B SaaS. You will partner with growth and sales ops to keep data trustworthy.',
    requirements: [
      '2+ years in marketing ops or RevOps',
      'HubSpot or Salesforce experience',
      'Comfortable with spreadsheets and SQL basics',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(5),
  },
  {
    id: 'job-6',
    title: 'UX Researcher (Part-time)',
    company: 'Kite Health',
    location: 'Boston, MA',
    type: 'Part-time',
    salary: '$55 – $70 / hour',
    description:
      'Run mixed-methods research for a digital clinic serving chronic care patients. 20 hours a week, with flexibility around clinic hours.',
    requirements: [
      'Experience with interviews and usability tests',
      'Ability to synthesize findings for mixed audiences',
      'Healthcare or sensitive-domain experience is a plus',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(6),
  },
  {
    id: 'job-7',
    title: 'Data Analyst',
    company: 'Willow Retail',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$95k – $115k',
    description:
      'Turn messy retail data into stories leadership can act on. You will own weekly KPI packs, experiment readouts, and a Looker explore for store managers.',
    requirements: [
      'SQL and a BI tool (Looker, Tableau, or Metabase)',
      'Experience with A/B tests',
      'Clear slide and writing skills',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(7),
  },
  {
    id: 'job-8',
    title: 'Customer Success Manager',
    company: 'Pebble CRM',
    location: 'Remote — EU',
    type: 'Remote',
    salary: '€60k – €75k',
    description:
      'Be the trusted partner for mid-market customers rolling out Pebble. You will run QBRs, spot expansion signals, and feed product with structured insights.',
    requirements: [
      '2+ years in CS, account management, or consulting',
      'Excellent written English',
      'Comfortable in a CRM and a help desk',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(8),
  },
  {
    id: 'job-9',
    title: 'Mobile Engineer (React Native)',
    company: 'Trailhead',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$140k – $165k',
    description:
      'Ship Trailhead’s outdoor navigation app used by 2M hikers. We care about offline maps, battery life, and pixel-level polish on iOS and Android.',
    requirements: [
      '3+ years React Native or native mobile',
      'Experience with offline-first apps',
      'Published at least one app in production',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(9),
  },
  {
    id: 'job-10',
    title: 'People Operations Coordinator',
    company: 'Maple Studio',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$70k – $82k',
    description:
      'Keep Maple’s 80-person studio running smoothly: onboarding, benefits questions, and culture rituals. You are organized, kind, and allergic to messy spreadsheets.',
    requirements: [
      '1+ year in HR, ops, or office management',
      'Discretion with sensitive information',
      'Strong calendar and vendor coordination',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(10),
  },
  {
    id: 'job-11',
    title: 'DevRel Engineer',
    company: 'Atlas API',
    location: 'Remote — Global',
    type: 'Remote',
    salary: '$125k – $150k',
    description:
      'Write sample apps, give talks, and turn developer pain into product tickets. Atlas is an open payments API with a loud, friendly community.',
    requirements: [
      'Can write production-quality sample code',
      'Public speaking or writing experience',
      'Empathy for developers integrating APIs',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(12),
  },
  {
    id: 'job-12',
    title: 'Brand Content Intern',
    company: 'Saffron',
    location: 'Portland, OR',
    type: 'Internship',
    salary: '$22 / hour',
    description:
      'Help Saffron’s brand team ship newsletters, social, and launch copy for a sustainable home-goods line. Perfect for a student who writes every day.',
    requirements: [
      'A writing sample or social portfolio',
      'Comfortable with feedback and tight deadlines',
      'Interest in consumer brand storytelling',
    ],
    employerId: SEED_EMPLOYER.id,
    postedAt: daysAgo(14),
  },
];

export const seedPortfolio = {
  userId: SEED_SEEKER.id,
  fullName: 'Alex Rivera',
  title: 'Product-minded Frontend Engineer',
  username: 'alex-rivera',
  email: 'alex@example.com',
  location: 'Brooklyn, NY',
  bio: 'I design and build calm, accessible web products. Recently I led the redesign of a billing dashboard used by 40k merchants, cutting support tickets by 18%. I like TypeScript, thoughtful CSS, and pairing with designers.',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'Figma', 'Node.js'],
  projects: [
    {
      title: 'Ledger UI',
      description: 'Open-source invoice editor with keyboard-first flows and CSV export.',
      link: 'https://github.com',
    },
    {
      title: 'Neighborhood Maps',
      description: 'A small map app that highlights independent cafes and late-night bookstores.',
      link: 'https://example.com',
    },
  ],
  experience: [
    {
      company: 'Harbor Cloud',
      role: 'Frontend Engineer',
      period: '2022 — Present',
      description: 'Shipped the self-serve onboarding funnel and a shared component library.',
    },
    {
      company: 'Studio North',
      role: 'UI Developer',
      period: '2019 — 2022',
      description: 'Partnered with agencies to deliver marketing sites and design systems.',
    },
  ],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    website: 'https://example.com',
    twitter: '',
  },
};

export const seedPortfolios = {
  [SEED_SEEKER.id]: seedPortfolio,
};

export const seedApplications = [
  {
    id: 'app-1',
    jobId: 'job-1',
    seekerId: SEED_SEEKER.id,
    seekerName: SEED_SEEKER.name,
    seekerEmail: SEED_SEEKER.email,
    coverLetter:
      'I have spent the last four years building React dashboards at Harbor Cloud and would love to bring that craft to Lumen Pay’s customer experience.',
    status: 'Pending',
    appliedAt: daysAgo(0),
  },
];

/** One-time seed so first-time visitors see a lived-in product. */
export function ensureSeeded() {
  if (typeof window === 'undefined') return;
  if (window.localStorage.getItem(STORAGE_KEYS.SEEDED)) return;

  window.localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(seedUsers));
  window.localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(seedJobs));
  window.localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(seedApplications));
  window.localStorage.setItem(STORAGE_KEYS.PORTFOLIOS, JSON.stringify(seedPortfolios));
  window.localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify([]));
  window.localStorage.setItem(STORAGE_KEYS.SEEDED, '1');
}
