/**
 * API Route: Google Places Details
 * GET /api/v1/google/places/details
 *
 * Fetches detailed information about a place from Google Places API
 */

import { NextRequest, NextResponse } from 'next/server'
import { fetchPlaceDetails, searchNearbyPlaces, geocodeAddress } from '@/lib/services/google-places'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET: Fetch place details
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const placeId = searchParams.get('placeId')
    const address = searchParams.get('address')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius')
    const type = searchParams.get('type')

    // Fetch by place ID
    if (placeId) {
      const details = await fetchPlaceDetails(placeId)

      if (!details) {
        return NextResponse.json(
          { error: 'Place not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          success: true,
          data: details,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200', // 1 hour cache
          },
        }
      )
    }

    // Geocode address first if provided
    if (address) {
      const coordinates = await geocodeAddress(address)

      if (!coordinates) {
        return NextResponse.json(
          { error: 'Could not geocode address' },
          { status: 404 }
        )
      }

      // Search nearby with geocoded coordinates
      const searchRadius = radius ? parseInt(radius) : 1000
      const places = await searchNearbyPlaces(
        coordinates,
        searchRadius,
        type || undefined
      )

      return NextResponse.json(
        {
          success: true,
          data: {
            coordinates,
            places,
          },
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        }
      )
    }

    // Search nearby by coordinates
    if (lat && lng) {
      const latitude = parseFloat(lat)
      const longitude = parseFloat(lng)

      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
          { error: 'Invalid coordinates format' },
          { status: 400 }
        )
      }

      const searchRadius = radius ? parseInt(radius) : 1000
      const places = await searchNearbyPlaces(
        { lat: latitude, lng: longitude },
        searchRadius,
        type || undefined
      )

      return NextResponse.json(
        {
          success: true,
          data: places,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        }
      )
    }

    return NextResponse.json(
      { error: 'Missing required parameters: placeId, address, or coordinates (lat, lng)' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in place details API route:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
