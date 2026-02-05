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
    navigate("/");
  };

  return (
    <nav className="flex items-center space-x-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "flex items-center space-x-2.5 px-4 py-2.5 rounded-lg transition-all duration-200 group",
              isActive
                ? "bg-linear-to-r from-amber-50 to-amber-100/50 text-amber-900 shadow-sm ring-1 ring-amber-200"
                : "text-stone-600 hover:bg-stone-50 hover:text-stone-900 hover:shadow-sm",
            )}
          >
            <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium tracking-wide">{item.label}</span>
          </Link>
        );
      })}

      {!isAdminLoggedIn && (
        <Link
          to="/admin-login"
          className="ml-auto px-5 py-2.5 rounded-lg bg-linear-to-r from-amber-100 to-amber-50 text-amber-900 hover:from-amber-200 hover:to-amber-100 shadow-sm hover:shadow transition-all duration-200 font-medium ring-1 ring-amber-200 hover:ring-amber-300"
        >
          Admin Login
        </Link>
      )}

      {isAdminLoggedIn && (
        <button
          onClick={handleLogout}
          className="ml-auto flex items-center space-x-2.5 px-5 py-2.5 rounded-lg bg-linear-to-r from-red-50 to-red-50/80 text-red-700 hover:from-red-100 hover:to-red-50 shadow-sm hover:shadow transition-all duration-200 font-medium ring-1 ring-red-200 hover:ring-red-300"
        >
          <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </button>
      )}
    </nav>
  );
};
