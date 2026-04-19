import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './BlogV2.css';

function BlogV2() {
  const articles = [
    {
      id: 1,
      title: 'How Job Simulations Are Changing Career Preparation in Azerbaijan',
      excerpt: 'Discover how people are gaining real-world experience before entering the job market through interactive simulations.',
      category: 'Career Insights',
      date: 'February 20, 2026',
      author: 'Leyla Mammadova',
      readTime: '5 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Success Story: From Beginner to Data Analyst at PASHA Bank',
      excerpt: 'Meet Rashad, who landed his dream job after completing our banking simulation and impressing recruiters with his skills.',
      category: 'Success Stories',
      date: 'February 15, 2026',
      author: 'Nigar Aliyeva',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Top 5 Skills Employers Look for in 2026',
      excerpt: 'Learn which skills are most in-demand and how you can develop them through our simulation platform.',
      category: 'Career Tips',
      date: 'February 10, 2026',
      author: 'Anar Hasanov',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Why Companies Are Using Simulations for Recruitment',
      excerpt: 'Explore how leading Azerbaijani companies are revolutionizing their hiring process with job simulations.',
      category: 'For Companies',
      date: 'February 5, 2026',
      author: 'Kamran Ismayilov',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Building Confidence: How Simulations Reduce Interview Anxiety',
      excerpt: 'Practice makes perfect. Learn how simulations help job seekers feel more prepared and confident.',
      category: 'Career Tips',
      date: 'January 28, 2026',
      author: 'Leyla Mammadova',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'The Future of Work: Skills-Based Hiring in Azerbaijan',
      excerpt: 'Traditional CVs are becoming less important. Here\'s why skills-based assessments are the future.',
      category: 'Industry Trends',
      date: 'January 20, 2026',
      author: 'Anar Hasanov',
      readTime: '8 min read'
    }
  ];

  const categories = ['All', 'Career Insights', 'Success Stories', 'Career Tips', 'For Companies', 'Industry Trends'];
  const featured = articles.find(a => a.featured);
  const regular = articles.filter(a => !a.featured);

  return (
    <div className="blog-v2">
      <Navbar />
      
      <div className="screen">
        {/* Hero */}
        <section className="blog-hero">
          <div className="container">
            <div className="eyebrow mb-4">Blog</div>
            <h1 className="serif" style={{ fontSize: 48, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Career insights & success stories
            </h1>
            <p className="muted mt-12" style={{ fontSize: 17, maxWidth: 560 }}>
              Learn from industry experts, discover career tips, and read inspiring stories from our community.
            </p>
          </div>
        </section>

        {/* Featured Article */}
        {featured && (
          <section className="container" style={{ paddingTop: 48, paddingBottom: 32 }}>
            <div className="featured-article card card-hover">
              <div className="grid-12" style={{ gap: 0 }}>
                <div className="bg-mkt" style={{ gridColumn: 'span 5', minHeight: 380, borderRadius: '14px 0 0 14px' }}/>
                <div style={{ gridColumn: 'span 7', padding: '48px 40px' }}>
                  <span className="chip brand">{featured.category}</span>
                  <h2 className="serif mt-16" style={{ fontSize: 32, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {featured.title}
                  </h2>
                  <p className="mt-12" style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                    {featured.excerpt}
                  </p>
                  <div className="row gap-16 mt-20" style={{ paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                    <div className="row gap-8">
                      <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>
                        {featured.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{featured.author}</div>
                        <div className="muted" style={{ fontSize: 12 }}>{featured.date}</div>
                      </div>
                    </div>
                    <span className="muted" style={{ fontSize: 13 }}>·</span>
                    <span className="row gap-6 muted" style={{ fontSize: 13 }}>
                      <Clock size={14}/> {featured.readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${featured.id}`} className="btn btn-primary mt-20">
                    Read article <ArrowRight size={14}/>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="container page">
          <div className="row between mb-32">
            <h2 className="serif" style={{ fontSize: 28 }}>Latest articles</h2>
            <div className="filters" style={{ flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} className={`filter-btn ${cat === 'All' ? 'active' : ''}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-grid">
            {regular.map(article => (
              <Link key={article.id} to={`/blog/${article.id}`} className="card card-hover blog-card">
                <div className="bg-dev" style={{ aspectRatio: '16/9', borderRadius: '14px 14px 0 0' }}/>
                <div className="card-body">
                  <span className="chip outline" style={{ fontSize: 11 }}>{article.category}</span>
                  <h3 className="mt-16" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p className="muted mt-12" style={{ fontSize: 14, lineHeight: 1.6 }}>
                    {article.excerpt}
                  </p>
                  <div className="row gap-12 mt-16" style={{ paddingTop: 16, borderTop: '1px solid var(--line-2)', fontSize: 12 }}>
                    <span className="muted">{article.author}</span>
                    <span className="muted">·</span>
                    <span className="muted">{article.date}</span>
                    <span className="muted">·</span>
                    <span className="row gap-4 muted">
                      <Clock size={12}/> {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="container" style={{ paddingBottom: 80 }}>
          <div className="card" style={{ padding: 48, textAlign: 'center', background: 'linear-gradient(135deg, #f8f9fb, #fff)' }}>
            <h2 className="serif" style={{ fontSize: 32 }}>Stay updated</h2>
            <p className="muted mt-8" style={{ fontSize: 16 }}>
              Get the latest career insights and success stories delivered to your inbox.
            </p>
            <div className="row gap-8 mt-24" style={{ justifyContent: 'center' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default BlogV2;
