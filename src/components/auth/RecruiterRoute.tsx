import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RecruiterRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdminLoggedIn } = useAuth();

  if (!isAdminLoggedIn) return <Navigate to="/admin-login" replace />;

  return <>{children}</>;
};

export default RecruiterRoute;
