import React, { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

interface ProtectedRouteProps {
  children: ReactElement | null;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    return isAuthenticated() ? children || null : <Navigate to="/login" />;
  };

export default ProtectedRoute;