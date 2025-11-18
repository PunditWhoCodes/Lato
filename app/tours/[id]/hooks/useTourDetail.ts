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

  // Validate tourId
  const isValidTourId = !!tourId && tourId !== 'undefined' && tourId.trim() !== ''

  // Fetch single trip by UUID using the dedicated endpoint
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useTripById(tourId, {
    enabled: enabled && isValidTourId,
  })

  // Map API response to Tour format
  const tour = useMemo(() => {
    if (!data) {
      console.log("useTourDetail: No data received from API")
      return undefined
    }

    console.log("useTourDetail: Data received:", {
      hasId: !!data?.id,
      hasData: !!(data as any)?.data,
      keys: Object.keys(data || {}),
    })

    try {
      // Check if data is wrapped in a 'data' property
      const userData = (data as any)?.data || data
      console.log("useTourDetail: Mapping user trip with ID:", userData?.id)
      return mapUserTripToTour(userData)
    } catch (err) {
      console.error("Error mapping tour data:", err)
      console.error("Data that failed to map:", data)
      return undefined
    }
  }, [data])

  return {
    tour,
    isLoading: isValidTourId ? isLoading : false,
    isError: !isValidTourId ? true : isError,
    error: !isValidTourId
      ? new Error("Invalid tour ID provided")
      : (error as Error | null),
    refetch,
  }
}
