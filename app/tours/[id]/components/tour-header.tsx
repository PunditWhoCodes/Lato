"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Heart, MapPin } from "lucide-react"

interface TourHeaderProps {
  title: string
  rating: number
  reviewCount: number
  location?: string
  destination?: string
}

export function TourHeader({
  title,
  rating,
  reviewCount,
  location = "Peru",
  destination = "Peru"
}: TourHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="space-y-3">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
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
      <div className="flex items-start justify-between gap-4">
        {/* Left Column - Title, Location and Rating */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#1C1B1F] leading-tight">
            {title}
          </h1>

          {/* Location & Rating Row */}
          <div className="flex items-center gap-4 mt-2">
            {/* Location */}
            <div className="flex items-center gap-1 text-[#818181] text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>

            {/* Divider */}
            <span className="text-[#E5E5E5]">|</span>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-[#FFA432] text-[#FFA432]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[#1C1B1F]">{rating.toFixed(1)}</span>
              <span className="text-sm text-[#818181]">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Right Column - Heart Icon (matching tour card style) */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E8E8E8] hover:border-[#00A699] transition-all duration-300 shrink-0 ${
            isFavorite ? "rotate-360" : ""
          }`}
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
