import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { mockTours } from "../data"
import { mockTourDetail, detailedItinerary } from "./data"
import { TourDetailClient } from "./components/tour-detail-client"
import { notFound } from "next/navigation"

/**
 * Tour Detail Page (Server Component with SSG + ISR)
 *
 * This page is pre-generated at build time and revalidated every hour.
 * Interactive features (image gallery, modals, section navigation) are handled by TourDetailClient.
 */

// Generate static params for all tours at build time
export async function generateStaticParams() {
  return mockTours.map((tour) => ({
    id: tour.id.toString(),
  }))
}

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tour = mockTours.find((t) => t.id.toString() === id)

  if (!tour) {
    return {
      title: "Tour Not Found | Lato Marketplace",
    }
  }

  return {
    title: `${tour.title} | Tour Details | Lato Marketplace`,
    description: `${tour.duration} tour in ${tour.location}. From $${tour.price}. Rating: ${tour.rating}/5 (${tour.reviews} reviews).`,
  }
}

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In production, this would fetch from API
  const { id } = await params
  const tour = mockTours.find((t) => t.id.toString() === id)

  if (!tour) {
    notFound()
  }

  // Extended tour details (in production, fetch from API)
  const tourDetail = mockTourDetail

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
          <span className="text-foreground">{tour.title}</span>
        </nav>

        <TourDetailClient tourDetail={tourDetail} detailedItinerary={detailedItinerary} />
      </div>
    </div>
  )
}
