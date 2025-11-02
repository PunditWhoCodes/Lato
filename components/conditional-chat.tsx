"use client"

import { usePathname } from "next/navigation"
import { TripFinderChat } from "@/components/trip-finder-chat"

export function ConditionalChat() {
  const pathname = usePathname()

  const hideChatRoutes = ["/login", "/register"]

  const shouldHideChat = hideChatRoutes.some((route) => pathname.startsWith(route))

  if (shouldHideChat) {
    return null
  }

  return <TripFinderChat />
}
