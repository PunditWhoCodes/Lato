'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './useAuth'

export function useRequireAuth(redirectUrl: string = '/login') {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push(redirectUrl)
    }
  }, [user, isLoading, router, redirectUrl])

  return { user, isLoading }
}

export default useRequireAuth
