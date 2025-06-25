import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === '1';
  const isCallCenter = localStorage.getItem('isCallCenter') === '1';

  // Redirect if not logged in
  if (!token) {
    return <Navigate to="/loginPage" replace />;
  }

  // Redirect if adminOnly route but user is neither admin nor call center
  if (adminOnly && !(isAdmin || isCallCenter)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
