"use client"

import { useMemo } from "react"
import { useMarketplaceTrips, mapMarketplaceResponseToTours } from "../../api"
import type { Tour } from "@/types"

interface UseTourDetailOptions {
  tourId: string | number
  enabled?: boolean
}

interface UseTourDetailReturn {
  tour: Tour | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

export function useTourDetail(options: UseTourDetailOptions): UseTourDetailReturn {
  const { tourId, enabled = true } = options

  const numericId = typeof tourId === "string" ? parseInt(tourId, 10) : tourId

  // Fetch all tours (cached by TanStack Query)
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useMarketplaceTrips(
    {
      page: 1,
      step: 100,
      sample: true,
    },
    {
      enabled,
    }
  )

  // Find the tour by numeric ID
  const tour = useMemo(() => {
    if (!data) return undefined
    const tours = mapMarketplaceResponseToTours(data)
    return tours.find((t) => t.id === numericId)
  }, [data, numericId])

  return {
    tour,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  }
}
