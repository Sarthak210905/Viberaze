import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && (user.user?.email || user.email) === 'sarthakchoukse2109@gmail.com') {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}; 