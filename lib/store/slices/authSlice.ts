import { StateCreator } from 'zustand'
import type { StoreState } from '../index'
import type { User, LoginRequest, RegisterRequest } from '@/lib/types/auth'
import * as authApi from '@/lib/api/auth'
import { setAccessToken, setRefreshToken, clearAllTokens, getAccessToken, setAccessTokenCookie, clearAccessTokenCookie } from '@/lib/utils/token'

export interface AuthSlice {
  // State
  user: User | null
  isLoading: boolean
  error: string | null
  isHydrated: boolean

  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  setHydrated: (hydrated: boolean) => void

  // Authentication methods
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>

  // Utility
  isAuthenticated: () => boolean
  clearUser: () => void
}

export const createAuthSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  AuthSlice
> = (set, get) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,
  isHydrated: false,

  // Setters
  setUser: (user) => {
    set({ user, error: null }, false, 'auth/setUser')
  },

  setLoading: (loading) => {
    set({ isLoading: loading }, false, 'auth/setLoading')
  },

  setError: (error) => {
    set({ error, isLoading: false }, false, 'auth/setError')
  },

  clearError: () => {
    set({ error: null }, false, 'auth/clearError')
  },

  setHydrated: (hydrated) => {
    set({ isHydrated: hydrated }, false, 'auth/setHydrated')
  },

  clearUser: () => {
    set({ user: null, error: null }, false, 'auth/clearUser')
  },

  login: async (data) => {
    try {
      set({ isLoading: true, error: null }, false, 'auth/login/start')

      const response = await authApi.login(data)

      setAccessToken(response.tokens.accessToken, response.tokens.expiresIn)
      setRefreshToken(response.tokens.refreshToken)
      setAccessTokenCookie(response.tokens.accessToken, response.tokens.expiresIn)

      set(
        { user: response.user, isLoading: false, error: null },
        false,
        'auth/login/success'
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      set({ error: errorMessage, isLoading: false, user: null }, false, 'auth/login/error')
      throw error
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null }, false, 'auth/register/start')

      const response = await authApi.register(data)

      setAccessToken(response.tokens.accessToken, response.tokens.expiresIn)
      setRefreshToken(response.tokens.refreshToken)
      setAccessTokenCookie(response.tokens.accessToken, response.tokens.expiresIn)

      set(
        { user: response.user, isLoading: false, error: null },
        false,
        'auth/register/success'
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      set({ error: errorMessage, isLoading: false, user: null }, false, 'auth/register/error')
      throw error
    }
  },

  logout: async () => {
    try {
      const token = getAccessToken()
      if (token) {
        await authApi.logout(token)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAllTokens()
      set({ user: null, error: null, isLoading: false }, false, 'auth/logout')
    }
  },

  refreshSession: async () => {
    try {
      const token = getAccessToken()
      if (!token) {
        set({ user: null }, false, 'auth/refreshSession/noToken')
        return
      }

      const user = await authApi.getCurrentUser(token)
      set({ user, error: null }, false, 'auth/refreshSession/success')
    } catch (error) {
      console.error('Session refresh error:', error)
    }
  },

  isAuthenticated: () => {
    return get().user !== null
  },
})
