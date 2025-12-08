export interface GoogleMapPoint {
  lat: number
  lng: number
}

export interface GoogleMapBounds {
  north: number
  south: number
  east: number
  west: number
}

// Google Places API Types
export interface GooglePlaceReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated?: boolean
}

export interface GooglePlacePhoto {
  height: number
  width: number
  photo_reference: string
  html_attributions: string[]
}

export interface GooglePlaceDetails {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: GoogleMapPoint
    viewport: GoogleMapBounds
  }
  rating?: number
  user_ratings_total?: number
  reviews?: GooglePlaceReview[]
  photos?: GooglePlacePhoto[]
  opening_hours?: {
    open_now: boolean
    weekday_text: string[]
  }
  formatted_phone_number?: string
  website?: string
  url?: string
  types: string[]
}

// Directions API Types
export interface GoogleDirectionsLeg {
  start_location: GoogleMapPoint
  end_location: GoogleMapPoint
  start_address: string
  end_address: string
  distance: {
    text: string
    value: number // meters
  }
  duration: {
    text: string
    value: number // seconds
  }
  steps: GoogleDirectionsStep[]
}

export interface GoogleDirectionsStep {
  html_instructions: string
  distance: {
    text: string
    value: number
  }
  duration: {
    text: string
    value: number
  }
  start_location: GoogleMapPoint
  end_location: GoogleMapPoint
  polyline: {
    points: string
  }
  travel_mode: 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT'
}

export interface GoogleDirectionsRoute {
  summary: string
  legs: GoogleDirectionsLeg[]
  overview_polyline: {
    points: string
  }
  bounds: GoogleMapBounds
  copyrights: string
  warnings: string[]
  waypoint_order: number[]
}

export interface GoogleDirectionsResponse {
  status: 'OK' | 'NOT_FOUND' | 'ZERO_RESULTS' | 'MAX_WAYPOINTS_EXCEEDED' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR'
  routes: GoogleDirectionsRoute[]
  geocoded_waypoints?: Array<{
    geocoder_status: string
    place_id: string
    types: string[]
  }>
  error_message?: string
}

// Geocoding API Types
export interface GoogleGeocodeResult {
  formatted_address: string
  geometry: {
    location: GoogleMapPoint
    location_type: 'ROOFTOP' | 'RANGE_INTERPOLATED' | 'GEOMETRIC_CENTER' | 'APPROXIMATE'
    viewport: GoogleMapBounds
  }
  place_id: string
  types: string[]
  address_components: Array<{
    long_name: string
    short_name: string
    types: string[]
  }>
}

// Application-specific types (mapped from Google to our app)
export interface TourReview {
  id: string
  user: {
    name: string
    avatar?: string
    location?: string
  }
  rating: number
  date: string
  comment: string
  helpful?: number
  images?: string[]
  source: 'google' | 'internal'
  googleReviewUrl?: string
}

export interface TourLocation {
  lat: number
  lng: number
  name: string
  address?: string
  placeId?: string
}

export interface TourItineraryStop {
  time: string
  title: string
  description?: string
  location: TourLocation
  duration?: string
  activities?: string[]
}

export interface TourRoute {
  origin: TourLocation
  destination: TourLocation
  waypoints: TourLocation[]
  totalDistance: string
  totalDuration: string
  polyline: string
}

// Company Location Types
export interface CompanyLocation {
  name: string
  address: string
  coordinates: GoogleMapPoint
  placeId?: string
  rating?: number
  reviews?: TourReview[]
  photos?: string[]
  phone?: string
  website?: string
  openingHours?: string[]
}

// Country Map Types
export interface CountryMapMarker {
  country: string
  countryCode: string
  coordinates: GoogleMapPoint
  tourCount: number
  flag: string
}

// API Response Types
export interface GooglePlacesApiResponse {
  status: 'OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR'
  result?: GooglePlaceDetails
  results?: GooglePlaceDetails[]
  error_message?: string
  next_page_token?: string
}

// Cache Types
export interface CachedData<T> {
  data: T
  timestamp: number
  expiresAt: number
}

// Error Types
export type GoogleMapsErrorCode =
  | 'API_KEY_MISSING'
  | 'API_KEY_INVALID'
  | 'RATE_LIMIT_EXCEEDED'
  | 'NETWORK_ERROR'
  | 'INVALID_REQUEST'
  | 'NOT_FOUND'
  | 'UNKNOWN_ERROR'

export interface GoogleMapsError {
  code: GoogleMapsErrorCode
  message: string
  details?: any
}

// Hook Return Types
export interface UseGoogleMapReturn {
  map: google.maps.Map | null
  isLoaded: boolean
  error: GoogleMapsError | null
}

export interface UseGoogleReviewsReturn {
  reviews: TourReview[]
  isLoading: boolean
  error: GoogleMapsError | null
  totalRating: number
  totalReviewCount: number
  refetch: () => void
}

export interface UseDirectionsReturn {
  route: TourRoute | null
  isLoading: boolean
  error: GoogleMapsError | null
  calculateRoute: (origin: GoogleMapPoint, destination: GoogleMapPoint, waypoints?: GoogleMapPoint[]) => Promise<void>
}

// Utility Types
export type MapLibrary = 'places' | 'geometry' | 'drawing' | 'visualization' | 'marker'

export interface MapLoaderOptions {
  apiKey: string
  libraries?: MapLibrary[]
  version?: string
  region?: string
  language?: string
}
