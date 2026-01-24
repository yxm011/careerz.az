import { useParams } from 'react-router-dom';
import { getSimulationById } from '../../services/storage';
import './Company.css';
import './Analytics.css';

function SimulationAnalytics() {
  const { id } = useParams();
  const simulation = getSimulationById(id);

  if (!simulation) {
    return <div className="loading">Simulation not found</div>;
  }

  const mockEnrollments = simulation.status === 'published' ? Math.floor(Math.random() * 150) + 50 : 0;
  const mockCompletions = simulation.status === 'published' ? Math.floor(mockEnrollments * (0.6 + Math.random() * 0.3)) : 0;
  const completionRate = mockEnrollments > 0 ? Math.round((mockCompletions / mockEnrollments) * 100) : 0;
  const avgTime = simulation.status === 'published' ? `${Math.floor(Math.random() * 2) + 2}h ${Math.floor(Math.random() * 60)}m` : 'N/A';

  const stageDropoff = simulation.stages.map((stage, idx) => {
    const remaining = mockEnrollments * Math.pow(0.85, idx);
    return {
      stage: stage.title,
      students: Math.floor(remaining),
      percentage: Math.round((remaining / mockEnrollments) * 100)
    };
  });

  const mockCandidates = simulation.status === 'published' ? [
    { name: 'Aysel Mammadova', email: 'aysel.m@example.az', score: 95, completedAt: '2026-01-20', status: 'Opted In' },
    { name: 'Elvin Hasanov', email: 'elvin.h@example.az', score: 88, completedAt: '2026-01-19', status: 'Opted In' },
    { name: 'Leyla Aliyeva', email: 'leyla.a@example.az', score: 92, completedAt: '2026-01-18', status: 'Opted In' },
    { name: 'Rashad Ismayilov', email: 'rashad.i@example.az', score: 85, completedAt: '2026-01-17', status: 'Not Opted In' },
    { name: 'Nigar Huseynova', email: 'nigar.h@example.az', score: 90, completedAt: '2026-01-16', status: 'Opted In' }
  ] : [];

  return (
    <div className="company-page">
      <div className="page-header">
        <div>
          <h1>Analytics: {simulation.title}</h1>
          <p className="page-subtitle">View performance metrics and student submissions</p>
        </div>
      </div>

      {simulation.status === 'draft' && (
        <div className="info-banner">
          ℹ️ This simulation is in draft mode. Publish it to start collecting analytics data.
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{mockEnrollments}</div>
          <div className="stat-label">Total Enrollments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{mockCompletions}</div>
          <div className="stat-label">Completions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgTime}</div>
          <div className="stat-label">Avg. Completion Time</div>
        </div>
      </div>

      {simulation.status === 'published' && (
        <>
          <div className="analytics-section">
            <h2>Stage-by-Stage Drop-off</h2>
            <p className="section-subtitle">Track where students are dropping out</p>
            <div className="dropoff-chart">
              {stageDropoff.map((stage, idx) => (
                <div key={idx} className="dropoff-row">
                  <div className="dropoff-label">
                    <span className="stage-number">{idx + 1}</span>
                    <span className="stage-name">{stage.stage}</span>
                  </div>
                  <div className="dropoff-bar-container">
                    <div 
                      className="dropoff-bar" 
                      style={{ width: `${stage.percentage}%` }}
                    >
                      <span className="dropoff-value">{stage.students} students ({stage.percentage}%)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-section">
            <h2>Top Performing Candidates</h2>
            <p className="section-subtitle">Students who opted in to share their information</p>
            <div className="candidates-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Score</th>
                    <th>Completed</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCandidates.map((candidate, idx) => (
                    <tr key={idx}>
                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>
                        <span className={`score-badge ${candidate.score >= 90 ? 'high' : 'medium'}`}>
                          {candidate.score}%
                        </span>
                      </td>
                      <td>{candidate.completedAt}</td>
                      <td>
                        <span className={`opt-badge ${candidate.status === 'Opted In' ? 'opted-in' : 'opted-out'}`}>
                          {candidate.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="analytics-section">
            <h2>Engagement Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">📊</div>
                <div className="metric-value">{Math.floor(mockEnrollments * 0.15)}</div>
                <div className="metric-label">Students in Progress</div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">⭐</div>
                <div className="metric-value">4.{Math.floor(Math.random() * 3) + 6}</div>
                <div className="metric-label">Avg. Rating</div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">💬</div>
                <div className="metric-value">{Math.floor(mockCompletions * 0.4)}</div>
                <div className="metric-label">Feedback Submissions</div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🎯</div>
                <div className="metric-value">{Math.floor(mockCompletions * 0.25)}</div>
                <div className="metric-label">Candidates Opted In</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SimulationAnalytics;
