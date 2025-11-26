/**
 * Google Places API Service
 *
 * Server-side service for interacting with Google Places API
 * Used to fetch reviews, place details, and photos
 */

import { GOOGLE_MAPS_CONFIG } from '@/config/google-maps'
import type {
  GooglePlacesApiResponse,
  GooglePlaceDetails,
  GooglePlaceReview,
  TourReview,
  GoogleMapPoint,
} from '@/lib/types/google-maps'

const BASE_URL = 'https://maps.googleapis.com/maps/api'

/**
 * Fetch place details by place ID
 */
export async function fetchPlaceDetails(
  placeId: string
): Promise<GooglePlaceDetails | null> {
  try {
    const url = new URL(`${BASE_URL}/place/details/json`)
    url.searchParams.append('place_id', placeId)
    url.searchParams.append('key', GOOGLE_MAPS_CONFIG.serverApiKey)
    url.searchParams.append('fields', 'name,rating,reviews,photos,formatted_address,geometry,opening_hours,formatted_phone_number,website,url,user_ratings_total,types')

    const response = await fetch(url.toString())
    const data: GooglePlacesApiResponse = await response.json()

    if (data.status !== 'OK' || !data.result) {
      console.error('Place details fetch failed:', data.status, data.error_message)
      return null
    }

    return data.result
  } catch (error) {
    console.error('Error fetching place details:', error)
    return null
  }
}

/**
 * Search for places near a location
 */
export async function searchNearbyPlaces(
  location: GoogleMapPoint,
  radius: number = 1000,
  type?: string
): Promise<GooglePlaceDetails[]> {
  try {
    const url = new URL(`${BASE_URL}/place/nearbysearch/json`)
    url.searchParams.append('location', `${location.lat},${location.lng}`)
    url.searchParams.append('radius', radius.toString())
    url.searchParams.append('key', GOOGLE_MAPS_CONFIG.serverApiKey)

    if (type) {
      url.searchParams.append('type', type)
    }

    const response = await fetch(url.toString())
    const data: GooglePlacesApiResponse = await response.json()

    if (data.status !== 'OK' || !data.results) {
      console.error('Nearby search failed:', data.status, data.error_message)
      return []
    }

    return data.results
  } catch (error) {
    console.error('Error searching nearby places:', error)
    return []
  }
}

/**
 * Find best matching place for a tour location
 * Searches for tourist attractions, points of interest near the coordinates
 */
export async function findTourLocationPlace(
  location: GoogleMapPoint,
  name?: string
): Promise<string | null> {
  try {
    // First try text search if we have a name
    if (name) {
      const url = new URL(`${BASE_URL}/place/textsearch/json`)
      url.searchParams.append('query', name)
      url.searchParams.append('location', `${location.lat},${location.lng}`)
      url.searchParams.append('radius', '5000')
      url.searchParams.append('key', GOOGLE_MAPS_CONFIG.serverApiKey)

      const response = await fetch(url.toString())
      const data: GooglePlacesApiResponse = await response.json()

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        return data.results[0].place_id
      }
    }

    // Fallback to nearby search for tourist attractions
    const places = await searchNearbyPlaces(location, 2000, 'tourist_attraction')

    if (places.length > 0) {
      return places[0].place_id
    }

    return null
  } catch (error) {
    console.error('Error finding tour location place:', error)
    return null
  }
}

/**
 * Map Google Place Review to our TourReview format
 */
export function mapGoogleReviewToTourReview(
  review: GooglePlaceReview,
  index: number
): TourReview {
  return {
    id: `google-${Date.now()}-${index}`,
    user: {
      name: review.author_name,
      avatar: review.profile_photo_url,
      location: undefined, // Google doesn't provide user location
    },
    rating: review.rating,
    date: review.relative_time_description,
    comment: review.text,
    helpful: undefined, // Google doesn't provide helpfulness count
    images: [], // Photos are separate in Google API
    source: 'google',
    googleReviewUrl: review.author_url,
  }
}

/**
 * Fetch reviews for a location (by coordinates)
 * Returns formatted reviews ready for display
 */
