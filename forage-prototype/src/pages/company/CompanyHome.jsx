import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSimulations } from '../../services/storage';
import './Company.css';

const COMPANY_ID = 'company-1';

function CompanyHome() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });

  useEffect(() => {
    const sims = getSimulations({ companyId: COMPANY_ID });
    setStats({
      total: sims.length,
      published: sims.filter(s => s.status === 'published').length,
      draft: sims.filter(s => s.status === 'draft').length
    });
  }, []);

  return (
    <div className="company-page">
      <div className="page-header">
        <h1>Company Dashboard</h1>
        <Link to="/company/simulations/new" className="btn btn-primary">
          + Create New Simulation
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Simulations</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.published}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.draft}</div>
          <div className="stat-label">Drafts</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <Link to="/company/simulations/new" className="action-card">
            <div className="action-icon">✨</div>
            <h3>Create Simulation</h3>
            <p>Start from a template and customize</p>
          </Link>
          <Link to="/company/simulations" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Manage Simulations</h3>
            <p>View and edit your simulations</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CompanyHome;
