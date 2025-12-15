"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Star, MapPin, ChevronRight, Trash2, LockOpen } from "lucide-react"
import { ProtectedRoute, useAuth } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { tours } from "@/lib/data"
import { ShimmerImage } from "@/components/ui/shimmer-image"

export default function WishlistPage() {
  const { user } = useAuth()
  const { savedTours } = useSavedTours()

  const savedTripsData = useMemo(() => {
    return tours.filter((tour) => savedTours.includes(tour.id))
  }, [savedTours])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#00A699] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#00A699]">Wishlist</span>
          </nav>

          <h1 className="text-3xl font-bold text-[#1C1B1F] mb-8">Wishlist</h1>

          {savedTripsData.length > 0 ? (
            <div className="space-y-6">
              {savedTripsData.map((tour) => (
                <WishlistTourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1C1B1F] mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">
                Start exploring tours and save the ones you love!
              </p>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#00A699] text-white font-medium rounded-full hover:bg-[#008F84] transition-colors"
              >
                Explore Tours
              </Link>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

function WishlistTourCard({ tour }: { tour: typeof tours[0] }) {
  const { toggleSaveTour } = useSavedTours()

  const description = `Duration: ${tour.duration}. ${tour.highlights?.slice(0, 2).join(", ")}. Overall, the tour was successful! Thank you.`
  const destinations = tour.location.split(",").map(d => d.trim())
  const savings = tour.originalPrice ? tour.originalPrice - tour.price : 0
  const discountPercent = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0
  const hasDiscount = discountPercent > 0

  const handleRemove = () => {
    toggleSaveTour(tour.id)
  }

  return (
    <div className="group/card relative flex flex-col md:flex-row rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow overflow-hidden">
      <div className="w-full md:w-64 lg:w-72 shrink-0 p-3">
        <div className="relative h-44 md:h-full rounded-xl overflow-hidden">
          <ShimmerImage
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 py-4 px-4 md:px-5 flex flex-col min-w-0">
        <h3 className="text-[17px] font-semibold text-[#1C1B1F] mb-1">
          {tour.title}
        </h3>

        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
          <span className="text-sm font-medium text-[#495560]">{tour.rating}</span>
          <span className="text-sm text-[#495560]">({tour.reviews} reviews)</span>
        </div>

        <p className="text-[13px] text-[#495560] mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2 text-[13px]">
          <MapPin className="w-4 h-4 text-[#495560] shrink-0" />
          <span className="font-medium text-[#495560]">Destinations</span>
          <span className="text-[#6B7280] truncate">{destinations.join(", ")}</span>
        </div>
      </div>

      <div className="w-full md:w-48 lg:w-56 shrink-0 p-4 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            {hasDiscount && (
              <p className="text-[12px] text-[#6B7280]">
                From <span className="line-through text-[#9CA3AF]">USD {tour.originalPrice?.toLocaleString()}</span>
              </p>
            )}
            <p className="font-Volkhov text-xl font-bold text-[#7BBCB0] mt-0.5">
              USD {tour.price.toLocaleString()}
            </p>
          </div>
          {hasDiscount && (
            <div className="text-right">
              <span className="inline-block bg-[#FF5630] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                {discountPercent}% OFF
              </span>
              {savings > 0 && (
                <p className="text-[12px] mt-1">
                  Saving USD {savings.toFixed(1)}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href={`/tours/${tour.id}`}
            className="group relative overflow-hidden w-full py-2.5 bg-[#00A792] text-white text-center font-medium rounded-full text-[14px] transition"
          >
            <span className="relative z-10">View Tour</span>
            <span className="absolute inset-0 bg-[#1C1B1F] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
          </Link>
          <Link
            href={`/tours/${tour.id}?enquiry=true`}
            className="group relative overflow-hidden w-full py-2.5 border border-[#E5E5E5] bg-[#F9FAFB] text-[#1C1B1F] text-center font-medium rounded-full text-[14px] transition"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Make an Enquiry</span>
            <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
          </Link>
        </div>
      </div>

      <div className="w-0 group-hover/card:w-12 overflow-hidden bg-[#F23813] flex items-center justify-center transition-all duration-300 ease-out rounded-r-2xl shrink-0">
        <button
          onClick={handleRemove}
          className="w-full h-full flex items-center justify-center text-white hover:bg-[#E54D2E] transition-colors"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
