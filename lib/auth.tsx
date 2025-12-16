"use client"

import { type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth as useNewAuth } from "@/lib/hooks/useAuth"

export function useAuth() {
  return useNewAuth()
}

export function ProtectedRoute({
  children,
  redirectTo = "/login"
}: {
  children: ReactNode
  redirectTo?: string
}) {
  const { user, isLoading, isHydrated } = useNewAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect after hydration is complete and we're not loading
    if (isHydrated && !isLoading && !user) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`
      router.push(redirectUrl)
    }
  }, [user, isLoading, isHydrated, router, redirectTo])

  // Show loading while hydrating or loading
  if (!isHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

export function AuthProvider({ children }: { children: ReactNode }) {
  console.warn(
    'AuthProvider is deprecated and no longer needed. You can remove it from your app. ' +
    'Authentication now uses Zustand store.'
  )
  return <>{children}</>
}
