import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore"; // Change this import

const RecruiterRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/admin-login" replace />;

  return <>{children}</>;
};

export default RecruiterRoute;
