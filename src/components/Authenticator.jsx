import React from 'react';
import { Navigate } from 'react-router-dom';

const Authenticator = ({ children }) => {
  const token = localStorage.getItem('jwtToken');

  if (!token && window.location.pathname !== '/') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Authenticator;
