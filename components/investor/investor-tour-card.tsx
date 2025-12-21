"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Users, Heart } from "lucide-react"
import type { CompanyTour } from "@/lib/types/investor"

interface InvestorTourCardProps {
  tour: CompanyTour
}

export function InvestorTourCard({ tour }: InvestorTourCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const tourLink = tour.uuid || tour.id
  const hasDiscount = tour.originalPrice && tour.originalPrice > tour.price
  const discountPercent = hasDiscount
    ? Math.round(((tour.originalPrice! - tour.price) / tour.originalPrice!) * 100)
    : 0

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/tours/${tourLink}`}>
      <article className="bg-white rounded-[10px] overflow-hidden border border-[#E8E8E8] hover:shadow-md transition-shadow cursor-pointer group min-w-[220px] w-[220px] sm:min-w-[240px] sm:w-[240px]">
        {/* Image Container */}
        <div className="p-2 pb-0">
          <div className="relative h-[140px] rounded-lg overflow-hidden">
            <Image
              src={tour.image || "/placeholder.svg"}
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

            {/* Discount Badge - Bottom Left */}
            {hasDiscount && (
              <div className="absolute bottom-2 left-2 bg-[#F23813] text-white px-3 py-1 rounded-full text-xs font-semibold">
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
              <h3 className="text-[#1C1B1F] font-poppins font-semibold text-[13px] leading-tight mb-0.5 group-hover:text-[#00A792] transition-colors line-clamp-1">
                {tour.title}
              </h3>

              {/* Subtitle (Country) */}
              <p className="text-[#818181] text-[11px] mb-0.5">
                {tour.countryFlag} {tour.location}
              </p>

              {/* Group Type */}
              <p className="text-[#818181] text-[11px]">{tour.groupType}</p>
            </div>

            {/* Right side - Rating & Group badges */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              {/* Rating Badge */}
              <div className="flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-[#FFA432] text-[#FFA432]" />
                <span className="text-[10px] text-[#1C1B1F] font-medium">{tour.rating}</span>
              </div>

              {/* Reviews count */}
              {tour.reviews > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-2.5 h-2.5 text-[#495560]" />
                  <span className="text-[9px] text-[#495560] font-medium">
                    {tour.reviews}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Price Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[#818181] text-[10px]">From</span>
              {tour.originalPrice && tour.originalPrice > tour.price && (
                <span className="text-[#F23813] text-[10px] line-through">
                  ${tour.originalPrice}
                </span>
              )}
              <span className="text-[#7BBCB0] font-semibold text-[13px]">
                ${tour.price}
              </span>
            </div>

            {/* View More Button */}
            <div className="group/btn">
              <button className="relative overflow-hidden rounded-full bg-black text-white font-poppins text-[10px] px-3 py-1.5 inline-flex items-center justify-center">
                <span className="relative z-10">View more</span>
                <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover/btn:scale-150 group-hover/btn:opacity-100 z-0"></span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
