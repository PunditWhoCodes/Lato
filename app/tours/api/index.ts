/**
 * Trips API Module
 * Central export point for all trips API functionality
 */

// Types
export type {
  APIUserTrip,
  APITrip,
  APIMarketplaceResponse,
  APISingleTripResponse,
  MarketplaceQueryParams,
  APIUser,
  APICompany,
  APICountry,
  APIBrand,
  APIErrorResponse,
  // Enhanced types for full trip detail
  APITripDetailResponse,
  APITripday,
  APIHotel,
  APIEvent,
  APITransportation,
  APIDestination,
  APIImage,
  APILocation,
  APITranslation,
} from "./trips.types"

// API Service
export { tripsApi, fetchMarketplaceTrips, fetchTripById } from "./trips.api"

// Query Hooks
export {
  useMarketplaceTrips,
  useTripById,
  useInfiniteMarketplaceTrips,
  useTripsByCountry,
  usePrefetchTrip,
  useTopDestinations,
  tripsQueryKeys,
  type DestinationData,
} from "./trips.queries"

// Data Mappers
export {
  mapUserTripToTour,
  mapUserTripsToTours,
  mapMarketplaceResponseToTours,
  mapUserTripToTourDetail,
  transformAndFilterTrips,
  // Enhanced mappers for full trip detail
  mapTripDetailResponseToTourDetail,
  extractAllTripImages,
  extractAllAccommodations,
  extractAllActivities,
} from "./trips.mappers"
