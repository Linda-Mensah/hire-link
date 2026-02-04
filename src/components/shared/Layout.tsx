import React from "react";
import { Building2 } from "lucide-react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-amber-900" />
              <div>
                <h1 className="text-2xl font-bold text-stone-800">HireLink</h1>
                <p className="text-sm text-stone-600">
                  Streamlined Hiring Platform
                </p>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-stone-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Building2 className="h-6 w-6 text-amber-900" />
              <span className="text-stone-700 font-medium">HireLink</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-stone-600">
                © {new Date().getFullYear()} HireLink. All rights reserved.
              </span>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-sm text-stone-600 hover:text-amber-900 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-stone-600 hover:text-amber-900 transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-sm text-stone-600 hover:text-amber-900 transition-colors"
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
