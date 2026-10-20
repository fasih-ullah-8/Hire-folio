import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const onLogout = () => {
    logout();
    close();
    navigate('/');
  };

  const links = [
    { to: '/', label: 'Jobs' },
    ...(user?.role === 'seeker'
      ? [
          { to: '/portfolio/edit', label: 'Portfolio' },
          { to: '/applications', label: 'Applications' },
        ]
      : []),
    ...(user?.role === 'employer' ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="page-wrap flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight" onClick={close}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Briefcase className="h-4 w-4" />
          </span>
          Hirefolio
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="max-w-[10rem] truncate text-sm text-slate-500">
                  {user.name}
                </span>
                <Button variant="secondary" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            )}
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 md:hidden dark:border-slate-700"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
                end={link.to === '/'}
                onClick={close}
              >
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={linkClass} onClick={close}>
                Sign in
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
