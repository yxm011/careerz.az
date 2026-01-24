import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DemoModeSwitcher.css';

function DemoModeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentRole = () => {
    if (location.pathname.startsWith('/company')) return 'Company';
    if (location.pathname.startsWith('/admin')) return 'Admin';
    if (location.pathname.startsWith('/student') || location.pathname.startsWith('/explore') || location.pathname.startsWith('/sim')) return 'Student';
    return 'None';
  };

  const switchRole = (role) => {
    switch (role) {
      case 'Student':
        navigate('/explore');
        break;
      case 'Company':
        navigate('/company');
        break;
      case 'Admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
    setIsOpen(false);
  };

  const currentRole = getCurrentRole();

  return (
    <div className="demo-mode-switcher">
      <button 
        className="demo-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Switch Demo Role"
      >
        🎭 Demo: {currentRole}
      </button>
      
      {isOpen && (
        <>
          <div className="demo-overlay" onClick={() => setIsOpen(false)} />
          <div className="demo-menu">
            <div className="demo-menu-header">
              <h3>Switch Demo Role</h3>
              <button onClick={() => setIsOpen(false)} className="demo-close">✕</button>
            </div>
            <div className="demo-menu-content">
              <button 
                className={`demo-role-btn ${currentRole === 'Student' ? 'active' : ''}`}
                onClick={() => switchRole('Student')}
              >
                <div className="role-icon">🎓</div>
                <div className="role-info">
                  <div className="role-name">Student</div>
                  <div className="role-desc">Browse and complete simulations</div>
                </div>
              </button>
              
              <button 
                className={`demo-role-btn ${currentRole === 'Company' ? 'active' : ''}`}
                onClick={() => switchRole('Company')}
              >
                <div className="role-icon">🏢</div>
                <div className="role-info">
                  <div className="role-name">Company</div>
                  <div className="role-desc">Create and manage simulations</div>
                </div>
              </button>
              
              <button 
                className={`demo-role-btn ${currentRole === 'Admin' ? 'active' : ''}`}
                onClick={() => switchRole('Admin')}
              >
                <div className="role-icon">⚙️</div>
                <div className="role-info">
                  <div className="role-name">Admin</div>
                  <div className="role-desc">Manage templates and reviews</div>
                </div>
              </button>
            </div>
            <div className="demo-menu-footer">
              <small>💡 Demo mode - No login required</small>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DemoModeSwitcher;
