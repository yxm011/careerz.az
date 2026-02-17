import './Block.css';

function TransitionBlock({ data }) {
  const { title, subtitle, illustration } = data;

  return (
    <div className="transition-block">
      {illustration && (
        <div className="transition-illustration">
          <div className="illustration-content">
            {illustration === 'running' ? (
              <div className="running-illustration">
                <div className="runner">🏃</div>
                <div className="finish-flag">🏁</div>
              </div>
            ) : (
              <span className="illustration-emoji">{illustration}</span>
            )}
          </div>
        </div>
      )}
      
      <h1 className="transition-title">{title}</h1>
      
      {subtitle && (
        <p className="transition-subtitle">{subtitle}</p>
      )}
    </div>
  );
}

export default TransitionBlock;
