import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/App/appContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    console.log('ProtectedRoute: user is not logged in');
    return <Navigate to='/landing' state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
