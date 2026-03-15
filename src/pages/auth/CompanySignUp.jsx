import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Auth.css';

const INDUSTRIES = [
  'Banking & Finance',
  'Oil & Gas',
  'Telecommunications',
  'Retail & E-commerce',
  'Rail & Infrastructure',
  'Technology & IT',
  'Manufacturing',
  'Healthcare',
  'Education',
  'Consulting',
  'Other'
];

const COMPANY_SIZES = [
  '1–10 employees',
  '11–50 employees',
  '51–200 employees',
  '201–500 employees',
  '500+ employees'
];

function CompanySignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!formData.companyName.trim()) {
      setError('Company name is required');
      return;
    }
    if (!formData.industry) {
      setError('Please select your industry');
      return;
    }

    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      role: 'company',
      full_name: formData.contactName,
      company_name: formData.companyName,
      industry: formData.industry,
      company_size: formData.companySize,
      website: formData.website
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <>
        <Navbar />
        <div className="auth-page">
          <div className="auth-container" style={{ gridTemplateColumns: '1fr' }}>
            <div className="auth-card" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Check your email</h1>
              <p style={{ color: '#64748b', marginBottom: '0.75rem', lineHeight: 1.6 }}>
                We sent a confirmation link to <strong>{formData.email}</strong>.
              </p>
              <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Click the link to activate your enterprise account, then sign in to access your company dashboard.
              </p>
              <Link to="/signin" className="btn btn-primary btn-lg btn-block">Go to Sign In</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-container auth-container-wide">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-role-badge company-badge">Enterprise</div>
              <h1>Register Your Company</h1>
              <p>Create simulations and discover talent for your organisation</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. SOCAR, ABB Bank"
                    required
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactName">Contact Person Name *</label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="industry">Industry *</label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="companySize">Company Size</label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select size...</option>
                    {COMPANY_SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">Company Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                    className="input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
                disabled={loading}
              >
                {loading ? 'Creating Enterprise Account...' : 'Create Enterprise Account'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/signin" className="auth-link">Sign In</Link>
              </p>
              <p className="auth-divider-text">
                Are you a student?{' '}
                <Link to="/signup" className="auth-link">Student Sign Up</Link>
              </p>
            </div>
          </div>

          <div className="auth-illustration auth-illustration-company">
            <div className="illustration-content">
              <h2>Find Your Next Hire</h2>
              <p>Create simulations, evaluate real skills, and build your talent pipeline.</p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Create custom job simulations</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Review candidate submissions</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Issue certificates to top performers</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Access a pool of job-ready talent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CompanySignUp;
