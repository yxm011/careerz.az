import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from '../context/LanguageContext';
import './ForCompanies.css';

function ForCompanies() {
  const { t } = useTranslation();
  
  return (
    <div className="for-companies">
      <Navbar />
      
      <main className="companies-main">
        <section className="companies-hero">
          <div className="hero-content">
            <h1>{t('forCompanies.heroTitle')}</h1>
            <p className="hero-description">
              {t('forCompanies.heroDescription')}
            </p>
            <div className="hero-cta">
              <Link to="/company/register" className="btn btn-primary btn-lg">
                {t('forCompanies.getStartedBtn')}
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                {t('forCompanies.scheduleDemoBtn')}
              </Link>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <h2 className="section-title">{t('forCompanies.benefits.title')}</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>{t('forCompanies.benefits.benefit1.title')}</h3>
              <p>{t('forCompanies.benefits.benefit1.description')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>{t('forCompanies.benefits.benefit2.title')}</h3>
              <p>{t('forCompanies.benefits.benefit2.description')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h3>{t('forCompanies.benefits.benefit3.title')}</h3>
              <p>{t('forCompanies.benefits.benefit3.description')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>{t('forCompanies.benefits.benefit4.title')}</h3>
              <p>{t('forCompanies.benefits.benefit4.description')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌟</div>
              <h3>{t('forCompanies.benefits.benefit5.title')}</h3>
              <p>{t('forCompanies.benefits.benefit5.description')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>{t('forCompanies.benefits.benefit6.title')}</h3>
              <p>{t('forCompanies.benefits.benefit6.description')}</p>
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2 className="section-title">{t('forCompanies.howItWorks.title')}</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>{t('forCompanies.howItWorks.step1.title')}</h3>
                <p>{t('forCompanies.howItWorks.step1.description')}</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>{t('forCompanies.howItWorks.step2.title')}</h3>
                <p>{t('forCompanies.howItWorks.step2.description')}</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>{t('forCompanies.howItWorks.step3.title')}</h3>
                <p>{t('forCompanies.howItWorks.step3.description')}</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>{t('forCompanies.howItWorks.step4.title')}</h3>
                <p>{t('forCompanies.howItWorks.step4.description')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Platform Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <div className="feature-text">
                <h4>Customizable Simulation Builder</h4>
                <p>Create tailored scenarios with multiple question types and assessment criteria</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <div className="feature-text">
                <h4>Advanced Analytics Dashboard</h4>
                <p>Track completion rates, performance metrics, and candidate insights</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <div className="feature-text">
                <h4>Candidate Database</h4>
                <p>Access profiles of students who completed your simulations</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <div className="feature-text">
                <h4>Brand Customization</h4>
                <p>Add your company logo, colors, and messaging to simulations</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <div className="feature-text">
                <h4>Team Collaboration</h4>
                <p>Multiple team members can create and manage simulations</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <div className="feature-text">
                <h4>Integration Support</h4>
                <p>Connect with your existing ATS and recruitment tools</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2 className="section-title">What Companies Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "CAREERZ.AZ helped us identify candidates with real problem-solving skills. 
                Our hiring quality has improved significantly."
              </p>
              <div className="testimonial-author">
                <strong>Anar Mammadov</strong>
                <span>HR Director, TechCorp Azerbaijan</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The simulation builder is incredibly easy to use. We created our first 
                simulation in under an hour and started receiving applications the same day."
              </p>
              <div className="testimonial-author">
                <strong>Leyla Hasanova</strong>
                <span>Talent Acquisition Lead, BankPlus</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "We've reduced our time-to-hire by 40% and found candidates who are 
                genuinely excited about our company culture."
              </p>
              <div className="testimonial-author">
                <strong>Rashad Aliyev</strong>
                <span>CEO, Digital Solutions Ltd</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>{t('forCompanies.cta.title')}</h2>
            <p>{t('forCompanies.cta.subtitle')}</p>
            <div className="cta-buttons">
              <Link to="/company/register" className="btn btn-primary btn-lg">
                {t('forCompanies.cta.trialBtn')}
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                {t('forCompanies.cta.salesBtn')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default ForCompanies;
