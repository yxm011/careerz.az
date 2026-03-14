import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSimulationById, saveSubmission, getCompanyById, requestCertificate, getCertificateRequest } from '../../services/storage';
import { loadProgress, saveProgress, markCompleted } from '../../services/progressService';
import { useAuth } from '../../contexts/AuthContext';
import BlockRenderer from '../../components/BlockRenderer';
import './SimulationPlayer.css';

function SimulationPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [simulation, setSimulation] = useState(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showTaskComplete, setShowTaskComplete] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [certificateRequest, setCertificateRequest] = useState(null);
  const [requestingCertificate, setRequestingCertificate] = useState(false);

  useEffect(() => {
    const sim = getSimulationById(id);
    if (!sim) {
      navigate('/explore');
      return;
    }
    setSimulation(sim);

    if (user) {
      loadProgress(user.id, id).then(progress => {
        if (progress) {
          setCurrentStageIndex(progress.current_stage_index || 0);
          setCurrentStepIndex(progress.current_step_index || 0);
          setAnswers(progress.answers || {});
          setCompleted(progress.completed || false);
        }
      });

      const existingRequest = getCertificateRequest(id, user.id);
      if (existingRequest) {
        setCertificateRequest(existingRequest);
      }
    }
  }, [id, navigate, user]);

  const handleAnswerChange = (blockId, value) => {
    setAnswers(prev => ({
      ...prev,
      [blockId]: value
    }));
  };

  const handleSaveProgress = async () => {
    if (!user) return;
    setSaving(true);
    await saveProgress(user.id, id, {
      currentStageIndex,
      currentStepIndex,
      answers
    });
    setTimeout(() => setSaving(false), 500);
  };

  const handleNextStep = () => {
    const currentStage = simulation.stages[currentStageIndex];
    const steps = currentStage.steps || [{ blocks: currentStage.blocks }];
    const currentStep = steps[currentStepIndex];
    
    // Only show task completion message if current step has interactive blocks (tasks)
    const hasInteractiveBlocks = currentStep?.blocks?.some(block => 
      ['multipleChoice', 'textInput', 'fileUpload', 'fillInBlanks', 'ordering', 'trueFalse', 'codeEditor', 'linkInput'].includes(block.type)
    );
    
    if (hasInteractiveBlocks) {
      setShowTaskComplete(true);
      setTimeout(() => setShowTaskComplete(false), 2000);
    }
    
    const delay = hasInteractiveBlocks ? 2000 : 0;
    
    if (currentStepIndex < steps.length - 1) {
      const newStepIndex = currentStepIndex + 1;
      setTimeout(() => {
        setCurrentStepIndex(newStepIndex);
        if (user) saveProgress(user.id, id, { currentStageIndex, currentStepIndex: newStepIndex, answers });
        window.scrollTo(0, 0);
      }, delay);
    } else {
      setTimeout(() => handleNextStage(), delay);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      const newStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(newStepIndex);
      window.scrollTo(0, 0);
    } else if (currentStageIndex > 0) {
      const prevStageIndex = currentStageIndex - 1;
      const prevStage = simulation.stages[prevStageIndex];
      const prevSteps = prevStage.steps || [{ blocks: prevStage.blocks }];
      setCurrentStageIndex(prevStageIndex);
      setCurrentStepIndex(prevSteps.length - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextStage = () => {
    if (currentStageIndex < simulation.stages.length - 1) {
      const newIndex = currentStageIndex + 1;
      setCurrentStageIndex(newIndex);
      setCurrentStepIndex(0);
      if (user) saveProgress(user.id, id, { currentStageIndex: newIndex, currentStepIndex: 0, answers });
      window.scrollTo(0, 0);
    }
  };


  const handleSubmit = async () => {
    if (window.confirm('Are you sure you want to submit this simulation? You cannot make changes after submission.')) {
      if (user) {
        await markCompleted(user.id, id, answers);
        saveSubmission(id, user.id, { answers, submittedAt: new Date().toISOString() });
      }
      setCompleted(true);
      window.scrollTo(0, 0);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/sim/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const company = getCompanyById(simulation.companyId);
    const shareText = `I just completed the ${simulation.title} simulation by ${company?.name} on CAREERZ.AZ! 🎉`;
    const shareUrl = `${window.location.origin}/sim/${id}`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(linkedInUrl, '_blank');
  };

  const handleRequestCertificate = async () => {
    if (!user) return;
    setRequestingCertificate(true);
    try {
      const submissionId = `sub-${Date.now()}`;
      const request = requestCertificate(id, user.id, submissionId);
      setCertificateRequest(request);
      alert('Certificate request submitted! The company will review your work and notify you once approved.');
    } catch (error) {
      alert(error.message || 'Failed to request certificate. Please try again.');
    } finally {
      setRequestingCertificate(false);
    }
  };

  if (!simulation) {
    return <div className="loading">Loading...</div>;
  }

  if (completed) {
    const company = getCompanyById(simulation.companyId);
    const studentId = user?.id || 'student';
    return (
      <div className="completion-screen">
        <div className="completion-content">
          <div className="completion-badge">🎉</div>
          <h1>Congratulations!</h1>
          <h2>You've completed the {simulation.title}</h2>
          <p className="completion-company">by {company?.name}</p>
          
          <div className="completion-certificate">
            <div className="certificate-icon">🏆</div>
            {!certificateRequest ? (
              <>
                <h3>Request Your Certificate</h3>
                <p className="certificate-description">
                  You have successfully completed this simulation! To receive your certificate of completion,
                  submit a request for {company?.name} to review your work.
                </p>
                <div className="certificate-info">
                  <h4>What happens next?</h4>
                  <ul>
                    <li>✓ {company?.name} will review your submissions</li>
                    <li>✓ You'll be notified once your work is approved</li>
                    <li>✓ Your certificate will be available for download</li>
                  </ul>
                </div>
                <button 
                  onClick={handleRequestCertificate} 
                  className="btn btn-success btn-lg"
                  disabled={requestingCertificate}
                >
                  {requestingCertificate ? 'Submitting Request...' : 'Request Certificate'}
                </button>
              </>
            ) : (
              <>
                <h3>
                  {certificateRequest.status === 'pending' && 'Certificate Request Pending'}
                  {certificateRequest.status === 'approved' && 'Certificate Approved!'}
                  {certificateRequest.status === 'rejected' && 'Certificate Request Reviewed'}
                </h3>
                <p className="certificate-description">
                  {certificateRequest.status === 'pending' && `Your certificate request has been submitted to ${company?.name}. You'll be notified once they review your work.`}
                  {certificateRequest.status === 'approved' && `Congratulations! ${company?.name} has approved your certificate request. You can now download your certificate.`}
                  {certificateRequest.status === 'rejected' && `${company?.name} has reviewed your submission. ${certificateRequest.reviewNotes}`}
                </p>
                {certificateRequest.status === 'pending' && (
                  <div className="certificate-status">
                    <div className="status-badge pending">⏳ Under Review</div>
                    <p className="status-date">Requested on {new Date(certificateRequest.requestedAt).toLocaleDateString()}</p>
                  </div>
                )}
                {certificateRequest.status === 'approved' && (
                  <>
                    <div className="certificate-preview">
                      <div className="certificate-header">Certificate of Completion</div>
                      <div className="certificate-body">
                        <p>This certifies that</p>
                        <h4>{user?.user_metadata?.full_name || user?.email || 'Student'}</h4>
                        <p>has successfully completed</p>
                        <h4>{simulation.title}</h4>
                        <p className="certificate-company">at {company?.name}</p>
                        <p className="certificate-date">{new Date(certificateRequest.reviewedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                    <button className="btn btn-success btn-lg">
                      Download Certificate
                    </button>
                  </>
                )}
                {certificateRequest.status === 'rejected' && (
                  <button 
                    onClick={() => navigate('/explore')} 
                    className="btn btn-primary btn-lg"
                  >
                    Explore More Simulations
                  </button>
                )}
              </>
            )}
          </div>

          <div className="completion-share">
            <h3>Share Your Achievement</h3>
            <p>Let your network know about your accomplishment!</p>
            <div className="share-buttons">
              <button onClick={handleShareLinkedIn} className="btn btn-linkedin">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Share on LinkedIn
              </button>
              <button onClick={handleCopyLink} className="btn btn-outline">
                {copiedLink ? '✓ Link Copied!' : '🔗 Copy Link'}
              </button>
            </div>
          </div>

          <div className="completion-actions">
            <button onClick={() => navigate('/explore')} className="btn btn-primary btn-lg">
              Explore More Simulations
            </button>
            <button onClick={() => navigate('/student/dashboard')} className="btn btn-secondary btn-lg">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStage = simulation.stages[currentStageIndex];
  const steps = currentStage.steps || [{ blocks: currentStage.blocks }];
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isLastStage = currentStageIndex === simulation.stages.length - 1;
  const isFirstStep = currentStepIndex === 0 && currentStageIndex === 0;

  return (
    <div className="simulation-player">
      {showTaskComplete && (
        <div className="task-complete-overlay">
          <div className="task-complete-message">
            <div className="task-complete-icon">✨</div>
            <h2>Well Done!</h2>
            <p>Task completed successfully</p>
          </div>
        </div>
      )}
      <div className="player-sidebar">
        <div className="sidebar-header">
          <h3>{simulation.title}</h3>
          <button onClick={() => navigate('/explore')} className="btn-close">✕</button>
        </div>
        <div className="stages-list">
          {simulation.stages.map((stage, index) => (
            <div
              key={stage.id}
              className={`stage-item ${index === currentStageIndex ? 'active' : ''} ${index < currentStageIndex ? 'completed' : ''}`}
              onClick={() => setCurrentStageIndex(index)}
            >
              <div className="stage-number">{index + 1}</div>
              <div className="stage-title">{stage.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="player-main">
        <div className="stage-header">
          <h1>{currentStage.title}</h1>
          <div className="step-indicators">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`step-indicator ${index === currentStepIndex ? 'active' : ''} ${index < currentStepIndex ? 'completed' : ''}`}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="blocks-container">
          {(currentStep?.blocks || []).map(block => (
            <BlockRenderer
              key={block.id}
              block={block}
              value={answers[block.id]}
              onChange={(value) => handleAnswerChange(block.id, value)}
            />
          ))}
        </div>

        <div className="player-controls">
          <div className="controls-left">
            {!isFirstStep && (
              <button onClick={handlePreviousStep} className="btn btn-secondary">
                Back
              </button>
            )}
          </div>
          <div className="controls-right">
            <button onClick={handleSaveProgress} className="btn btn-outline" disabled={saving}>
              {saving ? 'Saved!' : 'Save Progress'}
            </button>
            {!(isLastStep && isLastStage) ? (
              <button onClick={handleNextStep} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn btn-success">
                Submit Simulation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationPlayer;
