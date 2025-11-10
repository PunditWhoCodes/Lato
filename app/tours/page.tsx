import { Navigation } from "@/components/navigation"
import { mockTours } from "./data"
import { ToursClient } from "./components/tours-client"

/**
 * Tours Listing Page (Server Component with SSR)
 *
 * This page is server-rendered for SEO benefits.
 * Interactive features (search, filters, sorting) are handled by ToursClient.
 */
export default async function ToursPage() {
  // Fetch data on the server (currently mock data, ready for API integration)
  const tours = mockTours

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ToursClient tours={tours} />
    </div>
  )
}

export const metadata = {
  title: "Browse Tours | Lato Marketplace",
  description: "Discover amazing tours and experiences worldwide. Filter by destination, travel style, price, and more.",
}
