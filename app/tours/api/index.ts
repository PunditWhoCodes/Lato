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
  tripsQueryKeys,
} from "./trips.queries"

// Data Mappers
export {
  mapUserTripToTour,
  mapUserTripsToTours,
  mapMarketplaceResponseToTours,
  mapUserTripToTourDetail,
  transformAndFilterTrips,
} from "./trips.mappers"
