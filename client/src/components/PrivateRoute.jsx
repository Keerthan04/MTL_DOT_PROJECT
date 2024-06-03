import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { token } = useAuth();

  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
