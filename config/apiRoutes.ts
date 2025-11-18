export const API_BASE_URL = ""
export const API_VERSION = "v1"

export const BEARER_TOKEN = undefined

export const TRIPS_API = {

  MARKETPLACE: (params?: {
    page?: number
    step?: number
    sample?: boolean
    countries?: string
  }) => {
    const queryParams = new URLSearchParams({
      page: String(params?.page || 1),
      step: String(params?.step || 10),
      sample: String(params?.sample ?? true),
      ...(params?.countries && { countries: params.countries }),
    })
    return `/${API_VERSION}/trips/marketplace?${queryParams.toString()}`
  },

  BY_ID: (id: string) => `/${API_VERSION}/usertrips/${id}`,
} as const

export const USER_API = {
  PROFILE: "/v1/user/profile",
  SAVED_TRIPS: "/v1/user/saved-trips",
} as const

export const COMPANIES_API = {
  ALL: "/v1/companies",
  BY_ID: (id: string) => `/v1/companies/${id}`,
} as const

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`
}

export const getDefaultHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${BEARER_TOKEN}`,
})
