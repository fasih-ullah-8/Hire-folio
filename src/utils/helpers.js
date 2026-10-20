/** Unique id for client-side records. */
export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Two-letter initials from a company or person name. */
export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/** Deterministic pastel-ish background from a string. */
export function avatarTone(seed = '') {
  const tones = [
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-200',
    'bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-200',
    'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/60 dark:text-fuchsia-200',
    'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-200',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200',
    'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-200',
  ];
  const sum = [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return tones[sum % tones.length];
}

/** URL-safe username from a display name. */
export function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32);
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function relativeDate(iso) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.floor((now - then) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 14) return `${days} days ago`;
  return formatDate(iso);
}

export const JOB_TYPES = ['Full-time', 'Part-time', 'Remote', 'Internship'];
export const APP_STATUSES = ['Pending', 'Shortlisted', 'Rejected'];

export const STORAGE_KEYS = {
  USER: 'hirefolio-user',
  USERS: 'hirefolio-users',
  JOBS: 'hirefolio-jobs',
  APPLICATIONS: 'hirefolio-applications',
  PORTFOLIOS: 'hirefolio-portfolios',
  SAVED: 'hirefolio-saved',
  THEME: 'hirefolio-theme',
  SEEDED: 'hirefolio-seeded',
};
