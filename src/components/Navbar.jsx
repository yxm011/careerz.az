import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../context/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Careerz.az
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/explore" 
            className={`navbar-link ${isActive('/explore') ? 'active' : ''}`}
          >
            {t('nav.simulations')}
          </Link>
          <Link 
            to="/blog" 
            className={`navbar-link ${isActive('/blog') ? 'active' : ''}`}
          >
            {t('nav.blog')}
          </Link>
          <Link 
            to="/for-companies" 
            className={`navbar-link ${isActive('/for-companies') ? 'active' : ''}`}
          >
            {t('nav.forEnterprise')}
          </Link>
          <Link 
            to="/for-educators" 
            className={`navbar-link ${isActive('/for-educators') ? 'active' : ''}`}
          >
            {t('nav.forEducators')}
          </Link>
        </div>
        
        <div className="navbar-right">
          <LanguageSelector />
          <div className="navbar-actions">
            {user ? (
              <>
                <Link to="/student/dashboard" className="navbar-user">
                  Welcome, {getUserName()}
                </Link>
                <Link to="/student/dashboard" className="navbar-profile-mobile">
                  Profile
                </Link>
                <button onClick={handleSignOut} className="btn-signout">
                  Sign Out
                </button>
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
    </nav>
  );
}

export default Navbar;
