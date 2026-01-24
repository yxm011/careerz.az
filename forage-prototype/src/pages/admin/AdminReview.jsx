import { useState, useEffect } from 'react';
import { getSimulations, getCompanyById, publishSimulation, deleteSimulation } from '../../services/storage';
import './Admin.css';

function AdminReview() {
  const [pendingSimulations, setPendingSimulations] = useState([]);

  const loadPending = () => {
    const pending = getSimulations({ status: 'draft' });
    setPendingSimulations(pending);
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = (id) => {
    if (window.confirm('Approve and publish this simulation?')) {
      publishSimulation(id);
      loadPending();
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Reject and delete this simulation?')) {
      deleteSimulation(id);
      loadPending();
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Review Queue</h1>
        <p className="page-subtitle">Review and approve company submissions</p>
      </div>

      <div className="review-list">
        {pendingSimulations.map(sim => {
          const company = getCompanyById(sim.companyId);
          return (
            <div key={sim.id} className="review-item">
              <div className="review-header">
                <div>
                  <h3>{sim.title}</h3>
                  <span className="company-badge">{company?.name || 'Unknown Company'}</span>
                </div>
                <span className={`difficulty-badge ${sim.difficulty.toLowerCase()}`}>
                  {sim.difficulty}
                </span>
              </div>
              <p className="review-description">{sim.description}</p>
              <div className="review-meta">
                <span>📝 {sim.stages.length} stages</span>
                <span>⏱ {sim.duration}</span>
                <span>🏷️ {sim.tags.join(', ')}</span>
              </div>
              <div className="review-details">
                <strong>Stages:</strong>
                <ul>
                  {sim.stages.map((stage, idx) => (
                    <li key={stage.id}>
                      {idx + 1}. {stage.title} ({stage.blocks.length} blocks)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="review-actions">
                <button onClick={() => handleApprove(sim.id)} className="btn btn-success">
                  ✓ Approve & Publish
                </button>
                <button className="btn btn-outline">View Details</button>
                <button onClick={() => handleReject(sim.id)} className="btn btn-danger">
                  ✕ Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {pendingSimulations.length === 0 && (
        <div className="empty-state">
          <p>No simulations pending review.</p>
        </div>
      )}
    </div>
  );
}

export default AdminReview;
