"use client"

import { AuthProvider } from "@/lib/auth"
import { SavedToursProvider } from "@/lib/saved-tours-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SavedToursProvider>{children}</SavedToursProvider>
    </AuthProvider>
  )
}
