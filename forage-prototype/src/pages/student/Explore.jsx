import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSimulations, getCompanyById } from '../../services/storage';
import './Explore.css';

function Explore() {
  const [simulations, setSimulations] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const published = getSimulations({ status: 'published' });
    setSimulations(published);
  }, []);

  const filteredSimulations = filter === 'all' 
    ? simulations 
    : simulations.filter(sim => sim.difficulty === filter);

  return (
    <div className="explore">
      <div className="explore-header">
        <div className="explore-header-content">
          <Link to="/" className="logo">Careerz.az</Link>
          <nav className="nav">
            <Link to="/explore">Explore</Link>
            <Link to="/student/dashboard">My Dashboard</Link>
          </nav>
        </div>
      </div>

      <div className="explore-content">
        <div className="explore-hero">
          <h1>Explore Job Simulations</h1>
          <p>Gain real-world experience from leading companies</p>
        </div>

        <div className="explore-filters">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'Beginner' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Beginner')}
          >
            Beginner
          </button>
          <button 
            className={filter === 'Intermediate' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Intermediate')}
          >
            Intermediate
          </button>
          <button 
            className={filter === 'Advanced' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Advanced')}
          >
            Advanced
          </button>
        </div>

        <div className="simulations-grid">
          {filteredSimulations.map(sim => {
            const company = getCompanyById(sim.companyId);
            return (
              <div key={sim.id} className="simulation-card">
                <div className="card-header">
                  <span className="company-name">{company?.name || 'Unknown Company'}</span>
                  <span className={`difficulty-badge ${sim.difficulty.toLowerCase()}`}>
                    {sim.difficulty}
                  </span>
                </div>
                <h3>{sim.title}</h3>
                <p className="description">{sim.description}</p>
                <div className="card-tags">
                  {sim.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <span className="duration">⏱ {sim.duration}</span>
                  <Link to={`/sim/${sim.id}`} className="btn btn-primary">
                    Start Simulation
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSimulations.length === 0 && (
          <div className="empty-state">
            <p>No simulations found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
