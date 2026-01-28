"use client"

import { X, Clock, Users, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BookNowButton } from "@/components/ui/book-now-button"

interface ChatInfoSidebarProps {
  isOpen: boolean
  onClose: () => void
  company: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    responseTime: string
    reviewCount?: number
    isOnline?: boolean
    timezone?: string
  }
  tour: {
    id: number
    title: string
    price: number
    duration?: string
    groupSize?: string
    image?: string
  }
}

export function ChatInfoSidebar({
  isOpen,
  onClose,
  company,
  tour,
}: ChatInfoSidebarProps) {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-[16.5px] h-[16.5px] lg:w-4 lg:h-4 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  return (
    <>
      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Mobile: full screen overlay, bg-[#f5fafc] per Figma */}
      <aside
        className={`
          fixed lg:relative inset-0 lg:inset-auto lg:right-0 lg:top-0 lg:h-full
          w-full lg:w-[340px] bg-[#f5fafc] lg:bg-white z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        {/* Mobile Header - Figma: Back arrow, centered company name with verified badge */}
        <div className="lg:hidden flex items-center justify-center relative px-[32px] pt-[23px] pb-[7px]">
          {/* Back button */}
          <button
            onClick={onClose}
            aria-label="Back"
            className="absolute left-[32px] top-[33px]"
          >
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
              <path d="M8 1L1 8L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Centered company name with verified badge - Figma: Poppins Medium 25px */}
          <div className="flex items-center gap-[11px]">
            <span className="font-poppins font-medium text-[25px] text-black">
              {company.name}
            </span>
            {company.verified && (
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.5" cy="16.5" r="16.5" fill="#00A792"/>
                <path d="M9 16.5L14 21.5L24 11.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>

        {/* Desktop Header - Original style */}
        <div className="hidden lg:block p-4">
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content Container - Mobile: px-[32px], Desktop: p-4 */}
        <div className="px-[32px] lg:px-4 pt-[20px] lg:pt-0 space-y-[21px] lg:space-y-4 pb-8">
          {/* Tour Details Card - Figma: border 0.795px rgba(0,167,146,0.64), rounded-[8px], bg rgba(217,217,217,0.05) */}
          <div className="border-[0.8px] lg:border border-[rgba(0,167,146,0.64)] lg:border-[#00A792A3] rounded-[8px] lg:rounded-2xl bg-[rgba(217,217,217,0.05)] lg:bg-white px-[13.5px] py-[17.5px] lg:p-4 lg:shadow-sm">
            {/* Title - Figma: Poppins Medium 15.905px */}
            <h3 className="font-poppins font-medium text-[16px] lg:text-base text-black mb-[14px] lg:mb-3">Tour Details</h3>

            {tour.image && (
              <div className="relative h-[157px] lg:h-40 w-full rounded-[16px] lg:rounded-xl overflow-hidden mb-[17.5px] lg:mb-3">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Tour title - Figma: Poppins Light 14.315px */}
            <h4 className="font-poppins font-light text-[14px] lg:text-base text-black mb-[18px] lg:mb-3 leading-[1.25]">
              {tour.title}
            </h4>

            {/* Duration and Group Size - Figma: Poppins Regular 14.315px, #495560 */}
            <div className="space-y-[2.4px] lg:space-y-2 mb-[38px] lg:mb-4">
              {tour.duration && (
                <div className="flex items-center gap-[7px] lg:gap-2 text-[14px] lg:text-sm text-[#495560] lg:text-gray-600 font-poppins">
                  <Clock className="w-[17.5px] h-[17.5px] lg:w-4 lg:h-4" />
                  {tour.duration}
                </div>
              )}
              {tour.groupSize && (
                <div className="flex items-center gap-[7px] lg:gap-2 text-[14px] lg:text-sm text-[#495560] lg:text-gray-600 font-poppins">
                  <Users className="w-[17.5px] h-[17.5px] lg:w-4 lg:h-4" />
                  {tour.groupSize}
                </div>
              )}
            </div>

            {/* Price - Figma: Volkhov Bold 25.459px, #7bbcb0 */}
            <div className="flex items-end justify-between mb-[19px] lg:mb-5">
              <span className="font-volkhov font-bold text-[25px] lg:text-xl text-[#7BBCB0]">
                USD {tour.price.toLocaleString()}
              </span>
              <span className="font-poppins text-[14px] lg:text-sm text-[#6B7280]">
                Per person
              </span>
            </div>

            {/* Buttons - Figma: rounded-[24px], h-[37px], text 11.134px */}
            <div className="flex flex-col items-center gap-[12.7px] lg:gap-3">
              <Link
                href={`/tours/${tour.id}`}
                className="w-[202px] lg:w-full h-[37px] lg:h-auto lg:py-3 flex items-center justify-center rounded-[24px] lg:rounded-full bg-[#00A792] text-white font-poppins text-[11px] lg:text-sm font-normal border-[1.6px] lg:border-2 border-[#00A792]"
              >
                View Tour Details
              </Link>

              <BookNowButton
                href={`/tours/${tour.id}/book`}
                size="sm"
                variant="outline"
                showArrow={false}
                className="w-[202px] lg:w-full"
              />
            </div>
          </div>

          {/* About Company Card - Same border styling as Tour Details */}
          <div className="border-[0.8px] lg:border border-[rgba(0,167,146,0.64)] lg:border-[#00A792A3] rounded-[8px] lg:rounded-2xl bg-[rgba(217,217,217,0.05)] lg:bg-white px-[18px] py-[25.5px] lg:p-4 lg:shadow-sm">
            {/* Title - Figma: Poppins Medium 16.499px */}
            <h3 className="font-poppins font-medium text-[16.5px] lg:text-xl text-black mb-[14px] lg:mb-3 leading-[1.25]">About Company</h3>

            {/* Rating - Figma: stars + 5.0 Roboto Medium 11.571px */}
            <div className="flex items-center gap-[10px] lg:gap-2 mb-[9px] lg:mb-2">
              <div className="flex">{renderStars(company.rating)}</div>
              <span className="font-medium text-[11.5px] lg:text-base text-[#111928]">
                {company.rating}
              </span>
              <span className="text-[11.5px] lg:text-sm text-[#6B7280]">
                ({company.reviewCount || 0} Reviews)
              </span>
            </div>

            {/* Response time - Figma: Poppins Regular 14.849px, #6b7280 */}
            <p className="font-poppins text-[15px] lg:text-sm text-[#6B7280] mb-[38px] lg:mb-4 leading-[1.55]">
              Usually respond within one hour
            </p>

            {/* Button - Figma: rounded-[82px], h-[39px] */}
            <Link
              href={`/companies/${company.id}`}
              className="w-full h-[39px] lg:h-auto lg:py-3 flex items-center justify-center rounded-[82px] lg:rounded-full border-[0.8px] lg:border border-[#A7A9AF] text-[#3A3A3A] font-poppins text-[11.5px] lg:text-sm font-normal hover:bg-gray-50"
            >
              View Company Profile
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
