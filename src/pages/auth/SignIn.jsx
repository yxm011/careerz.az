import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './Auth.css';

function SignIn() {
  const navigate = useNavigate();
  const { signIn, user, profile, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-redirect once user is logged in and profile is loaded
  useEffect(() => {
    if (user && profile && !authLoading) {
      const role = profile.role;
      if (role === 'company') {
        navigate('/company', { replace: true });
      } else if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    }
  }, [user, profile, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Don't navigate here - useEffect will handle it once profile loads
    } catch (err) {
      setError(err?.message || 'Sign in failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="input"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
            <p className="auth-divider-text">
              Are you a company?{' '}
              <Link to="/company/signup" className="auth-link">Enterprise Sign Up</Link>
            </p>
          </div>
        </div>

        <div className="auth-illustration">
          <div className="illustration-content">
            <h2>Start Your Career Journey</h2>
            <p>Access real-world job simulations and build the skills employers are looking for.</p>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Track your progress across all simulations</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Earn certificates from top companies</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Build your professional portfolio</span>
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

export default SignIn;
