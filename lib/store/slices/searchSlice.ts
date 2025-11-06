import { StateCreator } from 'zustand'
import type { StoreState } from '../index'

export interface SearchFilters {
  destination?: string
  priceRange?: { min: number; max: number }
  duration?: { min: number; max: number }
  style?: string[]
  rating?: number
}

export interface SearchSlice {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: SearchFilters
  setFilters: (filters: SearchFilters) => void
  clearFilters: () => void
}

const initialFilters: SearchFilters = {}

export const createSearchSlice: StateCreator<
  StoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]],
  [],
  SearchSlice
> = (set) => ({
  searchQuery: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query }, false, 'search/setSearchQuery')
  },

  filters: initialFilters,

  setFilters: (filters) => {
    set({ filters }, false, 'search/setFilters')
  },

  clearFilters: () => {
    set({ filters: initialFilters, searchQuery: '' }, false, 'search/clearFilters')
  },
})
