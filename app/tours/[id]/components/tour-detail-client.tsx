"use client"

import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./image-gallery"
import { TourHeader } from "./tour-header"
import { TourInfo } from "./tour-info"
import { BookingSidebar } from "./booking-sidebar"
import { WhatsIncluded } from "./whats-included"
import { HighlightsSection } from "./highlights-section"
import { TourItinerary } from "./tour-itinerary"
import { JoinExperience } from "./join-experience"
import { CompanySection } from "./company-section"
import { RelatedTours } from "./related-tours"
import { ReviewsSection } from "./reviews-section"
import { useTourDetail } from "../hooks/useTourDetail"

interface TourDetailClientProps {
  tourId: string
}

// Static tour data matching Figma design
const staticTourData = {
  title: "Rainbow Mountain - Vinicunca",
  rating: 4.8,
  reviewCount: 127,
  location: "Peru",
  price: 1877,
  originalPrice: 2100,
  duration: "10 days",
  tourType: "Private Tour",
  groupSize: "2 people",
  difficulty: "Medium",
  minAge: "5 - 70 years",
  languages: ["English"],
  images: [
    "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600",
    "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
  ],
  included: [
    "Buffet lunch in the Sacred Valley",
    "Travel insurance",
    "24/7 Support",
    "Accredited tour guides",
    "All breakfasts",
    "Hotel nights"
  ],
  notIncluded: [
    "Treks to/from Machu Picchu",
    "Entrance fees",
    "Souws shot breakfast",
    "Flights"
  ],
  highlights: [
    "Explore the entire city of Arequipa and the colorful Santa Catalina Convent",
    "Venture to the Colca Canyon and catch a glimpse of the condors that glide above its walls",
    "Tour Lake Titicaca and the floating islands of Uros",
    "Embark on a guided tour of the ancient empire of Machu Picchu"
  ],
  company: {
    name: "Peru Explorer Co.",
    id: "peru-explorer",
    avatar: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&h=200&fit=crop",
    rating: 4.8,
    reviews: 342,
    verified: true,
    responseTime: "Usually responds within 24 hours",
    country: "Peru",
    countryFlag: "🇵🇪"
  }
}

export function TourDetailClient({ tourId }: TourDetailClientProps) {
  const { tour, isLoading, isError, error, refetch } = useTourDetail({ tourId })

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
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-[#1C1B1F] mb-2">Unable to load tour</h2>
        <p className="text-[#6B7280] mb-6 text-center max-w-md">
          {error?.message || "We couldn't load this tour. Please try again."}
        </p>
        <Button
          onClick={() => refetch()}
          size="lg"
          className="bg-[#00A699] hover:bg-[#008F84] text-white rounded-full"
        >
          Try Again
        </Button>
      </div>
    )
  }

  // Use API data if available, fallback to static data
  const tourData = tour ? {
    title: tour.title || staticTourData.title,
    rating: tour.rating || staticTourData.rating,
    reviewCount: tour.reviews || staticTourData.reviewCount,
    location: tour.location || staticTourData.location,
    price: tour.price || staticTourData.price,
    originalPrice: tour.originalPrice || staticTourData.originalPrice,
    duration: tour.duration || staticTourData.duration,
    tourType: tour.tourType || staticTourData.tourType,
    groupSize: tour.groupSize || staticTourData.groupSize,
    difficulty: tour.difficulty || staticTourData.difficulty,
    minAge: staticTourData.minAge,
    languages: staticTourData.languages,
    images: tour.image ? [tour.image, ...staticTourData.images.slice(1)] : staticTourData.images,
    included: staticTourData.included,
    notIncluded: staticTourData.notIncluded,
    highlights: tour.highlights?.length ? tour.highlights : staticTourData.highlights,
    company: {
      name: tour.company || staticTourData.company.name,
      id: tour.companyId || staticTourData.company.id,
      avatar: staticTourData.company.avatar,
      rating: tour.rating || staticTourData.company.rating,
      reviews: tour.reviews || staticTourData.company.reviews,
      verified: tour.badges?.includes("Verified Operator") || staticTourData.company.verified,
      responseTime: staticTourData.company.responseTime,
      country: tour.companyCountry || staticTourData.company.country,
      countryFlag: tour.companyFlag || staticTourData.company.countryFlag
    }
  } : staticTourData

  // Extract destination from location (e.g., "Cusco, Peru" -> "Peru")
  const destination = tourData.location?.split(",").pop()?.trim() || tourData.location

  // Calculate discount percentage
  const discountPercent = tourData.originalPrice && tourData.originalPrice > tourData.price
    ? Math.round(((tourData.originalPrice - tourData.price) / tourData.originalPrice) * 100)
    : 0

  return (
    <div className="bg-white">
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
          <div className="px-5 py-2 bg-white rounded-3xl border border-[#E5E7EB]">
            {/* What's Included / Excluded */}
            <WhatsIncluded
              included={tourData.included}
              notIncluded={tourData.notIncluded}
            />

            {/* Highlights Section with Map */}
            <HighlightsSection
              highlights={tourData.highlights}
              startLocation="Lima, Peru"
              endLocation="Lima, Peru"
            />

            {/* Tour Itinerary - Day by Day */}
            <TourItinerary />
          </div>
          {/* Get Trip Exclusive Discount CTA */}
          <JoinExperience />

          {/* About Company Section */}
          <CompanySection company={tourData.company} />

          {/* Discover More Places - Related Tours */}
          <RelatedTours tourName={tourData.title} />

          {/* Customer Reviews */}
          <ReviewsSection
            rating={tourData.rating}
            totalReviews={tourData.reviewCount}
            tourName={tourData.title}
          />
        </div>

        {/* Sidebar - Right Side (1/3) */}
        <div className="lg:col-span-1 mt-6">
          <BookingSidebar
            price={tourData.price}
            originalPrice={tourData.originalPrice}
            savings={tourData.originalPrice - tourData.price}
            creditEarned={Math.round(tourData.price * 0.05)}
          />
        </div>
      </div>
    </div>
  )
}
