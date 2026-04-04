import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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
        <div className="auth-confirmation">
          <div className="auth-confirmation-card animate-element animate-delay-100">
            <div className="confirmation-icon">📧</div>
            <h1>Check your email</h1>
            <p>
              We sent a confirmation link to <strong>{formData.email}</strong>.<br />
              Click the link to activate your enterprise account, then sign in to access your company dashboard.
            </p>
            <Link to="/signin" className="btn-go-signin">Go to Sign In</Link>
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
      {/* Left: Form */}
      <section className="auth-form-section" style={{ overflow: 'auto' }}>
        <div className="auth-form-wrapper" style={{ maxWidth: 520 }}>
          <div className="animate-element animate-delay-100">
            <div className="auth-role-badge company-badge">Enterprise</div>
          </div>
          <h1 className="auth-title animate-element animate-delay-100">
            Register <span className="title-light">Your Company</span>
          </h1>
          <p className="auth-subtitle animate-element animate-delay-200">
            Create simulations and discover talent for your organisation
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-row animate-element animate-delay-300">
              <div className="form-field">
                <label>Company Name *</label>
                <div className="glass-input-wrapper">
                  <input
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. SOCAR, ABB Bank"
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label>Contact Person *</label>
                <div className="glass-input-wrapper">
                  <input
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-row animate-element animate-delay-400">
              <div className="form-field">
                <label>Industry *</label>
                <div className="glass-input-wrapper">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', background: 'transparent', fontSize: '0.9375rem', padding: '1rem 1.25rem', borderRadius: '1rem', border: 'none', outline: 'none', color: formData.industry ? '#0f172a' : '#94a3b8' }}
                  >
                    <option value="">Select industry...</option>
                    {INDUSTRIES.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label>Company Size</label>
                <div className="glass-input-wrapper">
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    style={{ width: '100%', background: 'transparent', fontSize: '0.9375rem', padding: '1rem 1.25rem', borderRadius: '1rem', border: 'none', outline: 'none', color: formData.companySize ? '#0f172a' : '#94a3b8' }}
                  >
                    <option value="">Select size...</option>
                    {COMPANY_SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-field animate-element animate-delay-500">
              <label>Company Website</label>
              <div className="glass-input-wrapper">
                <input
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>

            <div className="form-field animate-element animate-delay-500">
              <label>Work Email Address *</label>
              <div className="glass-input-wrapper">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-row animate-element animate-delay-600">
              <div className="form-field">
                <label>Password *</label>
                <div className="glass-input-wrapper">
                  <div className="password-input-container">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      required
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-field">
                <label>Confirm Password *</label>
                <div className="glass-input-wrapper">
                  <div className="password-input-container">
                    <input
                      name="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      required
                    />
                    <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn animate-element animate-delay-700"
              disabled={loading}
            >
              {loading ? 'Creating Enterprise Account...' : 'Create Enterprise Account'}
            </button>
          </form>

          <p className="auth-footer-text animate-element animate-delay-800">
            Already have an account? <Link to="/signin">Sign In</Link>
            {' · '}
            Not a company? <Link to="/signup">Sign Up Here</Link>
          </p>
        </div>
      </section>

      {/* Right: Hero Image */}
      <section className="auth-hero-section">
        <div
          className="auth-hero-image animate-slide-right animate-delay-300"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)' }}
        ></div>
      </section>
    </div>
    <Footer />
    </>
  );
}

export default CompanySignUp;
