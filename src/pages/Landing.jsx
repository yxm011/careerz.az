import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="header-content">
          <h1 className="logo">Careerz.az</h1>
          <nav className="landing-nav">
            <Link to="/explore" className="btn btn-secondary">Explore Simulations</Link>
            <Link to="/company" className="btn btn-outline">For Companies</Link>
            <Link to="/admin" className="btn btn-outline">Admin</Link>
          </nav>
        </div>
      </header>
      
      <main className="landing-main">
        <section className="hero">
          <h1 className="hero-title">Experience Real Work Before You Apply</h1>
          <p className="hero-subtitle">
            Complete job simulations from leading companies in Azerbaijan and build skills that matter.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary btn-lg">Browse Simulations</Link>
          </div>
        </section>
        
        <section className="features">
          <div className="feature-card">
            <h3>For Students</h3>
            <p>Gain practical experience through real-world job simulations from leading companies.</p>
            <Link to="/explore">Explore →</Link>
          </div>
          <div className="feature-card">
            <h3>For Companies</h3>
            <p>Create engaging simulations to attract and assess top talent.</p>
            <Link to="/company">Get Started →</Link>
          </div>
          <div className="feature-card">
            <h3>For Admins</h3>
            <p>Manage templates and review company submissions.</p>
            <Link to="/admin">Admin Portal →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
