/**
 * API Route: Google Directions
 * GET /api/v1/google/directions
 *
 * Calculates routes and directions between locations
 */

import { NextRequest, NextResponse } from 'next/server'
import { GOOGLE_MAPS_CONFIG } from '@/config/google-maps'
import type {
  GoogleDirectionsResponse,
  GoogleMapPoint,
} from '@/lib/types/google-maps'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Calculate directions between origin and destination with optional waypoints
 */
async function calculateDirections(
  origin: GoogleMapPoint,
  destination: GoogleMapPoint,
  waypoints?: GoogleMapPoint[],
  travelMode: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT' = 'DRIVING'
): Promise<GoogleDirectionsResponse> {
  const url = new URL(
    'https://maps.googleapis.com/maps/api/directions/json'
  )

  url.searchParams.append('origin', `${origin.lat},${origin.lng}`)
  url.searchParams.append(
    'destination',
    `${destination.lat},${destination.lng}`
  )
  url.searchParams.append('mode', travelMode.toLowerCase())
  url.searchParams.append('key', GOOGLE_MAPS_CONFIG.serverApiKey)

  // Add waypoints if provided
  if (waypoints && waypoints.length > 0) {
    const waypointsStr = waypoints
      .map((wp) => `${wp.lat},${wp.lng}`)
      .join('|')
    url.searchParams.append('waypoints', waypointsStr)
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`Directions API request failed: ${response.statusText}`)
  }

  const data: GoogleDirectionsResponse = await response.json()
  return data
}

// GET: Calculate directions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Parse origin
    const originLat = searchParams.get('originLat')
    const originLng = searchParams.get('originLng')

    if (!originLat || !originLng) {
      return NextResponse.json(
        { error: 'Missing required parameters: originLat, originLng' },
        { status: 400 }
      )
    }

    // Parse destination
    const destLat = searchParams.get('destLat')
    const destLng = searchParams.get('destLng')

    if (!destLat || !destLng) {
      return NextResponse.json(
        { error: 'Missing required parameters: destLat, destLng' },
        { status: 400 }
      )
    }

    const origin: GoogleMapPoint = {
      lat: parseFloat(originLat),
      lng: parseFloat(originLng),
    }

    const destination: GoogleMapPoint = {
      lat: parseFloat(destLat),
      lng: parseFloat(destLng),
    }

    if (
      isNaN(origin.lat) ||
      isNaN(origin.lng) ||
      isNaN(destination.lat) ||
      isNaN(destination.lng)
    ) {
      return NextResponse.json(
        { error: 'Invalid coordinates format' },
        { status: 400 }
      )
    }

    // Parse optional waypoints
    let waypoints: GoogleMapPoint[] | undefined
    const waypointsParam = searchParams.get('waypoints')

    if (waypointsParam) {
      try {
        waypoints = JSON.parse(waypointsParam)

        if (!Array.isArray(waypoints)) {
          return NextResponse.json(
            { error: 'Waypoints must be an array' },
            { status: 400 }
          )
        }

        // Validate waypoint format
        const invalidWaypoint = waypoints.some(
          (wp: any) =>
            typeof wp.lat !== 'number' || typeof wp.lng !== 'number'
        )

        if (invalidWaypoint) {
          return NextResponse.json(
            { error: 'Invalid waypoint format' },
            { status: 400 }
          )
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid waypoints JSON format' },
          { status: 400 }
        )
      }
    }

    // Parse travel mode
    const mode = searchParams.get('mode') || 'DRIVING'
    const travelMode = mode.toUpperCase() as
      | 'DRIVING'
      | 'WALKING'
      | 'BICYCLING'
      | 'TRANSIT'

    if (!['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'].includes(travelMode)) {
      return NextResponse.json(
        { error: 'Invalid travel mode' },
        { status: 400 }
      )
    }

    // Calculate directions
    const directions = await calculateDirections(
      origin,
      destination,
      waypoints,
      travelMode
    )

    if (directions.status !== 'OK') {
      return NextResponse.json(
        {
          error: 'Directions calculation failed',
          status: directions.status,
          message: directions.error_message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: directions,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600', // 30 min cache
        },
      }
    )
  } catch (error) {
    console.error('Error in directions API route:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
