import { QueryClient, DefaultOptions } from "@tanstack/react-query"

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  },
  mutations: {
    retry: 1,
  },
}

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}
