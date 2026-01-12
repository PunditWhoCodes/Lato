"use client"

import Image from "next/image"
import { Star, Clock, MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Accommodation as APIAccommodation } from "@/types"

// Legacy interface for backwards compatibility
interface LegacyAccommodation {
  name: string
  image: string
  rating: number
  duration: string
}

interface WhereYouWillStayProps {
  accommodations?: APIAccommodation[] | LegacyAccommodation[]
}

// Default fallback accommodations
const defaultAccommodations: LegacyAccommodation[] = [
  {
    name: "B&B Hotel Ljubljana Park",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 4.3,
    duration: "2/3 Days"
  },
  {
    name: "Mahal Hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    rating: 4.3,
    duration: "2/3 Days"
  }
]

// Check if item is API accommodation
function isAPIAccommodation(item: any): item is APIAccommodation {
  return 'id' in item && 'nights' in item
}

export function WhereYouWillStay({ accommodations }: WhereYouWillStayProps) {
  // Use API data if available, otherwise default
  const displayAccommodations = accommodations && accommodations.length > 0
    ? accommodations
    : defaultAccommodations

  // If no accommodations at all, don't render
  if (displayAccommodations.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#1C1B1F] mb-1">Where you will stay</h2>
          <p className="text-sm text-[#6B7280]">All accommodations are subject to change</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-[#00A792] text-[#00A792] hover:bg-[#00A792] hover:text-white font-poppins text-sm px-4 h-9"
        >
          View All Details
        </Button>
      </div>

      {/* Accommodation Cards - Horizontal scroll on mobile, grid on desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        {displayAccommodations.map((accommodation, index) => {
          const isAPI = isAPIAccommodation(accommodation)

          // Get image - from API or legacy format
          const image = isAPI
            ? (accommodation.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop")
            : accommodation.image

          // Get rating - normalize API rating (0-10) to display (0-5)
          const displayRating = isAPI
            ? (accommodation.rating / 2) // API uses 0-10, display uses 0-5
            : accommodation.rating

          // Get duration text
          const duration = isAPI
            ? `${accommodation.nights} ${accommodation.nights === 1 ? 'Night' : 'Nights'}`
            : accommodation.duration

          // Get location if available
          const location = isAPI ? accommodation.location?.name : undefined

          // Get type if available
          const accommodationType = isAPI ? accommodation.type : undefined

          return (
            <div key={isAPI ? accommodation.id : index} className="group cursor-pointer flex-shrink-0 w-[260px] md:w-auto">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#00A792] transition-colors">
                <Image
                  src={image}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
                {/* Type badge */}
                {accommodationType && (
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#00A792]" />
                    <span className="text-xs font-medium text-[#1C1B1F]">{accommodationType}</span>
                  </div>
                )}
              </div>

              {/* Hotel Info */}
              <div>
                <h3 className="font-medium text-[#1C1B1F] mb-1 line-clamp-1">{accommodation.name}</h3>

                {/* Location if available */}
                {location && (
                  <div className="flex items-center gap-1 text-xs text-[#6B7280] mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{location}</span>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(displayRating)
                          ? "fill-[#FFA432] text-[#FFA432]"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-[#6B7280] ml-1">{displayRating.toFixed(1)}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <Clock className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
