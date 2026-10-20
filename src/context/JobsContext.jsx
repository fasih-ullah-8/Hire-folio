import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, uid } from '../utils/helpers';
import { seedApplications, seedJobs, seedPortfolios } from '../utils/seedData';

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useLocalStorage(STORAGE_KEYS.JOBS, seedJobs);
  const [applications, setApplications] = useLocalStorage(
    STORAGE_KEYS.APPLICATIONS,
    seedApplications,
  );
  const [savedIds, setSavedIds] = useLocalStorage(STORAGE_KEYS.SAVED, []);
  const [portfolios, setPortfolios] = useLocalStorage(STORAGE_KEYS.PORTFOLIOS, seedPortfolios);

  const getJob = (id) => jobs.find((job) => job.id === id);

  const addJob = (payload, employerId) => {
    const job = {
      ...payload,
      id: uid(),
      employerId,
      postedAt: new Date().toISOString(),
    };
    setJobs((current) => [job, ...current]);
    return job;
  };

  const updateJob = (id, payload) => {
    setJobs((current) => current.map((job) => (job.id === id ? { ...job, ...payload } : job)));
  };

  const deleteJob = (id) => {
    setJobs((current) => current.filter((job) => job.id !== id));
    setApplications((current) => current.filter((app) => app.jobId !== id));
  };

  const applyToJob = ({ jobId, seeker, coverLetter }) => {
    const application = {
      id: uid(),
      jobId,
      seekerId: seeker.id,
      seekerName: seeker.name,
      seekerEmail: seeker.email,
      coverLetter,
      status: 'Pending',
      appliedAt: new Date().toISOString(),
    };
    let created = application;
    setApplications((current) => {
      const existing = current.find((app) => app.jobId === jobId && app.seekerId === seeker.id);
      if (existing) {
        created = existing;
        return current;
      }
      return [application, ...current];
    });
    return created;
  };

  const hasApplied = (jobId, seekerId) =>
    applications.some((app) => app.jobId === jobId && app.seekerId === seekerId);

  const updateApplicationStatus = (id, status) => {
    setApplications((current) => current.map((app) => (app.id === id ? { ...app, status } : app)));
  };

  const toggleSaved = (jobId) => {
    setSavedIds((current) =>
      current.includes(jobId) ? current.filter((id) => id !== jobId) : [...current, jobId],
    );
  };

  const savePortfolio = (userId, data) => {
    setPortfolios((current) => ({ ...current, [userId]: { ...data, userId } }));
  };

  const getPortfolioByUserId = (userId) => portfolios[userId] || null;

  const getPortfolioByUsername = (username) =>
    Object.values(portfolios).find((item) => item.username === username) || null;

  const value = useMemo(
    () => ({
      jobs,
      applications,
      savedIds,
      portfolios,
      getJob,
      addJob,
      updateJob,
      deleteJob,
      applyToJob,
      hasApplied,
      updateApplicationStatus,
      toggleSaved,
      savePortfolio,
      getPortfolioByUserId,
      getPortfolioByUsername,
    }),
    [jobs, applications, savedIds, portfolios],
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within JobsProvider');
  return ctx;
}
