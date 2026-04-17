import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSimulationsFromDB, getCompanyByIdFromDB } from '../../services/storage';
import { useTranslation } from '../../context/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Explore.css';

function Explore() {
  const { t } = useTranslation();
  const [simulations, setSimulations] = useState([]);
  const [companyNames, setCompanyNames] = useState({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadSimulations = async () => {
      const published = await getSimulationsFromDB({ status: 'published' });
      setSimulations(published);

      // Fetch company names for all unique company IDs
      const uniqueCompanyIds = [...new Set(published.map(s => s.companyId).filter(Boolean))];
      const names = {};
      await Promise.all(
        uniqueCompanyIds.map(async (id) => {
          const company = await getCompanyByIdFromDB(id);
          names[id] = company?.name || null;
        })
      );
      setCompanyNames(names);
    };

    loadSimulations();
  }, []);

  const filteredSimulations = filter === 'all' 
    ? simulations 
    : simulations.filter(sim => sim.difficulty === filter);

  return (
    <div className="explore">
      <Navbar />

      <div className="explore-content">
        <div className="explore-hero">
          <h1>{t('explore.title')}</h1>
          <p>{t('explore.subtitle')}</p>
        </div>

        <div className="explore-filters">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            {t('explore.filters.all')}
          </button>
          <button 
            className={filter === 'Beginner' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Beginner')}
          >
            {t('explore.filters.beginner')}
          </button>
          <button 
            className={filter === 'Intermediate' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Intermediate')}
          >
            {t('explore.filters.intermediate')}
          </button>
          <button 
            className={filter === 'Advanced' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('Advanced')}
          >
            {t('explore.filters.advanced')}
          </button>
        </div>

        <div className="simulations-grid">
          {filteredSimulations.map(sim => {
            return (
              <div key={sim.id} className="simulation-card">
                <div className="card-header">
                  <span className="company-name">{companyNames[sim.companyId] || t('explore.unknownCompany')}</span>
                  <span className={`difficulty-badge ${sim.difficulty?.toLowerCase() || 'beginner'}`}>
                    {sim.difficulty || 'Beginner'}
                  </span>
                </div>
                <h3>{sim.title}</h3>
                <p className="description">{sim.description}</p>
                <div className="card-tags">
                  {(sim.tags || []).map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <span className="duration">⏱ {sim.duration}</span>
                  <Link to={`/sim/${sim.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSimulations.length === 0 && (
          <div className="empty-state">
            <p>{t('explore.emptyState')}</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Explore;
