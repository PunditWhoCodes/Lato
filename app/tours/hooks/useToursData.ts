/**
 * Custom hook for tours data management
 * Combines API fetching, mapping, and state management
 */

"use client"

import { useMemo } from "react"
import type { Tour } from "@/types"
import { useMarketplaceTrips, mapMarketplaceResponseToTours } from "../api"

interface UseToursDataOptions {
  page?: number
  itemsPerPage?: number
  countries?: string
  enabled?: boolean
}

interface UseToursDataReturn {
  tours: Tour[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  totalCount: number
  refetch: () => void
}

/**
 * Hook to fetch and transform tours data
 * Wraps the query hook and mapper for convenient use in components
 */
export function useToursData(options: UseToursDataOptions = {}): UseToursDataReturn {
  const {
    page = 1,
    itemsPerPage = 10,
    countries,
    enabled = true,
  } = options

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useMarketplaceTrips(
    {
      page,
      step: itemsPerPage,
      sample: true,
      countries,
    },
    {
      enabled,
    }
  )

  const tours = useMemo(() => {
    if (!data) return []
    return mapMarketplaceResponseToTours(data)
  }, [data])

  return {
    tours,
    isLoading,
    isError,
    error: error as Error | null,
    totalCount: data?.count || 0,
    refetch,
  }
}
