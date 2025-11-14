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
