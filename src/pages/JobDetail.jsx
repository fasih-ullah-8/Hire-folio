import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import { useJobs } from '../context/JobsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ApplyModal from '../components/jobs/ApplyModal';
import { avatarTone, formatDate, getInitials } from '../utils/helpers';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJob, applyToJob, hasApplied, getPortfolioByUserId } = useJobs();
  const { user } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const job = getJob(id);
  const applied = user ? hasApplied(id, user.id) : false;

  if (!job) {
    return (
      <div className="page-wrap py-20 text-center">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to listings
        </Button>
      </div>
    );
  }

  const onApply = async (coverLetter) => {
    applyToJob({ jobId: job.id, seeker: user, coverLetter });
    toast.success('Application sent');
    setOpen(false);
  };

  const handleApplyClick = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${job.id}` } });
      return;
    }
    if (user.role !== 'seeker') {
      toast.error('Only job seekers can apply.');
      return;
    }
    if (!getPortfolioByUserId(user.id)) {
      toast.info('Tip: add a public portfolio so employers can learn more about you.');
    }
    setOpen(true);
  };

  return (
    <div className="page-wrap grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div>
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          All jobs
        </Link>
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${avatarTone(job.company)}`}
              >
                {getInitials(job.company)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <p className="text-slate-500">{job.company}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </span>
                  <Badge type={job.type}>{job.type}</Badge>
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>
            {user?.role !== 'employer' &&
              (applied ? (
                <Button variant="subtle" disabled>
                  <CheckCircle2 className="h-4 w-4" />
                  Applied
                </Button>
              ) : (
                <Button onClick={handleApplyClick}>Apply now</Button>
              ))}
          </div>
        </Card>

        <Card className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">About the role</h2>
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">{job.description}</p>
          <h3 className="font-semibold">Requirements</h3>
          <ul className="list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
            {(job.requirements || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </div>

      <aside className="space-y-4">
        <Card>
          <h2 className="font-semibold">Company</h2>
          <p className="mt-2 text-sm text-slate-500">
            {job.company} is hiring on Hirefolio. Posted {formatDate(job.postedAt)}.
          </p>
        </Card>
      </aside>

      <ApplyModal open={open} job={job} onClose={() => setOpen(false)} onSubmit={onApply} />
    </div>
  );
}
