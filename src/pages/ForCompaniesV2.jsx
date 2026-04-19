import { Link } from 'react-router-dom';
import { ArrowRight, Building, Target, CheckCircle, BarChart3, Users, Filter, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { companies } from '../data/mockData';
import './ForCompaniesV2.css';

function ForCompaniesV2() {
  const companyList = Object.values(companies).slice(0, 5);

  const candidates = [
    { n: "Leyla M.", s: 92, t: "Independent retailers · Positioning: strong" },
    { n: "Orxan Q.", s: 88, t: "Freelancers · Creative angle" },
    { n: "Aysel H.", s: 85, t: "Cafés & restaurants · Strong budget" },
    { n: "Murad B.", s: 81, t: "Retailers · Decent SEM split" },
  ];

  const leaderboard = [
    { n: "Leyla Məmmədova", s: 92, d: "2d ago", tag: "Top 5%" },
    { n: "Orxan Quliyev", s: 88, d: "3d ago", tag: "Top 10%" },
    { n: "Aysel Həsənova", s: 85, d: "5d ago", tag: "Top 15%" },
    { n: "Murad Babayev", s: 81, d: "1w ago", tag: "" },
    { n: "Nərgiz Kərimli", s: 79, d: "1w ago", tag: "" },
    { n: "Kamran İsmayılov", s: 76, d: "2w ago", tag: "" },
  ];

  return (
    <div className="for-companies-v2">
      <Navbar />
      
      <div className="screen">
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner" style={{ gridTemplateColumns: '1.2fr 1fr', padding: '56px 28px 64px' }}>
            <div>
              <span className="chip brand mb-16">
                <Building size={12}/> For employers
              </span>
              <h1 style={{ fontSize: 54 }}>
                Hire people who've <em>already</em> done the job.
              </h1>
              <p className="lede">
                Publish a simulation, build a talent pool from the learners who finish it, and let their actual work — not their CV — tell the story.
              </p>
              <div className="row gap-12 mt-24">
                <button className="btn btn-primary btn-lg">
                  Talk to our team <ArrowRight size={14}/>
                </button>
                <button className="btn btn-ghost btn-lg">See pricing</button>
              </div>
            </div>
            <div className="hero-visual">
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f4efe6, #e5dcc6)', borderRadius: 18 }}/>
              <div className="talent-pool-card">
                <div className="row between mb-12">
                  <div style={{ fontWeight: 600 }}>Talent pool · Marketing launch</div>
                  <span className="chip green" style={{ fontSize: 11 }}>42 candidates</span>
                </div>
                {candidates.map((r, i) => (
                  <div key={i} className="candidate-row" style={{ borderTop: i ? '1px solid var(--line-2)' : 0 }}>
                    <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                      {r.n.split(" ").map(x=>x[0]).join("")}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{r.n}</div>
                      <div className="muted truncate" style={{ fontSize: 12 }}>{r.t}</div>
                    </div>
                    <span className="chip" style={{ fontSize: 11, background: '#eaf0fa', color: 'var(--brand)' }}>
                      {r.s}/100
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container page">
          <div className="grid-12">
            {[
              { icon: Target, t: "Attract motivated candidates", d: "Learners self-select into your brand before a single interview." },
              { icon: CheckCircle, t: "Pre-screen at scale", d: "See their actual output, scored against your rubric, not keyword-matched CVs." },
              { icon: BarChart3, t: "Measure quality, not vibes", d: "Every submission is rubric-scored. Compare cohorts, roles, and over time." },
              { icon: Users, t: "Build a lasting pipeline", d: "Completers become your talent pool you can re-engage for future roles." },
            ].map((v, idx) => (
              <div key={idx} className="card card-body" style={{ gridColumn: 'span 3' }}>
                <span className="benefit-icon">
                  <v.icon size={18}/>
                </span>
                <div className="mt-12" style={{ fontWeight: 600, fontSize: 15.5 }}>{v.t}</div>
                <div className="muted mt-6" style={{ fontSize: 13.5 }}>{v.d}</div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="mt-48 card" style={{ padding: 32 }}>
            <div className="row between mb-20">
              <div>
                <div className="eyebrow">Your dashboard</div>
                <h2 className="serif" style={{ fontSize: 26 }}>Leaderboard · Marketing Launch Plan</h2>
                <div className="muted mt-4">42 completions · Avg. score 78 · Reviewed by hiring manager</div>
              </div>
              <div className="row gap-8">
                <button className="btn btn-ghost btn-sm"><Filter size={12}/> Filter</button>
                <button className="btn btn-ghost btn-sm"><Download size={12}/> Export</button>
              </div>
            </div>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="lb-row header">
                <span>#</span>
                <span>Candidate</span>
                <span>Score</span>
                <span>Completed</span>
                <span></span>
              </div>
              {leaderboard.map((r, i) => (
                <div key={i} className="lb-row">
                  <span className="mono muted">{String(i+1).padStart(2,"0")}</span>
                  <div className="row gap-8">
                    <div className="avatar" style={{ width: 28, height: 28, fontSize: 10.5 }}>
                      {r.n.split(" ").map(x=>x[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{r.n}</div>
                      {r.tag && <span className="chip amber" style={{ fontSize: 10, padding: '2px 8px' }}>{r.tag}</span>}
                    </div>
                  </div>
                  <span style={{ fontWeight: 600 }}>{r.s}/100</span>
                  <span className="muted" style={{ fontSize: 12.5 }}>{r.d}</span>
                  <button className="btn btn-link" style={{ fontSize: 12 }}>Review →</button>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="grid-12 mt-48">
            <div className="card card-body" style={{ gridColumn: 'span 7', padding: 32, background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' }}>
              <h3 className="serif" style={{ fontSize: 30, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Build your first simulation in 2 weeks.
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 10 }}>
                Our partnership team helps you turn a real internal task into a published simulation — we do the heavy lifting.
              </p>
              <button className="btn btn-accent mt-16">
                Book a 20-min intro <ArrowRight size={14}/>
              </button>
            </div>
            <div className="card card-body" style={{ gridColumn: 'span 5', padding: 32 }}>
              <div className="eyebrow mb-12">Trusted partners</div>
              <div className="col gap-10">
                {companyList.map((c,i) => (
                  <div key={i} className="row gap-10" style={{ padding: '8px 0', borderTop: i ? '1px solid var(--line-2)' : 0 }}>
                    <span style={{ width: 18, height: 18, borderRadius: 4, background: c.color || '#0a2540' }}/>
                    <span style={{ fontWeight: 500 }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default ForCompaniesV2;
