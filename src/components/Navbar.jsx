import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../context/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = profile?.role;
  const isCompany = role === 'company';
  const isAdmin = role === 'admin';
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSignOut = async () => {
    signOut();
    navigate('/', { replace: true });
  };

  const getUserName = () => {
    if (isCompany) {
      return profile?.company_name || user?.user_metadata?.company_name || user?.email?.split('@')[0] || 'Company';
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getDashboardPath = () => {
    if (isCompany) return '/company';
    if (isAdmin) return '/admin';
    return '/student/dashboard';
  };

  // --- Guest nav (not logged in) ---
  const renderGuestNav = () => (
    <>
      <Link to="/explore" className={`navbar-link ${isActive('/explore') ? 'active' : ''}`}>
        {t('nav.simulations')}
      </Link>
      <Link to="/blog" className={`navbar-link ${isActive('/blog') ? 'active' : ''}`}>
        {t('nav.blog')}
      </Link>
      <Link to="/for-companies" className={`navbar-link ${isActive('/for-companies') ? 'active' : ''}`}>
        {t('nav.forEnterprise')}
      </Link>
      <Link to="/for-educators" className={`navbar-link ${isActive('/for-educators') ? 'active' : ''}`}>
        {t('nav.forEducators')}
      </Link>
    </>
  );

  // --- Student nav ---
  const renderStudentNav = () => (
    <>
      <Link to="/explore" className={`navbar-link ${isActive('/explore') ? 'active' : ''}`}>
        Explore
      </Link>
      <Link to="/student/dashboard" className={`navbar-link ${isActive('/student') ? 'active' : ''}`}>
        My Dashboard
      </Link>
      <Link to="/blog" className={`navbar-link ${isActive('/blog') ? 'active' : ''}`}>
        Blog
      </Link>
    </>
  );

  // --- Company nav ---
  const renderCompanyNav = () => (
    <>
      <Link to="/company" className={`navbar-link ${isActive('/company') && !isActive('/company/simulations') && !isActive('/company/submissions') && !isActive('/company/talent-pool') ? 'active' : ''}`}>
        Dashboard
      </Link>
      <Link to="/company/simulations" className={`navbar-link ${isActive('/company/simulations') ? 'active' : ''}`}>
        Simulations
      </Link>
      <Link to="/company/submissions" className={`navbar-link ${isActive('/company/submissions') ? 'active' : ''}`}>
        Submissions
      </Link>
      <Link to="/company/talent-pool" className={`navbar-link ${isActive('/company/talent-pool') ? 'active' : ''}`}>
        Talent
      </Link>
      <Link to="/company/profile" className={`navbar-link ${isActive('/company/profile') ? 'active' : ''}`}>
        Settings
      </Link>
    </>
  );

  return (
    <nav className={`navbar ${isCompany ? 'navbar--company' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Careerz.az
        </Link>
        
        <div className="navbar-menu">
          {!user && renderGuestNav()}
          {user && !profile && null}
          {user && profile && !isCompany && !isAdmin && renderStudentNav()}
          {user && profile && isCompany && renderCompanyNav()}
          {user && profile && isAdmin && renderGuestNav()}
        </div>
        
        <div className="navbar-right">
          <LanguageSelector />
          
          {/* Hamburger menu button for mobile */}
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <div className="navbar-actions">
            {user ? (
              <>
                {/* Quick-create button for companies */}
                {profile && isCompany && (
                  <Link to="/company/simulations/new" className="btn-create-sim">
                    + New Simulation
                  </Link>
                )}

                <Link to={getDashboardPath()} className="navbar-user">
                  {profile && isCompany && <span className="navbar-role-badge navbar-role-badge--company">Enterprise</span>}
                  {profile && !isCompany && !isAdmin && <span className="navbar-role-badge navbar-role-badge--student">Student</span>}
                  {getUserName()}
                </Link>
                <Link to={getDashboardPath()} className="navbar-profile-mobile">
                  {profile && isCompany ? 'Panel' : 'Profile'}
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn-signin">
                  {t('nav.signIn')}
                </Link>
                <Link to="/signup" className="btn-signup">
                  {t('nav.signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button 
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-menu-content">
              {/* User info section */}
              {user && profile && (
                <div className="mobile-menu-user">
                  {profile && isCompany && <span className="navbar-role-badge navbar-role-badge--company">Enterprise</span>}
                  {profile && !isCompany && !isAdmin && <span className="navbar-role-badge navbar-role-badge--student">Student</span>}
                  <span className="mobile-menu-username">{getUserName()}</span>
                </div>
              )}

              {/* Navigation links */}
              <div className="mobile-menu-links">
                {!user && (
                  <>
                    <Link to="/explore" onClick={() => setMobileMenuOpen(false)}>{t('nav.simulations')}</Link>
                    <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>{t('nav.blog')}</Link>
                    <Link to="/for-companies" onClick={() => setMobileMenuOpen(false)}>{t('nav.forEnterprise')}</Link>
                    <Link to="/for-educators" onClick={() => setMobileMenuOpen(false)}>{t('nav.forEducators')}</Link>
                  </>
                )}

                {user && profile && !isCompany && !isAdmin && (
                  <>
                    <Link to="/explore" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
                    <Link to="/student/dashboard" onClick={() => setMobileMenuOpen(false)}>My Dashboard</Link>
                    <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
                  </>
                )}

                {user && profile && isCompany && (
                  <>
                    <Link to="/company" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                    <Link to="/company/simulations" onClick={() => setMobileMenuOpen(false)}>Simulations</Link>
                    <Link to="/company/submissions" onClick={() => setMobileMenuOpen(false)}>Submissions</Link>
                    <Link to="/company/talent-pool" onClick={() => setMobileMenuOpen(false)}>Talent</Link>
                    <Link to="/company/profile" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
                  </>
                )}
              </div>

              {/* Auth actions */}
              <div className="mobile-menu-actions">
                {!user ? (
                  <>
                    <Link to="/signin" className="mobile-menu-btn mobile-menu-btn-signin" onClick={() => setMobileMenuOpen(false)}>
                      {t('nav.signIn')}
                    </Link>
                    <Link to="/signup" className="mobile-menu-btn mobile-menu-btn-signup" onClick={() => setMobileMenuOpen(false)}>
                      {t('nav.signUp')}
                    </Link>
                  </>
                ) : (
                  <Link 
                    to={getDashboardPath()} 
                    className="mobile-menu-btn mobile-menu-btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
