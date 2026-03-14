import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getSimulations, getCompanyById } from '../../services/storage';
import { getAllUserProgress } from '../../services/progressService';
import './StudentDashboard.css';

function StudentDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    inProgress: 0,
    completed: 0,
    certificates: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Student';

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    const allProgress = await getAllUserProgress(user.id);
    const allSims = getSimulations({ status: 'published' });

    const inProgressList = allProgress.filter(p => !p.completed);
    const completedList = allProgress.filter(p => p.completed);

    setStats({
      inProgress: inProgressList.length,
      completed: completedList.length,
      certificates: 0
    });

    const recent = allProgress
      .map(p => {
        const sim = allSims.find(s => s.id === p.simulation_id);
        if (!sim) return null;
        const company = getCompanyById(sim.companyId);
        return {
          ...sim,
          company,
          progressRecord: p,
          progressPercent: sim.stages
            ? Math.round((p.current_stage_index / sim.stages.length) * 100)
            : 0
        };
      })
      .filter(Boolean)
      .slice(0, 5);

    setRecentActivity(recent);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getProgressPercentage = (sim) => sim?.progressPercent || 0;

  const totalLearningItems = stats.inProgress + stats.completed;

  return (
    <div className="student-dashboard">
      <section className="student-hero">
        <div className="student-hero-main">
          <div className="student-hero-badge">Student Workspace</div>
          <h1>Welcome back, {firstName}</h1>
          <p className="dashboard-subtitle">Stay on top of your simulations, monitor progress, and keep building career-ready experience.</p>
          <div className="header-actions">
            <Link to="/explore" className="btn btn-primary">
              Explore Simulations
            </Link>
            <button onClick={handleSignOut} className="btn btn-outline">
              Sign Out
            </button>
          </div>
        </div>

        <div className="student-overview-panel">
          <div className="overview-panel-header">
            <span className="overview-label">Account Overview</span>
            <span className="overview-email">{user?.email}</span>
          </div>
          <div className="overview-panel-grid">
            <div className="overview-panel-item">
              <strong>{totalLearningItems}</strong>
              <span>Total learning items</span>
            </div>
            <div className="overview-panel-item">
              <strong>{stats.certificates}</strong>
              <span>Certificates earned</span>
            </div>
          </div>
          <div className="overview-panel-note">
            Your dashboard updates as you progress through simulations and complete submissions.
          </div>
        </div>
      </section>

      <div className="dashboard-shell">
        <div className="dashboard-main-column">
          <div className="dashboard-section-header">
            <div>
              <span className="section-kicker">Performance Overview</span>
              <h2>Your Progress Snapshot</h2>
            </div>
          </div>

          <div className="analytics-stats-grid">
            <div className="analytics-stat-card analytics-stat-card-featured">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <span className="stat-label">In Progress</span>
                <span className="stat-number">{stats.inProgress}</span>
                <span className="stat-caption">Active simulations you can continue now</span>
              </div>
            </div>
            <div className="analytics-stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <span className="stat-label">Completed</span>
                <span className="stat-number">{stats.completed}</span>
                <span className="stat-caption">Submitted experiences finished successfully</span>
              </div>
            </div>
            <div className="analytics-stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <span className="stat-label">Certificates</span>
                <span className="stat-number">{stats.certificates}</span>
                <span className="stat-caption">Recognitions approved for your work</span>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <div>
                  <span className="section-kicker">Continue Building Skills</span>
                  <h2>Recent Simulation Activity</h2>
                </div>
                <Link to="/explore" className="section-link">View all simulations</Link>
              </div>
              {recentActivity.length > 0 ? (
                <div className="activity-grid">
                  {recentActivity.map((sim) => (
                    <Link 
                      key={sim.id} 
                      to={sim.progressRecord?.completed ? `/sim/${sim.id}` : `/sim/${sim.id}/play`}
                      className="activity-card"
                    >
                      <div className="activity-card-top">
                        <span className="activity-category">{sim.company?.name || 'Simulation'}</span>
                        <span className={`activity-badge ${sim.progressRecord?.completed ? 'completed' : 'in-progress'}`}>
                          {sim.progressRecord?.completed ? '✓ Completed' : sim.difficulty}
                        </span>
                      </div>
                      <div className="activity-header">
                        <h3>{sim.title}</h3>
                      </div>
                      <p className="activity-description">{sim.description}</p>
                      <div className="activity-meta">
                        <span>{sim.duration || 'Self-paced'}</span>
                        <span>{sim.tags?.[0] || 'Career skill'}</span>
                      </div>
                      {!sim.progressRecord?.completed && (
                      <div className="activity-progress">
                        <div className="activity-progress-header">
                          <span>Progress</span>
                          <span>{getProgressPercentage(sim)}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div 
                            className="progress-bar-fill" 
                            style={{ width: `${getProgressPercentage(sim)}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">Resume where you left off</span>
                      </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📖</div>
                  <h3>No simulations in progress</h3>
                  <p>Start your first simulation to build momentum and see your personalized dashboard come to life.</p>
                  <Link to="/explore" className="btn btn-primary">
                    Explore Simulations
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="dashboard-side-column">
          <div className="dashboard-side-card">
            <div className="dashboard-section-header compact">
              <div>
                <span className="section-kicker">Quick Actions</span>
                <h2>What would you like to do?</h2>
              </div>
            </div>
            <div className="quick-action-list">
              <Link to="/explore" className="quick-action-item">
                <div>
                  <strong>Discover new simulations</strong>
                  <span>Browse opportunities from top companies</span>
                </div>
                <span className="quick-action-arrow">→</span>
              </Link>
              <Link to="/student/dashboard" className="quick-action-item">
                <div>
                  <strong>Review your dashboard</strong>
                  <span>Track submissions, certificates, and progress</span>
                </div>
                <span className="quick-action-arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="dashboard-side-card dashboard-side-card-accent">
            <span className="section-kicker section-kicker-light">Learning Summary</span>
            <h3>Keep your momentum going</h3>
            <p>Professional experience compounds quickly when you complete simulations consistently.</p>
            <div className="summary-list">
              <div className="summary-item">
                <span className="summary-dot"></span>
                <span>{stats.inProgress} active simulations ready to continue</span>
              </div>
              <div className="summary-item">
                <span className="summary-dot"></span>
                <span>{stats.completed} completed submissions in your record</span>
              </div>
              <div className="summary-item">
                <span className="summary-dot"></span>
                <span>{stats.certificates} approved certificates earned so far</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default StudentDashboard;
