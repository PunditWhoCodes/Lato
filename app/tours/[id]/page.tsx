import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { TourDetailClient } from "./components/tour-detail-client"

/**
 * Tour Detail Page
 *
 * This page now uses live API data from the Lato Travel API.
 * Data fetching is handled client-side for dynamic updates.
 */

export const metadata = {
  title: "Tour Details | Lato Marketplace",
  description: "Explore detailed information about this amazing tour experience.",
}

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-foreground">
            Tours
          </Link>
          <span>/</span>
          <span className="text-foreground">Tour Details</span>
        </nav>

        <TourDetailClient tourId={id} />
      </div>
    </div>
  )
}
