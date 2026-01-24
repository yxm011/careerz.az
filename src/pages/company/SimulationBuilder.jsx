import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSimulationById, updateSimulation, publishSimulation } from '../../services/storage';
import BlockRenderer from '../../components/BlockRenderer';
import RichTextEditor from '../../components/RichTextEditor';
import './SimulationBuilder.css';

function SimulationBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [editingStageIndex, setEditingStageIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const addingBlockRef = useRef(false);

  useEffect(() => {
    const sim = getSimulationById(id);
    if (!sim) {
      navigate('/company/simulations');
      return;
    }
    setSimulation(sim);
  }, [id, navigate]);

  const handleSave = () => {
    setSaving(true);
    updateSimulation(simulation);
    setTimeout(() => setSaving(false), 500);
  };

  const handlePublish = () => {
    if (window.confirm('Publish this simulation? It will be visible to all students.')) {
      publishSimulation(id);
      navigate('/company/simulations');
    }
  };

  const handleMetadataChange = (field, value) => {
    setSimulation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStageChange = (stageIndex, field, value) => {
    setSimulation(prev => {
      const newStages = [...prev.stages];
      newStages[stageIndex] = {
        ...newStages[stageIndex],
        [field]: value
      };
      return { ...prev, stages: newStages };
    });
  };

  const handleBlockChange = (stageIndex, blockIndex, field, value) => {
    setSimulation(prev => {
      const newStages = [...prev.stages];
      const newBlocks = [...newStages[stageIndex].blocks];
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        data: {
          ...newBlocks[blockIndex].data,
          [field]: value
        }
      };
      newStages[stageIndex] = {
        ...newStages[stageIndex],
        blocks: newBlocks
      };
      return { ...prev, stages: newStages };
    });
  };

  const handleAddBlock = useCallback((stageIndex, blockType, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (addingBlockRef.current) return;
    addingBlockRef.current = true;

    const newBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: blockType,
      data: getDefaultBlockData(blockType)
    };

    setSimulation(prev => {
      const newStages = [...prev.stages];
      newStages[stageIndex].blocks.push(newBlock);
      return { ...prev, stages: newStages };
    });

    setTimeout(() => {
      addingBlockRef.current = false;
    }, 300);
  }, []);

  const handleDeleteBlock = (stageIndex, blockIndex) => {
    if (window.confirm('Delete this block?')) {
      setSimulation(prev => {
        const newStages = [...prev.stages];
        newStages[stageIndex].blocks.splice(blockIndex, 1);
        return { ...prev, stages: newStages };
      });
    }
  };

  const handleMoveBlockUp = (stageIndex, blockIndex) => {
    if (blockIndex === 0) return;
    setSimulation(prev => {
      const newStages = [...prev.stages];
      const blocks = [...newStages[stageIndex].blocks];
      [blocks[blockIndex - 1], blocks[blockIndex]] = [blocks[blockIndex], blocks[blockIndex - 1]];
      newStages[stageIndex].blocks = blocks;
      return { ...prev, stages: newStages };
    });
  };

  const handleMoveBlockDown = (stageIndex, blockIndex) => {
    const stage = simulation.stages[stageIndex];
    if (blockIndex === stage.blocks.length - 1) return;
    setSimulation(prev => {
      const newStages = [...prev.stages];
      const blocks = [...newStages[stageIndex].blocks];
      [blocks[blockIndex], blocks[blockIndex + 1]] = [blocks[blockIndex + 1], blocks[blockIndex]];
      newStages[stageIndex].blocks = blocks;
      return { ...prev, stages: newStages };
    });
  };

  const handleDuplicateBlock = (stageIndex, blockIndex) => {
    setSimulation(prev => {
      const newStages = [...prev.stages];
      const blockToDuplicate = newStages[stageIndex].blocks[blockIndex];
      const duplicatedBlock = {
        ...JSON.parse(JSON.stringify(blockToDuplicate)),
        id: `block-${Date.now()}`
      };
      newStages[stageIndex].blocks.splice(blockIndex + 1, 0, duplicatedBlock);
      return { ...prev, stages: newStages };
    });
  };

  const handleAddStage = () => {
    const newStage = {
      id: `stage-${Date.now()}`,
      title: 'New Stage',
      blocks: []
    };
    setSimulation(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));
  };

  const handleDeleteStage = (stageIndex) => {
    if (window.confirm('Delete this stage and all its blocks?')) {
      setSimulation(prev => {
        const newStages = [...prev.stages];
        newStages.splice(stageIndex, 1);
        return { ...prev, stages: newStages };
      });
      if (editingStageIndex >= simulation.stages.length - 1) {
        setEditingStageIndex(Math.max(0, editingStageIndex - 1));
      }
    }
  };

  if (!simulation) {
    return <div className="loading">Loading...</div>;
  }

  if (previewMode) {
    return (
      <div className="builder-preview">
        <div className="preview-header">
          <h2>Preview Mode</h2>
          <button onClick={() => setPreviewMode(false)} className="btn btn-secondary">
            Exit Preview
          </button>
        </div>
        <div className="preview-content">
          <div className="preview-sidebar">
            {simulation.stages.map((stage, idx) => (
              <div
                key={stage.id}
                className={`preview-stage-item ${idx === editingStageIndex ? 'active' : ''}`}
                onClick={() => setEditingStageIndex(idx)}
              >
                <div className="stage-number">{idx + 1}</div>
                <div className="stage-title">{stage.title}</div>
              </div>
            ))}
          </div>
          <div className="preview-main">
            <h1>{simulation.stages[editingStageIndex].title}</h1>
            <div className="preview-blocks">
              {simulation.stages[editingStageIndex].blocks.map(block => (
                <BlockRenderer key={block.id} block={block} value="" onChange={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStage = simulation.stages[editingStageIndex];

  return (
    <div className="simulation-builder">
      <div className="builder-header">
        <div className="builder-title">
          <h2>Simulation Builder</h2>
          <span className="status-badge">{simulation.status}</span>
        </div>
        <div className="builder-actions">
          <button onClick={() => setPreviewMode(true)} className="btn btn-outline">
            👁 Preview
          </button>
          <button onClick={handleSave} className="btn btn-secondary" disabled={saving}>
            {saving ? 'Saved!' : '💾 Save'}
          </button>
          {simulation.status === 'draft' && (
            <button onClick={handlePublish} className="btn btn-success">
              🚀 Publish
            </button>
          )}
          <button onClick={() => navigate('/company/simulations')} className="btn btn-outline">
            ✕ Close
          </button>
        </div>
      </div>

      <div className="builder-content">
        <div className="builder-sidebar">
          <div className="sidebar-section">
            <h3>Metadata</h3>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={simulation.title}
                onChange={(e) => handleMetadataChange('title', e.target.value)}
                className="input"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={simulation.description}
                onChange={(e) => handleMetadataChange('description', e.target.value)}
                className="textarea"
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select
                value={simulation.difficulty}
                onChange={(e) => handleMetadataChange('difficulty', e.target.value)}
                className="select"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                value={simulation.duration}
                onChange={(e) => handleMetadataChange('duration', e.target.value)}
                className="input"
                placeholder="e.g., 2-3 hours"
              />
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <h3>Stages</h3>
              <button onClick={handleAddStage} className="btn-icon">+</button>
            </div>
            <div className="stages-list">
              {simulation.stages.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={`stage-item ${idx === editingStageIndex ? 'active' : ''}`}
                  onClick={() => setEditingStageIndex(idx)}
                >
                  <span>{idx + 1}. {stage.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStage(idx);
                    }}
                    className="btn-icon-small"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="builder-main">
          <div className="stage-editor">
            <div className="stage-editor-header">
              <input
                type="text"
                value={currentStage.title}
                onChange={(e) => handleStageChange(editingStageIndex, 'title', e.target.value)}
                className="stage-title-input"
                placeholder="Stage Title"
              />
            </div>

            <div className="blocks-editor">
              {currentStage.blocks.map((block, blockIdx) => (
                <div key={block.id} className="block-editor">
                  <div className="block-editor-header">
                    <span className="block-type">{block.type}</span>
                    <div className="block-actions">
                      <button
                        onClick={() => handleMoveBlockUp(editingStageIndex, blockIdx)}
                        className="btn-icon-small"
                        disabled={blockIdx === 0}
                        title="Move up"
                      >
                        ⬆️
                      </button>
                      <button
                        onClick={() => handleMoveBlockDown(editingStageIndex, blockIdx)}
                        className="btn-icon-small"
                        disabled={blockIdx === currentStage.blocks.length - 1}
                        title="Move down"
                      >
                        ⬇️
                      </button>
                      <button
                        onClick={() => handleDuplicateBlock(editingStageIndex, blockIdx)}
                        className="btn-icon-small"
                        title="Duplicate"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => handleDeleteBlock(editingStageIndex, blockIdx)}
                        className="btn-icon-small"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="block-editor-content">
                    {renderBlockEditor(block, editingStageIndex, blockIdx, handleBlockChange)}
                  </div>
                </div>
              ))}

              <div className="add-block-menu">
                <h4>Add Block</h4>
                <div className="block-type-buttons">
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'richText', e)} className="block-type-btn" type="button">
                    📝 Rich Text
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'video', e)} className="block-type-btn" type="button">
                    🎥 Video
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'asset', e)} className="block-type-btn" type="button">
                    📎 Assets
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'multipleChoice', e)} className="block-type-btn" type="button">
                    ☑️ Multiple Choice
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'fillInBlanks', e)} className="block-type-btn" type="button">
                    📋 Fill in Blanks
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'ordering', e)} className="block-type-btn" type="button">
                    🔢 Ordering
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'trueFalse', e)} className="block-type-btn" type="button">
                    ⚖️ True/False
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'dropdown', e)} className="block-type-btn" type="button">
                    📋 Dropdown
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'matching', e)} className="block-type-btn" type="button">
                    🔗 Matching
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'codeEditor', e)} className="block-type-btn" type="button">
                    💻 Code Editor
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'textInput', e)} className="block-type-btn" type="button">
                    ✍️ Text Input
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'fileUpload', e)} className="block-type-btn" type="button">
                    📁 File Upload
                  </button>
                  <button onClick={(e) => handleAddBlock(editingStageIndex, 'linkInput', e)} className="block-type-btn" type="button">
                    🔗 Link Input
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getDefaultBlockData(blockType) {
  switch (blockType) {
    case 'richText':
      return { content: '<p>Start typing your content here...</p>' };
    case 'video':
      return { title: 'Instructional Video', description: 'Watch this video to learn more', videoUrl: '', transcript: '' };
    case 'asset':
      return { files: [] };
    case 'multipleChoice':
      return { 
        question: 'Your question here?', 
        description: '',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], 
        multiSelect: false 
      };
    case 'fillInBlanks':
      return { 
        question: 'Complete the sentence', 
        instructions: 'Fill in the blanks below',
        text: 'This is a sentence with [blank] and another [blank].', 
        hints: [] 
      };
    case 'ordering':
      return { 
        question: 'Put these items in the correct order', 
        instructions: 'Drag to reorder the items',
        items: ['First item', 'Second item', 'Third item', 'Fourth item'] 
      };
    case 'trueFalse':
      return { 
        question: 'Is this statement true or false?', 
        description: 'Select the correct answer' 
      };
    case 'dropdown':
      return { 
        label: 'Select an option', 
        description: '',
        options: ['Option 1', 'Option 2', 'Option 3'], 
        required: false 
      };
    case 'matching':
      return { 
        question: 'Match the items', 
        instructions: 'Connect each item on the left with the correct match on the right',
        leftItems: ['Item A', 'Item B', 'Item C'],
        rightItems: ['Match 1', 'Match 2', 'Match 3']
      };
    case 'codeEditor':
      return { 
        label: 'Write your code', 
        instructions: 'Complete the function below',
        language: 'JavaScript',
        starterCode: '// Write your code here\nfunction solution() {\n  \n}',
        hints: []
      };
    case 'textInput':
      return { label: 'Your answer', placeholder: 'Type here...', required: false };
    case 'fileUpload':
      return { label: 'Upload file', accept: '*', required: false };
    case 'linkInput':
      return { label: 'Enter URL', placeholder: 'https://...', required: false };
    default:
      return {};
  }
}

