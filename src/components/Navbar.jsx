import { useState, useEffect, useCallback } from 'react';
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const role = profile?.role;
  const isCompany = role === 'company';
  const isAdmin = role === 'admin';

  // Scroll detection
  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
    return '/dashboard';
  };

  // Build nav links based on role
  const getNavLinks = () => {
    if (!user) {
      return [
        { label: t('nav.simulations'), to: '/explore' },
        { label: t('nav.blog'), to: '/blog' },
        { label: t('nav.forEnterprise'), to: '/for-companies' },
        { label: t('nav.forEducators'), to: '/for-educators' },
      ];
    }
    if (user && profile && isCompany) {
      return [
        { label: 'Dashboard', to: '/company' },
        { label: 'Simulations', to: '/company/simulations' },
        { label: 'Submissions', to: '/company/submissions' },
        { label: 'Talent', to: '/company/talent-pool' },
        { label: 'Settings', to: '/company/profile' },
      ];
    }
    if (user && profile && !isCompany && !isAdmin) {
      return [
        { label: 'Explore', to: '/explore' },
        { label: 'My Dashboard', to: '/dashboard' },
        { label: 'Blog', to: '/blog' },
      ];
    }
    if (user && profile && isAdmin) {
      return [
        { label: t('nav.simulations'), to: '/explore' },
        { label: t('nav.blog'), to: '/blog' },
        { label: t('nav.forEnterprise'), to: '/for-companies' },
        { label: t('nav.forEducators'), to: '/for-educators' },
      ];
    }
    return [];
  };

  const navLinks = getNavLinks();

  return (
    <header className={`header ${scrolled && !open ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <nav className={`header-nav ${scrolled ? 'header-nav--compact' : ''}`}>
        <Link to="/" className="header-logo">Careerz.az</Link>

        {/* All desktop nav items in one row */}
        <div className="header-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header-link ${isActive(link.to) ? 'header-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              {profile && isCompany && (
                <Link to="/company/simulations/new" className="header-link">+ New Simulation</Link>
              )}
              <Link to={getDashboardPath()} className="header-link">{getUserName()}</Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="header-link">{t('nav.signIn')}</Link>
              <Link to="/signup" className="header-link">{t('nav.signUp')}</Link>
            </>
          )}
        </div>

        {/* Language selector — far right */}
        <div className="header-lang">
          <LanguageSelector />
        </div>

        {/* Mobile hamburger */}
        <button className="header-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg
            className={`header-toggle-icon ${open ? 'header-toggle-icon--open' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 32 32"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className={`toggle-path-main ${open ? 'toggle-path-main--open' : ''}`}
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            />
            <path d="M7 16 27 16" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`header-mobile ${open ? 'header-mobile--open' : 'header-mobile--closed'}`}>
        <div className="header-mobile-inner">
          <div className="header-mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="header-mobile-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="header-mobile-actions">
            {user ? (
              <>
                {profile && isCompany && (
                  <Link to="/company/simulations/new" className="header-mobile-btn header-mobile-btn--primary">
                    + New Simulation
                  </Link>
                )}
                <Link to={getDashboardPath()} className="header-mobile-btn header-mobile-btn--primary">
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="header-mobile-btn header-mobile-btn--outline">{t('nav.signIn')}</Link>
                <Link to="/signup" className="header-mobile-btn header-mobile-btn--primary">{t('nav.signUp')}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
