import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === '1';

  if (!token) {
    // Not logged in
    return <Navigate to="/loginPage" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Not an admin
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;