import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '../context/LanguageContext';
import './Landing.css';

function Landing() {
  const { t } = useTranslation();
  const partnerLogos = [
    { name: 'SOCAR', logo: '🛢️' },
    { name: 'Kapital Bank', logo: '🏦' },
    { name: 'Azercell', logo: '📱' },
    { name: 'Pasha Bank', logo: '💳' },
    { name: 'AZAL', logo: '✈️' },
    { name: 'Azerconnect', logo: '🌐' },
  ];

  return (
    <div className="landing">
      <Navbar />
      
      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-badge">{t('landing.badge')}</div>
            <h1 className="hero-title">
              {t('landing.heroTitle1')}
              <br />
              <span className="gradient-text">{t('landing.heroTitle2')}</span>
            </h1>
            <p className="hero-subtitle">
              {t('landing.heroSubtitle')}
            </p>
            <div className="hero-actions">
              <Link to="/explore" className="btn btn-primary btn-lg">
                {t('landing.exploreBtn')}
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/for-companies" className="btn btn-outline btn-lg">
                {t('landing.forCompaniesBtn')}
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>{t('landing.stats.hiring')}</strong>
                <span>{t('landing.stats.hiringText')}</span>
              </div>
              <div className="hero-stat">
                <strong>{t('landing.stats.free')}</strong>
                <span>{t('landing.stats.freeText')}</span>
              </div>
              <div className="hero-stat">
                <strong>{t('landing.stats.duration')}</strong>
                <span>{t('landing.stats.durationText')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="partners">
          <p className="partners-label">{t('landing.partners.label')}</p>
          <div className="partners-grid">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="partner-logo">
                <span className="partner-icon">{partner.logo}</span>
                <span className="partner-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works-section">
          <div className="section-header">
            <h2 className="section-title">{t('landing.howItWorks.title')}</h2>
            <p className="section-subtitle">{t('landing.howItWorks.subtitle')}</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">�</div>
              <div className="step-number">01</div>
              <h3>{t('landing.howItWorks.step1.title')}</h3>
              <p>{t('landing.howItWorks.step1.description')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">💼</div>
              <div className="step-number">02</div>
              <h3>{t('landing.howItWorks.step2.title')}</h3>
              <p>{t('landing.howItWorks.step2.description')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🏆</div>
              <div className="step-number">03</div>
              <h3>{t('landing.howItWorks.step3.title')}</h3>
              <p>{t('landing.howItWorks.step3.description')}</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits">
          <div className="benefits-container">
            <div className="benefits-content">
              <h2>{t('landing.benefits.title')}</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div>
                    <h4>{t('landing.benefits.item1.title')}</h4>
                    <p>{t('landing.benefits.item1.description')}</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div>
                    <h4>{t('landing.benefits.item2.title')}</h4>
                    <p>{t('landing.benefits.item2.description')}</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div>
                    <h4>{t('landing.benefits.item3.title')}</h4>
                    <p>{t('landing.benefits.item3.description')}</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">✓</div>
                  <div>
                    <h4>{t('landing.benefits.item4.title')}</h4>
                    <p>{t('landing.benefits.item4.description')}</p>
                  </div>
                </div>
              </div>
              <Link to="/explore" className="btn btn-primary btn-lg">
                {t('landing.benefits.startBtn')}
              </Link>
            </div>
            <div className="benefits-visual">
              <div className="visual-card">
                <div className="visual-icon">📊</div>
                <h3>{t('landing.benefits.visual1.title')}</h3>
                <p>{t('landing.benefits.visual1.description')}</p>
              </div>
              <div className="visual-card">
                <div className="visual-icon">🎓</div>
                <h3>{t('landing.benefits.visual2.title')}</h3>
                <p>{t('landing.benefits.visual2.description')}</p>
              </div>
              <div className="visual-card">
                <div className="visual-icon">💡</div>
                <h3>{t('landing.benefits.visual3.title')}</h3>
                <p>{t('landing.benefits.visual3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <div className="section-header">
            <h2 className="section-title">{t('landing.testimonials.title')}</h2>
            <p className="section-subtitle">{t('landing.testimonials.subtitle')}</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                {t('landing.testimonials.student1.text')}
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">N</div>
                <div>
                  <strong>{t('landing.testimonials.student1.name')}</strong>
                  <span>{t('landing.testimonials.student1.school')}</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                {t('landing.testimonials.student2.text')}
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">E</div>
                <div>
                  <strong>{t('landing.testimonials.student2.name')}</strong>
                  <span>{t('landing.testimonials.student2.school')}</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                {t('landing.testimonials.student3.text')}
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">L</div>
                <div>
                  <strong>{t('landing.testimonials.student3.name')}</strong>
                  <span>{t('landing.testimonials.student3.school')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <h2 className="stat-number">{t('landing.statsSection.students')}</h2>
              <p className="stat-label">{t('landing.statsSection.studentsLabel')}</p>
              <p className="stat-description">{t('landing.statsSection.studentsDesc')}</p>
            </div>
            <div className="stat-card">
              <h2 className="stat-number">{t('landing.statsSection.companies')}</h2>
              <p className="stat-label">{t('landing.statsSection.companiesLabel')}</p>
              <p className="stat-description">{t('landing.statsSection.companiesDesc')}</p>
            </div>
            <div className="stat-card">
              <h2 className="stat-number">{t('landing.statsSection.simulations')}</h2>
              <p className="stat-label">{t('landing.statsSection.simulationsLabel')}</p>
              <p className="stat-description">{t('landing.statsSection.simulationsDesc')}</p>
            </div>
            <div className="stat-card">
              <h2 className="stat-number">{t('landing.statsSection.satisfaction')}</h2>
              <p className="stat-label">{t('landing.statsSection.satisfactionLabel')}</p>
              <p className="stat-description">{t('landing.statsSection.satisfactionDesc')}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="cta-container">
            <h2 className="cta-title">{t('landing.cta.title')}</h2>
            <p className="cta-subtitle">
              {t('landing.cta.subtitle')}
            </p>
            <div className="cta-actions">
              <Link to="/explore" className="btn btn-primary btn-lg">
                {t('landing.cta.startBtn')}
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/for-companies" className="btn btn-secondary btn-lg">
                {t('landing.cta.companyBtn')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Landing;
