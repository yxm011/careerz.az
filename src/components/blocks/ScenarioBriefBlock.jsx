import './Block.css';

function ScenarioBriefBlock({ data }) {
  const { title, introduction, dialogues, conclusion } = data;

  return (
    <div className="scenario-brief-block">
      <h2 className="scenario-title">{title}</h2>
      
      {introduction && (
        <div className="scenario-intro" dangerouslySetInnerHTML={{ __html: introduction }} />
      )}

      {dialogues && dialogues.length > 0 && (
        <div className="scenario-dialogues">
          {dialogues.map((dialogue, index) => (
            <div key={index} className="dialogue-item">
              <div className="dialogue-avatar" style={{ backgroundColor: dialogue.color || '#60a5fa' }}>
                {dialogue.avatar || '👤'}
              </div>
              <div className="dialogue-content">
                <div className="dialogue-header">
                  <span className="dialogue-name">{dialogue.name}</span>
                  <span className="dialogue-role">{dialogue.role}</span>
                </div>
                <div className="dialogue-bubble">
                  <p>{dialogue.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {conclusion && (
        <div className="scenario-conclusion">
          <p>{conclusion}</p>
        </div>
      )}
    </div>
  );
}

export default ScenarioBriefBlock;
