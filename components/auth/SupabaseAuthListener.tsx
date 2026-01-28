"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useStore } from "@/lib/store"
import type { User } from "@/lib/types/auth"
import { setAccessTokenCookie, clearAccessTokenCookie } from "@/lib/utils/token"

function mapSupabaseUser(supabaseUser: NonNullable<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>["user"]): User {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    name: supabaseUser.user_metadata?.name || supabaseUser.email?.split("@")[0] || "User",
    role: (supabaseUser.user_metadata?.role as User["role"]) || "TRAVELER",
    avatar: supabaseUser.user_metadata?.avatar,
    emailVerified: supabaseUser.email_confirmed_at !== null,
    createdAt: supabaseUser.created_at,
  }
}

export function SupabaseAuthListener() {
  const setUser = useStore((state) => state.setUser)
  const setHydrated = useStore((state) => state.setHydrated)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error checking auth session:", error)
          setUser(null)
          clearAccessTokenCookie()
          return
        }

        if (session?.user) {
          setUser(mapSupabaseUser(session.user))
          setAccessTokenCookie(session.access_token, session.expires_in || 3600)
        } else {
          setUser(null)
          clearAccessTokenCookie()
        }
      } catch (error) {
        console.error("Error checking auth session:", error)
        setUser(null)
        clearAccessTokenCookie()
      } finally {
        setHydrated(true)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(mapSupabaseUser(session.user))
          setAccessTokenCookie(session.access_token, session.expires_in || 3600)
        } else if (event === "SIGNED_OUT") {
          setUser(null)
          clearAccessTokenCookie()
        } else if (event === "TOKEN_REFRESHED" && session?.user) {
          setUser(mapSupabaseUser(session.user))
          setAccessTokenCookie(session.access_token, session.expires_in || 3600)
        } else if (event === "USER_UPDATED" && session?.user) {
          setUser(mapSupabaseUser(session.user))
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setHydrated])

  return null
}
