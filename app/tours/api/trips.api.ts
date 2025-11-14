/**
 * Trips API Service
 * Handles all API calls related to trips/usertrips
 */

import { api } from "@/lib/api/client"
import { API_BASE_URL, TRIPS_API } from "@/config/apiRoutes"
import type {
  APIMarketplaceResponse,
  APISingleTripResponse,
  MarketplaceQueryParams,
} from "./trips.types"

/**
 * Fetch all trips from marketplace
 * @param params - Query parameters for filtering trips
 * @returns Promise with marketplace trips data
 */
export async function fetchMarketplaceTrips(
  params?: MarketplaceQueryParams
): Promise<APIMarketplaceResponse> {
  const endpoint = TRIPS_API.MARKETPLACE(params)

  return api.get<APIMarketplaceResponse>(endpoint, {
    useAuth: true,
    baseURL: API_BASE_URL,
  })
}

/**
 * Fetch a single trip by ID
 * @param id - Trip ID (UUID)
 * @returns Promise with single trip data
 */
export async function fetchTripById(
  id: string
): Promise<APISingleTripResponse> {
  const endpoint = TRIPS_API.BY_ID(id)

  return api.get<APISingleTripResponse>(endpoint, {
    useAuth: true,
    baseURL: API_BASE_URL,
  })
}

/**
 * Fetch trips with custom filters
 * Wrapper function for common use cases
 */
export const tripsApi = {
  /**
   * Get all marketplace trips
   */
  getAll: (params?: MarketplaceQueryParams) => fetchMarketplaceTrips(params),

  /**
   * Get trip by ID
   */
  getById: (id: string) => fetchTripById(id),

  /**
   * Get trips by country
   */
  getByCountry: (countryCode: string, params?: Omit<MarketplaceQueryParams, "countries">) =>
    fetchMarketplaceTrips({
      ...params,
      countries: countryCode,
    }),

  /**
   * Get sample trips (for testing/demo purposes)
   */
  getSamples: (params?: Omit<MarketplaceQueryParams, "sample">) =>
    fetchMarketplaceTrips({
      ...params,
      sample: true,
    }),

  /**
   * Get paginated trips
   */
  getPaginated: (page: number, itemsPerPage: number = 10, params?: Omit<MarketplaceQueryParams, "page" | "step">) =>
    fetchMarketplaceTrips({
      ...params,
      page,
      step: itemsPerPage,
    }),
}
