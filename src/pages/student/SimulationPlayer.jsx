import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSimulationById, getStudentProgress, saveProgress, saveSubmission, getCompanyById } from '../../services/storage';
import BlockRenderer from '../../components/BlockRenderer';
import './SimulationPlayer.css';

const STUDENT_ID = 'student-1';

function SimulationPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const sim = getSimulationById(id);
    if (!sim) {
      navigate('/explore');
      return;
    }
    setSimulation(sim);

    const progress = getStudentProgress(id, STUDENT_ID);
    if (progress) {
      setCurrentStageIndex(progress.currentStageIndex || 0);
      setAnswers(progress.answers || {});
      setCompleted(progress.completed || false);
    }
  }, [id, navigate]);

  const handleAnswerChange = (blockId, value) => {
    setAnswers(prev => ({
      ...prev,
      [blockId]: value
    }));
  };

  const handleSaveProgress = () => {
    setSaving(true);
    saveProgress(id, STUDENT_ID, {
      currentStageIndex,
      answers,
      completed: false
    });
    setTimeout(() => setSaving(false), 500);
  };

  const handleNextStage = () => {
    if (currentStageIndex < simulation.stages.length - 1) {
      const newIndex = currentStageIndex + 1;
      setCurrentStageIndex(newIndex);
      saveProgress(id, STUDENT_ID, {
        currentStageIndex: newIndex,
        answers,
        completed: false
      });
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStage = () => {
    if (currentStageIndex > 0) {
      const newIndex = currentStageIndex - 1;
      setCurrentStageIndex(newIndex);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit this simulation? You cannot make changes after submission.')) {
      saveSubmission(id, STUDENT_ID, {
        answers,
        submittedAt: new Date().toISOString()
      });
      setCompleted(true);
    }
  };

  if (!simulation) {
    return <div className="loading">Loading...</div>;
  }

  if (completed) {
    const company = getCompanyById(simulation.companyId);
    return (
      <div className="completion-screen">
        <div className="completion-content">
          <div className="completion-badge">✓</div>
          <h1>Congratulations!</h1>
          <h2>You've completed the {simulation.title}</h2>
          <p className="completion-company">by {company?.name}</p>
          <div className="completion-certificate">
            <div className="certificate-header">Certificate of Completion</div>
            <div className="certificate-body">
              <p>This certifies that</p>
              <h3>Student #{STUDENT_ID}</h3>
              <p>has successfully completed</p>
              <h4>{simulation.title}</h4>
              <p className="certificate-date">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="completion-actions">
            <button onClick={() => navigate('/explore')} className="btn btn-primary">
              Explore More Simulations
            </button>
            <button onClick={() => navigate('/student/dashboard')} className="btn btn-secondary">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStage = simulation.stages[currentStageIndex];
  const isLastStage = currentStageIndex === simulation.stages.length - 1;

  return (
    <div className="simulation-player">
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
          <div className="stage-progress">
            Stage {currentStageIndex + 1} of {simulation.stages.length}
          </div>
        </div>

        <div className="blocks-container">
          {currentStage.blocks.map(block => (
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
            {currentStageIndex > 0 && (
              <button onClick={handlePreviousStage} className="btn btn-secondary">
                ← Previous Stage
              </button>
            )}
          </div>
          <div className="controls-right">
            <button onClick={handleSaveProgress} className="btn btn-outline" disabled={saving}>
              {saving ? 'Saved!' : 'Save Progress'}
            </button>
            {!isLastStage ? (
              <button onClick={handleNextStage} className="btn btn-primary">
                Next Stage →
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
