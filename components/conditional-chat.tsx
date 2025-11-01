"use client"

import { usePathname } from "next/navigation"
import { TripFinderChat } from "@/components/trip-finder-chat"

/**
 * ConditionalChat component that hides the chat widget on authentication pages
 * Users should focus on logging in/registering without distractions
 */
export function ConditionalChat() {
  const pathname = usePathname()

  // List of routes where chat should be hidden
  const hideChatRoutes = ["/login", "/register"]

  // Check if current path matches any hide routes
  const shouldHideChat = hideChatRoutes.some((route) => pathname.startsWith(route))

  // Don't render chat on auth pages
  if (shouldHideChat) {
    return null
  }

  return <TripFinderChat />
}
