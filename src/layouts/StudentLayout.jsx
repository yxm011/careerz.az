import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function StudentLayout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Careerz.az</Link>
          <nav className="nav">
            <Link to="/explore">Explore</Link>
            <Link to="/student/dashboard">My Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
