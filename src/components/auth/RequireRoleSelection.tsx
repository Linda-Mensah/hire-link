import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import type { ReactNode } from "react";

const RequireRoleSelection = ({ children }: { children: ReactNode }) => {
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <Navigate to="/select-role" replace />;
  }

  return children;
};

export default RequireRoleSelection;
