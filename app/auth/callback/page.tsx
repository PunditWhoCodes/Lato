'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { setAccessToken, setRefreshToken } from '@/lib/utils/token'
import { Loader2 } from 'lucide-react'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser, refreshSession } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      // Get tokens from URL query parameters
      const accessToken = searchParams.get('token') || searchParams.get('accessToken')
      const refreshToken = searchParams.get('refreshToken')
      const error = searchParams.get('error')

      // Handle error from backend
      if (error) {
        console.error('OAuth error:', error)
        router.push(`/login?error=${encodeURIComponent(error)}`)
        return
      }

      // Check if we have tokens
      if (!accessToken) {
        console.error('No access token received from OAuth')
        router.push('/login?error=oauth_failed')
        return
      }

      try {
        // Get expiresIn from URL or default to 1 hour
        const expiresIn = parseInt(searchParams.get('expiresIn') || '3600', 10)

        // Store tokens
        setAccessToken(accessToken, expiresIn)
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
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Completing sign in...
        </h2>
        <p className="text-muted-foreground">
          Please wait while we set up your account
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
