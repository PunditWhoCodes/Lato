"use client"

/**
 * Hook: useTourReviewsAggregated
 *
 * Orchestrates fetching Google Places reviews for all tour locations
 * (destinations, hotels, activities) and aggregates them with internal reviews.
 *
 * Uses:
 * - extractReviewableLocations() to get all reviewable locations from tour data
 * - useTourReviews() to fetch Google Places reviews
 * - aggregateReviews() to combine and calculate statistics
 */

import { useMemo } from 'react'
import { useTourReviews } from './useGoogleReviews'
import { extractReviewableLocations } from '../../api/trips.mappers'
import {
  aggregateReviews,
  type AggregatedReviews,
  type RatingDistribution,
} from '@/lib/utils/review-aggregation'
import type { Review } from '@/types'
import type { APITripDetailResponse } from '../../api/trips.types'

interface UseTourReviewsAggregatedOptions {
  /**
   * Raw trip data from the API (has tripdays with locations)
   * Pass the data object from useTripById, not the tourDetail mapped version
   */
  rawTripData: APITripDetailResponse | undefined | null
  /**
   * Optional internal reviews to merge with Google reviews
   */
  internalReviews?: Review[]
  /**
   * Whether to enable the hook (defaults to true)
   */
  enabled?: boolean
}

interface UseTourReviewsAggregatedReturn extends AggregatedReviews {
  /**
   * Whether reviews are currently loading
   */
  isLoading: boolean
  /**
   * Whether there was an error fetching reviews
   */
  isError: boolean
  /**
   * Error object if there was an error
   */
  error: Error | null
  /**
   * Number of locations reviews were fetched from
   */
  locationCount: number
  /**
   * The extracted locations (useful for debugging)
   */
  locations: Array<{ name: string; lat: number; lng: number; type: string }>
  /**
   * Refetch reviews
   */
  refetch: () => void
}

/**
 * Default empty aggregated reviews
 */
const EMPTY_AGGREGATED: AggregatedReviews = {
  reviews: [],
  averageRating: 0,
  totalReviews: 0,
  ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  googleReviewCount: 0,
  internalReviewCount: 0,
}

/**
 * Hook to fetch and aggregate reviews from all tour locations
 *
 * @example
 * ```tsx
 * const { data: rawData } = useTripById(tourId)
 *
 * const {
 *   reviews,
 *   averageRating,
 *   totalReviews,
 *   ratingDistribution,
 *   isLoading,
 * } = useTourReviewsAggregated({
 *   rawTripData: rawData,
 *   enabled: Boolean(rawData),
 * })
 * ```
 */
export function useTourReviewsAggregated({
  rawTripData,
  internalReviews = [],
  enabled = true,
}: UseTourReviewsAggregatedOptions): UseTourReviewsAggregatedReturn {
  // Extract reviewable locations from the trip data
  const locations = useMemo(() => {
    if (!rawTripData || !rawTripData.tripdays) {
      return []
    }

    try {
      return extractReviewableLocations(rawTripData)
    } catch (error) {
      console.error('Error extracting reviewable locations:', error)
      return []
    }
  }, [rawTripData])

  // Format locations for the API call
  const apiLocations = useMemo(() => {
    return locations.map((loc) => ({
      name: loc.name,
      lat: loc.lat,
      lng: loc.lng,
    }))
  }, [locations])

  // Fetch Google reviews for all locations
  const {
    data: googleData,
    isLoading,
    isError,
    error,
    refetch,
  } = useTourReviews({
    locations: apiLocations,
    enabled: enabled && apiLocations.length > 0,
  })

  // Aggregate reviews with internal reviews
  const aggregated = useMemo((): AggregatedReviews => {
    // If no Google data yet, return just internal reviews
    if (!googleData?.data) {
      if (internalReviews.length > 0) {
        return aggregateReviews([], 0, 0, internalReviews)
      }
      return EMPTY_AGGREGATED
    }

    const { reviews: googleReviews, averageRating, totalReviews } = googleData.data

    return aggregateReviews(
      googleReviews || [],
      averageRating || 0,
      totalReviews || 0,
      internalReviews
    )
  }, [googleData, internalReviews])

  return {
    ...aggregated,
    isLoading,
    isError,
    error: error as Error | null,
    locationCount: locations.length,
    locations,
    refetch,
  }
}

/**
 * Helper hook to get just the rating info (lighter weight)
 * Useful when you only need to display the rating badge
 */
export function useTourRating(options: UseTourReviewsAggregatedOptions): {
  rating: number
  reviewCount: number
  isLoading: boolean
} {
  const { averageRating, totalReviews, isLoading } = useTourReviewsAggregated(options)

  return {
    rating: averageRating,
    reviewCount: totalReviews,
    isLoading,
  }
}
