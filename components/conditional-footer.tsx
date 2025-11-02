"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/footer"

export function ConditionalFooter() {
  const pathname = usePathname()

  const hideFooterRoutes = ["/login", "/register"]

  const shouldHideFooter = hideFooterRoutes.some((route) => pathname.startsWith(route))

  if (shouldHideFooter) {
    return null
  }

  return <Footer />
}
