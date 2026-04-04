import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSimulationsFromDB, deleteSimulationInDB, publishSimulationInDB } from '../../services/storage';
import { useAuth } from '../../contexts/AuthContext';
import './Company.css';

function CompanySimulations() {
  const { profile } = useAuth();
  const companyId = profile?.id;
  const [simulations, setSimulations] = useState([]);
  const [filter, setFilter] = useState('all');

  const loadSimulations = async () => {
    if (!companyId) return;
    const sims = await getSimulationsFromDB({ companyId });
    setSimulations(sims);
  };

  useEffect(() => {
    loadSimulations();
  }, [companyId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this simulation?')) {
      await deleteSimulationInDB(id);
      await loadSimulations();
    }
  };

  const handlePublish = async (id) => {
    if (window.confirm('Publish this simulation? It will be visible to all users.')) {
      await publishSimulationInDB(id);
      await loadSimulations();
    }
  };

  const filteredSims = filter === 'all' 
    ? simulations 
    : simulations.filter(s => s.status === filter);

  return (
    <div className="company-page">
      <div className="page-header">
        <h1>My Simulations</h1>
        <Link to="/company/simulations/new" className="btn btn-primary">
          + Create New
        </Link>
      </div>

      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'tab active' : 'tab'}
          onClick={() => setFilter('all')}
        >
          All ({simulations.length})
        </button>
        <button 
          className={filter === 'published' ? 'tab active' : 'tab'}
          onClick={() => setFilter('published')}
        >
          Published ({simulations.filter(s => s.status === 'published').length})
        </button>
        <button 
          className={filter === 'draft' ? 'tab active' : 'tab'}
          onClick={() => setFilter('draft')}
        >
          Drafts ({simulations.filter(s => s.status === 'draft').length})
        </button>
      </div>

      <div className="simulations-table">
        {filteredSims.length === 0 ? (
          <div className="empty-state">
            <p>No simulations found.</p>
            <Link to="/company/simulations/new" className="btn btn-primary">
              Create Your First Simulation
            </Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Version</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSims.map(sim => (
                <tr key={sim.id}>
                  <td>
                    <div className="sim-title">{sim.title}</div>
                    <div className="sim-description">{sim.description.substring(0, 80)}...</div>
                  </td>
                  <td>
                    <span className={`status-badge ${sim.status}`}>
                      {sim.status}
                    </span>
                  </td>
                  <td>{sim.difficulty}</td>
                  <td>{sim.duration}</td>
                  <td>v{sim.version}</td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/company/simulations/${sim.id}/edit`} className="btn-icon" title="Edit">
                        ✏️
                      </Link>
                      {sim.status === 'draft' && (
                        <button onClick={() => handlePublish(sim.id)} className="btn-icon" title="Publish">
                          🚀
                        </button>
                      )}
                      <Link to={`/company/simulations/${sim.id}/analytics`} className="btn-icon" title="Analytics">
                        📊
                      </Link>
                      <button onClick={() => handleDelete(sim.id)} className="btn-icon" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CompanySimulations;
