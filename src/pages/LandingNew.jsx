import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '../context/LanguageContext';
import { companies } from '../data/templates';
import './LandingNew.css';

function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const featuredCompanies = Object.values(companies).slice(0, 7);

  return (
    <div className="landing-new">
      <Navbar />
      
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" />
              Now open — Spring 2026 cohort
            </div>
            <h1 className="hero-title">
              Experience real jobs. <em>Before you apply.</em>
            </h1>
            <p className="hero-subtitle">
              Hands-on simulations built with top companies. Earn certificates, build skills, and discover your perfect career path.
            </p>
            <div className="hero-actions">
              <Link to="/explore" className="btn-hero btn-primary">
                Explore Simulations <ArrowRight size={16} />
              </Link>
              <Link to="/for-companies" className="btn-hero btn-ghost">
                For Companies
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">48k+</div>
                <div className="stat-label">Active learners</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">120</div>
                <div className="stat-label">Simulations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">67</div>
                <div className="stat-label">Partner companies</div>
              </div>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Logo Wall */}
      <section className="logo-section">
        <div className="container">
          <div className="section-eyebrow">Trusted by leading companies</div>
          <div className="logo-wall">
            {featuredCompanies.map((company, i) => (
              <div key={i} className="logo-item">
                <span className="logo-square" style={{ background: company.color || '#6366f1', opacity: 0.55 }} />
                {company.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Simulations */}
      <section className="catalog-section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Catalog</div>
              <h2 className="section-title">Popular right now</h2>
            </div>
            <Link to="/explore" className="btn-link">
              View all simulations <ArrowRight size={14} />
            </Link>
          </div>
          <div className="sim-grid">
            {[
              { title: 'Digital Marketing Campaign', company: 'Meydan Digital', duration: '3-4 hours', difficulty: 'Intermediate', tag: 'Marketing' },
              { title: 'Financial Analysis & Reporting', company: 'Kapital Bank', duration: '4-5 hours', difficulty: 'Advanced', tag: 'Finance' },
              { title: 'Product Launch Strategy', company: 'SOCAR', duration: '2-3 hours', difficulty: 'Beginner', tag: 'Product' },
            ].map((sim, i) => (
              <div key={i} className="sim-card" onClick={() => navigate('/explore')}>
                <div className="sim-tag">{sim.tag}</div>
                <h3 className="sim-title">{sim.title}</h3>
                <div className="sim-company">{sim.company}</div>
                <div className="sim-meta">
                  <span>{sim.duration}</span>
                  <span>•</span>
                  <span>{sim.difficulty}</span>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="how-it-works">
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-title-large">Four steps. Real workplace experience.</h2>
            <div className="steps-grid">
              {[
                { num: '01', title: 'Pick a simulation', desc: 'Browse programs built with employers across finance, tech, marketing, HR and more.' },
                { num: '02', title: 'Work the brief', desc: 'Read the kickoff, tackle real tasks, and submit deliverables like you would on the job.' },
                { num: '03', title: 'Get feedback', desc: 'Compare your output to company model answers and rubrics written by hiring managers.' },
                { num: '04', title: 'Earn a certificate', desc: 'A credential signed by the company — add it to LinkedIn, CV, or applications.' },
              ].map((step, i) => (
                <div key={i} className="step-card">
                  <div className="step-number">{step.num}</div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Split CTA */}
          <div className="cta-split">
            <div className="cta-card cta-primary">
              <div className="cta-eyebrow">For learners</div>
              <h3 className="cta-title">Start a simulation today. Free, always.</h3>
              <p className="cta-desc">
                No cost, no commitment — just honest work experience and a credential you can actually use.
              </p>
              <Link to="/explore" className="btn-cta btn-accent">
                Browse the catalog <ArrowRight size={14} />
              </Link>
            </div>
            <div className="cta-card cta-secondary">
              <div className="cta-eyebrow">For employers</div>
              <h3 className="cta-title">Hire people who've already done the job.</h3>
              <p className="cta-desc">
                Publish a simulation, build your talent pool, and pre-screen at scale.
              </p>
              <Link to="/for-companies" className="btn-cta btn-ghost">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="visual-bg" />
      
      {/* Mock workspace card */}
      <div className="workspace-card">
        <div className="workspace-header">
          <div className="window-dots">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
          </div>
          <div className="workspace-meta">Task 2 of 5 · Positioning</div>
        </div>
        <div className="workspace-question">Which positioning angle wins this audience?</div>
        <div className="workspace-options">
          {[
            { text: 'Security-first for power users', selected: false },
            { text: 'Effortless payments for small businesses', selected: true },
            { text: 'Premium cashback for high earners', selected: false },
          ].map((option, i) => (
            <div key={i} className={`option ${option.selected ? 'option-selected' : ''}`}>
              <div className="option-check">
                {option.selected && <Check size={12} />}
              </div>
              <div className="option-text">{option.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating certificate */}
      <div className="certificate-card">
        <div className="certificate-header">
          <Award size={12} /> CERTIFICATE
        </div>
        <div className="certificate-title">Marketing — Launch Plan</div>
        <div className="certificate-issuer">Issued by Meydan Digital</div>
        <div className="certificate-badges">
          <div className="badge badge-success">92% · Passed</div>
          <div className="badge badge-neutral">May 2026</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
