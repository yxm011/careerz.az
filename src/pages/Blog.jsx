import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Blog.css';

function Blog() {
  const articles = [
    {
      id: 1,
      title: 'How Job Simulations Are Changing Career Preparation in Azerbaijan',
      excerpt: 'Discover how students are gaining real-world experience before entering the job market through interactive simulations.',
      category: 'Career Insights',
      date: 'February 20, 2026',
      author: 'Leyla Mammadova',
      image: '📊',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Success Story: From Student to Data Analyst at PASHA Bank',
      excerpt: 'Meet Rashad, who landed his dream job after completing our banking simulation and impressing recruiters with his skills.',
      category: 'Student Stories',
      date: 'February 15, 2026',
      author: 'Nigar Aliyeva',
      image: '🎓',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Top 5 Skills Employers Look for in 2026',
      excerpt: 'Learn which skills are most in-demand and how you can develop them through our simulation platform.',
      category: 'Career Tips',
      date: 'February 10, 2026',
      author: 'Anar Hasanov',
      image: '💼',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Why Companies Are Using Simulations for Recruitment',
      excerpt: 'Explore how leading Azerbaijani companies are revolutionizing their hiring process with job simulations.',
      category: 'For Companies',
      date: 'February 5, 2026',
      author: 'Kamran Ismayilov',
      image: '🏢',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Building Confidence: How Simulations Reduce Interview Anxiety',
      excerpt: 'Learn how practicing with realistic job scenarios can help you feel more confident in actual interviews.',
      category: 'Career Tips',
      date: 'January 30, 2026',
      author: 'Sevda Huseynova',
      image: '✨',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'The Future of Education: Bridging Theory and Practice',
      excerpt: 'How universities and companies are partnering to provide students with hands-on learning experiences.',
      category: 'Education',
      date: 'January 25, 2026',
      author: 'Elvin Mammadov',
      image: '🎯',
      readTime: '8 min read'
    }
  ];

  const categories = ['All', 'Career Insights', 'Student Stories', 'Career Tips', 'For Companies', 'Education'];

  return (
    <div className="blog-page">
      <Navbar />
      
      <main className="blog-main">
        <section className="blog-hero">
          <div className="hero-content">
            <h1>CAREERZ.AZ Blog</h1>
            <p className="hero-description">
              Career insights, success stories, and tips to help you succeed in your professional journey
            </p>
          </div>
        </section>

        <section className="blog-content">
          <div className="blog-container">
            <div className="blog-filters">
              {categories.map(category => (
                <button key={category} className={`filter-btn ${category === 'All' ? 'active' : ''}`}>
                  {category}
                </button>
              ))}
            </div>

            <div className="articles-grid">
              {articles.map(article => (
                <article key={article.id} className="article-card">
                  <div className="article-image">
                    <span className="article-emoji">{article.image}</span>
                  </div>
                  <div className="article-content">
                    <div className="article-meta">
                      <span className="article-category">{article.category}</span>
                      <span className="article-date">{article.date}</span>
                    </div>
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-footer">
                      <div className="article-author">
                        <span>By {article.author}</span>
                      </div>
                      <span className="article-read-time">{article.readTime}</span>
                    </div>
                    <Link to={`/blog/${article.id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="newsletter-box">
            <h2>Stay Updated</h2>
            <p>Get the latest career insights, success stories, and platform updates delivered to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
