import './Block.css';

function TeamOverviewBlock({ data }) {
  const { companyName, projectTitle, description, userRole, teamMembers } = data;

  return (
    <div className="team-overview-block">
      <div className="team-header">
        <h1 className="team-title">Your team at {companyName}</h1>
        <p className="team-subtitle">{description}</p>
      </div>

      <div className="team-section">
        <h2 className="section-title">{projectTitle}</h2>

        <div className="team-member-section">
          <h3 className="subsection-title">Who You Are</h3>
          <div className="team-member-card user-card">
            <div className="member-avatar" style={{ backgroundColor: userRole.color || '#60a5fa' }}>
              {userRole.avatar || '👤'}
            </div>
            <div className="member-info">
              <div className="member-header">
                <h4 className="member-name">{userRole.name}</h4>
                <span className="member-badge">YOU</span>
              </div>
              <p className="member-role">{userRole.title}</p>
            </div>
            <div className="member-description">
              <p>{userRole.description}</p>
            </div>
          </div>
        </div>

        <div className="team-member-section">
          <h3 className="subsection-title">Your Team</h3>
          <div className="team-members-list">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="member-avatar" style={{ backgroundColor: member.color || '#94a3b8' }}>
                  {member.avatar || '👤'}
                </div>
                <div className="member-info">
                  <div className="member-header">
                    <h4 className="member-name">{member.name}</h4>
                    {member.badge && <span className="member-badge-small">{member.badge}</span>}
                  </div>
                  <p className="member-role">{member.title}</p>
                </div>
                <div className="member-description">
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamOverviewBlock;
