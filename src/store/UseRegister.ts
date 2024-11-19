import { FormData } from "@/types/form";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userData: FormData[];
  setUserData: (data: FormData) => void;
  validateUser: (email: string, password: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userData: [],
      setUserData: (data) =>
        set((state) => ({ userData: [...state.userData, data] })),
      validateUser: (email, password) => {
        const users = get().userData; // Obtiene el array de usuarios actual por el get()
        return users.some(
          (user) => user.email === email && user.password === password //si cumple esto da true
        );
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
