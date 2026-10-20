import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import Auth from './pages/Auth';
import PortfolioEdit from './pages/PortfolioEdit';
import PublicPortfolio from './pages/PublicPortfolio';
import EmployerDashboard from './pages/EmployerDashboard';
import SeekerApplications from './pages/SeekerApplications';
import AccessDenied from './pages/AccessDenied';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Navigate to="/login" replace />} />
          <Route
            path="/portfolio/edit"
            element={
              <ProtectedRoute role="seeker">
                <PortfolioEdit />
              </ProtectedRoute>
            }
          />
          <Route path="/portfolio/:username" element={<PublicPortfolio />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute role="seeker">
                <SeekerApplications />
              </ProtectedRoute>
            }
          />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
