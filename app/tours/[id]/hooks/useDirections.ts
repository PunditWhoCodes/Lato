/**
 * Hook: useDirections
 *
 * Calculates directions and routes using Google Directions API
 */

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import type {
  GoogleMapPoint,
  GoogleDirectionsResponse,
  TourRoute,
} from '@/lib/types/google-maps'

interface UseDirectionsOptions {
  origin?: GoogleMapPoint
  destination?: GoogleMapPoint
  waypoints?: GoogleMapPoint[]
  mode?: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT'
  enabled?: boolean
}

async function fetchDirections(
  origin: GoogleMapPoint,
  destination: GoogleMapPoint,
  waypoints?: GoogleMapPoint[],
  mode: string = 'DRIVING'
): Promise<GoogleDirectionsResponse> {
  const params = new URLSearchParams({
    originLat: origin.lat.toString(),
    originLng: origin.lng.toString(),
    destLat: destination.lat.toString(),
    destLng: destination.lng.toString(),
    mode,
  })

  if (waypoints && waypoints.length > 0) {
    params.append('waypoints', JSON.stringify(waypoints))
  }

  const response = await fetch(`/api/v1/google/directions?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch directions')
  }

  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Directions calculation failed')
  }

  return data.data
}

/**
 * Transform Google Directions response to our TourRoute format
 */
function transformDirectionsToRoute(
  directions: GoogleDirectionsResponse
): TourRoute | null {
  if (directions.status !== 'OK' || directions.routes.length === 0) {
    return null
  }

  const route = directions.routes[0]
  const leg = route.legs[0]

  return {
    origin: {
      lat: leg.start_location.lat,
      lng: leg.start_location.lng,
      name: leg.start_address,
    },
    destination: {
      lat: leg.end_location.lat,
      lng: leg.end_location.lng,
      name: leg.end_address,
    },
    waypoints: route.legs.slice(1).map((l) => ({
      lat: l.start_location.lat,
      lng: l.start_location.lng,
      name: l.start_address,
    })),
    totalDistance: leg.distance.text,
    totalDuration: leg.duration.text,
    polyline: route.overview_polyline.points,
  }
}

export function useDirections({
  origin,
  destination,
  waypoints,
  mode = 'DRIVING',
  enabled = true,
}: UseDirectionsOptions = {}) {
  const query = useQuery({
    queryKey: ['directions', origin, destination, waypoints, mode],
    queryFn: () => {
      if (!origin || !destination) {
        throw new Error('Origin and destination are required')
      }
      return fetchDirections(origin, destination, waypoints, mode)
    },
    enabled: enabled && Boolean(origin) && Boolean(destination),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    select: transformDirectionsToRoute,
  })

  return {
    route: query.data || null,
    directions: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  }
}

/**
 * Hook with manual control for calculating directions
 */
export function useDirectionsManual() {
  const [route, setRoute] = useState<TourRoute | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const calculateRoute = useCallback(
    async (
      origin: GoogleMapPoint,
      destination: GoogleMapPoint,
      waypoints?: GoogleMapPoint[],
      mode: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT' = 'DRIVING'
    ) => {
      setIsLoading(true)
      setError(null)

      try {
        const directions = await fetchDirections(origin, destination, waypoints, mode)
        const transformedRoute = transformDirectionsToRoute(directions)
        setRoute(transformedRoute)
        return transformedRoute
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to calculate route')
        setError(error)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const reset = useCallback(() => {
    setRoute(null)
    setError(null)
  }, [])

  return {
    route,
    isLoading,
    error,
    calculateRoute,
    reset,
  }
}
