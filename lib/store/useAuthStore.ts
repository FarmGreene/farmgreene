import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";
import { cookieStorage } from "@/lib/storage/cookie-storage";

interface AuthState {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  clearError: () => void;
  setError: (error: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,

      // Set user and mark as authenticated
      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      // Set tokens
      setTokens: (accessToken: string, refreshToken: string) =>
        set({
          accessToken,
          refreshToken,
        }),

      // Logout action
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Error handling
      clearError: () => set({ error: null }),
      setError: (error: string) => set({ error }),
    }),
    {
      name: "auth-storage", // Cookie key
      storage: cookieStorage, // Use cookies for server-side access
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    },
  ),
);
