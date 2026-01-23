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
    <div className="space-y-[4px] lg:space-y-3">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-[3px] lg:gap-2 text-[10px] lg:text-sm text-[#6B7280] flex-wrap font-poppins">
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
          <h1 className="font-poppins text-[15px] lg:text-[28px] font-semibold text-[#1C1B1F] leading-tight">
            {title}
          </h1>

          {/* Location & Rating Row */}
          <div className="flex flex-wrap items-center gap-[6px] lg:gap-4 mt-[6px] lg:mt-2">
            {/* Location - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-1 text-[#818181] text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>

            {/* Divider */}
            <span className="text-[#E5E5E5] hidden lg:inline">|</span>

            {/* Rating */}
            <div className="flex items-center gap-[4px] lg:gap-1.5">
              <Star className="w-[11px] h-[11px] lg:w-4 lg:h-4 fill-[#FFA432] text-[#FFA432]" />
              <span className="font-poppins text-[10px] lg:text-sm font-medium text-[#1C1B1F]">{rating.toFixed(1)}</span>
              <span className="font-poppins text-[10px] lg:text-sm text-[#818181]">({reviewCount} reviews)</span>
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
