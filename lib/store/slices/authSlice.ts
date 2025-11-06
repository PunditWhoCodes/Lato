import { StateCreator } from 'zustand'
import type { StoreState } from '../index'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthSlice {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const createAuthSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  AuthSlice
> = (set, get) => ({
  user: null,

  setUser: (user) => {
    set({ user }, false, 'auth/setUser')
  },

  clearUser: () => {
    set({ user: null }, false, 'auth/clearUser')
  },

  isAuthenticated: () => {
    return get().user !== null
  },
})
