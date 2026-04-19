import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, FileText, Lightbulb, Check, Mail } from 'lucide-react';
import './WorkspaceV2.css';

const SIMS = [
  { id: "mkt-campaign", category: "Marketing", company: "Meydan Digital", companyColor: "#1f4b8f",
    title: "Launch a Product Campaign" },
];

const MKT_STEPS = [
  { id: 0, label: "Welcome & Brief", sub: "Kickoff from the VP of Marketing", kind: "brief" },
  { id: 1, label: "Define the audience", sub: "Task 1 · Multiple choice", kind: "choice" },
  { id: 2, label: "Pick positioning", sub: "Task 2 · Written response", kind: "writing" },
  { id: 3, label: "Allocate the budget", sub: "Task 3 · Allocation slider", kind: "budget" },
  { id: 4, label: "Submit launch plan", sub: "Final submission", kind: "submit" },
];

function WorkspaceV2() {
  const { id } = useParams();
  const sim = SIMS.find(s => s.id === id) || SIMS[0];
  
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState({});
  const [answers, setAnswers] = useState({});
  
  const step = MKT_STEPS[stepIdx];
  const pct = Math.round((stepIdx / (MKT_STEPS.length - 1)) * 100);
  
  const next = () => {
    const newCompleted = { ...completed, [stepIdx]: true };
    setCompleted(newCompleted);
    if (stepIdx < MKT_STEPS.length - 1) {
      setStepIdx(stepIdx + 1);
    }
  };
  
  const prev = () => {
    if (stepIdx > 0) setStepIdx(stepIdx - 1);
  };

  return (
    <div className="workspace-v2">
      <div className="ws-shell">
        <aside className="ws-side">
          <Link to={`/sim/${sim.id}`} className="btn btn-link muted" style={{ fontSize: 12.5, padding: 0 }}>
            <ArrowLeft size={12}/> Back to overview
          </Link>
          <div className="mt-16">
            <div className="eyebrow mb-4">{sim.company}</div>
            <div className="serif" style={{ fontSize: 20, lineHeight: 1.2 }}>{sim.title}</div>
          </div>
          <div className="mt-16">
            <div className="row between" style={{ fontSize: 12 }}>
              <span className="muted">Progress</span>
              <span style={{ fontWeight: 600 }}>{pct}%</span>
            </div>
            <div className="progress mt-8"><div style={{ width: pct + '%' }}/></div>
          </div>

          <ul className="step-list">
            {MKT_STEPS.map((s, i) => (
              <li key={s.id}
                  className={`${i === stepIdx ? "active" : ""} ${completed[i] ? "done" : ""}`}
                  onClick={() => setStepIdx(i)}>
                <span className="dotnum">{completed[i] ? <Check size={12}/> : i + 1}</span>
                <div>
                  <div className="label">{s.label}</div>
                  <div className="sublabel">{s.sub}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-24 card" style={{ padding: 14, background: '#fff' }}>
            <div className="row gap-8" style={{ fontSize: 12.5, fontWeight: 600 }}>
              <Lightbulb size={14}/> Tip
            </div>
            <div className="muted mt-4" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
              You can save and leave at any time — your answers auto-save.
            </div>
          </div>
        </aside>

        <main className="ws-main">
          <div className="row between mb-16">
            <div className="row gap-8">
              <span className="chip outline">Task {stepIdx + 1} of {MKT_STEPS.length}</span>
              <span className="chip muted"><Clock size={12}/> ~{step.kind === "brief" ? 15 : 45} min</span>
            </div>
            <div className="row gap-8">
              <button className="btn btn-ghost btn-sm"><FileText size={12}/> Resources</button>
              <button className="btn btn-ghost btn-sm">Save & exit</button>
            </div>
          </div>

          <h1 className="serif" style={{ fontSize: 34, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{step.label}</h1>

          <div className="mt-24" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <BriefBlock step={step} sim={sim}/>
            <AnswerBlock step={step} answers={answers} setAnswers={setAnswers}/>
          </div>

          <div className="row between mt-32" style={{ paddingTop: 20, borderTop: '1px solid var(--line)' }}>
            <button className="btn btn-ghost" onClick={prev} disabled={stepIdx === 0} style={{ opacity: stepIdx === 0 ? 0.4 : 1 }}>
              <ArrowLeft size={14}/> Previous
            </button>
            <button className="btn btn-primary" onClick={next}>
              {stepIdx === MKT_STEPS.length - 1 ? "Submit for review" : "Mark complete & continue"} <ArrowRight size={14}/>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function BriefBlock({ step, sim }) {
  const content = (() => {
    switch (step.kind) {
      case "brief":
        return (
          <>
            <p><strong>Welcome to the team.</strong> I'm Elvin, VP of Marketing here at {sim.company}. Really glad to have you with us for the next few days.</p>
            <p>We're launching <strong>Azarpay</strong> — a payments app for small business owners — in four weeks. I need your help shaping the launch plan. Over the next four tasks you'll:</p>
            <p style={{ paddingLeft: 16, borderLeft: '2px solid var(--line)' }}>
              1. Pick the target audience we should go after first.<br/>
              2. Draft the positioning that will land with them.<br/>
              3. Allocate a ₼150,000 budget across channels.<br/>
              4. Package it all into a one-page launch plan.
            </p>
            <p>There's no single right answer — what I'm looking for is clear, defensible thinking. Good luck.</p>
          </>
        );
      case "choice":
        return (
          <>
            <p><strong>Context.</strong> Research suggests three segments worth considering: independent retailers, mobile-first freelancers, and café/restaurant owners.</p>
            <p>I've attached a summary of our competitive landscape in Azerbaijan. Read it, then pick the segment you'd open the launch with — and we'll work from there.</p>
            <p className="muted" style={{ fontSize: 13 }}>Tip: pick the segment where our product advantage is clearest and acquisition economics are strongest.</p>
          </>
        );
      case "writing":
        return (
          <>
            <p><strong>Your turn.</strong> Draft a positioning statement for the audience you chose. Keep it to <strong>3–5 sentences</strong> and make sure it answers:</p>
            <p>• Who is it for?<br/>• What category are we in?<br/>• What makes us different?<br/>• Why should they believe us?</p>
            <p className="muted" style={{ fontSize: 13 }}>Model answers are released after you submit, so you can compare.</p>
          </>
        );
      case "budget":
        return (
          <>
            <p><strong>The budget.</strong> ₼150,000 for Q2. Allocate across four channels. Your reviewer is looking for a defensible split — not a "correct" one.</p>
            <p>Consider reach, measurability, and fit with the audience you picked.</p>
          </>
        );
      case "submit":
        return (
          <>
            <p><strong>Final step.</strong> Review the plan below, add a short executive summary, and submit. The team will review and you'll get written feedback plus model answers within 24 hours.</p>
            <p>Remember — this is meant to be a <em>first cut</em>. Confident reasoning matters more than polish.</p>
          </>
        );
      default:
        return null;
    }
  })();

  return (
    <div className="brief">
      <div className="brief-head">
        <Mail size={16} className="muted"/>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>From: Elvin Rəhimov · VP, Marketing</div>
          <div className="muted" style={{ fontSize: 12 }}>To: You · Subject: {step.label}</div>
        </div>
        <span className="chip muted" style={{ fontSize: 11 }}>Brief</span>
      </div>
      <div className="brief-body">{content}</div>
    </div>
  );
}

function AnswerBlock({ step, answers, setAnswers }) {
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');

  if (step.kind === "brief") {
    return (
      <div className="card card-body" style={{ background: '#fbfcfe' }}>
        <div className="eyebrow mb-8">Getting started</div>
        <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Read the brief on the left, then click <strong>"Mark complete & continue"</strong> below to move to your first task.
        </p>
      </div>
    );
  }

  if (step.kind === "choice") {
    const options = [
      { text: "Independent retailers", desc: "Small shops, kiosks, and market vendors" },
      { text: "Mobile-first freelancers", desc: "Designers, consultants, and gig workers" },
      { text: "Café & restaurant owners", desc: "Food service businesses with regular customers" },
    ];

    return (
      <div>
        <div className="eyebrow mb-12">Your answer</div>
        <div className="col gap-8">
          {options.map((opt, i) => (
            <div key={i} className={`opt ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
              <div className="opt-check">
                {selected === i && <Check size={12}/>}
              </div>
              <div>
                <div className="opt-title">{opt.text}</div>
                <div className="opt-desc">{opt.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.kind === "writing") {
    return (
      <div>
        <div className="eyebrow mb-12">Your positioning statement</div>
        <textarea 
          className="textarea" 
          placeholder="Write your positioning statement here (3–5 sentences)..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="muted mt-8" style={{ fontSize: 12 }}>{text.length} characters</div>
      </div>
    );
  }

  return (
    <div className="card card-body" style={{ background: '#fbfcfe' }}>
      <p style={{ fontSize: 14, margin: 0 }}>Answer interface for this task type coming soon.</p>
    </div>
  );
}

export default WorkspaceV2;
