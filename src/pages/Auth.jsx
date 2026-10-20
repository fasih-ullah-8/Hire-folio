import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { loginSchema, signupSchema } from '../utils/validation';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Auth() {
  const [mode, setMode] = useState('signup');
  const { login, signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', role: 'seeker' },
  });
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
  });

  const goAfterAuth = (user) => {
    if (from && from !== '/login') {
      navigate(from, { replace: true });
      return;
    }
    navigate(user.role === 'employer' ? '/dashboard' : '/', { replace: true });
  };

  const onSignup = signupForm.handleSubmit((values) => {
    try {
      const user = signup(values);
      toast.success(`Welcome, ${user.name}`);
      goAfterAuth(user);
    } catch (error) {
      toast.error(error.message);
    }
  });

  const onLogin = loginForm.handleSubmit((values) => {
    try {
      const user = login(values);
      toast.success(`Signed in as ${user.name}`);
      goAfterAuth(user);
    } catch (error) {
      toast.error(error.message);
    }
  });

  return (
    <div className="page-wrap mx-auto max-w-lg">
      <Card className="p-6 sm:p-8">
        <h1 className="text-2xl font-bold">
          {mode === 'signup' ? 'Create your Hirefolio account' : 'Welcome back'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fake auth only — we store your name, email, and role in localStorage. No password.
        </p>

        <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {['signup', 'login'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-lg py-2 text-sm font-medium capitalize ${
                mode === item ? 'bg-white shadow-sm dark:bg-slate-900' : 'text-slate-500'
              }`}
            >
              {item === 'signup' ? 'Sign up' : 'Log in'}
            </button>
          ))}
        </div>

        {mode === 'signup' ? (
          <form className="mt-6 space-y-4" onSubmit={onSignup}>
            <Input
              id="name"
              label="Full name"
              error={signupForm.formState.errors.name?.message}
              {...signupForm.register('name')}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              error={signupForm.formState.errors.email?.message}
              {...signupForm.register('email')}
            />
            <Select
              id="role"
              label="I am a"
              error={signupForm.formState.errors.role?.message}
              {...signupForm.register('role')}
            >
              <option value="seeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </Select>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onLogin}>
            <Input
              id="login-email"
              label="Email"
              type="email"
              error={loginForm.formState.errors.email?.message}
              {...loginForm.register('email')}
            />
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        )}

        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500 dark:bg-slate-800/60">
          <p className="font-medium text-slate-700 dark:text-slate-200">Demo accounts</p>
          <p>Seeker: alex@example.com</p>
          <p>Employer: emma@novatech.io</p>
        </div>
      </Card>
    </div>
  );
}
