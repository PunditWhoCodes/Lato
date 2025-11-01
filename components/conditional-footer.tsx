"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

/**
 * ConditionalFooter component that hides the footer on authentication pages
 * Following best practices for layout composition in Next.js App Router
 */
export function ConditionalFooter() {
  const pathname = usePathname()

  // List of routes where footer should be hidden
  const hideFooterRoutes = ["/login", "/register"]

  // Check if current path matches any hide routes
  const shouldHideFooter = hideFooterRoutes.some((route) => pathname.startsWith(route))

  // Don't render footer on auth pages
  if (shouldHideFooter) {
    return null
  }

  return <Footer />
}
