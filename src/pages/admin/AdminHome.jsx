import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSimulations } from '../../services/storage';
import './Admin.css';

function AdminHome() {
  const [stats, setStats] = useState({
    templates: 0,
    published: 0,
    pending: 0
  });

  useEffect(() => {
    const allSims = getSimulations();
    setStats({
      templates: allSims.filter(s => s.status === 'template').length,
      published: allSims.filter(s => s.status === 'published').length,
      pending: allSims.filter(s => s.status === 'draft').length
    });
  }, []);

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.templates}</div>
          <div className="stat-label">Templates</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.published}</div>
          <div className="stat-label">Published Simulations</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending Review</div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-cards">
          <Link to="/admin/templates" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Manage Templates</h3>
            <p>Create and edit simulation templates</p>
          </Link>
          <Link to="/admin/review" className="action-card">
            <div className="action-icon">✅</div>
            <h3>Review Queue</h3>
            <p>Review company submissions</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
