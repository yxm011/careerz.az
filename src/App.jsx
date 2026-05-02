import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Lazy-load all pages so the initial bundle stays small
const Landing = lazy(() => import('./pages/LandingV2'));
const ForCompanies = lazy(() => import('./pages/ForCompaniesV2'));
const Blog = lazy(() => import('./pages/BlogV2'));
const ForEducators = lazy(() => import('./pages/ForEducatorsV2'));
const StudentLayout = lazy(() => import('./layouts/StudentLayout'));
const CompanyLayout = lazy(() => import('./layouts/CompanyLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

const Explore = lazy(() => import('./pages/student/ExploreV2'));
const SimulationDetail = lazy(() => import('./pages/student/SimulationDetailV2'));
const Workspace = lazy(() => import('./pages/student/WorkspaceV2'));
const Jobs = lazy(() => import('./pages/student/JobsV2'));
const SimulationPlayer = lazy(() => import('./pages/student/SimulationPlayer'));
const SimulationOverview = lazy(() => import('./pages/student/SimulationOverview'));
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboardV2'));

const CompanyHome = lazy(() => import('./pages/company/CompanyHome'));
const CompanySimulations = lazy(() => import('./pages/company/CompanySimulations'));
const CompanySubmissions = lazy(() => import('./pages/company/CompanySubmissions'));
const CertificateReview = lazy(() => import('./pages/company/CertificateReview'));
const CompanySubscription = lazy(() => import('./pages/company/CompanySubscription'));
const TemplateSelect = lazy(() => import('./pages/company/TemplateSelect'));
const SimulationBuilder = lazy(() => import('./pages/company/SimulationBuilder'));
const SimulationAnalytics = lazy(() => import('./pages/company/SimulationAnalytics'));
const TalentPool = lazy(() => import('./pages/company/TalentPool'));
const CompanyProfileSettings = lazy(() => import('./pages/company/CompanyProfileSettings'));

const AdminHome = lazy(() => import('./pages/admin/AdminHome'));
const AdminTemplates = lazy(() => import('./pages/admin/AdminTemplates'));
const AdminReview = lazy(() => import('./pages/admin/AdminReview'));

const SignIn = lazy(() => import('./pages/auth/SignIn'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const CompanySignUp = lazy(() => import('./pages/auth/CompanySignUp'));

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#64748b' }}>
    Loading...
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
