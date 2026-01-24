import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSimulations, createSimulationFromTemplate } from '../../services/storage';
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

  return (
    <div className="company-page">
      <div className="page-header">
        <h1>Choose a Template</h1>
        <p className="page-subtitle">Select a template to start building your simulation</p>
      </div>

      <div className="templates-grid">
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
