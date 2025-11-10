// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { user } = useContext(AuthContext);

  // If the user is not logged in or doesn't have the correct role, redirect them
  if (!user || (roles && !roles.includes(user.role))) {
    console.log("ProtectedRoute -> user:", user);

    return <Navigate to="/login" />;
  }

  return <Outlet />; // If logged in and authorized, render the nested routes
};

export default ProtectedRoute;
