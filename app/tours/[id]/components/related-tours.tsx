"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Car, Users, ChevronLeft, ChevronRight } from "lucide-react"

interface RelatedTour {
  id: number | string
  title: string
  price: number
  rating: number
  image: string
  duration?: string
  hasTransport?: boolean
  hasFamilyPlan?: boolean
}

interface RelatedToursProps {
  tours?: RelatedTour[]
  tourName?: string
}

// Default related tours data
const defaultTours: RelatedTour[] = [
  {
    id: 1,
    title: "Rainbow Mountain",
    price: 35,
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
    duration: "2 hours",
    hasTransport: true,
    hasFamilyPlan: true
  },
  {
    id: 2,
    title: "Rainbow Mountain",
    price: 35,
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=400",
    duration: "2 hours",
    hasTransport: true,
    hasFamilyPlan: true
  },
  {
    id: 3,
    title: "Rainbow Mountain",
    price: 35,
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400",
    duration: "2 hours",
    hasTransport: true,
    hasFamilyPlan: true
  }
]

export function RelatedTours({ tours = defaultTours, tourName = "Best of the Andes" }: RelatedToursProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="py-8">
      {/* Header with Navigation Arrows */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1C1B1F] mb-2">Discover More Places</h2>
          <p className="text-[15px] text-[#6B7280]">
            Discover our top tours similar to {tourName} that you might like.
          </p>
        </div>

        {/* Navigation Arrows */}
        {tours.length > 3 && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#00A699] hover:text-[#00A699] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#00A699] hover:text-[#00A699] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl border border-[#E5E5E5] p-3 hover:shadow-lg transition-all duration-300 shrink-0 w-[360px]"
          >
            {/* Image with rounded corners */}
            <div className="relative h-[180px] rounded-xl overflow-hidden mb-3">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              {/* Title Row - Title on left, Rating on right */}
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-[#1C1B1F] whitespace-nowrap">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-1 shrink-0">
                  <Star className="w-4 h-4 fill-[#FFA432] text-[#FFA432]" />
                  <span className="text-sm text-[#6B7280]">{tour.rating}</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-1">
                <span className="text-[#00A699] font-semibold text-lg">${tour.price.toFixed(2)}</span>
                <span className="text-sm text-[#6B7280]">per person</span>
              </div>

              {/* Features and View More Row */}
              <div className="flex items-end justify-between pt-1">
                {/* Features Column */}
                <div className="space-y-1">
                  {/* Duration */}
                  {tour.duration && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Duration {tour.duration}</span>
                    </div>
                  )}

                  {/* Transport */}
                  {tour.hasTransport && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Car className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Transport Facility</span>
                    </div>
                  )}

                  {/* Family Plan */}
                  {tour.hasFamilyPlan && (
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Users className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Family Plan</span>
                    </div>
                  )}
                </div>

                {/* View More Button */}
                <Link
                  href={`/tours/${tour.id}`}
                  className="group relative overflow-hidden px-5 py-2 bg-[#1C1B1F] text-white rounded-full text-sm font-medium transition-colors shrink-0"
                >
                  <span className="relative z-10">View More</span>
                  <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
