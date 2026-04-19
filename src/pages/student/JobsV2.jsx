import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, DollarSign, Search, Filter, Building2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './JobsV2.css';

const JOBS = [
  {
    id: 1,
    title: 'Junior Marketing Analyst',
    company: 'Meydan Digital',
    companyColor: '#1f4b8f',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '₼1,200 - ₼1,800',
    posted: '2d ago',
    category: 'Marketing',
    description: 'Join our marketing team to analyze campaign performance and provide insights.',
    requirements: ['Marketing simulation completed', 'Excel proficiency', 'Data analysis skills']
  },
  {
    id: 2,
    title: 'Software Developer',
    company: 'BakuWave Studios',
    companyColor: '#6b3a8f',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '₼2,000 - ₼3,500',
    posted: '3d ago',
    category: 'Software Dev',
    description: 'Build and maintain web applications using modern JavaScript frameworks.',
    requirements: ['Software Dev simulation completed', 'React/Node.js', '1+ years experience']
  },
  {
    id: 3,
    title: 'Financial Analyst Intern',
    company: 'Kaspian Capital',
    companyColor: '#13335c',
    location: 'Baku, Azerbaijan',
    type: 'Internship',
    salary: '₼800 - ₼1,200',
    posted: '5d ago',
    category: 'Finance',
    description: 'Support the investment team with financial modeling and analysis.',
    requirements: ['Finance simulation completed', 'Excel modeling', 'Currently enrolled in university']
  },
  {
    id: 4,
    title: 'HR Coordinator',
    company: 'Lumen Talent Group',
    companyColor: '#2b5e6b',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '₼1,000 - ₼1,500',
    posted: '1w ago',
    category: 'HR',
    description: 'Coordinate recruitment processes and support employee onboarding.',
    requirements: ['HR simulation completed', 'Communication skills', 'Organizational abilities']
  },
  {
    id: 5,
    title: 'Data Analyst',
    company: 'Nar Analytics',
    companyColor: '#9a3a2b',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '₼1,500 - ₼2,500',
    posted: '1w ago',
    category: 'Data',
    description: 'Analyze user behavior data and create actionable insights for product teams.',
    requirements: ['Data simulation completed', 'SQL & Python', 'Statistical analysis']
  },
  {
    id: 6,
    title: 'Product Manager',
    company: 'GoldenApp Fintech',
    companyColor: '#8a6a1f',
    location: 'Baku, Azerbaijan',
    type: 'Full-time',
    salary: '₼2,500 - ₼4,000',
    posted: '2w ago',
    category: 'Product',
    description: 'Lead product development for our mobile payment solutions.',
    requirements: ['Product simulation completed', '2+ years PM experience', 'Fintech knowledge']
  },
];

const CATEGORIES = ['All', 'Marketing', 'Software Dev', 'Finance', 'HR', 'Data', 'Product'];
const JOB_TYPES = ['All Types', 'Full-time', 'Part-time', 'Internship', 'Contract'];

function JobsV2() {
  const [category, setCategory] = useState('All');
  const [jobType, setJobType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = JOBS
    .filter(job => category === 'All' || job.category === category)
    .filter(job => jobType === 'All Types' || job.type === jobType)
    .filter(job => !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="jobs-v2">
      <Navbar />
      
      <div className="screen container page">
        <div className="row between mb-20">
          <div>
            <div className="eyebrow mb-4">Job Board</div>
            <h1 className="serif" style={{ fontSize: 40, letterSpacing: '-0.025em' }}>
              Open positions
            </h1>
            <div className="muted mt-4">
              {filtered.length} jobs · From companies you've completed simulations with
            </div>
          </div>
          <div className="row gap-8">
            <div className="search-box">
              <Search size={14} className="muted"/>
              <input 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                placeholder="Search jobs..."
              />
            </div>
          </div>
        </div>

        <div className="row gap-12 mb-24" style={{ flexWrap: 'wrap' }}>
          <div className="filters">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="filter-divider"/>
          <div className="filters">
            {JOB_TYPES.map(type => (
              <button 
                key={type} 
                className={`filter-btn ${jobType === type ? 'active' : ''}`}
                onClick={() => setJobType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="jobs-grid">
          {filtered.map(job => (
            <div key={job.id} className="card card-hover job-card">
              <div className="card-body">
                <div className="row gap-8 mb-12">
                  <span className="chip outline" style={{ fontSize: 11 }}>{job.category}</span>
                  <span className="chip" style={{ fontSize: 11, background: '#eef2f8' }}>{job.type}</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>
                  {job.title}
                </h3>

                <div className="row gap-8 mt-8">
                  <div className="row gap-6" style={{ color: 'var(--ink-2)', fontSize: 13 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 3, background: job.companyColor }}/>
                    {job.company}
                  </div>
                </div>

                <p className="muted mt-12" style={{ fontSize: 14, lineHeight: 1.5 }}>
                  {job.description}
                </p>

                <div className="col gap-8 mt-16" style={{ paddingTop: 16, borderTop: '1px solid var(--line-2)' }}>
                  <div className="row gap-16" style={{ fontSize: 13, color: 'var(--ink-3)' }}>
                    <span className="row gap-6"><MapPin size={14}/> {job.location}</span>
                    <span className="row gap-6"><DollarSign size={14}/> {job.salary}</span>
                    <span className="row gap-6"><Clock size={14}/> {job.posted}</span>
                  </div>
                </div>

                <div className="row between mt-16">
                  <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                  <button className="btn btn-ghost btn-sm">Save</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card card-body" style={{ textAlign: 'center', padding: 48 }}>
            <Briefcase size={48} className="muted" style={{ margin: '0 auto 16px' }}/>
            <h3 className="serif" style={{ fontSize: 22 }}>No jobs found</h3>
            <p className="muted mt-8">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default JobsV2;
