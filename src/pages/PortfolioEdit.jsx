import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import { portfolioSchema } from '../utils/validation';
import { slugify } from '../utils/helpers';
import PortfolioForm from '../components/portfolio/PortfolioForm';
import PortfolioPreview from '../components/portfolio/PortfolioPreview';

export default function PortfolioEdit() {
  const { user } = useAuth();
  const { getPortfolioByUserId, savePortfolio } = useJobs();
  const toast = useToast();
  const existing = getPortfolioByUserId(user.id);

  const form = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: existing || {
      fullName: user.name,
      title: '',
      username: slugify(user.name),
      email: user.email,
      location: '',
      bio: '',
      skills: [],
      projects: [{ title: '', description: '', link: '' }],
      experience: [{ company: '', role: '', period: '', description: '' }],
      socials: { github: '', linkedin: '', website: '', twitter: '' },
    },
  });

  const values = useWatch({ control: form.control });

  const onSubmit = (data) => {
    savePortfolio(user.id, data);
    toast.success('Portfolio saved');
  };

  const username = values?.username || existing?.username;

  return (
    <div className="page-wrap">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Portfolio builder</h1>
          <p className="text-sm text-slate-500">
            Edit on the left. Preview updates live on the right.
          </p>
        </div>
        {username && (
          <Link
            to={`/portfolio/${username}`}
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            View public page
          </Link>
        )}
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <PortfolioForm form={form} onSubmit={onSubmit} />
        <div className="lg:sticky lg:top-24">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Live preview
          </p>
          <PortfolioPreview data={values || {}} />
        </div>
      </div>
    </div>
  );
}
