import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeStorage } from './services/storage';
import DemoModeSwitcher from './components/DemoModeSwitcher';

import Landing from './pages/Landing';
import StudentLayout from './layouts/StudentLayout';
import CompanyLayout from './layouts/CompanyLayout';
import AdminLayout from './layouts/AdminLayout';

import Explore from './pages/student/Explore';
import SimulationPlayer from './pages/student/SimulationPlayer';
import StudentDashboard from './pages/student/StudentDashboard';

import CompanyHome from './pages/company/CompanyHome';
import CompanySimulations from './pages/company/CompanySimulations';
import TemplateSelect from './pages/company/TemplateSelect';
import SimulationBuilder from './pages/company/SimulationBuilder';
import SimulationAnalytics from './pages/company/SimulationAnalytics';

import AdminHome from './pages/admin/AdminHome';
import AdminTemplates from './pages/admin/AdminTemplates';
import AdminReview from './pages/admin/AdminReview';

import './App.css';

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <Router>
      <DemoModeSwitcher />
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>
        
        <Route path="/explore" element={<Explore />} />
        <Route path="/sim/:id" element={<SimulationPlayer />} />
        
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyHome />} />
          <Route path="simulations" element={<CompanySimulations />} />
          <Route path="simulations/new" element={<TemplateSelect />} />
          <Route path="simulations/:id/edit" element={<SimulationBuilder />} />
          <Route path="simulations/:id/analytics" element={<SimulationAnalytics />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="templates" element={<AdminTemplates />} />
          <Route path="review" element={<AdminReview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
