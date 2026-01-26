"use client"

import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Star, MapPin, ChevronRight } from "lucide-react"
import { ProtectedRoute } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { ShimmerImage } from "@/components/ui/shimmer-image"

export default function WishlistPage() {
  const { savedToursData, savedToursCount } = useSavedTours()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#f7f7f7] lg:bg-white">
        <Navigation />

        <div className="max-w-7xl mx-auto px-[18px] lg:px-8 py-4 lg:py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-[1.8px] lg:gap-2 text-[14px] lg:text-sm mb-[28px] lg:mb-6 px-[13px] lg:px-0">
            <Link href="/" className="font-poppins text-[#686869] hover:text-[#00A792] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-[13px] h-[13px] lg:w-4 lg:h-4 text-black/40" />
            <span className="font-poppins text-[#00A792]">WishList</span>
          </nav>

          {/* Title Section */}
          <div className="flex flex-col gap-[31px] lg:gap-2 px-[13px] lg:px-0 mb-[45px] lg:mb-8">
            <h1 className="font-poppins font-medium text-[21px] lg:text-3xl lg:font-bold text-black lg:text-[#1C1B1F] leading-[1.498]">
              Wishlist
            </h1>
            <p className="font-poppins font-light text-[15px] lg:text-base text-black/70 lg:hidden">
              {savedToursCount} Trips are in your Wishlist
            </p>
            {/* Desktop count badge */}
            {savedToursCount > 0 && (
              <span className="hidden lg:inline text-gray-400 font-normal text-lg -mt-6">({savedToursCount})</span>
            )}
          </div>

          {savedToursData.length > 0 ? (
            <div className="flex flex-col gap-[23px] lg:gap-6">
              {savedToursData.map((tour) => (
                <WishlistTourCard key={tour.uuid || tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-[56px] lg:py-16">
              <div className="w-[56px] h-[56px] lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-[14px] lg:mb-4">
                <svg className="w-[28px] h-[28px] lg:w-10 lg:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-[17px] lg:text-xl text-[#1C1B1F] mb-[7px] lg:mb-2">Your wishlist is empty</h3>
              <p className="font-poppins text-[13px] lg:text-base text-gray-500 mb-[21px] lg:mb-6">
                Start exploring tours and save the ones you love!
              </p>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center px-[21px] py-[10px] lg:px-6 lg:py-3 bg-[#00A792] text-white font-poppins font-medium text-[12px] lg:text-base rounded-full hover:bg-[#008F84] transition-colors"
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

interface SavedTourData {
  id: number
  uuid?: string
  title: string
  company: string
  companyId: string
  companyCountry: string
  companyFlag: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  duration: string
  groupSize: string
  location: string
  destination: string
  travelStyle: string
  image: string
  badges: string[]
  category: string
  difficulty: string
  highlights: string[]
  tourType: string
}

function WishlistTourCard({ tour }: { tour: SavedTourData }) {
  const { toggleSaveTour } = useSavedTours()
  const tourIdentifier = tour.uuid || tour.id.toString()

  const description = `Duration: ${tour.duration}. ${tour.highlights?.slice(0, 2).join(", ")}. Overall, the tour was successful! Thank you.`
  const destinations = tour.location.split(",").map(d => d.trim())
  const savings = tour.originalPrice ? tour.originalPrice - tour.price : 0
  const discountPercent = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0
  const hasDiscount = discountPercent > 0

  const handleRemove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaveTour(tourIdentifier)
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="lg:hidden relative bg-white rounded-[7px] p-[15px] flex flex-col gap-[19px]">
        {/* Delete Button - Top Right */}
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-[22px] right-[25px] z-10 bg-white rounded-full p-[4px] shadow-[0px_7px_11px_-2px_rgba(0,0,0,0.1),0px_3px_4px_-3px_rgba(0,0,0,0.1)] touch-manipulation"
          aria-label="Remove from wishlist"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none">
            <path d="M17.3185 4.8847L16.7681 13.7883C16.6275 16.0631 16.5572 17.2005 15.987 18.0183C15.7051 18.4226 15.3421 18.7638 14.9212 19.0202C14.0699 19.5389 12.9303 19.5389 10.6511 19.5389C8.36896 19.5389 7.22787 19.5389 6.37593 19.0192C5.95473 18.7624 5.59166 18.4205 5.30985 18.0156C4.73984 17.1965 4.67108 16.0575 4.53355 13.7795L3.99658 4.8847" stroke="#F23813" strokeWidth="1.3322" strokeLinecap="round"/>
            <path d="M7.99316 10.4221H13.322" stroke="#F23813" strokeWidth="1.3322" strokeLinecap="round"/>
            <path d="M9.32568 13.9031H11.9901" stroke="#F23813" strokeWidth="1.3322" strokeLinecap="round"/>
            <path d="M2.66455 4.8847H18.6509M14.2596 4.8847L13.6533 3.63397C13.2505 2.80315 13.0492 2.38774 12.7018 2.12866C12.6247 2.07119 12.5431 2.02007 12.4578 1.97581C12.0732 1.77625 11.6115 1.77625 10.6882 1.77625C9.74175 1.77625 9.26851 1.77625 8.87747 1.98417C8.7908 2.03026 8.7081 2.08345 8.63022 2.14319C8.27883 2.41277 8.08254 2.84338 7.68997 3.70461L7.15204 4.8847" stroke="#F23813" strokeWidth="1.3322" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Image */}
        <div className="relative h-[173px] rounded-[8px] overflow-hidden">
          <ShimmerImage
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[26px]">
          {/* Tour Info */}
          <div className="flex flex-col gap-[13px]">
            {/* Title */}
            <h3 className="font-poppins font-semibold text-[18px] text-[#1c2b38] leading-[1]">
              {tour.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-[4px]">
              <Star className="w-[11px] h-[11px] fill-[#FFA432] text-[#FFA432]" />
              <span className="font-poppins text-[11px] text-[#778088]">
                {tour.rating} ({tour.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="font-poppins text-[12px] text-[#495560] leading-normal line-clamp-3">
              {description}
            </p>

            {/* Company */}
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[22px] h-[22px] rounded-full bg-gray-300 overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt={tour.company}
                    width={22}
                    height={22}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-poppins text-[10px] text-[#495560]">
                  {tour.company}
                </span>
              </div>

              {/* Destinations */}
              <div className="flex items-center gap-[24px]">
                <div className="flex items-center gap-[8px]">
                  <MapPin className="w-[15px] h-[15px] text-[#495560]" />
                  <span className="font-poppins font-medium text-[12px] text-[#495560]">
                    Destinations
                  </span>
                </div>
                <span className="font-poppins text-[12px] text-[#495560]">
                  {destinations.slice(0, 3).join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-col gap-[21px]">
            {/* Price Row */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[1px]">
                <div className="flex items-center gap-[4px]">
                  <span className="font-poppins text-[9px] text-[#6b7280]">From</span>
                  {hasDiscount && (
                    <span className="font-poppins text-[9px] text-[#6b7280] line-through">
                      USD {tour.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="font-volkhov font-bold text-[15px] text-[#7bbcb0]">
                  USD {tour.price.toLocaleString()}
                </span>
              </div>

              {hasDiscount && (
                <div className="flex flex-col gap-[5px] items-end">
                  <span className="bg-[#f23813] text-white font-poppins font-medium text-[8px] uppercase px-[8px] py-[1px] rounded-[11px]">
                    {discountPercent}% Off Today
                  </span>
                  <div className="flex items-center gap-[3px]">
                    <span className="font-poppins font-medium text-[9px] text-[#6b7280]">Saving</span>
                    <span className="font-poppins font-medium text-[9px] text-[#111928]">
                      USD {savings.toFixed(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-[5px] pb-[11px]">
              <Link
                href={`/tours/${tourIdentifier}`}
                className="w-full py-[8px] bg-[#00a792] text-white font-poppins font-medium text-[11px] text-center rounded-[17px]"
              >
                View Tour
              </Link>
              <Link
                href={`/chats?enquiry=true`}
                className="w-full py-[9px] border border-[#e5e7eb] text-[#111928] font-poppins font-medium text-[11px] text-center rounded-[15px]"
              >
                Make an Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Card Layout */}
      <div className="hidden lg:flex group/card relative flex-row rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow overflow-hidden">
        {/* Image Section */}
        <div className="w-48 md:w-64 lg:w-72 shrink-0 p-3">
          <div className="relative h-full rounded-xl overflow-hidden">
            <ShimmerImage
              src={tour.image || "/placeholder.svg"}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 py-4 px-4 md:px-5 flex flex-col min-w-0">
          <h3 className="text-[17px] font-semibold text-[#1C1B1F] mb-1">
            {tour.title}
          </h3>

          {/* Desktop: Rating */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
            <span className="text-sm font-medium text-[#495560]">{tour.rating}</span>
            <span className="text-sm text-[#495560]">({tour.reviews} reviews)</span>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[#495560] mb-4 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Destinations */}
          <div className="flex items-center gap-2 text-[13px]">
            <MapPin className="w-4 h-4 text-[#495560] shrink-0" />
            <span className="font-medium text-[#495560]">Destinations</span>
            <span className="text-[#6B7280] truncate">{destinations.join(", ")}</span>
          </div>
        </div>

        {/* Desktop: Price & Actions Section */}
        <div className="w-48 lg:w-56 shrink-0 p-4 flex flex-col">
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
              href={`/tours/${tourIdentifier}`}
              className="group relative overflow-hidden w-full py-2.5 bg-[#00A792] text-white text-center font-medium rounded-full text-[14px] transition"
            >
              <span className="relative z-10">View Tour</span>
              <span className="absolute inset-0 bg-[#1C1B1F] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </Link>
            <Link
              href={`/chats?enquiry=true`}
              className="group relative overflow-hidden w-full py-2.5 border border-[#E5E5E5] bg-[#F9FAFB] text-[#1C1B1F] text-center font-medium rounded-full text-[14px] transition"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Make an Enquiry</span>
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </Link>
          </div>
        </div>

        {/* Desktop: Hover-reveal delete button */}
        <div className="w-0 group-hover/card:w-12 overflow-hidden bg-[#F23813] flex items-center justify-center transition-all duration-300 ease-out rounded-r-2xl shrink-0">
          <button
            type="button"
            onClick={handleRemove}
            className="w-full h-full flex items-center justify-center text-white hover:bg-[#E54D2E] transition-colors"
            aria-label="Remove from wishlist"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.3185 4.8847L16.7681 13.7883C16.6275 16.0631 16.5572 17.2005 15.987 18.0183C15.7051 18.4226 15.3421 18.7638 14.9212 19.0202C14.0699 19.5389 12.9303 19.5389 10.6511 19.5389C8.36896 19.5389 7.22787 19.5389 6.37593 19.0192C5.95473 18.7624 5.59166 18.4205 5.30985 18.0156C4.73984 17.1965 4.67108 16.0575 4.53355 13.7795L3.99658 4.8847" stroke="white" strokeWidth="1.3322" strokeLinecap="round"/>
              <path d="M7.99316 10.4221H13.322" stroke="white" strokeWidth="1.3322" strokeLinecap="round"/>
              <path d="M9.32568 13.9031H11.9901" stroke="white" strokeWidth="1.3322" strokeLinecap="round"/>
              <path d="M2.66455 4.8847H18.6509M14.2596 4.8847L13.6533 3.63397C13.2505 2.80315 13.0492 2.38774 12.7018 2.12866C12.6247 2.07119 12.5431 2.02007 12.4578 1.97581C12.0732 1.77625 11.6115 1.77625 10.6882 1.77625C9.74175 1.77625 9.26851 1.77625 8.87747 1.98417C8.7908 2.03026 8.7081 2.08345 8.63022 2.14319C8.27883 2.41277 8.08254 2.84338 7.68997 3.70461L7.15204 4.8847" stroke="white" strokeWidth="1.3322" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
