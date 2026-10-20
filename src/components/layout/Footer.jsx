import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="page-wrap flex flex-col items-start justify-between gap-4 text-sm text-slate-500 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Hirefolio. Built for demo use — data stays in your browser.</p>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-indigo-600">
            Jobs
          </Link>
          <Link to="/login" className="hover:text-indigo-600">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
