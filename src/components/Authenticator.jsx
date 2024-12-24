import React from 'react';
import { Navigate } from 'react-router-dom';

const Authenticator = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  console.log('Token retrieved from local storage:', token); // Debugging log
  console.log('Checking authentication status...'); // Debugging log

  if (!token && window.location.pathname !== '/') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Authenticator;
