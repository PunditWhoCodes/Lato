import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { TourDetailClient } from "./components/tour-detail-client"
import type { Metadata } from "next"

/**
 * Tour Detail Page
 *
 * This page now uses live API data from the Lato Travel API.
 * Data fetching is handled client-side for dynamic updates.
 */

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Tour Details | Lato Marketplace",
  description: "Explore detailed information about this amazing tour experience.",
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function TourDetailPage({ params }: PageProps) {
  // Properly await params in Next.js 15+
  const resolvedParams = await params
  const tourId = resolvedParams.id

  // Validate that we have an ID
  if (!tourId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold text-destructive mb-4">Invalid Tour ID</h1>
            <p className="text-muted-foreground mb-6">The tour ID is missing or invalid.</p>
            <Link href="/tours" className="text-primary hover:underline">
              Back to Tours
            </Link>
          </div>
        </div>
      </div>
    )
  }

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

        <TourDetailClient tourId={tourId} />
      </div>
    </div>
  )
}
