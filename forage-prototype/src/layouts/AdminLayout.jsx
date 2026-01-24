import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function AdminLayout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Careerz.az</Link>
          <nav className="nav">
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/templates">Templates</Link>
            <Link to="/admin/review">Review Queue</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
