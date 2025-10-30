import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { createSupabaseClient } from "@/lib/supabase/client";

export interface User {
  id: string;
  name: string;
  email: string;
  accountId: string;
  accountSlug: string;
  staffGroup: "ATTORNEY" | "LAW_CLERK" | "STAFF" | "FIRM_MANAGER";
  applicationAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    setUser: (user) =>
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: async () => {
      try {
        // Sign out from Supabase
        const supabase = createSupabaseClient();
        await supabase.auth.signOut();

        // Call logout API to clear server-side session
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (error) {
        console.error("[auth] Logout error:", error);
      } finally {
        // Clear local state
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    },
  })),
);
