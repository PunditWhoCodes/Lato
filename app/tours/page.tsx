import { Navigation } from "@/components/navigation"
import { ListingClient } from "./components/listing-client"

/**
 * Tours Listing Page
 *
 * This page now uses live API data from the Lato Travel API.
 * Data fetching and caching is handled by TanStack Query in ToursClient.
 */
export default function ToursPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />
      <ListingClient />
    </div>
  )
}

export const metadata = {
  title: "Browse Tours | Lato Marketplace",
  description: "Discover amazing tours and experiences worldwide. Filter by destination, travel style, price, and more.",
}
