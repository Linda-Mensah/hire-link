import { createContext } from "react";

export type AuthContextType = {
  isAdminLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
