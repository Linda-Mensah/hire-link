import { type ReactNode, useState } from "react";
import { AuthContext } from "./CreateAuthContext";
import { mockAdmins } from "../constants/mockAdmins";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  const login = (email: string, password: string) => {
    const found = mockAdmins.find(
      (admin) => admin.email === email && admin.password === password,
    );
    if (found) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("isAdminLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
