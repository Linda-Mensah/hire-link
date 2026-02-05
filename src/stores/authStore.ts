import { create } from "zustand";
import { persist } from "zustand/middleware";

type Admin = {
  email: string;
  password: string;
};

const mockAdmins: Admin[] = [
  { email: "admin@hirelink.com", password: "admin123" },
  { email: "recruiter@hirelink.com", password: "recruit123" },
  { email: "hr@hirelink.com", password: "hr123" },
];

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: async (email, password) => {
        // simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const validAdmin = mockAdmins.find(
          (admin) =>
            admin.email === email.trim() && admin.password === password.trim(),
        );

        if (validAdmin) {
          set({ isAuthenticated: true });
          return true;
        }

        return false;
      },

      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // key in localStorage
    },
  ),
);
