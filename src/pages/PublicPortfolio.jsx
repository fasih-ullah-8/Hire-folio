import { useParams } from 'react-router-dom';
import { Copy, Github, Globe, Linkedin, Mail, MapPin } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import { avatarTone, getInitials } from '../utils/helpers';

export default function PublicPortfolio() {
  const { username } = useParams();
  const { getPortfolioByUsername } = useJobs();
  const toast = useToast();
  const data = getPortfolioByUsername(username);

  if (!data) {
    return (
      <div className="page-wrap">
        <EmptyState
          title="Portfolio not found"
          description="This username is not published yet. Job seekers can create one in the portfolio builder."
        />
      </div>
    );
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied');
    } catch {
      toast.error('Could not copy link');
    }
  };

  const socials = [
    { href: data.socials?.github, icon: Github, label: 'GitHub' },
    { href: data.socials?.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: data.socials?.website, icon: Globe, label: 'Website' },
    { href: data.socials?.twitter, icon: Globe, label: 'Twitter' },
  ].filter((item) => item.href);

  return (
    <div className="page-wrap max-w-4xl space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white sm:p-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold ${avatarTone(data.fullName)}`}
            >
              {getInitials(data.fullName)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">{data.fullName}</h1>
              <p className="text-indigo-100">{data.title}</p>
              {data.location && (
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-indigo-100">
                  <MapPin className="h-4 w-4" />
                  {data.location}
                </p>
              )}
            </div>
          </div>
          <Button variant="secondary" onClick={copyLink}>
            <Copy className="h-4 w-4" />
            Copy link
          </Button>
        </div>
      </section>

      <Card>
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{data.bio}</p>
      </Card>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <Badge key={skill} tone="indigo">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.projects.map((project) => (
            <Card key={project.title} hover>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-indigo-600"
                >
                  Visit project
                </a>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Experience</h2>
        <ol className="space-y-4 border-l-2 border-indigo-200 pl-5 dark:border-indigo-900">
          {data.experience.map((item) => (
            <li key={`${item.company}-${item.role}`} className="relative">
              <span className="absolute -left-[1.45rem] top-1.5 h-3 w-3 rounded-full bg-indigo-500" />
              <p className="font-semibold">
                {item.role} · {item.company}
              </p>
              <p className="text-xs text-slate-400">{item.period}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Contact</h2>
          <a href={`mailto:${data.email}`} className="mt-1 inline-flex items-center gap-2 text-sm text-indigo-600">
            <Mail className="h-4 w-4" />
            {data.email}
          </a>
        </div>
        <div className="flex gap-2">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              <item.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
