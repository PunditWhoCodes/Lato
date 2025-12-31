'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { setAccessToken, setRefreshToken, setAccessTokenCookie } from '@/lib/utils/token'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser, refreshSession } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      // Check for errors in URL params
      const errorParam = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')

      // Handle error from Supabase email verification
      if (errorParam) {
        console.error('Auth error:', errorParam, errorDescription)
        router.push(`/login?error=${encodeURIComponent(errorDescription || errorParam)}`)
        return
      }

      // Handle Supabase email verification (token in URL hash or via session)
      // Supabase uses URL fragments (#) for email verification tokens
      if (typeof window !== 'undefined') {
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessTokenFromHash = hashParams.get('access_token')
        const refreshTokenFromHash = hashParams.get('refresh_token')

        // If we have tokens from hash (email verification)
        if (accessTokenFromHash) {
          try {
            // Set the session with the tokens from the hash
            const { data, error } = await supabase.auth.setSession({
              access_token: accessTokenFromHash,
              refresh_token: refreshTokenFromHash || '',
            })

            if (error) {
              console.error('Failed to set session:', error)
              router.push('/login?error=verification_failed')
              return
            }

            if (data.session) {
              // Store tokens in localStorage, refresh token cookie, AND access token cookie for middleware
              const expiresIn = data.session.expires_in || 3600
              setAccessToken(data.session.access_token, expiresIn)
              setAccessTokenCookie(data.session.access_token, expiresIn)
              if (data.session.refresh_token) {
                setRefreshToken(data.session.refresh_token)
              }

              // Fetch user profile
              await refreshSession()

              // Redirect to home - email verified successfully!
              router.push('/')
              return
            }
          } catch (error) {
            console.error('Failed to process email verification:', error)
            router.push('/login?error=verification_processing_failed')
            return
          }
        }
      }

      // Handle OAuth callback (tokens in query params)
      const accessToken = searchParams.get('token') || searchParams.get('accessToken')
      const refreshToken = searchParams.get('refreshToken')

      // Check if we have tokens from query params
      if (!accessToken) {
        // Try to get session from Supabase (for email verification via different flow)
        const { data: { session } } = await supabase.auth.getSession()

        if (session) {
          const expiresIn = session.expires_in || 3600
          setAccessToken(session.access_token, expiresIn)
          setAccessTokenCookie(session.access_token, expiresIn)
          if (session.refresh_token) {
            setRefreshToken(session.refresh_token)
          }
          await refreshSession()
          router.push('/')
          return
        }

        console.error('No access token received')
        router.push('/login?error=auth_failed')
        return
      }

      try {
        // Get expiresIn from URL or default to 1 hour
        const expiresIn = parseInt(searchParams.get('expiresIn') || '3600', 10)

        // Store tokens in localStorage AND cookie for middleware
        setAccessToken(accessToken, expiresIn)
        setAccessTokenCookie(accessToken, expiresIn)
        if (refreshToken) {
          setRefreshToken(refreshToken)
        }

        // Fetch user profile
        await refreshSession()

        // Redirect to home or intended page
        const redirectTo = searchParams.get('redirect') || '/'
        router.push(redirectTo)
      } catch (error) {
        console.error('Failed to process OAuth callback:', error)
        router.push('/login?error=oauth_processing_failed')
      }
    }

    handleCallback()
  }, [searchParams, router, setUser, refreshSession])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#00A699] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Verifying your account...
        </h2>
        <p className="text-muted-foreground">
          Please wait while we complete the verification
        </p>
      </div>
    </div>
  )
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
