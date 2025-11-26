/**
 * Google Maps API Loader Service
 *
 * Handles loading and initialization of Google Maps JavaScript API
 */

import { Loader } from '@googlemaps/js-api-loader'
import { GOOGLE_MAPS_CONFIG } from '@/config/google-maps'
import type { MapLoaderOptions } from '@/lib/types/google-maps'

let loaderInstance: Loader | null = null
let isLoading = false
let isLoaded = false
let loadError: Error | null = null

/**
 * Get or create Google Maps API loader instance
 */
function getLoader(): Loader {
  if (!loaderInstance) {
    const options: MapLoaderOptions = {
      apiKey: GOOGLE_MAPS_CONFIG.clientApiKey,
      libraries: [...GOOGLE_MAPS_CONFIG.libraries],
      version: 'weekly', // Use weekly channel for latest features
      language: 'en',
    }

    if (!options.apiKey) {
      throw new Error(
        'Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local'
      )
    }

    loaderInstance = new Loader({
      apiKey: options.apiKey,
      version: options.version,
      libraries: options.libraries,
      language: options.language,
    })
  }

  return loaderInstance
}

/**
 * Load Google Maps JavaScript API
 * Returns a promise that resolves when the API is ready
 */
export async function loadGoogleMaps(): Promise<typeof google> {
  // Return immediately if already loaded
  if (isLoaded && window.google?.maps) {
    return window.google
  }

  // Return existing error if previous load failed
  if (loadError) {
    throw loadError
  }

  // Wait for existing load operation
  if (isLoading) {
    return new Promise((resolve, reject) => {
      const checkLoaded = setInterval(() => {
        if (isLoaded && window.google?.maps) {
          clearInterval(checkLoaded)
          resolve(window.google)
        } else if (loadError) {
          clearInterval(checkLoaded)
          reject(loadError)
        }
      }, 100)
    })
  }

  // Start loading
  isLoading = true

  try {
    const loader = getLoader()
    // @ts-ignore - Loader type definition may be incomplete
    await loader.load()

    if (!window.google?.maps) {
      throw new Error('Google Maps failed to load')
    }

    isLoaded = true
    isLoading = false
    return window.google
  } catch (error) {
    isLoading = false
    loadError = error instanceof Error ? error : new Error('Failed to load Google Maps')
    throw loadError
  }
}

/**
 * Load specific Google Maps libraries dynamically
 */
export async function loadGoogleMapsLibrary<T = any>(
  library: 'places' | 'geometry' | 'drawing' | 'visualization' | 'marker'
): Promise<T> {
  await loadGoogleMaps()

  try {
    const lib = await google.maps.importLibrary(library)
    return lib as T
  } catch (error) {
    throw new Error(`Failed to load Google Maps library: ${library}`)
  }
}

/**
 * Check if Google Maps is loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return isLoaded && Boolean(window.google?.maps)
}

/**
 * Reset loader state (useful for testing)
 */
export function resetLoader(): void {
  loaderInstance = null
  isLoading = false
  isLoaded = false
  loadError = null
}

/**
 * Get Google Maps photo URL from photo reference
 */
export function getPlacePhotoUrl(
  photoReference: string,
  maxWidth: number = 400
): string {
  const apiKey = GOOGLE_MAPS_CONFIG.clientApiKey
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`
}

/**
 * Create a Google Maps marker
 */
export async function createMarker(options: {
  position: google.maps.LatLngLiteral
  map: google.maps.Map
  title?: string
  icon?: string | google.maps.Icon | google.maps.Symbol
  clickable?: boolean
}): Promise<google.maps.Marker> {
  await loadGoogleMaps()

  return new google.maps.Marker({
    position: options.position,
    map: options.map,
    title: options.title,
    icon: options.icon,
    clickable: options.clickable ?? true,
  })
}

/**
 * Create a Google Maps info window
 */
export async function createInfoWindow(
  content: string | HTMLElement
): Promise<google.maps.InfoWindow> {
  await loadGoogleMaps()

  return new google.maps.InfoWindow({
    content,
  })
}

/**
 * Decode polyline string to array of LatLng points
 */
export function decodePolyline(encoded: string): google.maps.LatLngLiteral[] {
  if (!encoded) return []

  const poly: google.maps.LatLngLiteral[] = []
  let index = 0
  const len = encoded.length
  let lat = 0
  let lng = 0

  while (index < len) {
    let b
    let shift = 0
    let result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)

    const dlat = result & 1 ? ~(result >> 1) : result >> 1
    lat += dlat

    shift = 0
    result = 0

    do {
      b = encoded.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)

    const dlng = result & 1 ? ~(result >> 1) : result >> 1
    lng += dlng

    poly.push({
      lat: lat / 1e5,
      lng: lng / 1e5,
    })
  }

  return poly
}

/**
 * Calculate bounds for multiple points
 */
export async function calculateBounds(
  points: google.maps.LatLngLiteral[]
): Promise<google.maps.LatLngBounds> {
  await loadGoogleMaps()

  const bounds = new google.maps.LatLngBounds()
  points.forEach((point) => bounds.extend(point))
  return bounds
}

/**
 * Fit map to show all markers
 */
export async function fitMapToMarkers(
  map: google.maps.Map,
  markers: google.maps.LatLngLiteral[]
): Promise<void> {
  if (markers.length === 0) return

  const bounds = await calculateBounds(markers)
  map.fitBounds(bounds)

  // Add padding
  const padding = { top: 50, right: 50, bottom: 50, left: 50 }
  map.fitBounds(bounds, padding)
}
