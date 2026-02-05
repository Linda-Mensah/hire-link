import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const RequireRoleSelection = ({ children }: { children: JSX.Element }) => {
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <Navigate to="/select-role" replace />;
  }

  return children;
};

export default RequireRoleSelection;
