import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query"

export const queryKeys = {
  tours: {
    all: ["tours"] as const,
    lists: () => [...queryKeys.tours.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.tours.lists(), filters] as const,
    details: () => [...queryKeys.tours.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.tours.details(), id] as const,
  },
  companies: {
    all: ["companies"] as const,
    lists: () => [...queryKeys.companies.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.companies.lists(), filters] as const,
    details: () => [...queryKeys.companies.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.companies.details(), id] as const,
  },
  user: {
    all: ["user"] as const,
    profile: () => [...queryKeys.user.all, "profile"] as const,
    savedTours: () => [...queryKeys.user.all, "saved-tours"] as const,
  },
  reviews: {
    all: ["reviews"] as const,
    byTour: (tourId: number) => [...queryKeys.reviews.all, "tour", tourId] as const,
    byCompany: (companyId: number) => [...queryKeys.reviews.all, "company", companyId] as const,
  },
} as const

export function useTours(
  filters?: Record<string, any>,
  options?: Omit<UseQueryOptions<any, Error, any, any>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.tours.list(filters || {}),
    queryFn: async () => {
      throw new Error("API endpoint not implemented. Replace with actual API call.")
    },
    ...options,
  })
}

export function useTour(
  tourId: number,
  options?: Omit<UseQueryOptions<any, Error, any, any>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: queryKeys.tours.detail(tourId),
    queryFn: async () => {
      throw new Error("API endpoint not implemented. Replace with actual API call.")
    },
    enabled: !!tourId && (options?.enabled ?? true),
    ...options,
  })
}

export function useSaveTour() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (tourId: number) => {
      throw new Error("API endpoint not implemented. Replace with actual API call.")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.savedTours() })
    },
  })
}

export async function prefetchTour(queryClient: ReturnType<typeof useQueryClient>, tourId: number) {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.tours.detail(tourId),
    queryFn: async () => {
      throw new Error("API endpoint not implemented")
    },
  })
}
