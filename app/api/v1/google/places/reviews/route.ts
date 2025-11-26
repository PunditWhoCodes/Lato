/**
 * API Route: Google Places Reviews
 * GET /api/v1/google/places/reviews
 *
 * Fetches reviews for a tour location from Google Places API
 */

import { NextRequest, NextResponse } from 'next/server'
import { fetchLocationReviews, fetchTourReviews } from '@/lib/services/google-places'
import type { GoogleMapPoint } from '@/lib/types/google-maps'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET: Fetch reviews for a location or tour
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Check if it's a single location or multiple tour locations
    const locationsParam = searchParams.get('locations')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const name = searchParams.get('name')

    // Multiple tour locations
    if (locationsParam) {
      try {
        const locations = JSON.parse(locationsParam) as Array<{
          name: string
          lat: number
          lng: number
        }>

        if (!Array.isArray(locations) || locations.length === 0) {
          return NextResponse.json(
            { error: 'Invalid locations format' },
            { status: 400 }
          )
        }

        const result = await fetchTourReviews(locations)

        return NextResponse.json(
          {
            success: true,
            data: result,
          },
          {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800', // 15 min cache
            },
          }
        )
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid locations JSON format' },
          { status: 400 }
        )
      }
    }

    // Single location
    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Missing required parameters: lat and lng' },
        { status: 400 }
      )
    }

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { error: 'Invalid coordinates format' },
        { status: 400 }
      )
    }

    const location: GoogleMapPoint = {
      lat: latitude,
      lng: longitude,
    }

    const result = await fetchLocationReviews(location, name || undefined)

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800', // 15 min cache
        },
      }
    )
  } catch (error) {
    console.error('Error in reviews API route:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
