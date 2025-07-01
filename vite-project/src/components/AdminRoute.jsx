import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // No autenticado
    return <Navigate to="/login" />;
  }

  if (!user.is_superuser) {
    // No es admin
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;