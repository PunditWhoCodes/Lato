"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { ImageGallery } from "./image-gallery"
import { TourInfo } from "./tour-info"
import { SectionNavigation } from "./section-navigation"
import { TourOverview } from "./tour-overview"
import { TourItinerary } from "./tour-itinerary"
import { CompanySection } from "./company-section"
import { ReviewsSection } from "./reviews-section"
import { BookingSidebar } from "./booking-sidebar"
import { RelatedTours } from "./related-tours"
import { TourItineraryModal } from "./tour-itinerary-modal"
import { useTourDetail } from "../hooks/useTourDetail"
import { mockTourDetail, detailedItinerary } from "../data"
import type { TourDetail } from "@/types"

interface TourDetailClientProps {
  tourId: string
}

/**
 * TourDetailClient Component
 * Now integrated with live API data
 * Uses mock data for detailed itinerary until API provides that information
 */
export function TourDetailClient({ tourId }: TourDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const { tour, isLoading, isError, error, refetch } = useTourDetail({ tourId })

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "itinerary", "company", "reviews"]
      const navHeight = 80
      const sectionNavHeight = 60
      const offset = navHeight + sectionNavHeight + 40

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= offset) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (selectedDay !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedDay])

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const sectionNavHeight = 60
      const totalOffset = navHeight + sectionNavHeight + 20
      const elementPosition = element.offsetTop - totalOffset
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">Loading tour details...</p>
        <p className="text-sm text-muted-foreground mt-2">Fetching from Lato Travel API</p>
      </div>
    )
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Unable to load tour</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          {error?.message || "We couldn't load this tour. Please try again."}
        </p>
        <Button onClick={() => refetch()} size="lg">
          Try Again
        </Button>
      </div>
    )
  }

  // Not Found
  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold mb-2">Tour Not Found</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          The tour you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => window.history.back()} variant="outline" size="lg">
          Go Back
        </Button>
      </div>
    )
  }

  // Convert Tour to TourDetail format
  // Use API data for basic info, mock data for detailed itinerary/reviews (until API provides)
  const tourDetail: TourDetail = {
    ...tour,
    reviewCount: tour.reviews,
    company: {
      name: tour.company,
      id: tour.companyId,
      avatar: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&h=200&fit=crop",
      rating: tour.rating,
      reviews: tour.reviews,
      verified: tour.badges.includes("Verified Operator"),
      responseTime: "Usually responds within 24 hours",
      country: tour.companyCountry,
      countryFlag: tour.companyFlag,
    },
    languages: ["English"],
    description: tour.highlights.join(". ") || "An amazing tour experience.",
    included: [
      "Professional guide",
      "All activities as described",
      "Transportation",
      "Entrance fees",
    ],
    notIncluded: [
      "Personal expenses",
      "Gratuities",
      "Meals (unless specified)",
    ],
    itinerary: mockTourDetail.itinerary, // Use mock itinerary for now
    reviews: mockTourDetail.reviews, // Use mock reviews for now
    relatedTours: mockTourDetail.relatedTours, // Use mock related tours for now
    images: [
      tour.image,
      tour.image,
      tour.image,
    ],
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery
            images={tourDetail.images}
            title={tourDetail.title}
            tourId={tourDetail.id}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />

          <TourInfo tour={tourDetail} onCompanyClick={() => {}} />

          <SectionNavigation activeSection={activeSection} onSectionClick={handleSectionClick} />

          <div id="overview">
            <TourOverview tour={tourDetail} />
          </div>

          <div id="itinerary">
            <TourItinerary
              itinerary={tourDetail.itinerary}
              onDayClick={(day) => setSelectedDay(day)}
            />
          </div>

          <div id="company">
            <CompanySection company={tourDetail.company} />
          </div>

          <div id="reviews">
            <ReviewsSection reviews={tourDetail.reviews} rating={tourDetail.rating} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BookingSidebar tour={tourDetail} />
        </div>
      </div>

      <RelatedTours tours={tourDetail.relatedTours} />

      {selectedDay !== null && (
        <TourItineraryModal
          selectedDay={selectedDay}
          itinerary={detailedItinerary}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </>
  )
}
