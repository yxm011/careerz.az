import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCertificateRequestsByCompany, reviewCertificateRequest, getSimulationById } from '../../services/storage';
import './Company.css';

const COMPANY_ID = 'company-1';
const REVIEWER_ID = 'reviewer-1';

function CertificateReview() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRequest();
  }, [requestId]);

  const loadRequest = () => {
    const requests = getCertificateRequestsByCompany(COMPANY_ID);
    const foundRequest = requests.find(r => r.id === requestId);
    
    if (!foundRequest) {
      navigate('/company/submissions');
      return;
    }

    setRequest(foundRequest);
    
    if (foundRequest.simId) {
      const sim = getSimulationById(foundRequest.simId);
      setSimulation(sim);
    }
  };

  const handleApprove = async () => {
    if (!window.confirm('Are you sure you want to approve this certificate request?')) {
      return;
    }

    setSubmitting(true);
    try {
      await reviewCertificateRequest(requestId, 'approved', REVIEWER_ID, reviewNotes);
      alert('Certificate request approved! The user will be notified.');
      navigate('/company/submissions');
    } catch (error) {
      alert('Failed to approve request: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!reviewNotes.trim()) {
      alert('Please provide feedback for the user before rejecting.');
      return;
    }

    if (!window.confirm('Are you sure you want to reject this certificate request?')) {
      return;
    }

    setSubmitting(true);
    try {
      await reviewCertificateRequest(requestId, 'rejected', REVIEWER_ID, reviewNotes);
      alert('Certificate request rejected. The user will be notified with your feedback.');
      navigate('/company/submissions');
    } catch (error) {
      alert('Failed to reject request: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!request) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Review Certificate Request</h1>
          <p className="page-subtitle">Evaluate submitted work and approve or reject certificate request</p>
        </div>
        <button onClick={() => navigate('/company/submissions')} className="btn btn-outline">
          ← Back to Submissions
        </button>
      </div>

      <div className="review-container">
        <div className="review-main">
          <div className="review-section">
            <h2>Candidate Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">User ID</span>
                <span className="info-value">{request.studentId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Simulation</span>
                <span className="info-value">{request.simulationTitle || simulation?.title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Difficulty Level</span>
                <span className="info-value">
                  <span className={`difficulty-badge ${simulation?.difficulty?.toLowerCase()}`}>
                    {simulation?.difficulty}
                  </span>
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Request Date</span>
                <span className="info-value">
                  {new Date(request.requestedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="review-section">
            <h2>User Submission</h2>
            <div className="submission-preview">
              {request.submission ? (
                <>
                  <div className="submission-details">
                    <p><strong>Submitted:</strong> {new Date(request.submission.submittedAt).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {request.submission.status}</p>
                  </div>
                  
                  {request.submission.submissionData && (
                    <div className="submission-data">
                      <h3>Answers & Work:</h3>
                      <div className="answers-list">
                        {Object.entries(request.submission.submissionData).map(([key, value]) => (
                          <div key={key} className="answer-item">
                            <strong>{key}:</strong>
                            <p>{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="no-data">No submission data available</p>
              )}
            </div>
          </div>

          <div className="review-section">
            <h2>Review Notes</h2>
            <p className="section-description">
              Provide feedback for the user. This will be included in the notification they receive.
            </p>
            <textarea
              className="review-textarea"
              placeholder="Enter your feedback here... (Required for rejection)"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              rows={6}
            />
          </div>

          <div className="review-actions">
            <button 
              onClick={handleReject}
              className="btn btn-danger btn-lg"
              disabled={submitting}
            >
              {submitting ? 'Processing...' : 'Reject Request'}
            </button>
            <button 
              onClick={handleApprove}
              className="btn btn-success btn-lg"
              disabled={submitting}
            >
              {submitting ? 'Processing...' : 'Approve Certificate'}
            </button>
          </div>
        </div>

        <div className="review-sidebar">
          <div className="review-tips">
            <h3>Review Guidelines</h3>
            <ul>
              <li>✓ Check if all tasks were completed</li>
              <li>✓ Evaluate quality of responses</li>
              <li>✓ Verify understanding of concepts</li>
              <li>✓ Assess professionalism in submissions</li>
            </ul>
          </div>

          <div className="review-tips">
            <h3>Approval Criteria</h3>
            <ul>
              <li>All required tasks completed</li>
              <li>Demonstrates understanding</li>
              <li>Professional quality work</li>
              <li>Meets learning objectives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateReview;
