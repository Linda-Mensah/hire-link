import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockAdmins } from "../constants/mockAdmins";

type UserRole = "admin" | "recruiter" | "candidate" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string) => Promise<boolean>;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,

      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const validAdmin = mockAdmins.find(
          (admin) =>
            admin.email === email.trim() && admin.password === password.trim(),
        );

        if (validAdmin) {
          set({ isAuthenticated: true, role: "admin" });
          return true;
        }

        return false;
      },

      setRole: (role) => set({ role }),

      logout: () => set({ isAuthenticated: false, role: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
