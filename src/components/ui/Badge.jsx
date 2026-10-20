const tones = {
  indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200',
  violet: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-200',
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200',
  amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
  rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
  sky: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-200',
};

const typeTone = {
  'Full-time': 'indigo',
  'Part-time': 'violet',
  Remote: 'sky',
  Internship: 'amber',
  Pending: 'amber',
  Shortlisted: 'emerald',
  Rejected: 'rose',
};

export default function Badge({ children, tone, type, className = '' }) {
  const resolved = tone || typeTone[type] || 'slate';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[resolved]} ${className}`}
    >
      {children}
    </span>
  );
}
