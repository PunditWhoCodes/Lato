import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  isPasswordProtectionEnabled,
  getAuthCredentials,
  parseBasicAuthHeader,
  validateCredentials,
  createUnauthorizedResponse,
} from '@/lib/utils/basic-auth'

const protectedRoutes = [
  '/saved-trips',
  '/messages',
  '/chats',
  '/dashboard',
  '/profile',
  '/settings',
]

const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPasswordProtectionEnabled()) {
    const credentials = getAuthCredentials()

    if (credentials) {
      const authHeader = request.headers.get('authorization')
      const providedCredentials = parseBasicAuthHeader(authHeader)

      if (!providedCredentials) {
        return createUnauthorizedResponse('Lato Staging')
      }

      if (!validateCredentials(providedCredentials, credentials)) {
        return createUnauthorizedResponse('Lato Staging')
      }
    }
  }

  const accessToken = request.cookies.get('lato_access_token')?.value
  const isAuthenticated = !!accessToken

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
