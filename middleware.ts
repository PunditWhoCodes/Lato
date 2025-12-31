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
  '/wishlist',
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

  // Check if token exists and is not a pending token (from unverified registration)
  const isAuthenticated = !!accessToken && !accessToken.startsWith('pending_')

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Only redirect away from auth routes if user is truly authenticated
  // Don't redirect on RSC requests to prevent navigation issues
  const isRSCRequest = request.headers.get('rsc') === '1' || request.nextUrl.searchParams.has('_rsc')

  if (isAuthRoute && isAuthenticated && !isRSCRequest) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
