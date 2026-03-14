import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        fontSize: '1.25rem',
        color: '#64748b'
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredRole && profile && profile.role !== requiredRole) {
    if (profile.role === 'company') return <Navigate to="/company" replace />;
    if (profile.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