export async function fetchLocationReviews(
  location: GoogleMapPoint,
  locationName?: string
): Promise<{
  reviews: TourReview[]
  rating: number
  totalReviews: number
  placeId: string | null
}> {
  try {
    // Find the place ID first
    const placeId = await findTourLocationPlace(location, locationName)

    if (!placeId) {
      return {
        reviews: [],
        rating: 0,
        totalReviews: 0,
        placeId: null,
      }
    }

    // Fetch place details with reviews
    const placeDetails = await fetchPlaceDetails(placeId)

    if (!placeDetails || !placeDetails.reviews) {
      return {
        reviews: [],
        rating: placeDetails?.rating || 0,
        totalReviews: placeDetails?.user_ratings_total || 0,
        placeId,
      }
    }

    // Map Google reviews to our format
    const reviews = placeDetails.reviews.map((review, index) =>
      mapGoogleReviewToTourReview(review, index)
    )

    return {
      reviews,
      rating: placeDetails.rating || 0,
      totalReviews: placeDetails.user_ratings_total || 0,
      placeId,
    }
  } catch (error) {
    console.error('Error fetching location reviews:', error)
    return {
      reviews: [],
      rating: 0,
      totalReviews: 0,
      placeId: null,
    }
  }
}

/**
 * Fetch reviews for multiple tour locations
 * Aggregates reviews from all locations on the tour
 */
export async function fetchTourReviews(
  locations: Array<{ name: string; lat: number; lng: number }>
): Promise<{
  reviews: TourReview[]
  averageRating: number
  totalReviews: number
}> {
  try {
    const allReviewsPromises = locations.map((loc) =>
      fetchLocationReviews({ lat: loc.lat, lng: loc.lng }, loc.name)
    )

    const allResults = await Promise.all(allReviewsPromises)

    // Combine all reviews
    const allReviews = allResults.flatMap((result) => result.reviews)

    // Calculate average rating
    const totalRatings = allResults.reduce(
      (sum, result) => sum + result.rating * result.totalReviews,
      0
    )
    const totalReviewCount = allResults.reduce(
      (sum, result) => sum + result.totalReviews,
      0
    )
    const averageRating =
      totalReviewCount > 0 ? totalRatings / totalReviewCount : 0

    // Sort by most recent and take top reviews
    const sortedReviews = allReviews.sort((a, b) => {
      // Since 'date' is relative text, we can't sort by it perfectly
      // Just take reviews as is from Google (already sorted by relevance)
      return 0
    })

    return {
      reviews: sortedReviews.slice(0, 20), // Limit to 20 reviews
      averageRating,
      totalReviews: totalReviewCount,
    }
  } catch (error) {
    console.error('Error fetching tour reviews:', error)
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    }
  }
}

/**
 * Get photo URL from Google Places photo reference
 */
export function getPlacePhotoUrl(
  photoReference: string,
  maxWidth: number = 800
): string {
  return `${BASE_URL}/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_MAPS_CONFIG.serverApiKey}`
}

/**
 * Geocode an address to coordinates
 */
export async function geocodeAddress(
  address: string
): Promise<GoogleMapPoint | null> {
  try {
    const url = new URL(`${BASE_URL}/geocode/json`)
    url.searchParams.append('address', address)
    url.searchParams.append('key', GOOGLE_MAPS_CONFIG.serverApiKey)

    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.error('Geocoding failed:', data.status, data.error_message)
      return null
    }

    const location = data.results[0].geometry.location
    return {
      lat: location.lat,
      lng: location.lng,
    }
  } catch (error) {
    console.error('Error geocoding address:', error)
    return null
  }
}

/**
 * Reverse geocode coordinates to address
 */
export async function reverseGeocode(
  location: GoogleMapPoint
): Promise<string | null> {
  try {
    const url = new URL(`${BASE_URL}/geocode/json`)
    url.searchParams.append('latlng', `${location.lat},${location.lng}`)
    url.searchParams.append('key', GOOGLE_MAPS_CONFIG.serverApiKey)

    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      console.error('Reverse geocoding failed:', data.status)
      return null
    }

    return data.results[0].formatted_address
  } catch (error) {
    console.error('Error reverse geocoding:', error)
    return null
  }
}
