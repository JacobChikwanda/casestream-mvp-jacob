"use client"

import { useAuthStore } from "@/lib/store/auth"

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const setUser = useAuthStore((state) => state.setUser)
  const logout = useAuthStore((state) => state.logout)

  return {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    logout,
  }
}

/**
 * Hook to get current account slug
 */
export function useAccountSlug() {
  const user = useAuthStore((state) => state.user)
  return user?.accountSlug
}

/**
 * Hook to check if user has admin privileges
 */
export function useIsAdmin() {
  const user = useAuthStore((state) => state.user)
  return user?.applicationAdmin || user?.staffGroup === "FIRM_MANAGER"
}