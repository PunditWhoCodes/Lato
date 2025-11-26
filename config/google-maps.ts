/**
 * Google Maps Platform Configuration
 *
 * Centralized configuration for Google Maps API integration
 */

export const GOOGLE_MAPS_CONFIG = {
  // API Keys
  clientApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  serverApiKey: process.env.GOOGLE_MAPS_API_KEY_SERVER || '',

  // Map Display Options
  defaultCenter: {
    lat: 20.0, // Center of world map
    lng: 0.0,
  },
  defaultZoom: 2,
  tourDetailZoom: 12,
  countryZoom: 5,
  companyZoom: 15,

  // Map Styling
  mapOptions: {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    fullscreenControl: true,
    gestureHandling: 'cooperative' as const,
  },

  // Libraries to load
  libraries: ['places', 'geometry', 'marker'] as const,

  // API Endpoints
  apiEndpoints: {
    placeDetails: 'https://maps.googleapis.com/maps/api/place/details/json',
    placeSearch: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    directions: 'https://maps.googleapis.com/maps/api/directions/json',
    geocode: 'https://maps.googleapis.com/maps/api/geocode/json',
  },

  // Caching Configuration
  cache: {
    reviewsTTL: 15 * 60 * 1000, // 15 minutes
    directionsTTL: 30 * 60 * 1000, // 30 minutes
    placeDetailsTTL: 60 * 60 * 1000, // 1 hour
  },

  // Rate Limiting
  rateLimit: {
    maxRequestsPerMinute: 100,
    retryAttempts: 3,
    retryDelay: 1000, // milliseconds
  },

  // Feature Flags
  features: {
    enableGoogleReviews: true,
    enableStreetView: true,
    enableDirections: true,
    enablePlacePhotos: true,
    fallbackToMockData: true, // Fallback if API fails
  },
} as const

// Validation
export function validateGoogleMapsConfig(): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!GOOGLE_MAPS_CONFIG.clientApiKey) {
    errors.push('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
  }

  if (!GOOGLE_MAPS_CONFIG.serverApiKey) {
    errors.push('Missing GOOGLE_MAPS_API_KEY_SERVER')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Helper to check if Google Maps is enabled
export function isGoogleMapsEnabled(): boolean {
  return Boolean(GOOGLE_MAPS_CONFIG.clientApiKey)
}

export type GoogleMapsConfig = typeof GOOGLE_MAPS_CONFIG
