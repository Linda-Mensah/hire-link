import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockAdmins } from "../constants/mockAdmins";
import type { AuthState } from "../types";

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
