import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubmissionsByCompany, getCertificateRequestsByCompany } from '../../services/storage';
import './Company.css';

const COMPANY_ID = 'company-1';

function CompanySubmissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, reviewed
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const subs = getSubmissionsByCompany(COMPANY_ID);
    const certReqs = getCertificateRequestsByCompany(COMPANY_ID);
    setSubmissions(subs);
    setCertificateRequests(certReqs);
  };

  const getFilteredSubmissions = () => {
    let filtered = submissions;

    // Filter by certificate request status
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

    // Filter by search term
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

  const handleViewSubmission = (submission) => {
    navigate(`/company/submissions/${submission.id}`);
  };

  const handleReviewCertificate = (submission) => {
    const certReq = getCertificateRequestForSubmission(submission.id);
    if (certReq) {
      navigate(`/company/certificates/${certReq.id}`);
    }
  };

  const filteredSubmissions = getFilteredSubmissions();
  const pendingCount = certificateRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Student Submissions</h1>
          <p className="page-subtitle">Review student work and manage certificate requests</p>
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
            placeholder="Search by simulation or student ID..."
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
            All Submissions ({submissions.length})
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

      <div className="submissions-grid">
        {filteredSubmissions.length === 0 ? (
          <div className="empty-state">
            <p>No submissions found.</p>
          </div>
        ) : (
          filteredSubmissions.map(submission => {
            const certReq = getCertificateRequestForSubmission(submission.id);
            return (
              <div key={submission.id} className="submission-card">
                <div className="submission-header">
                  <div>
                    <h3>{submission.simulationTitle}</h3>
                    <p className="submission-meta">
                      Student ID: {submission.studentId}
                    </p>
                  </div>
                  <span className={`difficulty-badge ${submission.simulationDifficulty?.toLowerCase()}`}>
                    {submission.simulationDifficulty}
                  </span>
                </div>

                <div className="submission-info">
                  <div className="info-item">
                    <span className="info-label">Submitted:</span>
                    <span className="info-value">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value">
                      {submission.status === 'submitted' ? 'Completed' : submission.status}
                    </span>
                  </div>
                </div>

                {certReq && (
                  <div className={`certificate-request-status ${certReq.status}`}>
                    <div className="status-indicator">
                      {certReq.status === 'pending' && '⏳ Certificate Request Pending'}
                      {certReq.status === 'approved' && '✓ Certificate Approved'}
                      {certReq.status === 'rejected' && '✗ Certificate Rejected'}
                    </div>
                    {certReq.status === 'pending' && (
                      <p className="status-date">
                        Requested {new Date(certReq.requestedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}

                <div className="submission-actions">
                  <button 
                    onClick={() => handleViewSubmission(submission)}
                    className="btn btn-outline"
                  >
                    View Submission
                  </button>
                  {certReq && certReq.status === 'pending' && (
                    <button 
                      onClick={() => handleReviewCertificate(submission)}
                      className="btn btn-primary"
                    >
                      Review Certificate Request
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CompanySubmissions;
