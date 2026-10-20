import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import Button from '../components/ui/Button';

export default function AccessDenied() {
  return (
    <div className="page-wrap flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
        <ShieldOff className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-bold">Access denied</h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        That page belongs to a different role. Job seekers use the portfolio builder and applications
        list. Employers use the hiring dashboard.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to jobs</Button>
      </Link>
    </div>
  );
}
