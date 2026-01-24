import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSimulations, getCompanyById, createSimulationFromTemplate } from '../../services/storage';
import './Admin.css';

function AdminTemplates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const temps = getSimulations({ status: 'template' });
    setTemplates(temps);
  }, []);

  const handleCreateTemplate = () => {
    // For MVP, we'll create a blank template
    const blankTemplate = {
      id: `template-${Date.now()}`,
      companyId: 'admin',
      title: 'New Template',
      description: 'Template description',
      tags: ['New'],
      difficulty: 'Intermediate',
      duration: '2-3 hours',
      status: 'template',
      version: 1,
      stages: [
        {
          id: 'stage-1',
          title: 'Stage 1',
          blocks: []
        }
      ],
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const allSims = JSON.parse(localStorage.getItem('careerz_simulations') || '[]');
    allSims.push(blankTemplate);
    localStorage.setItem('careerz_simulations', JSON.stringify(allSims));
    
    // Redirect to company builder to edit
    navigate(`/company/simulations/${blankTemplate.id}/edit`);
  };

  const handleDuplicate = (templateId) => {
    const newSim = createSimulationFromTemplate(templateId, 'admin');
    newSim.status = 'template';
    const allSims = JSON.parse(localStorage.getItem('careerz_simulations') || '[]');
    const index = allSims.findIndex(s => s.id === newSim.id);
    if (index !== -1) {
      allSims[index].status = 'template';
      localStorage.setItem('careerz_simulations', JSON.stringify(allSims));
    }
    setTemplates(getSimulations({ status: 'template' }));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Simulation Templates</h1>
        <button className="btn btn-primary" onClick={handleCreateTemplate}>+ Create Template</button>
      </div>

      <div className="templates-list">
        {templates.map(template => {
          const company = getCompanyById(template.companyId);
          return (
            <div key={template.id} className="template-item">
              <div className="template-info">
                <h3>{template.title}</h3>
                <p>{template.description}</p>
                <div className="template-meta">
                  <span className="meta-item">
                    <strong>Company:</strong> {company?.name || 'N/A'}
                  </span>
                  <span className="meta-item">
                    <strong>Difficulty:</strong> {template.difficulty}
                  </span>
                  <span className="meta-item">
                    <strong>Stages:</strong> {template.stages.length}
                  </span>
                  <span className="meta-item">
                    <strong>Duration:</strong> {template.duration}
                  </span>
                </div>
                <div className="template-tags">
                  {template.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="template-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => navigate(`/company/simulations/${template.id}/edit`)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleDuplicate(template.id)}
                >
                  Duplicate
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {templates.length === 0 && (
        <div className="empty-state">
          <p>No templates available.</p>
        </div>
      )}
    </div>
  );
}

export default AdminTemplates;
