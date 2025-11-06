import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createAuthSlice, type AuthSlice } from './slices/authSlice'
import { createUISlice, type UISlice } from './slices/uiSlice'
import { createSearchSlice, type SearchSlice } from './slices/searchSlice'

export type StoreState = AuthSlice & UISlice & SearchSlice

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createUISlice(...a),
        ...createSearchSlice(...a),
      }),
      {
        name: 'lato-storage',
        partialize: (state) => ({
          user: state.user,
          sidebarOpen: state.sidebarOpen,
          theme: state.theme,
        }),
      }
    ),
    {
      name: 'Lato Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)

export const useAuth = () => useStore((state) => ({
  user: state.user,
  setUser: state.setUser,
  clearUser: state.clearUser,
  isAuthenticated: state.isAuthenticated,
}))

export const useUI = () => useStore((state) => ({
  sidebarOpen: state.sidebarOpen,
  setSidebarOpen: state.setSidebarOpen,
  toggleSidebar: state.toggleSidebar,
  theme: state.theme,
  setTheme: state.setTheme,
}))

export const useSearch = () => useStore((state) => ({
  searchQuery: state.searchQuery,
  setSearchQuery: state.setSearchQuery,
  filters: state.filters,
  setFilters: state.setFilters,
  clearFilters: state.clearFilters,
}))
