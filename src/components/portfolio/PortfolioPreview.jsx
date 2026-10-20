import { Globe, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import Badge from '../ui/Badge';
import { avatarTone, getInitials } from '../../utils/helpers';

export default function PortfolioPreview({ data }) {
  const name = data.fullName || 'Your name';
  const skills = data.skills || [];
  const projects = data.projects || [];
  const experience = data.experience || [];

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${avatarTone(name)}`}
        >
          {getInitials(name)}
        </div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-indigo-600 dark:text-indigo-300">{data.title || 'Headline'}</p>
          {data.location && (
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" />
              {data.location}
            </p>
          )}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {data.bio || 'Your bio will appear here as you type.'}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <Badge key={skill} tone="indigo">
              {skill}
            </Badge>
          ))
        ) : (
          <span className="text-xs text-slate-400">Skills show up as chips</span>
        )}
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold">Projects</h4>
        <div className="space-y-2">
          {projects.map((project, index) => (
            <div key={index} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
              <p className="text-sm font-medium">{project.title || 'Untitled project'}</p>
              <p className="text-xs text-slate-500">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-semibold">Experience</h4>
        <ol className="space-y-3 border-l border-slate-200 pl-4 dark:border-slate-700">
          {experience.map((item, index) => (
            <li key={index}>
              <p className="text-sm font-medium">
                {item.role || 'Role'} · {item.company || 'Company'}
              </p>
              <p className="text-xs text-slate-400">{item.period}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex gap-3 text-slate-500">
        {data.email && <Mail className="h-4 w-4" />}
        {data.socials?.github && <Github className="h-4 w-4" />}
        {data.socials?.linkedin && <Linkedin className="h-4 w-4" />}
        {data.socials?.website && <Globe className="h-4 w-4" />}
      </div>
    </div>
  );
}
