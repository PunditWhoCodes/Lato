"use client"

import { AuthProvider } from "@/lib/auth"
import { SavedToursProvider } from "@/lib/saved-tours-context"
import { SavedCompaniesProvider } from "@/lib/saved-companies-context"
import { EnhancedMessagesProvider } from "@/contexts/EnhancedMessagesContext"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getQueryClient } from "@/lib/query-client"
import type { ReactNode } from "react"
import { useState } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SavedToursProvider>
          <SavedCompaniesProvider>
            <EnhancedMessagesProvider>{children}</EnhancedMessagesProvider>
          </SavedCompaniesProvider>
        </SavedToursProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  )
}
