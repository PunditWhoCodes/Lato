import { getAccessToken, setAccessToken, clearAllTokens, getRefreshToken } from '@/lib/utils/token'

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(message)
    this.name = "APIError"
  }
}

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.latotravelapp.com"

const INTERNAL_API_URL = "/api"

export interface APIClientOptions extends RequestInit {
  baseURL?: string
  requiresAuth?: boolean
  isRetry?: boolean
}

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb)
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    return null
  }

  try {
    const response = await fetch(`${EXTERNAL_API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    const { accessToken, expiresIn } = data.tokens || data

    setAccessToken(accessToken, expiresIn)
    return accessToken
  } catch (error) {
    console.error('Token refresh failed:', error)
    return null
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: APIClientOptions
): Promise<T> {
  const { baseURL, requiresAuth = false, isRetry = false, ...fetchOptions } = options || {}
  const url = `${baseURL || INTERNAL_API_URL}${endpoint}`

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (requiresAuth) {
    const token = getAccessToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  if (fetchOptions?.headers) {
    const existingHeaders = fetchOptions.headers as Record<string, string>
    Object.assign(headers, existingHeaders)
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
    credentials: 'include',
  }

  try {
    const response = await fetch(url, config)

    if (response.status === 401 && requiresAuth && !isRetry) {
      if (!isRefreshing) {
        isRefreshing = true
        const newToken = await refreshAccessToken()

        if (newToken) {
          isRefreshing = false
          onTokenRefreshed(newToken)

          return apiClient<T>(endpoint, { ...options, isRetry: true })
        } else {
          isRefreshing = false
          clearAllTokens()
          if (typeof window !== 'undefined') {
            window.location.href = '/login?session=expired'
          }
          throw new APIError(
            'Session expired. Please login again.',
            401,
            'Unauthorized'
          )
        }
      } else {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token: string) => {
            apiClient<T>(endpoint, { ...options, isRetry: true })
              .then(resolve)
              .catch(reject)
          })
        })
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new APIError(
        errorData?.message || `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText,
        errorData
      )
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }

    if (error instanceof TypeError) {
      throw new APIError(
        "Network error. Please check your internet connection.",
        0,
        "Network Error"
      )
    }

    throw new APIError(
      error instanceof Error ? error.message : "An unknown error occurred",
      500,
      "Unknown Error"
    )
  }
}

export const api = {
  get: <T>(endpoint: string, options?: APIClientOptions) =>
    apiClient<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, data?: any, options?: APIClientOptions) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  put: <T>(endpoint: string, data?: any, options?: APIClientOptions) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    }),

  patch: <T>(endpoint: string, data?: any, options?: APIClientOptions) =>
    apiClient<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    }),

  delete: <T>(endpoint: string, options?: APIClientOptions) =>
    apiClient<T>(endpoint, { method: "DELETE", ...options }),
}

export const toursApi = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? `?${new URLSearchParams(params)}` : ""
    return api.get<any>(`/tours${queryString}`)
  },

  getById: (id: number) => api.get<any>(`/tours/${id}`),

  create: (data: any) => api.post<any>("/tours", data),

  update: (id: number, data: any) => api.put<any>(`/tours/${id}`, data),

  delete: (id: number) => api.delete<any>(`/tours/${id}`),
}

export const companiesApi = {
  getAll: (params?: Record<string, any>) => {
    const queryString = params ? `?${new URLSearchParams(params)}` : ""
    return api.get<any>(`/companies${queryString}`)
  },

  getById: (id: number) => api.get<any>(`/companies/${id}`),
}

export const userApi = {
  getSavedTours: () => api.get<any>("/user/saved-tours"),

  saveTour: (tourId: number) => api.post<any>("/user/saved-tours", { tourId }),

  unsaveTour: (tourId: number) =>
    api.delete<any>(`/user/saved-tours/${tourId}`),
}
