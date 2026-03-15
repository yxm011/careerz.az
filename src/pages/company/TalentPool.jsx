import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubmissionsByCompanyFromDB, getSimulationsFromDB } from '../../services/storage';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import './Company.css';

function TalentPool() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const COMPANY_ID = profile?.id || 'company-1';

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSim, setSelectedSim] = useState('all');
  const [simulations, setSimulations] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadTalentPool();
  }, [COMPANY_ID]);

  const loadTalentPool = async () => {
    setLoading(true);
    const sims = await getSimulationsFromDB({ companyId: COMPANY_ID });
    setSimulations(sims);

    const submissions = await getSubmissionsByCompanyFromDB(COMPANY_ID);
    const completedSubmissions = submissions.filter(s => s.status === 'submitted');

    // Try to fetch user profiles from Supabase for contact details
    const enriched = await Promise.all(
      completedSubmissions.map(async (sub) => {
        let userProfile = null;
        if (supabase && sub.studentId) {
          const { data } = await supabase
            .from('profiles')
            .select('full_name, role')
            .eq('id', sub.studentId)
            .single();
          userProfile = data;
        }

        // Get user email from auth if available
        let userEmail = null;
        if (supabase && sub.studentId) {
          // We store email in user_metadata during signup
          // For now, use studentId as fallback identifier
          userEmail = sub.studentId;
        }

        return {
          ...sub,
          candidateName: userProfile?.full_name || `Candidate ${sub.studentId?.slice(-6) || 'Unknown'}`,
          candidateEmail: userEmail,
          completedAt: sub.submittedAt,
          answers: sub.submissionData || {}
        };
      })
    );

    setCandidates(enriched);
    setLoading(false);
  };

  const getFilteredCandidates = () => {
    let filtered = candidates;
    if (selectedSim !== 'all') {
      filtered = filtered.filter(c => c.simId === selectedSim);
    }
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.simulationTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.candidateEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderAnswerValue = (value) => {
    if (!value) return <span className="answer-empty">No answer</span>;
    if (typeof value === 'string') return <p className="answer-text">{value}</p>;
    if (typeof value === 'object') return <pre className="answer-json">{JSON.stringify(value, null, 2)}</pre>;
    return <p className="answer-text">{String(value)}</p>;
  };

  const filtered = getFilteredCandidates();

  if (loading) {
    return <div className="company-page"><p>Loading talent pool...</p></div>;
  }

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Talent Pool</h1>
          <p className="page-subtitle">
            Users who completed your simulations — potential future employees
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => navigate('/company')}>
            ← Dashboard
          </button>
        </div>
      </div>

      <div className="submissions-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or simulation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-tabs">
          <button
            className={`tab ${selectedSim === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSim('all')}
          >
            All Simulations ({candidates.length})
          </button>
          {simulations.filter(s => s.status === 'published').map(sim => (
            <button
              key={sim.id}
              className={`tab ${selectedSim === sim.id ? 'active' : ''}`}
              onClick={() => setSelectedSim(sim.id)}
            >
              {sim.title}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No candidates in the talent pool yet.</p>
        </div>
      ) : (
        <div className="talent-pool-list">
          {filtered.map((candidate) => (
            <div key={candidate.id} className="talent-card">
              <div className="talent-card-header" onClick={() => toggleExpand(candidate.id)}>
                <div className="talent-info">
                  <div className="talent-avatar">
                    {candidate.candidateName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <h3 className="talent-name">{candidate.candidateName}</h3>
                    <p className="talent-meta">{candidate.simulationTitle}</p>
                  </div>
                </div>
                <div className="talent-right">
                  <div className="talent-details">
                    {candidate.candidateEmail && (
                      <span className="talent-contact">
                        📧 {candidate.candidateEmail}
                      </span>
                    )}
                    <span className="talent-date">
                      Completed: {new Date(candidate.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="expand-arrow">{expandedId === candidate.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandedId === candidate.id && (
                <div className="talent-expanded">
                  <div className="talent-section">
                    <h4>Contact Information</h4>
                    <div className="contact-grid">
                      <div className="contact-item">
                        <span className="contact-label">User ID</span>
                        <span className="contact-value">{candidate.studentId}</span>
                      </div>
                      {candidate.candidateEmail && (
                        <div className="contact-item">
                          <span className="contact-label">Email</span>
                          <a href={`mailto:${candidate.candidateEmail}`} className="contact-value contact-link">
                            {candidate.candidateEmail}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="talent-section">
                    <h4>Simulation Answers</h4>
                    {Object.keys(candidate.answers).length === 0 ? (
                      <p className="empty-text">No detailed answers recorded.</p>
                    ) : (
                      <div className="answers-list">
                        {Object.entries(candidate.answers).map(([blockId, value]) => (
                          <div key={blockId} className="answer-item">
                            <span className="answer-label">Task: {blockId}</span>
                            {renderAnswerValue(value)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TalentPool;
