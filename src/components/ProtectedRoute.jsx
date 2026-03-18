import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuth();

  // Wait for auth state to fully load
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

  // No user - redirect to sign in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // User exists but profile not loaded yet - keep showing loading
  // This prevents flash of wrong content while profile is being fetched
  if (user && !profile) {
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

  // Check role-based access
  if (requiredRole && profile.role !== requiredRole) {
    if (profile.role === 'company') return <Navigate to="/company" replace />;
    if (profile.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/student/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
