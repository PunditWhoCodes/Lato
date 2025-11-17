"use client"

import { useMemo } from "react"
import { useTripById, mapUserTripToTour } from "../../api"
import type { Tour } from "@/types"

interface UseTourDetailOptions {
  tourId: string
  enabled?: boolean
}

interface UseTourDetailReturn {
  tour: Tour | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch a single tour by UUID
 * Uses the dedicated single trip endpoint for better performance
 */
export function useTourDetail(options: UseTourDetailOptions): UseTourDetailReturn {
  const { tourId, enabled = true } = options

  // Fetch single trip by UUID using the dedicated endpoint
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useTripById(tourId, {
    enabled: enabled && !!tourId,
  })

  // Map API response to Tour format
  const tour = useMemo(() => {
    if (!data) return undefined
    return mapUserTripToTour(data)
  }, [data])

  return {
    tour,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  }
}
