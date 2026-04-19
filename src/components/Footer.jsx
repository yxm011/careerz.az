import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container row between">
        <div className="row gap-12">
          <span className="logo" style={{ fontSize: 14 }}>
            <span className="logo-mark" style={{ width: 20, height: 20, fontSize: 11 }}>C</span> 
            careerz<span style={{ color: 'var(--accent)' }}>.az</span>
          </span>
          <span className="muted">Bakı, Azərbaycan</span>
        </div>
        <div className="row gap-20 muted">
          <span>© 2026 Careerz MMC</span>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
