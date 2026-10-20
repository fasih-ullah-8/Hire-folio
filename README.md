# Hirefolio

A polished **job board + portfolio builder** for job seekers and employers. There is no backend: every account, listing, application, and portfolio lives in `localStorage`.

## Features

- Fake signup / login with a role (Job Seeker or Employer)
- Role-aware navbar, logout, and protected routes with a friendly Access Denied page
- Job listings with search, location, and type filters (300ms debounce), skeletons, and empty states
- 12 realistic seed jobs on first load
- Job detail with cover-letter apply modal and an Applied state
- Seeker portfolio builder (React Hook Form + Zod) with live split-screen preview
- Public portfolio pages with a copy-link button
- Employer dashboard: full job CRUD (modal + confirm delete) and an applicants table with status updates
- Seeker applications list with status badges
- Dark mode toggle persisted in `localStorage`
- Toast notifications, hamburger nav, and reusable UI primitives

## Tech stack

- React 18 + Vite
- Tailwind CSS
- React Router v6
- React Hook Form + Zod
- lucide-react

## Screenshots

Add captures here after you run the app locally:

- Home / job listings (`/`)
- Job detail + apply modal (`/jobs/:id`)
- Portfolio builder (`/portfolio/edit`)
- Public portfolio (`/portfolio/alex-rivera`)
- Employer dashboard (`/dashboard`)

## Setup

```bash
cd hirefolio
npm install
npm run dev
```

The Vite dev server starts at **http://localhost:5173**.

Production build:

```bash
npm run build
npm run preview
```

### Demo accounts

| Role     | Email             |
|----------|-------------------|
| Seeker   | `alex@example.com` |
| Employer | `emma@novatech.io` |

No passwords. Sign up with any new email to create another account. Seeded jobs belong to the demo employer.

## Folder structure

```
src/
  components/
    ui/           Button, Input, Select, Modal, Badge, Card, Skeleton, Toast, EmptyState
    layout/       Navbar, Footer, Layout, ThemeToggle
    jobs/         JobCard, JobFilters, JobForm, ApplyModal
    portfolio/    PortfolioForm, PortfolioPreview, SkillInput
  pages/          Home, JobDetail, Auth, PortfolioEdit, PublicPortfolio,
                  EmployerDashboard, SeekerApplications, AccessDenied, NotFound
  context/        AuthContext, JobsContext, ThemeContext, ToastContext
  hooks/          useLocalStorage, useDebounce
  utils/          validation schemas, seed data, helpers
  routes/         ProtectedRoute
```

## License

Demo project. Use and adapt as you like.
