import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, LogOut } from "lucide-react";
import clsx from "clsx";
import { useAuth } from "../../hooks/useAuth";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, logout } = useAuth();

  const navItems = [{ path: "/", label: "Jobs", icon: Home }];

  if (isAdminLoggedIn) {
    navItems.push({ path: "/recruiter", label: "Pipeline", icon: Users });
  }

  const handleLogout = () => {
    logout();
    navigate("/"); // go back to jobs
  };

  return (
    <nav className="flex items-center space-x-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
              isActive
                ? "bg-amber-50 text-amber-900"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}

      {!isAdminLoggedIn && (
        <Link
          to="/admin-login"
          className="ml-auto px-4 py-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200"
        >
          Admin Login
        </Link>
      )}

      {isAdminLoggedIn && (
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      )}
    </nav>
  );
};
