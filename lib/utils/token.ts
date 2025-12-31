import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'lato_access_token'
const REFRESH_TOKEN_KEY = 'lato_refresh_token'
const TOKEN_EXPIRY_KEY = 'lato_token_expiry'

let inMemoryAccessToken: string | null = null

export const setAccessToken = (token: string, expiresIn: number): void => {
  inMemoryAccessToken = token

  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)

    const expiryTime = Date.now() + expiresIn * 1000
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
  }
}

export const getAccessToken = (): string | null => {

  if (inMemoryAccessToken) {
    return inMemoryAccessToken
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)

    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10)
      if (Date.now() < expiryTime) {
        inMemoryAccessToken = token
        return token
      } else {
        clearAccessToken()
        return null
      }
    }
  }

  return null
}

export const clearAccessToken = (): void => {
  inMemoryAccessToken = null
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
  }
}

export const isTokenExpired = (bufferSeconds: number = 60): boolean => {
  if (typeof window === 'undefined') return true

  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY)
  if (!expiry) return true

  const expiryTime = parseInt(expiry, 10)
  const bufferTime = bufferSeconds * 1000

  return Date.now() >= (expiryTime - bufferTime)
}

export const setRefreshToken = (token: string): void => {
  // Store in cookie with secure flags
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax',
    path: '/',
  })
}

export const getRefreshToken = (): string | null => {
  return Cookies.get(REFRESH_TOKEN_KEY) || null
}

export const clearRefreshToken = (): void => {
  Cookies.remove(REFRESH_TOKEN_KEY)
}

// Cookie-based access token for middleware compatibility
// This is separate from localStorage token - middleware reads cookies
const ACCESS_TOKEN_COOKIE_KEY = 'lato_access_token'

export const setAccessTokenCookie = (token: string, expiresInSeconds: number): void => {
  Cookies.set(ACCESS_TOKEN_COOKIE_KEY, token, {
    expires: expiresInSeconds / 86400,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export const getAccessTokenCookie = (): string | null => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_KEY) || null
}

export const clearAccessTokenCookie = (): void => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_KEY)
}

export const clearAllTokens = (): void => {
  clearAccessToken()
  clearRefreshToken()
  clearAccessTokenCookie()
}

export const parseJwtPayload = (token: string): any | null => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to parse JWT:', error)
    return null
  }
}
