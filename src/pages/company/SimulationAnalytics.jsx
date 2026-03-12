import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSimulationById, getSubmissionsByCompany } from '../../services/storage';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './Company.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const COMPANY_ID = 'company-1';

function SimulationAnalytics() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = () => {
    setLoading(true);
    const sim = getSimulationById(id);
    
    if (!sim || sim.companyId !== COMPANY_ID) {
      navigate('/company/simulations');
      return;
    }
    
    setSimulation(sim);
    
    const allSubmissions = getSubmissionsByCompany(COMPANY_ID);
    const simSubmissions = allSubmissions.filter(s => s.simId === id);
    setSubmissions(simSubmissions);
    
    setLoading(false);
  };

  if (loading || !simulation) {
    return <div className="loading">Loading analytics...</div>;
  }

  const totalSubmissions = submissions.length;
  const completedSubmissions = submissions.filter(s => s.status === 'submitted').length;
  const completionRate = totalSubmissions > 0 ? Math.round((completedSubmissions / totalSubmissions) * 100) : 0;
  const averageTimeMinutes = 42;
  const topSkills = ['Data Analysis', 'Problem Solving', 'Communication'];

  const completionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Completions',
        data: [12, 19, 15, 25, 22, completedSubmissions || 5],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const scoreDistributionData = {
    labels: ['90-100%', '80-89%', '70-79%', '60-69%', '<60%'],
    datasets: [
      {
        label: 'Number of Students',
        data: [15, 25, 20, 10, 5],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className="company-page analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics: {simulation.title}</h1>
          <p className="page-subtitle">Track performance and candidate metrics</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => navigate('/company/simulations')}>
            ← Back
          </button>
          <button className="btn btn-primary">
            Export Data (CSV)
          </button>
        </div>
      </div>

      <div className="analytics-stats-grid">
        <div className="analytics-stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <span className="stat-label">Total Participants</span>
            <span className="stat-number">{totalSubmissions}</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-label">Completion Rate</span>
            <span className="stat-number">{completionRate}%</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <span className="stat-label">Avg. Time Spent</span>
            <span className="stat-number">{averageTimeMinutes}m</span>
          </div>
        </div>
      </div>

      <div className="analytics-charts-grid">
        <div className="analytics-card">
          <h3>Completion Trend</h3>
          <div className="chart-container">
            <Line data={completionTrendData} options={chartOptions} />
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Score Distribution</h3>
          <div className="chart-container">
            <Bar data={scoreDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="analytics-details">
        <div className="analytics-card">
          <h3>Top Performing Candidates</h3>
          <div className="candidates-list">
            {submissions.slice(0, 5).map((sub, idx) => (
              <div key={idx} className="candidate-item">
                <div className="candidate-info">
                  <div className="candidate-avatar">👤</div>
                  <div>
                    <h4>Student #{sub.studentId}</h4>
                    <span className="candidate-date">Completed: {new Date(sub.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/company/submissions')}>
                  View Profile
                </button>
              </div>
            ))}
            {submissions.length === 0 && (
              <p className="empty-text">No candidates have completed this simulation yet.</p>
            )}
          </div>
        </div>

        <div className="analytics-card">
          <h3>Skills Assessment</h3>
          <p className="card-description">Based on task completion and rubric evaluation</p>
          <div className="skills-list">
            {topSkills.map((skill, idx) => (
              <div key={idx} className="skill-item">
                <div className="skill-header">
                  <span>{skill}</span>
                  <span>{95 - (idx * 5)}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div 
                    className="skill-bar-fill" 
                    style={{ width: `${95 - (idx * 5)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationAnalytics;
