"use client"

import { Star, Clock, Users, Heart, Car } from "lucide-react"
import Image from "next/image"
import { useSavedTours } from "@/lib/saved-tours-context"

export interface TourCardData {
  id: number
  uuid?: string
  image: string
  title: string
  subtitle: string
  location: string
  rating: number
  groupSize: string
  originalPrice?: number
  price: number
  duration: string
  hasTransport: boolean
  hasFamilyPlan: boolean
}

interface ListingTourCardProps {
  tour: TourCardData
  viewMode: "grid" | "list"
  onClick: () => void
}

// Transfer/Shuttle Icon SVG
function TransferIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.75 4.375H10.5M10.5 4.375L8.3125 2.1875M10.5 4.375L8.3125 6.5625M12.25 9.625H3.5M3.5 9.625L5.6875 7.4375M3.5 9.625L5.6875 11.8125"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Calculate discount percentage
function getDiscountPercent(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100)
}

export function ListingTourCard({ tour, viewMode, onClick }: ListingTourCardProps) {
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const tourIdentifier = tour.uuid || tour.id.toString()
  const isFavorite = isTourSaved(tourIdentifier)

  const hasDiscount = tour.originalPrice && tour.originalPrice > tour.price
  const discountPercent = hasDiscount
    ? getDiscountPercent(tour.originalPrice!, tour.price)
    : 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSaveTour(tourIdentifier)
  }

  if (viewMode === "list") {
    return (
      <article
        data-tour-card
        onClick={onClick}
        className="bg-white rounded-[10px] overflow-hidden cursor-pointer group flex flex-col sm:flex-row border border-[#E8E8E8] hover:shadow-md transition-shadow"
      >
        {/* Image - Top on mobile, Left side on desktop */}
        <div className="relative w-full h-[200px] sm:w-[50%] sm:h-auto sm:min-h-[180px] rounded-lg overflow-hidden shrink-0 m-2">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
          />

          {/* Heart/Favorite Icon - Top Left */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
              isFavorite ? "rotate-360" : ""
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-[#F23813] text-[#F23813]" : "text-[#6B7280]"
              }`}
            />
          </button>

          {/* OFF Badge - Top Right */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-[#F23813] text-white px-4 py-1.5 rounded-full text-xs font-semibold">
             -{discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Mobile: Content wrapper with rating inline */}
        <div className="flex-1 flex flex-col sm:flex-row">
          {/* Content - Middle */}
          <div className="flex-1 p-4 pt-2 sm:pt-4 flex flex-col">
            {/* Mobile: Title + Rating row */}
            <div className="flex justify-between items-start gap-2 sm:block">
              <div className="flex-1">
                {/* Title */}
                <h3 className="text-[#1C1B1F] font-poppins font-semibold text-[13px] sm:text-[15px] leading-tight mb-0.5 group-hover:text-[#00A792] transition-colors">
                  {tour.title}
                </h3>

                {/* Subtitle (Peru) */}
                <p className="text-[#818181] text-[10px] sm:text-[12px] mb-0.5">{tour.subtitle}</p>

                {/* Location (Ecuador Packages) */}
                <p className="text-[#818181] text-[10px] sm:text-[12px] mb-2 sm:mb-3">{tour.location}</p>
              </div>

              {/* Mobile: Rating & Group inline */}
              <div className="flex flex-col items-end gap-1 sm:hidden shrink-0">
                <div className="flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-[#FFA432] text-[#FFA432]" />
                  <span className="text-[10px] text-[#495560] font-medium">{tour.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-2.5 h-2.5 text-[#495560]" />
                  <span className="text-[9px] text-[#495560] font-medium whitespace-nowrap">
                    {tour.groupSize}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-1.5 mb-2 sm:mb-3">
              {tour.originalPrice && (
                <span className="text-[#7BBCB0] text-[10px] sm:text-[12px] line-through">
                  ${tour.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-[#F23813] font-semibold text-[14px] sm:text-[16px]">
                ${tour.price.toFixed(2)}
              </span>
            </div>

            {/* Features Row - horizontal on mobile, vertical on desktop */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 sm:flex-col sm:gap-1.5">
              {/* Duration */}
              <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-[#495560]">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Duration: {tour.duration}</span>
              </div>

              {/* Transport Facility */}
              {tour.hasTransport && (
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-[#495560]">
                  <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Transport</span>
                </div>
              )}

              {/* Family Plan */}
              {tour.hasFamilyPlan && (
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] text-[#495560]">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Family Plan</span>
                </div>
              )}
            </div>

            {/* Mobile: View Now Button at bottom */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="sm:hidden mt-3 w-full border text-white bg-black py-2 rounded-full text-[11px] font-medium hover:bg-[#00A792] transition-colors"
            >
              View Now
            </button>
          </div>

          {/* Desktop: Right Column - Rating, Group, View Now */}
          <div className="hidden sm:flex flex-col items-end justify-between p-4">
            <div className="flex flex-col items-end gap-2">
              {/* Rating Badge */}
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[#FFA432] text-[#FFA432]" />
                <span className="text-[11px] text-[#495560] font-medium mt-0.5">{tour.rating}</span>
              </div>

              {/* Group Size Badge */}
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#495560]" />
                <span className="text-[10px] text-[#495560] font-medium whitespace-nowrap">
                  {tour.groupSize}
                </span>
              </div>
            </div>

            {/* View Now Button - Outline Style */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="border text-white bg-black px-5 py-2 rounded-full text-[12px] font-medium hover:bg-[#00A792] transition-colors whitespace-nowrap"
            >
              View Now
            </button>
          </div>
        </div>
      </article>
    )
  }

  // Grid View
  return (
    <article
      data-tour-card
      onClick={onClick}
      className="bg-white rounded-[10px] overflow-hidden cursor-pointer group border border-[#E8E8E8] hover:shadow-md transition-shadow"
    >
      {/* Image Container - with inner padding and rounded corners */}
      <div className="p-2 pb-0">
        <div className="relative h-[140px] rounded-lg overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover"
          />

          {/* Heart/Favorite Icon - Top Right */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 size-7 bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
              isFavorite ? "rotate-360" : ""
            }`}
          >
            <Heart
              className={`size-4 transition-colors ${
                isFavorite ? "fill-[#F23813] text-[#F23813]" : "text-black"
              }`}
            />
          </button>

          {/* OFF Badge - Bottom Left */}
          {hasDiscount && (
            <div className="absolute bottom-2 left-2 bg-[#F23813] text-white px-4 py-1.5 rounded-full text-xs font-semibold">
             -{discountPercent}% OFF
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 pt-2.5">
        {/* Top Row: Title + Rating/Group on right */}
        <div className="flex justify-between items-start gap-2 mb-1">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-[#1C1B1F] font-poppins font-semibold text-[13px] leading-tight mb-0.5 group-hover:text-[#00A792] transition-colors">
              {tour.title}
            </h3>

            {/* Subtitle (Peru) */}
            <p className="text-[#818181] text-[11px] mb-0.5">{tour.subtitle}</p>

            {/* Location (Ecuador Packages) */}
            <p className="text-[#818181] text-[11px]">{tour.location}</p>
          </div>

          {/* Right side - Rating & Group badges */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {/* Rating Badge */}
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 fill-[#FFA432] text-[#FFA432]" />
              <span className="text-[10px] text-[#1C1B1F] font-medium">{tour.rating}</span>
            </div>

            {/* Group Size Badge */}
            <div className="flex items-center gap-1">
              <Users className="w-2.5 h-2.5 text-[#495560]" />
              <span className="text-[9px] text-[#495560] font-medium whitespace-nowrap">
                {tour.groupSize}
              </span>
            </div>
          </div>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-1 mb-2 mt-2">
          <span className="text-[#818181] text-[10px]">From</span>
          {tour.originalPrice && (
            <span className="text-[#7BBCB0] text-[10px] line-through">
              ${tour.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-[#F23813] font-semibold text-[13px]">
            ${tour.price.toFixed(2)}
          </span>
        </div>

        {/* Features Section - Two columns layout */}
        <div className="flex justify-between items-end">
          {/* Left Column - Duration, Transport, Family */}
          <div className="flex flex-col gap-1">
            {/* Duration */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#495560]">
              <Clock className="w-3 h-3" />
              <span>Duration: {tour.duration}</span>
            </div>

            {/* Transport Facility */}
            {tour.hasTransport && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#495560]">
                <Car className="w-3 h-3" />
                <span>Transport Facility</span>
              </div>
            )}

            {/* Family Plan */}
            {tour.hasFamilyPlan && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#495560]">
                <Users className="w-3 h-3" />
                <span>Family Plan</span>
              </div>
            )}
          </div>

          {/* Right Column - View Now Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            className="border text-white bg-black px-4 py-1.5 rounded-full text-[10px] font-medium hover:bg-[#00A792] hover:text-white transition-colors"
          >
            View Now
          </button>
        </div>
      </div>
    </article>
  )
}
