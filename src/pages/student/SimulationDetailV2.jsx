import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Bookmark, Clock, FileText, Users, Award, Globe, Target, TrendingUp, CheckCircle, X, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './SimulationDetailV2.css';

const SIMS = [
  { id: "mkt-campaign", category: "Marketing", company: "Meydan Digital", companyColor: "#1f4b8f", bg: "bg-mkt",
    title: "Launch a Product Campaign",
    sub: "Craft positioning, channel mix, and a launch plan for a fintech app.",
    duration: "5–6 hrs", modules: 5, difficulty: 2,
    enrolled: 14820, rating: 4.8,
    skills: ["Positioning", "Channel strategy", "Briefs", "Budgeting"] },
];

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

function Difficulty({ level }) {
  return (
    <span className="diff" title={`Difficulty ${level}/4`}>
      {[0,1,2,3].map(i => <span key={i} className={`d ${i < level ? "on" : ""}`}/>)}
    </span>
  );
}

function Metric({ icon: Icon, k, l }) {
  return (
    <div>
      <div className="row gap-6 muted" style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        <Icon size={12}/> {l}
      </div>
      <div className="mt-4" style={{ fontWeight: 600, fontSize: 15 }}>{k}</div>
    </div>
  );
}

function DetailRow({ icon: Icon, k, v }) {
  return (
    <div className="row between">
      <span className="row gap-8 muted" style={{ fontSize: 13 }}><Icon size={14}/> {k}</span>
      <span style={{ fontWeight: 500, fontSize: 13 }}>{v}</span>
    </div>
  );
}

function Check({ t }) {
  return (
    <div className="row gap-8">
      <span style={{ color: 'var(--success)', display: 'inline-flex' }}><CheckCircle size={16}/></span>
      <span>{t}</span>
    </div>
  );
}

