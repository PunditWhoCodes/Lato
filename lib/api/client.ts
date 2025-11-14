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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

export interface APIClientOptions extends RequestInit {
  useAuth?: boolean
  baseURL?: string
}

export async function apiClient<T>(
  endpoint: string,
  options?: APIClientOptions
): Promise<T> {
  const { useAuth = false, baseURL, ...fetchOptions } = options || {}
  const url = `${baseURL || API_BASE_URL}${endpoint}`

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (fetchOptions?.headers) {
    const existingHeaders = fetchOptions.headers as Record<string, string>
    Object.assign(headers, existingHeaders)
  }

  if (useAuth) {
    const bearerToken = process.env.NEXT_PUBLIC_BEARER_TOKEN || "I5XVq3DTeiv7AAxVWOchKw8aV7GVyytP"
    if (bearerToken) {
      headers["Authorization"] = `Bearer ${bearerToken}`
    } else {
      console.error("Bearer token is missing. Please set NEXT_PUBLIC_BEARER_TOKEN in .env.local")
    }
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  }

  try {
    const response = await fetch(url, config)

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
