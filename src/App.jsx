import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

import Landing from './pages/LandingV2';
import ForCompanies from './pages/ForCompaniesV2';
import Blog from './pages/BlogV2';
import ForEducators from './pages/ForEducatorsV2';
import StudentLayout from './layouts/StudentLayout';
import CompanyLayout from './layouts/CompanyLayout';
import AdminLayout from './layouts/AdminLayout';

import Explore from './pages/student/ExploreV2';
import SimulationDetail from './pages/student/SimulationDetailV2';
import Workspace from './pages/student/WorkspaceV2';
import Jobs from './pages/student/JobsV2';
import SimulationPlayer from './pages/student/SimulationPlayer';
import SimulationOverview from './pages/student/SimulationOverview';
import StudentDashboard from './pages/student/StudentDashboardV2';

import CompanyHome from './pages/company/CompanyHome';
import CompanySimulations from './pages/company/CompanySimulations';
import CompanySubmissions from './pages/company/CompanySubmissions';
import CertificateReview from './pages/company/CertificateReview';
import CompanySubscription from './pages/company/CompanySubscription';
import TemplateSelect from './pages/company/TemplateSelect';
import SimulationBuilder from './pages/company/SimulationBuilder';
import SimulationAnalytics from './pages/company/SimulationAnalytics';
import TalentPool from './pages/company/TalentPool';
import CompanyProfileSettings from './pages/company/CompanyProfileSettings';

import AdminHome from './pages/admin/AdminHome';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminReview from './pages/admin/AdminReview';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import CompanySignUp from './pages/auth/CompanySignUp';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/for-companies" element={<ForCompanies />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/for-educators" element={<ForEducators />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/company/signup" element={<CompanySignUp />} />
          
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="user"><StudentLayout /></ProtectedRoute>}>
            <Route index element={<StudentDashboard />} />
          </Route>
          
          <Route path="/explore" element={<Explore />} />
          <Route path="/sim/:id" element={<SimulationDetail />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/jobs" element={<ProtectedRoute requiredRole="user"><Jobs /></ProtectedRoute>} />
          <Route path="/sim/:id/play" element={<ProtectedRoute requiredRole="user"><SimulationPlayer /></ProtectedRoute>} />
        
        <Route path="/company" element={<ProtectedRoute requiredRole="company"><CompanyLayout /></ProtectedRoute>}>
          <Route index element={<CompanyHome />} />
          <Route path="simulations" element={<CompanySimulations />} />
          <Route path="simulations/new" element={<TemplateSelect />} />
          <Route path="simulations/:id/edit" element={<SimulationBuilder />} />
          <Route path="simulations/:id/analytics" element={<SimulationAnalytics />} />
          <Route path="submissions" element={<CompanySubmissions />} />
          <Route path="certificates/:requestId" element={<CertificateReview />} />
          <Route path="subscription" element={<CompanySubscription />} />
          <Route path="talent-pool" element={<TalentPool />} />
          <Route path="profile" element={<CompanyProfileSettings />} />
        </Route>
        
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="templates" element={<AdminTemplates />} />
          <Route path="review" element={<AdminReview />} />
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