function SimulationDetailV2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const sim = SIMS.find(s => s.id === id) || SIMS[0];
  
  const modules = [
    { t: "Welcome from the VP", d: "Meet your manager and get the context you need to succeed.", dur: "15 min" },
    { t: "Define your target audience", d: "Use research to narrow a segment and write a one-line persona.", dur: "45 min" },
    { t: "Draft the positioning", d: "Pick an angle and defend it in a written rationale.", dur: "60 min" },
    { t: "Allocate the launch budget", d: "Split ₼150k across channels with expected outcomes.", dur: "60 min" },
    { t: "Submit your launch plan", d: "Assemble the deliverable and submit for review.", dur: "75 min" },
  ].slice(0, sim.modules);

  const handleEnroll = () => {
    setShowModal(false);
    navigate(`/workspace/${sim.id}`);
  };

  return (
    <div className="sim-detail-v2">
      <Navbar />
      
      <div className="screen">
        <div style={{ background: '#fff', borderBottom: '1px solid var(--line)' }}>
          <div className="container" style={{ padding: '20px 28px' }}>
            <Link to="/explore" className="btn btn-link muted">
              <ArrowLeft size={12}/> All simulations
            </Link>
          </div>
        </div>

        <div className="container" style={{ padding: '24px 28px 64px' }}>
          <div className="grid-12">
            {/* Main */}
            <div style={{ gridColumn: 'span 8' }}>
              <div className={`${sim.bg}`} style={{ aspectRatio: '16/6', borderRadius: 14, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 24, bottom: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div className="row gap-8 mb-8">
                      <span className="chip brand">{sim.category}</span>
                      <span className="chip outline" style={{ background: 'rgba(255,255,255,0.7)' }}>
                        <span className="sq" style={{ width: 12, height: 12, borderRadius: 3, background: sim.companyColor, display: 'inline-block' }}/> {sim.company}
                      </span>
                    </div>
                  </div>
                  <Difficulty level={sim.difficulty}/>
                </div>
              </div>

              <h1 className="serif mt-20" style={{ fontSize: 40, letterSpacing: '-0.025em', lineHeight: 1.1 }}>{sim.title}</h1>
              <p className="mt-12" style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: 680 }}>
                {sim.sub} Over the course of {sim.modules} modules, you'll step into the shoes of a junior on the {sim.company} team and deliver what's actually expected in week one.
              </p>

              <div className="row gap-24 mt-24" style={{ padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
                <Metric icon={Clock} k={sim.duration} l="To complete"/>
                <Metric icon={FileText} k={sim.modules} l="Modules"/>
                <Metric icon={Users} k={sim.enrolled.toLocaleString()} l="Enrolled"/>
                <Metric icon={Award} k="Yes" l="Certificate"/>
                <Metric icon={Globe} k="EN · AZ" l="Languages"/>
              </div>

              <div className="mt-32">
                <h3 className="serif" style={{ fontSize: 24 }}>What you'll do</h3>
                <div className="col gap-8 mt-16">
                  {modules.map((m, i) => (
                    <div key={i} className="card" style={{ padding: '14px 18px' }}>
                      <div className="row between">
                        <div className="row gap-12">
                          <span className="dotnum" style={{ marginTop: 0 }}>{i + 1}</span>
                          <div>
                            <div style={{ fontWeight: 600 }}>{m.t}</div>
                            <div className="muted" style={{ fontSize: 13 }}>{m.d}</div>
                          </div>
                        </div>
                        <span className="muted mono" style={{ fontSize: 12 }}>{m.dur}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-32">
                <h3 className="serif" style={{ fontSize: 24 }}>Skills you'll build</h3>
                <div className="row gap-8 mt-12" style={{ flexWrap: 'wrap' }}>
                  {sim.skills.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>

              <div className="mt-32">
                <h3 className="serif" style={{ fontSize: 24 }}>A word from the team</h3>
                <div className="card card-body mt-16" style={{ background: '#fbfcfe' }}>
                  <div className="row gap-12 mb-12">
                    <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>ER</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>Elvin Rəhimov</div>
                      <div className="muted" style={{ fontSize: 12.5 }}>VP, Marketing · {sim.company}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>
                    "This is the exact exercise we give our first-round marketing hires. If you finish it well, I'd interview you."
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ gridColumn: 'span 4' }}>
              <div className="card" style={{ position: 'sticky', top: 80, padding: 24 }}>
                <div className="row between mb-12">
                  <span className="chip green"><CheckCircle size={12}/> Free to enroll</span>
                  <span className="row gap-4 muted" style={{ fontSize: 12 }}><Star size={12}/> {sim.rating} ({Math.floor(sim.enrolled/30)} reviews)</span>
                </div>
                <div className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>Start when you're ready. Your progress is saved.</div>
                <button className="btn btn-primary btn-lg mt-16" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowModal(true)}>
                  <Play size={14}/> Start simulation
                </button>
                <button className="btn btn-ghost btn-sm mt-8" style={{ width: '100%', justifyContent: 'center' }}>
                  <Bookmark size={14}/> Save for later
                </button>

                <div className="hr mt-20 mb-20"/>
                <div className="col gap-12">
                  <DetailRow icon={Target} k="Level" v={LEVELS[sim.difficulty - 1] || "Beginner"}/>
                  <DetailRow icon={Clock} k="Self-paced" v="No deadline"/>
                  <DetailRow icon={Award} k="Credential" v="Signed by company"/>
                  <DetailRow icon={TrendingUp} k="Graduate path" v="71% invited to apply"/>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {showModal && (
          <div className="enroll-modal open" onClick={() => setShowModal(false)}>
            <div className="enroll-card" onClick={e => e.stopPropagation()}>
              <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)' }}>
                <div className="row between">
                  <h3 className="serif" style={{ fontSize: 22 }}>Enroll · {sim.title}</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}><X size={14}/></button>
                </div>
                <div className="muted mt-4" style={{ fontSize: 13 }}>with {sim.company}</div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <div className="col gap-12">
                  <Check t="Full access to all 5 modules"/>
                  <Check t="Model answers from the hiring team"/>
                  <Check t="Company-signed certificate on completion"/>
                  <Check t="Priority shortlist for future openings"/>
                </div>
                <div className="mt-20" style={{ fontSize: 12.5 }}>
                  By enrolling, you agree to share your submissions with {sim.company} for feedback purposes. You can revoke access any time.
                </div>
              </div>
              <div style={{ padding: '16px 28px', background: '#fbfcfe', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEnroll}>
                  Start simulation <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }}/>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default SimulationDetailV2;
