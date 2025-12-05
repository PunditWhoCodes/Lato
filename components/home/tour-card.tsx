"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Clock, Users, Bus, ArrowUpRight } from "lucide-react"
import type { Tour } from "@/types"
import { useSavedTours } from "@/lib/saved-tours-context"
import { cn } from "@/lib/utils"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface TourCardProps {
  tour: Tour
  variant?: "default" | "discount" | "featured"
  discountPercent?: number
}

export function TourCard({ tour, variant = "default", discountPercent }: TourCardProps) {
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const isSaved = isTourSaved(tour.id)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaveTour(tour.id)
  }

  // Use UUID if available, otherwise fall back to numeric ID
  const tourLink = tour.uuid || tour.id.toString()

  // Featured variant - matches Figma design exactly
  if (variant === "featured") {
    return (
      <Link href={`/tours/${tourLink}`}>
        <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white overflow-hidden border border-black/[0.09]" style={{ borderRadius: '26.8px', padding: '17.08px' }}>
          {/* Image */}
          <div className="relative overflow-hidden mb-[17.94px]" style={{ borderRadius: '17.08px' }}>
            <ShimmerImage
              src={tour.image || "/placeholder.svg"}
              alt={tour.title}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              style={{ height: '289.59px', borderRadius: '17.08px' }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[17.94px]">
            {/* Title and Rating Row */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-poppins font-medium text-[#1C2B38] leading-tight flex-1" style={{ fontSize: '17.86px', lineHeight: '22px' }}>
                {tour.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Star className="w-[23px] h-[23px] fill-[#FFA432] text-[#FFA432]" />
                <span className="font-mulish font-semibold text-[#778088]" style={{ fontSize: '16.08px', lineHeight: '20px' }}>
                  {tour.rating}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <div className="font-volkhov font-bold text-[#7BBCB0]" style={{ fontSize: '17.86px', lineHeight: '22px', textShadow: '0px 4.27px 11.11px rgba(255, 255, 255, 0.4)' }}>
                ${tour.price}
              </div>
              <div className="font-poppins text-[#778088]" style={{ fontSize: '14.29px', lineHeight: '21px' }}>
                per person
              </div>
            </div>

            {/* Features and Button Row */}
            <div className="flex items-end justify-between gap-4">
              {/* Left: Features */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-[13.67px] h-[13.67px] text-[#495560]" />
                  <span className="font-poppins text-[#495560]" style={{ fontSize: '14.29px', lineHeight: '21px' }}>
                    Duration {tour.duration} days
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bus className="w-[16.74px] h-[11.96px] text-[#495560]" />
                  <span className="font-mulish font-semibold text-[#495560]" style={{ fontSize: '14.29px', lineHeight: '18px' }}>
                    Transport Facility
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-[16.31px] h-[11.96px] text-[#495560]" />
                  <span className="font-mulish font-semibold text-[#495560]" style={{ fontSize: '14.29px', lineHeight: '18px' }}>
                    Family Plan
                  </span>
                </div>
              </div>

              {/* Right: Book Now Button */}
              <div className="group">
                <Button
                  className="relative overflow-hidden bg-black text-white flex items-center gap-4 h-auto flex-shrink-0"
                  style={{
                    width: '175.07px',
                    height: '44.66px',
                    borderRadius: '26.8px',
                    padding: '8.04px 13.4px',
                  }}
                >
                  <span className="relative z-10 font-poppins font-light" style={{ fontSize: '16.08px', lineHeight: '149.77%' }}>
                    Book Now
                  </span>
                  <ArrowUpRight className="relative z-10 w-[21.44px] h-[21.44px] transition-transform duration-300 group-hover:rotate-45" />

                  {/* Radial expanding hover overlay */}
                  <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  // Default and discount variants
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 shadow-lg bg-white overflow-hidden rounded-4xl">
      <Link href={`/tours/${tourLink}`}>
        <div className="relative overflow-hidden h-56">
          <ShimmerImage
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-4xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Discount Badge */}
          {variant === "discount" && discountPercent && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-white font-montserrat font-semibold text-sm px-3 py-1 border-0 shadow-lg">
                {discountPercent}% OFF
              </Badge>
            </div>
          )}

          {/* Regular Badges */}
          {variant === "default" && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {tour.badges.map((badge, badgeIndex) => (
                <Badge key={badgeIndex} className="bg-white/90 text-text-primary backdrop-blur-sm font-mulish font-semibold border-0">
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Save Button */}
          <div className="absolute top-4 right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className={cn(
                "rounded-full shadow-lg hover:scale-110 transition-all bg-white",
                isSaved && "bg-primary hover:bg-primary/90"
              )}
              onClick={handleSaveClick}
              aria-label={isSaved ? "Remove from saved tours" : "Save tour"}
            >
              <Heart
                className={cn("w-4 h-4 transition-all", isSaved && "fill-white text-white")}
              />
            </Button>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-poppins font-semibold text-lg text-text-primary group-hover:text-primary transition-colors leading-tight flex-1">
              {tour.title}
            </h3>
            <div className="text-right ml-4">
              {variant === "discount" && discountPercent ? (
                <>
                  <div className="line-through text-text-muted font-volkhov text-sm">€{tour.price}</div>
                  <span className="font-volkhov font-bold text-xl text-primary">
                    €{Math.round(tour.price * (1 - discountPercent / 100))}
                  </span>
                </>
              ) : (
                <span className="font-volkhov font-bold text-xl text-primary">€{tour.price}</span>
              )}
              <div className="text-xs text-text-muted font-mulish">per person</div>
            </div>
          </div>

          <p className="text-text-muted mb-3 font-mulish font-semibold text-sm">{tour.company}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-orange text-orange" />
                <span className="font-semibold text-text-primary font-poppins">{tour.rating}</span>
              </div>
              <span className="text-text-muted font-poppins text-sm">({tour.reviews})</span>
            </div>
            <div className="text-primary font-montserrat font-semibold text-sm hover:underline">
              View Details →
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
