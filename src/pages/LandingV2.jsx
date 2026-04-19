import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '../context/LanguageContext';
import { companies } from '../data/mockData';
import './LandingV2.css';

function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const featuredCompanies = Object.values(companies).slice(0, 7);

  const featuredSims = [
    { 
      id: 1, 
      title: 'Launch a Product Campaign', 
      sub: 'Craft positioning, channel mix, and a launch plan for a fintech app.',
      company: 'Meydan Digital', 
      companyColor: '#1f4b8f',
      duration: '5–6 hrs', 
      modules: 4,
      bg: 'bg-mkt'
    },
    { 
      id: 2, 
      title: 'Debug a Production Issue', 
      sub: 'Trace a checkout crash, write a fix, and ship a postmortem.',
      company: 'BakuWave Studios', 
      companyColor: '#6b3a8f',
      duration: '4–5 hrs', 
      modules: 5,
      bg: 'bg-dev'
    },
    { 
      id: 3, 
      title: 'Build a 3-Statement Model', 
      sub: 'Forecast a mid-market logistics company for an IC memo.',
      company: 'Kaspian Capital', 
      companyColor: '#13335c',
      duration: '6–8 hrs', 
      modules: 6,
      bg: 'bg-fin'
    },
  ];

  return (
    <div className="landing-v2">
      <Navbar />
      
      <div className="screen">
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <div>
              <div className="row gap-8 mb-20">
                <span className="chip brand">
                  <span className="dot"/> Now open — Spring 2026 cohort
                </span>
              </div>
              <h1>
                Try the job <em>before you start it.</em>
              </h1>
              <p className="lede">
                Work through realistic simulations built by leading Azerbaijani employers. Earn certificates that actually mean something.
              </p>
              <div className="row gap-12 mt-24">
                <Link to="/explore" className="btn btn-primary btn-lg">
                  Explore simulations <ArrowRight size={14}/>
                </Link>
                <Link to="/for-companies" className="btn btn-ghost btn-lg">
                  I'm a company
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="n">48k+</div>
                  <div className="l">Active learners</div>
                </div>
                <div className="hero-stat">
                  <div className="n">120</div>
                  <div className="l">Simulations</div>
                </div>
                <div className="hero-stat">
                  <div className="n">67</div>
                  <div className="l">Partner companies</div>
                </div>
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* Logo wall */}
        <section className="container" style={{ padding: '36px 28px 8px' }}>
          <div className="eyebrow mb-16">Trusted by teams hiring in Azerbaijan</div>
          <div className="logo-wall">
            {featuredCompanies.map((c, i) => (
              <div key={i} className="lg">
                <span className="sq" style={{ background: c.color || '#0a2540', opacity: 0.55 }}/>
                {c.name}
              </div>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className="container page" style={{ paddingTop: 48 }}>
          <div className="row between mb-20">
            <div>
              <div className="eyebrow mb-4">Catalog</div>
              <h2 className="serif" style={{ fontSize: 28 }}>Popular this week</h2>
            </div>
            <Link to="/explore" className="btn btn-link">
              View all simulations <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="sim-grid">
            {featuredSims.map(s => (
              <div key={s.id} className="card sim-card card-hover" onClick={() => navigate('/explore')}>
                <div className={`sim-cover ${s.bg}`}>
                  <div className="company">
                    <span className="sq" style={{ background: s.companyColor }}/>
                    {s.company}
                  </div>
                </div>
                <div className="meta">
                  <h4>{s.title}</h4>
                  <div className="sub">{s.sub}</div>
                  <div className="foot">
                    <span>{s.duration}</span>
                    <span>{s.modules} modules</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-48">
            <div className="eyebrow mb-4">How it works</div>
            <h2 className="serif" style={{ fontSize: 32 }}>Four steps. Real workplace experience.</h2>
            <div className="grid-12 mt-24">
              {[
                { n: '01', t: 'Pick a simulation', d: 'Browse programs built with employers across finance, tech, marketing, HR and more.' },
                { n: '02', t: 'Work the brief', d: 'Read the kickoff, tackle real tasks, and submit deliverables like you would on the job.' },
                { n: '03', t: 'Get feedback', d: 'Compare your output to company model answers and rubrics written by hiring managers.' },
                { n: '04', t: 'Earn a certificate', d: 'A credential signed by the company — add it to LinkedIn, CV, or applications.' },
              ].map((s, i) => (
                <div key={i} className="card card-body" style={{ gridColumn: 'span 3' }}>
                  <div className="mono muted mb-12" style={{ fontSize: 12 }}>{s.n}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 600 }}>{s.t}</div>
                  <div className="muted mt-8" style={{ fontSize: 13.5, lineHeight: 1.55 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Split CTA */}
          <div className="grid-12 mt-48">
            <div className="card card-body" style={{ gridColumn: 'span 7', padding: 32, background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' }}>
              <div className="eyebrow mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>For learners</div>
              <h3 className="serif" style={{ fontSize: 34, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                Start a simulation today. Free, always.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 420, marginTop: 12 }}>
                No cost, no commitment — just honest work experience and a credential you can actually use.
              </p>
              <Link to="/explore" className="btn btn-accent mt-16">
                Browse the catalog <ArrowRight size={14}/>
              </Link>
            </div>
            <div className="card card-body" style={{ gridColumn: 'span 5', padding: 32 }}>
              <div className="eyebrow mb-8">For employers</div>
              <h3 className="serif" style={{ fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Hire people who've already done the job.
              </h3>
              <p className="muted" style={{ marginTop: 12, fontSize: 14 }}>
                Publish a simulation, build your talent pool, and pre-screen at scale.
              </p>
              <Link to="/for-companies" className="btn btn-ghost mt-16">
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual no-sel">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f3f6fc 0%, #e6ecf7 100%)', borderRadius: 18 }} />
      
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
            <div key={i} className={`opt ${option.selected ? 'selected' : ''}`}>
              <div className="opt-check">
                {option.selected && <Check size={12} />}
              </div>
              <div className="opt-text">{option.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating certificate */}
      <div className="certificate-card">
        <div className="certificate-header">
          <svg className="i" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="10" r="5"/>
            <path d="M9 14l-2 7 5-3 5 3-2-7"/>
          </svg>
          CERTIFICATE
        </div>
        <div className="certificate-title">Marketing — Launch Plan</div>
        <div className="certificate-issuer">Issued by Meydan Digital</div>
        <div className="certificate-badges">
          <div className="chip green">92% · Passed</div>
          <div className="chip">May 2026</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
