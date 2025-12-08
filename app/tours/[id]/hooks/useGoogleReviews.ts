/**
 * Hook: useGoogleReviews
 *
 * Fetches reviews from Google Places API for a tour location
 */

import { useQuery } from '@tanstack/react-query'
import type { TourReview } from '@/lib/types/google-maps'

interface UseGoogleReviewsOptions {
  lat?: number
  lng?: number
  name?: string
  enabled?: boolean
}

interface GoogleReviewsResponse {
  success: boolean
  data: {
    reviews: TourReview[]
    rating: number
    totalReviews: number
    placeId: string | null
  }
}

async function fetchGoogleReviews(
  lat: number,
  lng: number,
  name?: string
): Promise<GoogleReviewsResponse> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
  })

  if (name) {
    params.append('name', name)
  }

  const response = await fetch(`/api/v1/google/places/reviews?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch reviews')
  }

  return response.json()
}

export function useGoogleReviews({
  lat,
  lng,
  name,
  enabled = true,
}: UseGoogleReviewsOptions) {
  return useQuery({
    queryKey: ['google-reviews', lat, lng, name],
    queryFn: () => {
      if (!lat || !lng) {
        throw new Error('Coordinates are required')
      }
      return fetchGoogleReviews(lat, lng, name)
    },
    enabled: enabled && Boolean(lat) && Boolean(lng),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  })
}

/**
 * Hook for fetching reviews from multiple tour locations
 */
interface UseTourReviewsOptions {
  locations: Array<{ name: string; lat: number; lng: number }>
  enabled?: boolean
}

interface TourReviewsResponse {
  success: boolean
  data: {
    reviews: TourReview[]
    averageRating: number
    totalReviews: number
  }
}

async function fetchTourReviews(
  locations: Array<{ name: string; lat: number; lng: number }>
): Promise<TourReviewsResponse> {
  const params = new URLSearchParams({
    locations: JSON.stringify(locations),
  })

  const response = await fetch(`/api/v1/google/places/reviews?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch tour reviews')
  }

  return response.json()
}

export function useTourReviews({
  locations,
  enabled = true,
}: UseTourReviewsOptions) {
  return useQuery({
    queryKey: ['tour-reviews', locations],
    queryFn: () => fetchTourReviews(locations),
    enabled: enabled && locations.length > 0,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  })
}
