"use client"

import { useMemo } from "react"
import { useTripById, mapUserTripToTour, mapTripDetailResponseToTourDetail } from "../../api"
import type { Tour, TourDetail } from "@/types"
import type { APITripDetailResponse } from "../../api/trips.types"

interface UseTourDetailOptions {
  tourId: string
  enabled?: boolean
}

interface UseTourDetailReturn {
  tour: Tour | undefined
  tourDetail: TourDetail | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch a single tour by UUID
 * Uses the dedicated single trip endpoint for better performance
 * Returns both Tour (basic) and TourDetail (full) formats
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

  // Map API response to Tour format (basic)
  const tour = useMemo(() => {
    if (!data) {
      return undefined
    }

    try {
      // Check if data is wrapped in a 'data' property
      const userData = (data as any)?.data || data
      return mapUserTripToTour(userData)
    } catch (err) {
      console.error("Error mapping tour data:", err)
      return undefined
    }
  }, [data])

  // Map API response to TourDetail format (full with itinerary, accommodations, etc.)
  const tourDetail = useMemo(() => {
    if (!data) {
      return undefined
    }

    try {
      // The API returns the full trip detail response
      const tripData = (data as any)?.data || data

      // Check if this is a full trip detail response (has tripdays)
      if (tripData.tripdays && Array.isArray(tripData.tripdays)) {
        console.log("useTourDetail: Mapping full trip detail response with", tripData.tripdays.length, "tripdays")
        return mapTripDetailResponseToTourDetail(tripData as APITripDetailResponse)
      }

      // Fallback: If no tripdays, create a basic TourDetail from the Tour
      console.log("useTourDetail: No tripdays found, falling back to basic mapping")
      if (tour) {
        return {
          ...tour,
          company: {
            name: tour.company,
            id: tour.companyId,
            avatar: '',
            rating: tour.rating,
            reviews: tour.reviews,
            verified: tour.badges?.includes('Verified Operator') || false,
            responseTime: 'Within 24 hours',
            country: tour.companyCountry,
            countryFlag: tour.companyFlag
          },
          reviewCount: tour.reviews,
          languages: ['English'],
          description: '',
          included: [],
          notIncluded: [],
          itinerary: [],
          reviews: [],
          relatedTours: [],
          images: [tour.image]
        } as TourDetail
      }

      return undefined
    } catch (err) {
      console.error("Error mapping tour detail data:", err)
      return undefined
    }
  }, [data, tour])

  return {
    tour,
    tourDetail,
    isLoading: isValidTourId ? isLoading : false,
    isError: !isValidTourId ? true : isError,
    error: !isValidTourId
      ? new Error("Invalid tour ID provided")
      : (error as Error | null),
    refetch,
  }
}
