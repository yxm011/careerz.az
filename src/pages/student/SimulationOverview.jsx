import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSimulationByIdFromDB, getCompanyById } from '../../services/storage';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './SimulationOverview.css';

function SimulationOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const isCompany = profile?.role === 'company';
  const [simulation, setSimulation] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const loadSimulation = async () => {
      const sim = await getSimulationByIdFromDB(id);
      if (!sim) {
        navigate('/explore');
        return;
      }
      setSimulation(sim);

      const comp = getCompanyById(sim.companyId);
      setCompany(comp);
    };

    loadSimulation();
  }, [id, navigate]);

  if (!simulation) {
    return null;
  }

  // Extract tasks from simulation stages
  const tasks = simulation.stages
    .filter(stage => stage.title !== 'Intro & Scenario' && stage.title !== 'Welcome' && stage.title !== 'Finish Line')
    .map((stage, index) => ({
      number: index + 1,
      title: stage.title,
      description: `Complete ${stage.title.toLowerCase()} activities and submit your work`
    }));

  // Mock reviews for demonstration
  const reviews = [
    {
      id: 1,
      name: 'Aysel M.',
      role: 'Recent Graduate',
      rating: 5,
      date: '2 weeks ago',
      comment: 'This simulation gave me real insights into the role. The tasks were challenging but realistic. Highly recommend!'
    },
    {
      id: 2,
      name: 'Rashad K.',
      role: 'Career Changer',
      rating: 5,
      date: '1 month ago',
      comment: 'Excellent experience! I learned so much about what the day-to-day work actually involves. The certificate was a great addition to my resume.'
    },
    {
      id: 3,
      name: 'Leyla A.',
      role: 'University Student',
      rating: 4,
      date: '1 month ago',
      comment: 'Very practical and well-structured. Helped me understand if this career path is right for me.'
    }
  ];

  const handleStartSimulation = () => {
    if (user) {
      navigate(`/sim/${id}/play`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="simulation-overview">
      <Navbar />
      
      <div className="overview-hero">
        <div className="overview-hero-content">
          <div className="overview-breadcrumb">
            <Link to="/explore">Explore</Link>
            <span>›</span>
            <span>{simulation.title}</span>
          </div>
          
          <div className="overview-header">
            <div className="overview-header-main">
              <h1>{simulation.title}</h1>
              <p className="overview-description">{simulation.description}</p>
              
              <div className="overview-meta">
                <span className="meta-item">
                  <span className="meta-icon">📊</span>
                  {simulation.difficulty}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  {simulation.duration}
                </span>
                <span className="meta-item">
                  <span className="meta-icon">✓</span>
                  {tasks.length} Tasks
                </span>
              </div>

              <div className="overview-tags">
                {simulation.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>

              {isCompany ? (
                <div className="company-preview-notice">
                  <span>👁️</span> You are viewing this as an enterprise user (preview only)
                </div>
              ) : (
                <button onClick={handleStartSimulation} className="btn-start-simulation">
                  {user ? 'Start Simulation' : 'Sign Up to Start'}
                  <span className="btn-arrow">→</span>
                </button>
              )}
            </div>

            {company && (
              <div className="overview-company-card">
                <div className="company-card-header">
                  <div className="company-logo">{company.name.charAt(0)}</div>
                  <div>
                    <h3>{company.name}</h3>
                    <p>{company.industry}</p>
                  </div>
                </div>
                <div className="company-card-stats">
                  <div className="stat">
                    <strong>Industry Leader</strong>
                    <span>in {company.industry}</span>
                  </div>
                  <div className="stat">
                    <strong>Real Work</strong>
                    <span>Experience</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overview-content">
        <div className="overview-section">
          <h2>Why Complete This Simulation?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h3>Real Work Experience</h3>
              <p>Experience actual tasks and challenges professionals face in this role at {company?.name}.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎓</div>
              <h3>Earn a Certificate</h3>
              <p>Receive a verified certificate from {company?.name} upon successful completion.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Build Your Portfolio</h3>
              <p>Add completed simulations to your resume and showcase your practical skills.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Career Clarity</h3>
              <p>Discover if this career path aligns with your interests and strengths.</p>
            </div>
          </div>
        </div>

        {company && (
          <div className="overview-section company-section">
            <h2>About {company.name}</h2>
            <div className="company-info">
              <p className="company-description">
                {company.name} is a leading organization in {company.industry}. 
                This simulation is designed to give you authentic insight into the day-to-day 
                responsibilities and challenges faced by professionals in this role.
              </p>
              <div className="company-highlights">
                <div className="highlight">
                  <span className="highlight-icon">🏢</span>
                  <div>
                    <strong>Industry</strong>
                    <p>{company.industry}</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">🌍</span>
                  <div>
                    <strong>Location</strong>
                    <p>Azerbaijan</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">⭐</span>
                  <div>
                    <strong>Simulation Quality</strong>
                    <p>Industry-Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="overview-section">
          <h2>What You'll Do</h2>
          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task.number} className="task-item">
                <div className="task-number">{task.number}</div>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-section">
          <h2>What Others Are Saying</h2>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{review.name.charAt(0)}</div>
                  <div className="review-info">
                    <h4>{review.name}</h4>
                    <p>{review.role}</p>
                  </div>
                  <div className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">{review.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overview-cta">
          <h2>Ready to Start?</h2>
          <p>Join thousands of students gaining real work experience</p>
          {!isCompany && (
            <button onClick={handleStartSimulation} className="btn-start-simulation btn-lg">
              {user ? 'Start Simulation Now' : 'Sign Up to Get Started'}
              <span className="btn-arrow">→</span>
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SimulationOverview;
