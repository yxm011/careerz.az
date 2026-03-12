import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSimulations, getCertificateRequestsByCompany } from '../../services/storage';
import './Company.css';

const COMPANY_ID = 'company-1';

function CompanyHome() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    pendingReviews: 0
  });

  useEffect(() => {
    const sims = getSimulations({ companyId: COMPANY_ID });
    const requests = getCertificateRequestsByCompany(COMPANY_ID);
    
    setStats({
      total: sims.length,
      published: sims.filter(s => s.status === 'published').length,
      draft: sims.filter(s => s.status === 'draft').length,
      pendingReviews: requests.filter(r => r.status === 'pending').length
    });
  }, []);

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Company Dashboard</h1>
          <p className="page-subtitle">Manage your hiring simulations and candidate pipeline</p>
        </div>
        <div className="header-actions">
          <Link to="/company/subscription" className="btn btn-outline">
            ⭐ Upgrade Plan
          </Link>
          <Link to="/company/simulations/new" className="btn btn-primary">
            + Create New Simulation
          </Link>
        </div>
      </div>

      <div className="analytics-stats-grid">
        <div className="analytics-stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <span className="stat-label">Total Simulations</span>
            <span className="stat-number">{stats.total}</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <span className="stat-label">Published</span>
            <span className="stat-number">{stats.published}</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <span className="stat-label">Drafts</span>
            <span className="stat-number">{stats.draft}</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon" style={{ background: stats.pendingReviews > 0 ? '#fee2e2' : '#f8fafc', color: stats.pendingReviews > 0 ? '#ef4444' : '#64748b' }}>🔔</div>
          <div className="stat-content">
            <span className="stat-label">Pending Reviews</span>
            <span className="stat-number" style={{ color: stats.pendingReviews > 0 ? '#ef4444' : '#0f172a' }}>{stats.pendingReviews}</span>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0f172a' }}>Quick Actions</h2>
        <div className="action-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Link to="/company/simulations/new" className="action-card" style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            <div className="action-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>Create Simulation</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: 1.5 }}>Start from a template and customize your candidate experience.</p>
          </Link>
          
          <Link to="/company/simulations" className="action-card" style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            <div className="action-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚙️</div>
            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>Manage Simulations</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: 1.5 }}>View, edit, or publish your existing simulations.</p>
          </Link>
          
          <Link to="/company/submissions" className="action-card" style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textDecoration: 'none', transition: 'all 0.3s ease', position: 'relative' }}>
            {stats.pendingReviews > 0 && (
              <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.875rem', boxShadow: '0 2px 4px rgba(239,68,68,0.3)' }}>
                {stats.pendingReviews} New
              </span>
            )}
            <div className="action-icon" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👥</div>
            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>Review Candidates</h3>
            <p style={{ color: '#64748b', margin: 0, lineHeight: 1.5 }}>Review submissions and approve certificate requests.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CompanyHome;
