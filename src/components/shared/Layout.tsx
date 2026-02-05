// Layout.tsx - improved header, spacing, and footer
import React from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-white to-amber-50/30">
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <img
                  src="/images/hirelink-logo.png"
                  alt="HireLink Logo"
                  className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-br from-amber-400/10 to-transparent rounded-full"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-stone-800 to-stone-700 bg-clip-text text-transparent">
                  HireLink
                </h1>
                <p className="text-xs text-stone-500 font-medium tracking-wide">
                  STREAMLINED HIRING PLATFORM
                </p>
              </div>
            </div>

            <Navigation />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-amber-100/20 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-linear-to-tl from-stone-100/20 to-transparent rounded-full translate-x-16 translate-y-16"></div>

        <div className="relative z-10">{children}</div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-stone-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-amber-50 to-amber-100 p-1.5 flex items-center justify-center">
                <img
                  src="/images/hirelink-logo.png"
                  alt="HireLink Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-semibold text-stone-800">HireLink</span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
              <span className="text-sm text-stone-600 font-medium">
                © {new Date().getFullYear()} HireLink. All rights reserved.
              </span>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-sm text-stone-600 hover:text-amber-800 hover:underline transition-colors duration-200 font-medium"
                >
                  Privacy
                </a>
                <div className="h-4 w-px bg-stone-200"></div>
                <a
                  href="#"
                  className="text-sm text-stone-600 hover:text-amber-800 hover:underline transition-colors duration-200 font-medium"
                >
                  Terms
                </a>
                <div className="h-4 w-px bg-stone-200"></div>
                <a
                  href="#"
                  className="text-sm text-stone-600 hover:text-amber-800 hover:underline transition-colors duration-200 font-medium"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
