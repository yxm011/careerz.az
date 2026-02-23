import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSimulations, createSimulationFromTemplate, createBlankSimulation } from '../../services/storage';
import './Company.css';

const COMPANY_ID = 'company-1';

function TemplateSelect() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const temps = getSimulations({ status: 'template' });
    setTemplates(temps);
  }, []);

  const handleSelectTemplate = (templateId) => {
    const newSim = createSimulationFromTemplate(templateId, COMPANY_ID);
    navigate(`/company/simulations/${newSim.id}/edit`);
  };

  const handleCreateBlank = () => {
    try {
      console.log('Creating blank simulation...');
      const newSim = createBlankSimulation(COMPANY_ID);
      console.log('Created simulation:', newSim);
      console.log('Navigating to:', `/company/simulations/${newSim.id}/edit`);
      navigate(`/company/simulations/${newSim.id}/edit`);
    } catch (error) {
      console.error('Error creating blank simulation:', error);
      alert('Error creating simulation: ' + error.message);
    }
  };

  return (
    <div className="company-page">
      <div className="page-header">
        <h1>Create a Simulation</h1>
        <p className="page-subtitle">Start from scratch or use a template</p>
      </div>

      <div className="templates-grid">
        <div className="template-card create-blank-card">
          <div className="blank-icon">✨</div>
          <h3>Create from Scratch</h3>
          <p className="template-description">
            Start with a blank canvas and build your simulation from the ground up. 
            Perfect for creating unique, custom experiences.
          </p>
          <div className="blank-features">
            <span>✓ Full customization</span>
            <span>✓ Add any block types</span>
            <span>✓ Multiple stages</span>
          </div>
          <button 
            onClick={handleCreateBlank} 
            className="btn btn-primary btn-block"
          >
            Start Building
          </button>
        </div>
        {templates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <h3>{template.title}</h3>
              <span className={`difficulty-badge ${template.difficulty.toLowerCase()}`}>
                {template.difficulty}
              </span>
            </div>
            <p className="template-description">{template.description}</p>
            <div className="template-meta">
              <span>⏱ {template.duration}</span>
              <span>📝 {template.stages.length} stages</span>
            </div>
            <div className="template-tags">
              {template.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            <button 
              onClick={() => handleSelectTemplate(template.id)} 
              className="btn btn-primary btn-block"
            >
              Use This Template
            </button>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="empty-state">
          <p>No templates available.</p>
        </div>
      )}
    </div>
  );
}

export default TemplateSelect;
