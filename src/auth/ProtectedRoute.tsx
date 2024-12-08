import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../axios"; // Adjust as necessary
import { OverlaidSpinner } from "../components/Shared";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Make a request to check if the user is authenticated
    const checkAuthentication = async () => {
      try {
        const response = await api.get("/auth/check-auth");

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Please wait...</div>;
  }

  // If the user is authenticated, render the protected route
  if (isAuthenticated) {
    return element;
  }

  // If the user is not authenticated, redirect to login page
  return <Navigate to="/" />;
};

export default ProtectedRoute;
