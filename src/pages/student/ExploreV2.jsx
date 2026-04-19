import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Search, Target, Award } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ExploreV2.css';

const CATEGORIES = ["All", "Marketing", "Software Dev", "Finance", "HR", "Data", "Product"];

const SIMS = [
  { id: "mkt-campaign", category: "Marketing", company: "Meydan Digital", companyColor: "#1f4b8f", bg: "bg-mkt",
    title: "Launch a Product Campaign",
    sub: "Craft positioning, channel mix, and a launch plan for a fintech app.",
    duration: "5–6 hrs", modules: 4, difficulty: 2,
    enrolled: 14820, rating: 4.8 },
  { id: "dev-debug", category: "Software Dev", company: "BakuWave Studios", companyColor: "#6b3a8f", bg: "bg-dev",
    title: "Debug a Production Issue",
    sub: "Trace a checkout crash, write a fix, and ship a postmortem.",
    duration: "4–5 hrs", modules: 5, difficulty: 3,
    enrolled: 9310, rating: 4.7 },
  { id: "fin-model", category: "Finance", company: "Kaspian Capital", companyColor: "#13335c", bg: "bg-fin",
    title: "Build a 3-Statement Model",
    sub: "Forecast a mid-market logistics company for an IC memo.",
    duration: "6–8 hrs", modules: 6, difficulty: 3,
    enrolled: 6240, rating: 4.9 },
  { id: "hr-screen", category: "HR", company: "Lumen Talent Group", companyColor: "#2b5e6b", bg: "bg-hr",
    title: "Screen a Shortlist for a PM role",
    sub: "Assess candidates, structure an interview loop, write rejection notes.",
    duration: "3–4 hrs", modules: 4, difficulty: 1,
    enrolled: 4120, rating: 4.6 },
  { id: "data-insight", category: "Data", company: "Nar Analytics", companyColor: "#9a3a2b", bg: "bg-data",
    title: "Find the Growth Insight",
    sub: "Dig into a retention dataset and present three actionable insights.",
    duration: "5–7 hrs", modules: 5, difficulty: 2,
    enrolled: 7890, rating: 4.8 },
  { id: "pm-spec", category: "Product", company: "GoldenApp Fintech", companyColor: "#8a6a1f", bg: "bg-pm",
    title: "Spec a New Payments Feature",
    sub: "Scope the MVP, write the PRD, and pitch it to a skeptical exec.",
    duration: "4–5 hrs", modules: 4, difficulty: 2,
    enrolled: 5520, rating: 4.7 },
];

function Difficulty({ level }) {
  return (
    <span className="diff" title={`Difficulty ${level}/4`}>
      {[0,1,2,3].map(i => <span key={i} className={`d ${i < level ? "on" : ""}`}/>)}
    </span>
  );
}

function SimCard({ sim }) {
  const navigate = useNavigate();
  
  return (
    <div className="card card-hover sim-card" onClick={() => navigate(`/sim/${sim.id}`)}>
      <div className={`sim-cover ${sim.bg}`}>
        <div className="serif" style={{ fontSize: 34, color: 'var(--brand)', opacity: 0.35, letterSpacing: '-0.02em' }}>
          {sim.category}
        </div>
        <div className="company">
          <span className="sq" style={{ background: sim.companyColor }}/>
          {sim.company}
        </div>
      </div>
      <div className="meta">
        <div className="row between gap-8 mb-4">
          <span className="chip outline" style={{ fontSize: 11 }}>{sim.category}</span>
          <Difficulty level={sim.difficulty}/>
        </div>
        <h4>{sim.title}</h4>
        <div className="sub truncate">{sim.sub}</div>
        <div className="foot">
          <span className="row gap-6"><Clock size={12}/> {sim.duration}</span>
          <span className="row gap-6"><Users size={12}/> {sim.enrolled.toLocaleString()}</span>
          <span className="row gap-6"><Star size={12}/> {sim.rating}</span>
        </div>
      </div>
    </div>
  );
}

function ExploreV2() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  const filtered = SIMS
    .filter(s => cat === "All" || s.category === cat)
    .filter(s => !q || s.title.toLowerCase().includes(q.toLowerCase()) || s.sub.toLowerCase().includes(q.toLowerCase()))
    .sort((a,b) => sort === "popular" ? b.enrolled - a.enrolled : sort === "rating" ? b.rating - a.rating : 0);

  return (
    <div className="explore-v2">
      <Navbar />
      
      <div className="screen container page">
        <div className="row between mb-20">
          <div>
            <div className="eyebrow mb-4">Catalog</div>
            <h1 className="serif" style={{ fontSize: 40, letterSpacing: '-0.025em' }}>Simulations</h1>
            <div className="muted mt-4">{filtered.length} programs · Built with partner companies across Azerbaijan</div>
          </div>
          <div className="row gap-8">
            <div className="search-box">
              <Search size={14} className="muted"/>
              <input 
                value={q} 
                onChange={e => setQ(e.target.value)} 
                placeholder="Search simulations…"
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="btn btn-ghost btn-sm sort-select">
              <option value="popular">Most popular</option>
              <option value="rating">Top rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="filters mb-24">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
          <span className="filter-divider"/>
          <button className="filter-btn"><Clock size={12}/> Under 4 hrs</button>
          <button className="filter-btn"><Target size={12}/> Beginner</button>
          <button className="filter-btn"><Award size={12}/> Certified</button>
        </div>

        <div className="sim-grid">
          {filtered.map(s => <SimCard key={s.id} sim={s}/>)}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ExploreV2;
