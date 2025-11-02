import type { Tour, SearchFilters } from "@/types"

export interface TravelStyleType {
  name: string
  types: string[]
}

export interface ChatQuestion {
  id: string
  question: string
  type: "select"
  options: string[]
}

export type ViewMode = "grid" | "list"

export type SortByType = "popular" | "price-low" | "price-high" | "rating"

export type { Tour, SearchFilters }
