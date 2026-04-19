import { ArrowRight, Lightbulb, Target, FileText, Users, TrendingUp, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ForEducatorsV2.css';

function ForEducatorsV2() {
  const students = [
    { n: "Leyla M.", s: 92, st: "Completed" },
    { n: "Orxan Q.", s: 88, st: "Completed" },
    { n: "Aysel H.", s: null, st: "Task 3 of 5" },
    { n: "Murad B.", s: null, st: "Task 2 of 5" },
  ];

  return (
    <div className="for-educators-v2">
      <Navbar />
      
      <div className="screen">
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner" style={{ gridTemplateColumns: '1.2fr 1fr', padding: '56px 28px 64px' }}>
            <div>
              <span className="chip brand mb-16">
                <Lightbulb size={12}/> For educators
              </span>
              <h1 style={{ fontSize: 54 }}>
                Where classroom meets <em>career.</em>
              </h1>
              <p className="lede">
                Give your students real-world career experiences alongside their coursework. Assign simulations, track progress, and help them graduate with credentials employers actually recognize.
              </p>
              <div className="row gap-12 mt-24">
                <button className="btn btn-primary btn-lg">
                  Request institutional access <ArrowRight size={14}/>
                </button>
                <button className="btn btn-ghost btn-lg">Download one-pager</button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><div className="n">14</div><div className="l">Partner universities</div></div>
                <div className="hero-stat"><div className="n">9.2k</div><div className="l">Students enrolled</div></div>
                <div className="hero-stat"><div className="n">+34%</div><div className="l">Graduate placement lift</div></div>
              </div>
            </div>
            <div className="hero-visual">
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #eef4f0, #d9e7df)', borderRadius: 18 }}/>
              <div className="class-progress-card">
                <div className="row between mb-12">
                  <div style={{ fontWeight: 600 }}>MKT-301 · Spring cohort</div>
                  <span className="chip green" style={{ fontSize: 11 }}>28 students</span>
                </div>
                <div className="row between" style={{ fontSize: 12 }}>
                  <span className="muted">Assigned: Launch a Product Campaign</span>
                  <span style={{ fontWeight: 600 }}>71% complete</span>
                </div>
                <div className="progress thin mt-8 mb-16"><div style={{ width: '71%' }}/></div>
                {students.map((r, i) => (
                  <div key={i} className="student-row" style={{ borderTop: '1px solid var(--line-2)' }}>
                    <div className="avatar" style={{ width: 26, height: 26, fontSize: 10 }}>
                      {r.n.split(" ").map(x=>x[0]).join("")}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{r.n}</div>
                      <div className="muted" style={{ fontSize: 11.5 }}>{r.st}</div>
                    </div>
                    {r.s ? 
                      <span className="chip" style={{ fontSize: 11, background: '#eaf0fa', color: 'var(--brand)' }}>{r.s}/100</span> :
                      <span className="chip amber" style={{ fontSize: 11 }}>In progress</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="container page">
          <div className="eyebrow mb-4">How it works</div>
          <h2 className="serif" style={{ fontSize: 32 }}>Five ways educators use Careerz.az</h2>
          <div className="grid-12 mt-24">
            {[
              { icon: Target, t: "Career exploration", d: "Assign simulations before students choose a major so they can test-drive industries risk-free." },
              { icon: FileText, t: "Practical assignments", d: "Replace theoretical case studies with real employer tasks that build actual skills." },
              { icon: Users, t: "Cohort tracking", d: "Monitor class progress, completion rates, and scores from a single dashboard." },
              { icon: TrendingUp, t: "Placement outcomes", d: "Students graduate with verified credentials that hiring managers recognize and value." },
              { icon: Award, t: "Institutional reporting", d: "Export data for accreditation, program reviews, and career services reporting." },
            ].map((v, idx) => (
              <div key={idx} className="card card-body" style={{ gridColumn: idx < 3 ? 'span 4' : 'span 6' }}>
                <span className="benefit-icon">
                  <v.icon size={18}/>
                </span>
                <div className="mt-12" style={{ fontWeight: 600, fontSize: 15.5 }}>{v.t}</div>
                <div className="muted mt-6" style={{ fontSize: 13.5 }}>{v.d}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="card mt-48" style={{ padding: 32, background: 'linear-gradient(135deg, #f8f9fb, #fff)' }}>
            <div className="row gap-16">
              <div className="avatar" style={{ width: 56, height: 56, fontSize: 20, flexShrink: 0 }}>
                AR
              </div>
              <div>
                <div className="serif" style={{ fontSize: 22, lineHeight: 1.4, color: 'var(--ink)' }}>
                  "Our students used to graduate with theory. Now they graduate with proof they can do the job. Placement rates are up 34% since we integrated Careerz.az into our curriculum."
                </div>
                <div className="mt-12" style={{ fontWeight: 600 }}>Dr. Aynur Rəhimova</div>
                <div className="muted" style={{ fontSize: 13 }}>Dean, Business School · Azerbaijan State Economics University</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="grid-12 mt-48">
            <div className="card card-body" style={{ gridColumn: 'span 7', padding: 32, background: 'var(--brand)', color: '#fff', borderColor: 'var(--brand)' }}>
              <h3 className="serif" style={{ fontSize: 30, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Ready to bring real careers into your classroom?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 10 }}>
                We offer institutional licenses, bulk student access, and dedicated support for educators.
              </p>
              <button className="btn btn-accent mt-16">
                Request institutional access <ArrowRight size={14}/>
              </button>
            </div>
            <div className="card card-body" style={{ gridColumn: 'span 5', padding: 32 }}>
              <div className="eyebrow mb-12">Resources</div>
              <div className="col gap-12">
                <a className="row gap-8" style={{ color: 'var(--brand)', fontSize: 14, fontWeight: 500 }}>
                  <FileText size={16}/> Educator guide (PDF)
                </a>
                <a className="row gap-8" style={{ color: 'var(--brand)', fontSize: 14, fontWeight: 500 }}>
                  <Users size={16}/> Sample syllabus integration
                </a>
                <a className="row gap-8" style={{ color: 'var(--brand)', fontSize: 14, fontWeight: 500 }}>
                  <Award size={16}/> Accreditation support docs
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default ForEducatorsV2;
