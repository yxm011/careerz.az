import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuth();
  const [timedOut, setTimedOut] = useState(false);

  // Safety net: if still loading after 4s, proceed anyway
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setTimedOut(true), 4000);
    return () => clearTimeout(t);
  }, [loading]);

  // Show loading only while genuinely waiting and not timed out
  if ((loading || (user && !profile)) && !timedOut) {
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

  // Use profile if available, fall back to basic user role
  const effectiveProfile = profile || { id: user.id, role: requiredRole || 'user' };

  // Check role-based access
  if (requiredRole && effectiveProfile.role !== requiredRole) {
    if (effectiveProfile.role === 'company') return <Navigate to="/company" replace />;
    if (effectiveProfile.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
