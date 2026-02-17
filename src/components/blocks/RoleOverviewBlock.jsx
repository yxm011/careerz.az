import './Block.css';

function RoleOverviewBlock({ data }) {
  const { title, description, yourRole, yourGoal } = data;

  return (
    <div className="role-overview-block">
      <h1 className="role-title">{title}</h1>
      
      {description && (
        <p className="role-description">{description}</p>
      )}

      <div className="role-sections">
        {yourRole && (
          <div className="role-section">
            <div className="role-section-header">
              <div className="role-icon">💼</div>
              <h3>Your Role</h3>
            </div>
            <ul className="role-list">
              {yourRole.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        )}

        {yourGoal && (
          <div className="role-section">
            <div className="role-section-header">
              <div className="role-icon">🎯</div>
              <h3>Your Goal</h3>
            </div>
            <ul className="role-list">
              {yourGoal.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoleOverviewBlock;
