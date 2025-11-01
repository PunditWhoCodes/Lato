"use client"

import { AuthProvider } from "@/lib/auth"
import { SavedToursProvider } from "@/lib/saved-tours-context"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <SavedToursProvider>{children}</SavedToursProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
