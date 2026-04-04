import { useState, useEffect } from 'react';
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
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Aysel Mammadova",
    handle: "@ayselm",
    text: "The simulations helped me land my first internship. Incredible platform!"
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Rashad Aliyev",
    handle: "@rashadtech",
    text: "Real-world experience before even graduating. This changed my career path."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Elvin Hasanov",
    handle: "@elvindev",
    text: "Clean design, powerful features. The best career prep tool in Azerbaijan."
  }
];

function SignIn() {
  const navigate = useNavigate();
  const { signIn, user, profile, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && profile && !authLoading) {
      const role = profile.role;
      if (role === 'company') {
        navigate('/company', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, profile, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError('Login is taking too long. Please check your email confirmation or try again.');
    }, 10000);

    try {
      const { error } = await signIn(email, password);

      clearTimeout(timeoutId);

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before signing in. Check your inbox for the confirmation link.');
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }

      setTimeout(() => {
        if (loading) {
          setLoading(false);
          setError('Login completed but redirect failed. Please refresh the page.');
        }
      }, 5000);
    } catch (err) {
      clearTimeout(timeoutId);
      setError(err?.message || 'Sign in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="auth-page">
      {/* Left: Form */}
      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          <h1 className="auth-title animate-element animate-delay-100">
            <span className="title-light">Welcome</span> Back
          </h1>
          <p className="auth-subtitle animate-element animate-delay-200">
            Access your account and continue your career journey
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-field animate-element animate-delay-300">
              <label>Email Address</label>
              <div className="glass-input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-field animate-element animate-delay-400">
              <label>Password</label>
              <div className="glass-input-wrapper">
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

            <div className="form-options animate-element animate-delay-500">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>
              <button type="button" className="reset-password-link">Reset password</button>
            </div>

            <button
              type="submit"
              className="auth-submit-btn animate-element animate-delay-600"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider animate-element animate-delay-700">
            <span>Or continue with</span>
          </div>

          <button className="google-btn animate-element animate-delay-800">
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="auth-footer-text animate-element animate-delay-900">
            New to Careerz? <Link to="/signup">Create Account</Link>
            {' · '}
            <Link to="/company/signup">Enterprise Sign Up</Link>
          </p>
        </div>
      </section>

      {/* Right: Hero Image + Testimonials */}
      <section className="auth-hero-section">
        <div
          className="auth-hero-image animate-slide-right animate-delay-300"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80)' }}
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

export default SignIn;
