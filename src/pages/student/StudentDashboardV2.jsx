import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Share2, ArrowRight, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './StudentDashboardV2.css';

const MOCK_SIMS = [
  { id: "mkt-campaign", category: "Marketing", company: "Meydan Digital", bg: "bg-mkt",
    title: "Launch a Product Campaign", duration: "5–6 hrs", pct: 45 },
  { id: "dev-debug", category: "Software Dev", company: "BakuWave Studios", bg: "bg-dev",
    title: "Debug a Production Issue", duration: "4–5 hrs", pct: 20 },
];

const MOCK_CERTS = [
  { id: "data-insight", title: "Find the Growth Insight", company: "Nar Analytics", score: 88, date: "12 Apr 2026" },
  { id: "hr-screen", title: "Screen a Shortlist for a PM role", company: "Lumen Talent Group", score: 81, date: "28 Feb 2026" },
];

const MOCK_MESSAGES = [
  { company: "Nar Analytics", text: "Great submission on the retention deep-dive — we're opening an analyst role next month.", when: "2d" },
  { company: "Lumen Talent Group", text: "Your HR screening simulation scored top 5%. Interested in chatting?", when: "5d" },
  { company: "Kaspian Capital", text: "We've added your profile to our 2026 analyst shortlist.", when: "1w" },
];

function StudentDashboardV2() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  return (
    <div className="dashboard-v2">
      <div className="screen container page">
        <div className="row between mb-8">
          <div>
            <div className="eyebrow">Dashboard</div>
            <h1 className="serif" style={{ fontSize: 38, letterSpacing: '-0.025em' }}>
              Hey {firstName} — keep going.
            </h1>
          </div>
          <div className="row gap-8">
            <button className="btn btn-ghost"><Share2 size={14}/> Share profile</button>
            <Link to="/explore" className="btn btn-primary">Browse more</Link>
          </div>
        </div>

        <div className="grid-12 mt-24">
          <div className="stat" style={{ gridColumn: 'span 3' }}>
            <div className="k">4</div>
            <div className="l">Simulations completed</div>
          </div>
          <div className="stat" style={{ gridColumn: 'span 3' }}>
            <div className="k">2</div>
            <div className="l">In progress</div>
          </div>
          <div className="stat" style={{ gridColumn: 'span 3' }}>
            <div className="k">87</div>
            <div className="l">Avg. score</div>
          </div>
          <div className="stat" style={{ gridColumn: 'span 3' }}>
            <div className="k">3</div>
            <div className="l">Invitations from employers</div>
          </div>
        </div>

        <div className="grid-12 mt-32">
          <div style={{ gridColumn: 'span 8' }}>
            <h3 className="serif" style={{ fontSize: 22 }}>In progress</h3>
            <div className="col gap-12 mt-12">
              {MOCK_SIMS.map((sim) => (
                <div key={sim.id} className="card card-body card-hover" style={{ cursor: 'pointer' }} onClick={() => navigate(`/workspace/${sim.id}`)}>
                  <div className="row gap-16">
                    <div className={`${sim.bg}`} style={{ width: 80, height: 80, borderRadius: 10, flexShrink: 0 }}/>
                    <div style={{ flex: 1 }}>
                      <div className="row gap-8 mb-4">
                        <span className="chip outline" style={{ fontSize: 11 }}>{sim.category}</span>
                        <span className="muted" style={{ fontSize: 12 }}>{sim.company}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{sim.title}</div>
                      <div className="row between mt-12" style={{ fontSize: 12.5 }}>
                        <span className="muted">Task {Math.ceil(sim.pct/25)} of 4 · {sim.duration}</span>
                        <span style={{ fontWeight: 600 }}>{sim.pct}%</span>
                      </div>
                      <div className="progress thin mt-6"><div style={{ width: sim.pct + '%' }}/></div>
                    </div>
                    <button className="btn btn-primary btn-sm">Continue <ArrowRight size={12}/></button>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="serif mt-32" style={{ fontSize: 22 }}>Certificates earned</h3>
            <div className="grid-12 mt-12">
              {MOCK_CERTS.map((cert) => (
                <div key={cert.id} className="card card-body" style={{ gridColumn: 'span 6' }}>
                  <div className="row gap-6 muted" style={{ fontSize: 11 }}><Award size={12}/> CERTIFICATE</div>
                  <div className="serif mt-8" style={{ fontSize: 19, lineHeight: 1.2 }}>{cert.title}</div>
                  <div className="muted mt-4" style={{ fontSize: 12.5 }}>Issued by {cert.company} · {cert.date}</div>
                  <div className="row between mt-16">
                    <div className="row gap-8">
                      <span className="chip green" style={{ fontSize: 11 }}>{cert.score}/100 · Passed</span>
                    </div>
                    <button className="btn btn-link">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <aside style={{ gridColumn: 'span 4' }}>
            <div className="card card-body">
              <div className="eyebrow mb-8">Messages from employers</div>
              <div className="col gap-12">
                {MOCK_MESSAGES.map((msg, i) => (
                  <div key={i} className="employer-msg">
                    <div className="row gap-8 mb-4">
                      <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                        {msg.company.split(' ').map(w => w[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{msg.company}</div>
                        <div className="muted" style={{ fontSize: 11 }}>{msg.when} ago</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: 'var(--ink-2)' }}>
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-body mt-16">
              <div className="eyebrow mb-8">Recommended for you</div>
              <div className="col gap-8">
                <Link to="/sim/fin-model" className="rec-sim">
                  <div className="bg-fin" style={{ width: 48, height: 48, borderRadius: 8, flexShrink: 0 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>Build a 3-Statement Model</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>Finance · 6–8 hrs</div>
                  </div>
                </Link>
                <Link to="/sim/pm-spec" className="rec-sim">
                  <div className="bg-pm" style={{ width: 48, height: 48, borderRadius: 8, flexShrink: 0 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>Spec a New Payments Feature</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>Product · 4–5 hrs</div>
                  </div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardV2;
