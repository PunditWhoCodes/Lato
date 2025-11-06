import { StateCreator } from 'zustand'
import type { StoreState } from '../index'

export type Theme = 'light' | 'dark' | 'system'

export interface UISlice {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const createUISlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  UISlice
> = (set) => ({
  sidebarOpen: true,

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open }, false, 'ui/setSidebarOpen')
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'ui/toggleSidebar')
  },

  theme: 'system',

  setTheme: (theme) => {
    set({ theme }, false, 'ui/setTheme')
  },
})
