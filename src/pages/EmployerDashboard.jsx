import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Trash2, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobsContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import Select from '../components/ui/Select';
import JobForm from '../components/jobs/JobForm';
import { APP_STATUSES, formatDate } from '../utils/helpers';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const {
    jobs,
    applications,
    addJob,
    updateJob,
    deleteJob,
    updateApplicationStatus,
    getPortfolioByUserId,
  } = useJobs();
  const toast = useToast();

  const [tab, setTab] = useState('jobs');
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [jobFilter, setJobFilter] = useState('all');

  const myJobs = jobs.filter((job) => job.employerId === user.id);
  const myApps = applications.filter((app) => myJobs.some((job) => job.id === app.jobId));
  const visibleApps = useMemo(
    () => (jobFilter === 'all' ? myApps : myApps.filter((app) => app.jobId === jobFilter)),
    [myApps, jobFilter],
  );

  return (
    <div className="page-wrap space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Employer dashboard</h1>
          <p className="text-sm text-slate-500">Manage listings and review applicants.</p>
        </div>
        <Button onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4" />
          Post a job
        </Button>
      </div>

      <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        {[
          { id: 'jobs', label: 'My Jobs', icon: Briefcase },
          { id: 'applicants', label: 'Applicants', icon: Users },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
              tab === item.id ? 'bg-white shadow-sm dark:bg-slate-900' : 'text-slate-500'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'jobs' &&
        (myJobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No jobs yet"
            description="Post your first role. Seeded listings belong to the demo employer emma@novatech.io."
            action={<Button onClick={() => setCreating(true)}>Create a job</Button>}
          />
        ) : (
          <div className="grid gap-4">
            {myJobs.map((job) => (
              <Card key={job.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold">{job.title}</h2>
                    <Badge type={job.type}>{job.type}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {job.company} · {job.location} · {formatDate(job.postedAt)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setEditing(job)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => setPendingDelete(job)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ))}

      {tab === 'applicants' && (
        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <Select
              id="jobFilter"
              label="Filter by job"
              value={jobFilter}
              onChange={(event) => setJobFilter(event.target.value)}
            >
              <option value="all">All my jobs</option>
              {myJobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </Select>
          </div>
          {visibleApps.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users}
                title="No applicants yet"
                description="When seekers apply, they will appear here with a link to their portfolio."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/70">
                  <tr>
                    <th className="px-4 py-3 font-medium">Applicant</th>
                    <th className="px-4 py-3 font-medium">Job</th>
                    <th className="px-4 py-3 font-medium">Applied</th>
                    <th className="px-4 py-3 font-medium">Portfolio</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleApps.map((app) => {
                    const job = myJobs.find((item) => item.id === app.jobId);
                    const portfolio = getPortfolioByUserId(app.seekerId);
                    return (
                      <tr key={app.id} className="border-t border-slate-100 dark:border-slate-800">
                        <td className="px-4 py-3">
                          <p className="font-medium">{app.seekerName}</p>
                          <p className="text-xs text-slate-400">{app.seekerEmail}</p>
                        </td>
                        <td className="px-4 py-3">{job?.title}</td>
                        <td className="px-4 py-3">{formatDate(app.appliedAt)}</td>
                        <td className="px-4 py-3">
                          {portfolio ? (
                            <Link
                              to={`/portfolio/${portfolio.username}`}
                              className="font-medium text-indigo-600"
                            >
                              View
                            </Link>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={app.status}
                            onChange={(event) => {
                              updateApplicationStatus(app.id, event.target.value);
                              toast.success('Status updated');
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
                          >
                            {APP_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      <Modal open={creating} title="Post a job" onClose={() => setCreating(false)} wide>
        <JobForm
          onCancel={() => setCreating(false)}
          submitLabel="Publish"
          onSubmit={(payload) => {
            addJob(payload, user.id);
            toast.success('Job published');
            setCreating(false);
          }}
        />
      </Modal>

      <Modal open={Boolean(editing)} title="Edit job" onClose={() => setEditing(null)} wide>
        {editing && (
          <JobForm
            initial={editing}
            onCancel={() => setEditing(null)}
            onSubmit={(payload) => {
              updateJob(editing.id, payload);
              toast.success('Job updated');
              setEditing(null);
            }}
          />
        )}
      </Modal>

      <Modal open={Boolean(pendingDelete)} title="Delete this job?" onClose={() => setPendingDelete(null)}>
        <p className="text-sm text-slate-500">
          This removes <strong>{pendingDelete?.title}</strong> and its applications. This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteJob(pendingDelete.id);
              toast.success('Job deleted');
              setPendingDelete(null);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
