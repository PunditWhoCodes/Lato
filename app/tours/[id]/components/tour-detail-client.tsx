"use client"

import { useRef, useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./image-gallery"
import { TourHeader } from "./tour-header"
import { TourInfo } from "./tour-info"
import { BookingSidebar } from "./booking-sidebar"
import { HighlightsSection } from "./highlights-section"
import { TourItinerary } from "./tour-itinerary"
import { JoinExperience } from "./join-experience"
import { CompanySection } from "./company-section"
import { RelatedTours } from "./related-tours"
import { ReviewsSection } from "./reviews-section"
import { SectionNavigation } from "./section-navigation"
import { WhatsIncluded } from "./whats-included"
import { WhereYouWillStay } from "./where-you-will-stay"
import { CustomerPhotos } from "./customer-photos"
import { useTourDetail } from "../hooks/useTourDetail"

interface TourDetailClientProps {
  tourId: string
}

// Static fallback data for when API data is incomplete
const staticFallbackData = {
  title: "Tour",
  rating: 4.8,
  reviewCount: 0,
  location: "International",
  price: 0,
  originalPrice: 0,
  duration: "Multiple days",
  tourType: "Private Tour",
  groupSize: "Small Group",
  difficulty: "Medium",
  minAge: "All ages",
  languages: ["English"],
  images: [
    "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600",
    "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600",
  ],
  highlights: [],
  company: {
    name: "Tour Operator",
    id: "",
    avatar: "",
    rating: 4.8,
    reviews: 0,
    verified: false,
    responseTime: "Usually responds within 24 hours",
    country: "International",
    countryFlag: "🌍"
  }
}

export function TourDetailClient({ tourId }: TourDetailClientProps) {
  const { tour, tourDetail, isLoading, isError, error, refetch } = useTourDetail({ tourId })

  // Section navigation state
  const [activeSection, setActiveSection] = useState("highlights")

  // Refs for scrolling to sections
  const highlightsRef = useRef<HTMLDivElement>(null)
  const itineraryRef = useRef<HTMLDivElement>(null)
  const companyRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)

  // Handle section change and scroll
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)

    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    switch (sectionId) {
      case "highlights":
        scrollToRef(highlightsRef)
        break
      case "itinerary":
        scrollToRef(itineraryRef)
        break
      case "company":
        scrollToRef(companyRef)
        break
      case "reviews":
        scrollToRef(reviewsRef)
        break
    }
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#00A699] mb-4" />
        <p className="text-lg text-[#6B7280]">Loading tour details...</p>
      </div>
    )
  }

  // Error State
  if (isError) {
    const isInvalidUUID = error?.message?.includes("Invalid tour ID") || error?.message?.includes("UUID")

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-[#1C1B1F] mb-2">
          {isInvalidUUID ? "Tour Not Found" : "Unable to load tour"}
        </h2>
        <p className="text-[#6B7280] mb-6 text-center max-w-md">
          {isInvalidUUID
            ? "This tour may no longer be available or the link is invalid."
            : error?.message || "We couldn't load this tour. Please try again."}
        </p>
        <div className="flex gap-3">
          <Button
            onClick={() => window.location.href = '/tours'}
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            Browse Tours
          </Button>
          {!isInvalidUUID && (
            <Button
              onClick={() => refetch()}
              size="lg"
              className="bg-[#00A699] hover:bg-[#008F84] text-white rounded-full"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    )
  }

  // Build tour data from API response with fallbacks
  const tourData = {
    title: tourDetail?.title || tour?.title || staticFallbackData.title,
    rating: tourDetail?.rating || tour?.rating || staticFallbackData.rating,
    reviewCount: tourDetail?.reviewCount || tour?.reviews || staticFallbackData.reviewCount,
    location: tourDetail?.location || tour?.location || staticFallbackData.location,
    price: tourDetail?.price || tour?.price || staticFallbackData.price,
    originalPrice: tourDetail?.originalPrice || tour?.originalPrice || staticFallbackData.originalPrice,
    duration: tourDetail?.duration || tour?.duration || staticFallbackData.duration,
    tourType: tourDetail?.tourType || tour?.tourType || staticFallbackData.tourType,
    groupSize: tourDetail?.groupSize || tour?.groupSize || staticFallbackData.groupSize,
    difficulty: tourDetail?.difficulty || tour?.difficulty || staticFallbackData.difficulty,
    minAge: staticFallbackData.minAge,
    languages: tourDetail?.languages || staticFallbackData.languages,
    // Use real images from API if available
    images: (tourDetail?.images && tourDetail.images.length > 0)
      ? tourDetail.images
      : (tour?.image ? [tour.image, ...staticFallbackData.images.slice(1)] : staticFallbackData.images),
    // Use real highlights from API
    highlights: (tourDetail?.highlights && tourDetail.highlights.length > 0)
      ? tourDetail.highlights
      : (tour?.highlights || staticFallbackData.highlights),
    // Company info
    company: tourDetail?.company || {
      name: tour?.company || staticFallbackData.company.name,
      id: tour?.companyId || staticFallbackData.company.id,
      avatar: staticFallbackData.company.avatar,
      rating: tour?.rating || staticFallbackData.company.rating,
      reviews: tour?.reviews || staticFallbackData.company.reviews,
      verified: tour?.badges?.includes("Verified Operator") || staticFallbackData.company.verified,
      responseTime: staticFallbackData.company.responseTime,
      country: tour?.companyCountry || staticFallbackData.company.country,
      countryFlag: tour?.companyFlag || staticFallbackData.company.countryFlag
    },
    // Enhanced data from full API response
    itineraryDays: tourDetail?.itineraryDays || [],
    accommodations: tourDetail?.accommodations || [],
    activities: tourDetail?.activities || [],
    includedHtml: tourDetail?.includedHtml || '',
    notIncludedHtml: tourDetail?.notIncludedHtml || '',
    included: tourDetail?.included || [],
    notIncluded: tourDetail?.notIncluded || [],
    tripDescription: tourDetail?.tripDescription || tourDetail?.description || '',
    startLocation: tourDetail?.startLocation,
    endLocation: tourDetail?.endLocation,
    nrOfDays: tourDetail?.nrOfDays,
    currencySymbol: tourDetail?.currencySymbol || '€',
    currencyIso: tourDetail?.currencyIso || 'EUR'
  }

  // Extract destination from location (e.g., "Cusco, Peru" -> "Peru")
  const destination = tourData.location?.split(",").pop()?.trim() || tourData.location

  // Calculate discount percentage
  const discountPercent = tourData.originalPrice && tourData.originalPrice > tourData.price
    ? Math.round(((tourData.originalPrice - tourData.price) / tourData.originalPrice) * 100)
    : 0

  // Get start/end location names for HighlightsSection
  const startLocationName = tourData.startLocation?.name || `${destination}`
  const endLocationName = tourData.endLocation?.name || startLocationName

  return (
    <div>
      {/* Tour Header - Breadcrumb, Title, Rating, Heart */}
      <div className="mb-6">
        <TourHeader
          title={tourData.title}
          rating={tourData.rating}
          reviewCount={tourData.reviewCount}
          location={tourData.location}
          destination={destination}
        />
      </div>

      {/* Image Gallery - Full Width */}
      <ImageGallery
        images={tourData.images}
        title={tourData.title}
        discountPercent={discountPercent}
      />

      {/* Main Content Grid - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Main Content - Left Side (2/3) */}
        <div className="lg:col-span-2">

          {/* Tour Info Bar - Duration, Type, Group Size, etc. */}
          <div className="mt-8">
            <TourInfo
              duration={tourData.duration}
              tourType={tourData.tourType}
              groupSize={tourData.groupSize}
              difficulty={tourData.difficulty}
              minAge={tourData.minAge}
              languages={tourData.languages}
            />
          </div>

          {/* Section Navigation */}
          <SectionNavigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <div className="py-2">

            {/* Highlights Section with Map */}
            <div ref={highlightsRef} className="scroll-mt-24">
              <HighlightsSection
                highlights={tourData.highlights}
                startLocation={startLocationName}
                endLocation={endLocationName}
                startCoordinates={tourData.startLocation?.coordinates}
                endCoordinates={tourData.endLocation?.coordinates}
                itineraryDays={tourData.itineraryDays}
              />
            </div>

            {/* Tour Itinerary - Day by Day */}
            <div ref={itineraryRef} className="scroll-mt-24">
              <TourItinerary
                itineraryDays={tourData.itineraryDays}
                nrOfDays={tourData.nrOfDays}
              />
            </div>

            {/* What's Included / Excluded */}
            <WhatsIncluded
              includedHtml={tourData.includedHtml}
              notIncludedHtml={tourData.notIncludedHtml}
              included={tourData.included}
              notIncluded={tourData.notIncluded}
            />

            {/* Where You Will Stay */}
            <WhereYouWillStay
              accommodations={tourData.accommodations}
            />

            {/* Customer Photos */}
            <CustomerPhotos
              images={tourData.images.slice(0, 10)}
            />
          </div>
          {/* Get Trip Exclusive Discount CTA */}
          <JoinExperience />

          {/* About Company Section */}
          <div ref={companyRef} className="scroll-mt-24">
            <CompanySection company={tourData.company} />
          </div>

          {/* Discover More Places - Related Tours */}
          <RelatedTours tourName={tourData.title} />

          {/* Customer Reviews */}
          <div ref={reviewsRef} className="scroll-mt-24">
            <ReviewsSection
              rating={tourData.rating}
              totalReviews={tourData.reviewCount}
              tourName={tourData.title}
            />
          </div>
        </div>

        {/* Sidebar - Right Side (1/3) */}
        <div className="lg:col-span-1 mt-6">
          <BookingSidebar
            price={tourData.price}
            originalPrice={tourData.originalPrice}
            savings={tourData.originalPrice && tourData.price ? tourData.originalPrice - tourData.price : 0}
            creditEarned={Math.round((tourData.price || 0) * 0.05)}
            currency={tourData.currencySymbol}
          />
        </div>
      </div>
    </div>
  )
}
