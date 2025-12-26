import { useQuery, useInfiniteQuery, type UseQueryOptions, type UseInfiniteQueryOptions } from "@tanstack/react-query"
import { tripsApi, fetchMarketplaceTrips, fetchTripById } from "./trips.api"
import type { APIMarketplaceResponse, APISingleTripResponse, MarketplaceQueryParams } from "./trips.types"

export const tripsQueryKeys = {
  all: ["trips"] as const,
  marketplace: () => [...tripsQueryKeys.all, "marketplace"] as const,
  marketplaceWithParams: (params?: MarketplaceQueryParams) =>
    [...tripsQueryKeys.marketplace(), params] as const,
  detail: (id: string) => [...tripsQueryKeys.all, "detail", id] as const,
  byCountry: (countryCode: string) => [...tripsQueryKeys.all, "country", countryCode] as const,
}

export function useMarketplaceTrips(
  params?: MarketplaceQueryParams,
  options?: Omit<UseQueryOptions<APIMarketplaceResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: tripsQueryKeys.marketplaceWithParams(params),
    queryFn: () => fetchMarketplaceTrips(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    ...options,
  })
}

export function useTripById(
  id: string,
  options?: Omit<UseQueryOptions<APISingleTripResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: tripsQueryKeys.detail(id),
    queryFn: () => fetchTripById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  })
}

export function useInfiniteMarketplaceTrips(
  params?: Omit<MarketplaceQueryParams, "page">,
  options?: Omit<
    UseInfiniteQueryOptions<APIMarketplaceResponse, Error, APIMarketplaceResponse>,
    "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam"
  >
) {
  return useInfiniteQuery({
    queryKey: [...tripsQueryKeys.marketplace(), "infinite", params] as const,
    queryFn: ({ pageParam = 1 }) =>
      fetchMarketplaceTrips({
        ...params,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length
      const totalPages = Math.ceil(lastPage.count / (params?.step || 10))
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

export function useTripsByCountry(
  countryCode: string,
  params?: Omit<MarketplaceQueryParams, "countries">,
  options?: Omit<UseQueryOptions<APIMarketplaceResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: [...tripsQueryKeys.byCountry(countryCode), params] as const,
    queryFn: () => tripsApi.getByCountry(countryCode, params),
    enabled: !!countryCode,
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}

export function usePrefetchTrip() {
  return {
    prefetchTrip: (id: string) => {
      console.log(`Prefetch requested for trip ${id}`)
    },
  }
}

/**
 * Destination data structure for top destinations
 */
export interface DestinationData {
  name: string
  countryCode: string
  flag: string
  flagImage: string
  tourCount: number
  image: string
}

/**
 * Hook to get top destinations with tour counts
 * Fetches all marketplace trips and groups by country
 */
export function useTopDestinations(
  limit: number = 8,
  options?: Omit<UseQueryOptions<DestinationData[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: [...tripsQueryKeys.all, "topDestinations", limit] as const,
    queryFn: async () => {
      // Fetch a large sample to get accurate counts
      const response = await fetchMarketplaceTrips({
        sample: true,
        step: 100, // Get up to 100 trips
        page: 1
      })

      // Group trips by country
      const countryMap = new Map<string, {
        name: string
        countryCode: string
        flag: string
        flagImage: string
        tourCount: number
        image: string
      }>()

      response.data.forEach(userTrip => {
        const country = userTrip.trip?.country
        if (!country?.iso) return

        const existing = countryMap.get(country.iso)
        if (existing) {
          existing.tourCount++
        } else {
          // Get first image from trip if available
          let image = ''
          // Try to get image from trip data
          if (userTrip.trip) {
            // Use country flag image as fallback
            image = country.flagImage || `https://flagcdn.com/w320/${country.iso.toLowerCase()}.png`
          }

          countryMap.set(country.iso, {
            name: country.name,
            countryCode: country.iso,
            flag: country.flagEmoticon || '🌍',
            flagImage: country.flagImage || `https://flagcdn.com/${country.iso.toLowerCase()}.svg`,
            tourCount: 1,
            image
          })
        }
      })

      // Sort by tour count and take top N
      const destinations = Array.from(countryMap.values())
        .sort((a, b) => b.tourCount - a.tourCount)
        .slice(0, limit)

      return destinations
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    ...options,
  })
}
