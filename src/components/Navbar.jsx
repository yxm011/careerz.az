import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../context/LanguageContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
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
            <Link to="/signin" className="btn-signin">
              {t('nav.signIn')}
            </Link>
            <Link to="/signup" className="btn-signup">
              {t('nav.signUp')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
