import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../../stores/authStore"; // Change this import
import clsx from "clsx";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore(); // Use isAuthenticated instead of isAdminLoggedIn
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [{ path: "/", label: "Jobs", icon: Home }];
  if (isAuthenticated)
    // Use isAuthenticated
    navItems.push({ path: "/recruiter", label: "Pipeline", icon: Users });

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-amber-600">
              <img
                src="/images/hirelink-logo.png"
                className="w-16 h-16 object-cover"
                alt="hirelink logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center flex-1 justify-end">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition",
                      isActive
                        ? "bg-amber-100 text-amber-900 shadow-sm"
                        : "text-stone-700 hover:bg-stone-50 hover:text-stone-900",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Auth Button */}
              {!isAuthenticated ? ( // Use isAuthenticated
                <Link
                  to="/admin-login"
                  className="px-3 py-2 rounded-md bg-amber-100 text-amber-900 text-sm font-medium hover:bg-amber-200"
                >
                  Admin Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-stone-100 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg w-full absolute top-16 left-0 overflow-hidden">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition",
                    isActive
                      ? "bg-amber-100 text-amber-900"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Mobile Auth Button */}
            {!isAuthenticated ? (
              <Link
                to="/admin-login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md bg-amber-100 text-amber-900 text-sm font-medium hover:bg-amber-200"
              >
                Admin Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-50 text-red-700 text-sm font-medium cursor-pointer hover:bg-red-100 w-full text-left"
              >
                <LogOut className="w-4 h-4 cursor-pointer" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
