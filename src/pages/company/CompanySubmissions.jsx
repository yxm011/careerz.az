import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubmissionsByCompanyFromDB, getCertificateRequestsByCompany } from '../../services/storage';
import { useAuth } from '../../contexts/AuthContext';
import './Company.css';

function CompanySubmissions() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const COMPANY_ID = profile?.id || 'company-1';

  const [submissions, setSubmissions] = useState([]);
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadData();
  }, [COMPANY_ID]);

  const loadData = async () => {
    const subs = await getSubmissionsByCompanyFromDB(COMPANY_ID);
    const certReqs = getCertificateRequestsByCompany(COMPANY_ID);
    setSubmissions(subs);
    setCertificateRequests(certReqs);
  };

  const getFilteredSubmissions = () => {
    let filtered = submissions;

    if (filter === 'pending') {
      filtered = filtered.filter(sub => {
        const certReq = certificateRequests.find(req => req.submissionId === sub.id);
        return certReq && certReq.status === 'pending';
      });
    } else if (filter === 'reviewed') {
      filtered = filtered.filter(sub => {
        const certReq = certificateRequests.find(req => req.submissionId === sub.id);
        return certReq && certReq.status !== 'pending';
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.simulationTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getCertificateRequestForSubmission = (submissionId) => {
    return certificateRequests.find(req => req.submissionId === submissionId);
  };

  const handleReviewCertificate = (submission) => {
    const certReq = getCertificateRequestForSubmission(submission.id);
    if (certReq) {
      navigate(`/company/certificates/${certReq.id}`);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderAnswerValue = (value) => {
    if (!value) return <span className="answer-empty">No answer provided</span>;
    if (typeof value === 'string') return <p className="answer-text">{value}</p>;
    if (Array.isArray(value)) {
      return (
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#0f172a', fontSize: '0.9rem' }}>
          {value.map((item, i) => <li key={i}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>)}
        </ul>
      );
    }
    if (typeof value === 'object') return <pre className="answer-json">{JSON.stringify(value, null, 2)}</pre>;
    return <p className="answer-text">{String(value)}</p>;
  };

  const filteredSubmissions = getFilteredSubmissions();
  const pendingCount = certificateRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Candidate Submissions</h1>
          <p className="page-subtitle">Review answers, uploaded files, and manage certificate requests</p>
        </div>
        {pendingCount > 0 && (
          <div className="notification-badge">
            {pendingCount} Pending Certificate Request{pendingCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="submissions-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by simulation or candidate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-tabs">
          <button 
            className={`tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({submissions.length})
          </button>
          <button 
            className={`tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending Review ({pendingCount})
          </button>
          <button 
            className={`tab ${filter === 'reviewed' ? 'active' : ''}`}
            onClick={() => setFilter('reviewed')}
          >
            Reviewed
          </button>
        </div>
      </div>

      <div className="talent-pool-list">
        {filteredSubmissions.length === 0 ? (
          <div className="empty-state">
            <p>No submissions found.</p>
          </div>
        ) : (
          filteredSubmissions.map(submission => {
            const certReq = getCertificateRequestForSubmission(submission.id);
            const answers = submission.submissionData || {};
            const isExpanded = expandedId === submission.id;

            return (
              <div key={submission.id} className="talent-card">
                <div className="talent-card-header" onClick={() => toggleExpand(submission.id)}>
                  <div className="talent-info">
                    <div className="talent-avatar">
                      {submission.studentId?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <h3 className="talent-name">{submission.simulationTitle}</h3>
                      <p className="talent-meta">Candidate: {submission.studentId?.slice(-8) || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="talent-right">
                    <div className="talent-details">
                      <span className={`difficulty-badge ${submission.simulationDifficulty?.toLowerCase()}`}>
                        {submission.simulationDifficulty}
                      </span>
                      <span className="talent-date">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="expand-arrow">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="talent-expanded">
                    {certReq && (
                      <div className="talent-section">
                        <h4>Certificate Status</h4>
                        <div className={`certificate-request-status ${certReq.status}`}>
                          <div className="status-indicator">
                            {certReq.status === 'pending' && '⏳ Certificate Request Pending'}
                            {certReq.status === 'approved' && '✓ Certificate Approved'}
                            {certReq.status === 'rejected' && '✗ Certificate Rejected'}
                          </div>
                        </div>
                        {certReq.status === 'pending' && (
                          <button 
                            onClick={() => handleReviewCertificate(submission)}
                            className="btn btn-primary"
                            style={{ marginTop: '0.75rem' }}
                          >
                            Review Certificate Request
                          </button>
                        )}
                      </div>
                    )}

                    <div className="talent-section">
                      <h4>Contact Information</h4>
                      <div className="contact-grid">
                        <div className="contact-item">
                          <span className="contact-label">User ID</span>
                          <span className="contact-value">{submission.studentId}</span>
                        </div>
                      </div>
                    </div>

                    <div className="talent-section">
                      <h4>Answers & Uploaded Files</h4>
                      {Object.keys(answers).length === 0 ? (
                        <p className="empty-text" style={{ color: '#94a3b8' }}>No detailed answers recorded for this submission.</p>
                      ) : (
                        <div className="answers-list">
                          {Object.entries(answers).map(([blockId, value]) => (
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
            );
          })
        )}
      </div>
    </div>
  );
}

export default CompanySubmissions;