function renderBlockEditor(block, stageIndex, blockIndex, handleBlockChange) {
  switch (block.type) {
    case 'richText':
      return (
        <RichTextEditor
          value={block.data.content}
          onChange={(value) => handleBlockChange(stageIndex, blockIndex, 'content', value)}
        />
      );
    case 'video':
      return (
        <>
          <input
            type="text"
            value={block.data.title}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'title', e.target.value)}
            className="input"
            placeholder="Video title"
          />
          <textarea
            value={block.data.description}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'description', e.target.value)}
            className="textarea"
            rows={2}
            placeholder="Video description"
          />
          <input
            type="text"
            value={block.data.videoUrl}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'videoUrl', e.target.value)}
            className="input"
            placeholder="Video URL (YouTube or direct link)"
          />
        </>
      );
    case 'multipleChoice':
      return (
        <>
          <input
            type="text"
            value={block.data.question}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'question', e.target.value)}
            className="input"
            placeholder="Question"
          />
          <textarea
            value={block.data.options.join('\n')}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'options', e.target.value.split('\n'))}
            className="textarea"
            rows={4}
            placeholder="Enter options (one per line)"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={block.data.multiSelect}
              onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'multiSelect', e.target.checked)}
            />
            Allow multiple selections
          </label>
        </>
      );
    case 'fillInBlanks':
      return (
        <>
          <input
            type="text"
            value={block.data.question}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'question', e.target.value)}
            className="input"
            placeholder="Question"
          />
          <textarea
            value={block.data.text}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'text', e.target.value)}
            className="textarea"
            rows={3}
            placeholder="Text with [blank] markers"
          />
          <small>Use [blank] to mark where students should fill in answers</small>
        </>
      );
    case 'ordering':
      return (
        <>
          <input
            type="text"
            value={block.data.question}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'question', e.target.value)}
            className="input"
            placeholder="Question"
          />
          <textarea
            value={block.data.items.join('\n')}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'items', e.target.value.split('\n').filter(i => i.trim()))}
            className="textarea"
            rows={4}
            placeholder="Enter items to order (one per line)"
          />
        </>
      );
    case 'trueFalse':
      return (
        <>
          <input
            type="text"
            value={block.data.question}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'question', e.target.value)}
            className="input"
            placeholder="Question"
          />
          <textarea
            value={block.data.description}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'description', e.target.value)}
            className="textarea"
            rows={2}
            placeholder="Additional description (optional)"
          />
        </>
      );
    case 'dropdown':
      return (
        <>
          <input
            type="text"
            value={block.data.label}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'label', e.target.value)}
            className="input"
            placeholder="Label"
          />
          <textarea
            value={block.data.options.join('\n')}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'options', e.target.value.split('\n').filter(i => i.trim()))}
            className="textarea"
            rows={4}
            placeholder="Enter options (one per line)"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={block.data.required}
              onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'required', e.target.checked)}
            />
            Required
          </label>
        </>
      );
    case 'matching':
      return (
        <>
          <input
            type="text"
            value={block.data.question}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'question', e.target.value)}
            className="input"
            placeholder="Question"
          />
          <label style={{fontSize: '0.875rem', fontWeight: 600, marginTop: '0.5rem'}}>Left Items:</label>
          <textarea
            value={block.data.leftItems.join('\n')}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'leftItems', e.target.value.split('\n').filter(i => i.trim()))}
            className="textarea"
            rows={3}
            placeholder="Items to match (one per line)"
          />
          <label style={{fontSize: '0.875rem', fontWeight: 600, marginTop: '0.5rem'}}>Right Items:</label>
          <textarea
            value={block.data.rightItems.join('\n')}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'rightItems', e.target.value.split('\n').filter(i => i.trim()))}
            className="textarea"
            rows={3}
            placeholder="Matching options (one per line)"
          />
        </>
      );
    case 'codeEditor':
      return (
        <>
          <input
            type="text"
            value={block.data.label}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'label', e.target.value)}
            className="input"
            placeholder="Label"
          />
          <input
            type="text"
            value={block.data.language}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'language', e.target.value)}
            className="input"
            placeholder="Programming language (e.g., JavaScript, Python)"
          />
          <textarea
            value={block.data.starterCode}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'starterCode', e.target.value)}
            className="textarea"
            rows={6}
            placeholder="Starter code..."
          />
        </>
      );
    case 'textInput':
      return (
        <>
          <input
            type="text"
            value={block.data.label}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'label', e.target.value)}
            className="input"
            placeholder="Label"
          />
          <input
            type="text"
            value={block.data.placeholder}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'placeholder', e.target.value)}
            className="input"
            placeholder="Placeholder"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={block.data.required}
              onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'required', e.target.checked)}
            />
            Required
          </label>
        </>
      );
    case 'fileUpload':
      return (
        <>
          <input
            type="text"
            value={block.data.label}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'label', e.target.value)}
            className="input"
            placeholder="Label"
          />
          <input
            type="text"
            value={block.data.accept}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'accept', e.target.value)}
            className="input"
            placeholder="Accepted file types (e.g., .pdf,.zip)"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={block.data.required}
              onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'required', e.target.checked)}
            />
            Required
          </label>
        </>
      );
    case 'linkInput':
      return (
        <>
          <input
            type="text"
            value={block.data.label}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'label', e.target.value)}
            className="input"
            placeholder="Label"
          />
          <input
            type="text"
            value={block.data.placeholder}
            onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'placeholder', e.target.value)}
            className="input"
            placeholder="Placeholder"
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={block.data.required}
              onChange={(e) => handleBlockChange(stageIndex, blockIndex, 'required', e.target.checked)}
            />
            Required
          </label>
        </>
      );
    case 'asset':
      return (
        <div>
          <p>Asset block - file list management would go here</p>
          <small>In a full implementation, you'd add/remove files here</small>
        </div>
      );
    default:
      return <p>Unknown block type</p>;
  }
}

export default SimulationBuilder;
