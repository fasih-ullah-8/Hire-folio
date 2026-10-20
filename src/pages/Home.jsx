import { useEffect, useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import JobFilters from '../components/jobs/JobFilters';
import JobCard from '../components/jobs/JobCard';
import { JobCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useJobs } from '../context/JobsContext';
import { useDebounce } from '../hooks/useDebounce';

export default function Home() {
  const { jobs } = useJobs();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 300);
  const debouncedLocation = useDebounce(location, 300);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const loc = debouncedLocation.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q);
      const matchesLocation = !loc || job.location.toLowerCase().includes(loc);
      const matchesType = !type || job.type === type;
      return matchesQuery && matchesLocation && matchesType;
    });
  }, [jobs, debouncedQuery, debouncedLocation, type]);

  return (
    <div className="page-wrap space-y-10">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-12 text-white shadow-card sm:px-10 sm:py-16">
        <p className="text-sm font-medium text-indigo-100">Job board + portfolio, in one place</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
          Find work that fits. Show work that lands interviews.
        </h1>
        <p className="mt-4 max-w-xl text-indigo-100">
          Search live listings, save roles, and apply with a portfolio employers can actually read.
        </p>
        <div className="mt-8 rounded-2xl bg-white/95 p-4 text-slate-900 shadow-lg dark:bg-slate-900/95 dark:text-slate-100">
          <JobFilters
            query={query}
            location={location}
            type={type}
            onQuery={setQuery}
            onLocation={setLocation}
            onType={setType}
          />
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Open roles</h2>
            <p className="text-sm text-slate-500">{filtered.length} matching {filtered.length === 1 ? 'job' : 'jobs'}</p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No jobs match those filters"
            description="Try a broader title, clear the location, or choose All types."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
