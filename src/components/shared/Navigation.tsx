import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users } from "lucide-react";
import clsx from "clsx";

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Jobs", icon: Home },
    { path: "/recruiter", label: "Pipeline", icon: Users },
  ];

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
    </nav>
  );
};
