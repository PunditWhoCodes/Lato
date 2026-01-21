"use client"

import Link from "next/link"
import { Star, Heart, MapPin } from "lucide-react"
import { useSavedTours } from "@/lib/saved-tours-context"
import type { Tour } from "@/types"

interface TourHeaderProps {
  title: string
  rating: number
  reviewCount: number
  location?: string
  destination?: string
  tourId: string
  tourData?: Partial<Tour>
}

export function TourHeader({
  title,
  rating,
  reviewCount,
  location = "Peru",
  destination = "Peru",
  tourId,
  tourData
}: TourHeaderProps) {
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const isFavorite = isTourSaved(tourId)

  const handleToggleSave = () => {
    if (tourData) {
      toggleSaveTour(tourId, {
        id: tourData.id || 0,
        uuid: tourData.uuid || tourId,
        title: tourData.title || title,
        company: tourData.company || "",
        companyId: tourData.companyId || "",
        companyCountry: tourData.companyCountry || "",
        companyFlag: tourData.companyFlag || "",
        price: tourData.price || 0,
        originalPrice: tourData.originalPrice,
        rating: tourData.rating || rating,
        reviews: tourData.reviews || reviewCount,
        duration: tourData.duration || "",
        groupSize: tourData.groupSize || "",
        location: tourData.location || location,
        destination: tourData.destination || destination,
        travelStyle: tourData.travelStyle || "",
        image: tourData.image || "",
        badges: tourData.badges || [],
        category: tourData.category || "",
        difficulty: tourData.difficulty || "",
        highlights: tourData.highlights || [],
        tourType: tourData.tourType || "",
      })
    } else {
      toggleSaveTour(tourId)
    }
  }

  return (
    <div className="space-y-2 lg:space-y-3">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 lg:gap-2 text-[11px] lg:text-sm text-[#6B7280] flex-wrap">
        <Link href="/" className="hover:text-[#00A699] transition-colors">
          Home
        </Link>
        <span className="text-[#D1D5DB]">/</span>
        <Link href="/tours" className="hover:text-[#00A699] transition-colors">
          Top Destinations
        </Link>
        <span className="text-[#D1D5DB]">/</span>
        <span className="text-[#00A792] font-medium">{destination}</span>
      </nav>

      {/* Title Row with Heart Icon */}
      <div className="flex items-start justify-between gap-3 lg:gap-4">
        {/* Left Column - Title, Location and Rating */}
        <div className="flex-1">
          <h1 className="text-[18px] lg:text-[28px] font-semibold text-[#1C1B1F] leading-tight">
            {title}
          </h1>

          {/* Location & Rating Row */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-4 mt-1.5 lg:mt-2">
            {/* Location */}
            <div className="flex items-center gap-1 text-[#818181] text-[12px] lg:text-sm">
              <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>{location}</span>
            </div>

            {/* Divider */}
            <span className="text-[#E5E5E5] hidden lg:inline">|</span>

            {/* Rating */}
            <div className="flex items-center gap-1 lg:gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 lg:w-4 lg:h-4 ${
                      i < Math.floor(rating)
                        ? "fill-[#FFA432] text-[#FFA432]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[12px] lg:text-sm font-medium text-[#1C1B1F]">{rating.toFixed(1)}</span>
              <span className="text-[11px] lg:text-sm text-[#818181]">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Column - Heart Icon (hidden on mobile, shown on image instead) */}
        <button
          onClick={handleToggleSave}
          className={`hidden md:flex w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-[#E8E8E8] hover:border-[#00A699] transition-all duration-300 shrink-0 ${
            isFavorite ? "rotate-360" : ""
          }`}
          aria-label={isFavorite ? "Remove from saved tours" : "Save tour"}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-[#F23813] text-[#F23813]" : "text-[#6B7280]"
            }`}
          />
        </button>
      </div>
    </div>
  )
}
