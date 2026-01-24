import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function CompanyLayout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Careerz.az</Link>
          <nav className="nav">
            <Link to="/company">Dashboard</Link>
            <Link to="/company/simulations">Simulations</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default CompanyLayout;
