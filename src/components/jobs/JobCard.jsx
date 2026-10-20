import { Link } from 'react-router-dom';
import { Bookmark, MapPin } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { avatarTone, getInitials, relativeDate } from '../../utils/helpers';
import { useJobs } from '../../context/JobsContext';

export default function JobCard({ job }) {
  const { savedIds, toggleSaved } = useJobs();
  const saved = savedIds.includes(job.id);

  return (
    <Card hover className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <Link to={`/jobs/${job.id}`} className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${avatarTone(job.company)}`}
          >
            {getInitials(job.company)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900 dark:text-white">{job.title}</h3>
            <p className="truncate text-sm text-slate-500">{job.company}</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => toggleSaved(job.id)}
          aria-pressed={saved}
          aria-label={saved ? 'Unsave job' : 'Save job'}
          className={`rounded-xl p-2 transition ${
            saved
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.location}
        </span>
        <Badge type={job.type}>{job.type}</Badge>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4 text-sm">
        <span className="font-medium text-slate-800 dark:text-slate-200">{job.salary}</span>
        <span className="text-slate-400">{relativeDate(job.postedAt)}</span>
      </div>
    </Card>
  );
}
