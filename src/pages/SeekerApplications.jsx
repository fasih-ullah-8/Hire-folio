import { Link } from 'react-router-dom';
import { Inbox } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobsContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { formatDate } from '../utils/helpers';

export default function SeekerApplications() {
  const { user } = useAuth();
  const { applications, jobs } = useJobs();
  const mine = applications.filter((app) => app.seekerId === user.id);

  return (
    <div className="page-wrap space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your applications</h1>
        <p className="text-sm text-slate-500">Track status updates from employers.</p>
      </div>

      {mine.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="You have not applied yet"
          description="Browse open roles and send a cover letter from the job detail page."
          action={
            <Link to="/" className="text-sm font-medium text-indigo-600">
              View jobs
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4">
          {mine.map((app) => {
            const job = jobs.find((item) => item.id === app.jobId);
            if (!job) return null;
            return (
              <Card key={app.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link to={`/jobs/${job.id}`} className="font-semibold hover:text-indigo-600">
                    {job.title}
                  </Link>
                  <p className="text-sm text-slate-500">
                    {job.company} · Applied {formatDate(app.appliedAt)}
                  </p>
                </div>
                <Badge type={app.status}>{app.status}</Badge>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
