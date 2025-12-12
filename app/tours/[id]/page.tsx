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
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TourDetailClient tourId={tourId} />
      </main>
    </div>
  )
}
