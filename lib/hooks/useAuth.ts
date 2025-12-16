'use client'

import { useStore } from '@/lib/store'
import type { User } from '@/lib/types/auth'

export function useAuth() {
  const user = useStore((state) => state.user)
  const isLoading = useStore((state) => state.isLoading)
  const isHydrated = useStore((state) => state.isHydrated)
  const error = useStore((state) => state.error)
  const login = useStore((state) => state.login)
  const register = useStore((state) => state.register)
  const logout = useStore((state) => state.logout)
  const refreshSession = useStore((state) => state.refreshSession)
  const setUser = useStore((state) => state.setUser)
  const clearError = useStore((state) => state.clearError)
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  return {
    user,
    isLoading,
    isHydrated,
    error,
    isAuthenticated: isAuthenticated(),

    login,
    register,
    logout,
    refreshSession,
    setUser,
    clearError,
  }
}

export default useAuth
