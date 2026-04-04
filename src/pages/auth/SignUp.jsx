import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Auth.css';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const testimonials = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Leyla Huseynova",
    handle: "@leyladev",
    text: "Signed up in minutes and already completed two simulations. Love it!"
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Tural Ahmadov",
    handle: "@turalcodes",
    text: "The best way to build practical skills. Everyone should try this."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Nigar Karimova",
    handle: "@nigardesign",
    text: "Got my certificate and added it to LinkedIn. Recruiters noticed immediately."
  }
];

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      role: 'student'
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
              Click the link in the email to activate your account, then sign in.
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
      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          <h1 className="auth-title animate-element animate-delay-100">
            Create <span className="title-light">Account</span>
          </h1>
          <p className="auth-subtitle animate-element animate-delay-200">
            Start your journey with real-world job simulations
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-field animate-element animate-delay-300">
              <label>Full Name</label>
              <div className="glass-input-wrapper">
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-field animate-element animate-delay-400">
              <label>Email Address</label>
              <div className="glass-input-wrapper">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-field animate-element animate-delay-500">
              <label>Password</label>
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
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-field animate-element animate-delay-600">
              <label>Confirm Password</label>
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
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn animate-element animate-delay-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider animate-element animate-delay-800">
            <span>Or continue with</span>
          </div>

          <button className="google-btn animate-element animate-delay-900">
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="auth-footer-text animate-element animate-delay-900">
            Already have an account? <Link to="/signin">Sign In</Link>
            {' · '}
            <Link to="/company/signup">Enterprise Sign Up</Link>
          </p>
        </div>
      </section>

      {/* Right: Hero Image + Testimonials */}
      <section className="auth-hero-section">
        <div
          className="auth-hero-image animate-slide-right animate-delay-300"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80)' }}
        ></div>
        <div className="auth-testimonials">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card animate-testimonial animate-delay-${1000 + i * 200}`}
            >
              <img src={t.avatarSrc} alt={t.name} />
              <div className="testimonial-info">
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-handle">{t.handle}</p>
                <p className="testimonial-text">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}

export default SignUp;
