"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, BadgeCheck, MessageCircle } from "lucide-react"

interface CompanySectionProps {
  company: {
    name: string
    id: string
    avatar: string
    rating: number
    reviews: number
    verified: boolean
    description?: string
    country?: string
    countryFlag?: string
    yearsOfExperience?: number
    numberOfTours?: number
    ageRange?: string
    responseTime?: string
    responseRate?: string
  }
}

export function CompanySection({ company }: CompanySectionProps) {
  const defaultDescription = `${company.name} offers curated travel experiences across Peru's most iconic landscapes and cultural sites. The company combines guided adventures with meaningful cultural immersion to provide travelers with a deeper understanding of the region. Each journey is designed to be seamless, authentic, and memorable.`

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold text-[#1C1B1F] mb-4">About Company</h2>

      {/* Mobile Company Card */}
      <div className="lg:hidden flex justify-center">
        <div
          className="flex flex-col w-[373px] bg-[rgba(0,167,146,0.03)] border border-[rgba(0,167,146,0.3)] rounded-[10.91px] p-[13.82px_12.37px] gap-[3.64px]"
          style={{ minHeight: '179px' }}
        >
          {/* Top Row - Avatar and Company Info */}
          <div className="flex items-start gap-[9.1px]">
            {/* Avatar */}
            <div className="relative w-[43.66px] h-[43.66px] rounded-full overflow-hidden shrink-0 bg-[#E5E5E5]">
              <Image
                src={company.avatar || "/placeholder.svg"}
                alt={company.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              {/* Operated by label */}
              <span className="text-[8.73px] text-[#111928]">Operated by</span>

              {/* Name + Follow Button Row */}
              <div className="flex items-center justify-between">
                <h3 className="text-[13.1px] font-bold text-[#111928]">{company.name}</h3>
                <button
                  className="w-[62.88px] h-[21.83px] border border-[#00A792] rounded-[13.1px] text-[7.86px] text-[#00A792] font-medium"
                  style={{ borderWidth: '0.436644px' }}
                >
                  + Follow
                </button>
              </div>

              {/* Rating + Verified Badge Row */}
              <div className="flex items-center justify-between gap-[11.79px] mt-[3.64px]">
                {/* Rating */}
                <div className="flex items-center gap-[2.55px]">
                  <span className="text-[7.3px] font-semibold text-[#000000]">{company.rating.toFixed(1)}</span>
                  <Star className="w-[6.88px] h-[6.88px] fill-[#FFA432] text-[#FFA432]" />
                  <span className="text-[7.3px] font-semibold text-[#A7A9AF]">({company.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Verified Badge */}
                {company.verified && (
                  <div className="flex items-center gap-[1.97px] bg-[rgba(0,167,146,0.07)] px-[3.94px] py-[3.94px] rounded-[39.4px]">
                    <BadgeCheck className="w-[7.88px] h-[7.88px] text-[#3EB368]" />
                    <span className="text-[5.91px] text-[#6B7280]">Verified Company</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats - Vertical list with horizontal label/value pairs */}
          <div className="flex flex-col gap-[3.64px] mt-[11.79px]">
            <div className="flex items-center gap-[2.55px]">
              <span className="text-[7.3px] font-semibold text-[#000000]">Number of tours</span>
              <span className="text-[7.3px] font-semibold text-[#A7A9AF]">{company.numberOfTours || 565}</span>
            </div>
            <div className="flex items-center gap-[2.55px]">
              <span className="text-[7.3px] font-semibold text-[#000000]">Age Range</span>
              <span className="text-[7.3px] font-semibold text-[#A7A9AF]">{company.ageRange || "16 to 85 years old"}</span>
            </div>
            <div className="flex items-center gap-[2.55px]">
              <span className="text-[7.3px] font-semibold text-[#000000]">Response time</span>
              <span className="text-[7.3px] font-semibold text-[#A7A9AF]">{company.responseTime || "12 hours"}</span>
            </div>
            <div className="flex items-center gap-[2.55px]">
              <span className="text-[7.3px] font-semibold text-[#000000]">Response rate</span>
              <span className="text-[7.3px] font-semibold text-[#A7A9AF]">{company.responseRate || "96%"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-[7.27px] mt-[9.1px]">
            <Link
              href={`/companies/${company.id}`}
              className="flex-1 text-center py-[5.46px] border border-[#1C1B1F] rounded-full text-[7.86px] font-medium text-[#1C1B1F] hover:bg-[#00A792] hover:text-white hover:border-[#00A792] transition-colors"
            >
              View Profile
            </Link>
            <Link
              href={`/messages/conv-${company.id}`}
              className="flex-1 flex items-center justify-center gap-[3.64px] py-[5.46px] bg-[#1C1B1F] text-white rounded-full text-[7.86px] font-medium hover:bg-[#00A792] transition-colors"
            >
              <MessageCircle className="w-[8px] h-[8px]" />
              Chat Now
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Company Card */}
      <div className="hidden lg:block border border-[#00A79233] bg-[#00A79208] p-5 rounded-2xl">
        {/* Top Row - Avatar, Name, Verified Badge, Buttons */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-[#E5E5E5]">
            <Image
              src={company.avatar || "/placeholder.svg"}
              alt={company.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="flex-1">
            {/* Name + Verified + Buttons Row */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-[#1C1B1F]">{company.name}</h3>
                {company.verified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E8F5F4] px-3 py-1.5 rounded-full">
                    <BadgeCheck className="w-4 h-4 text-[#3EB368]" />
                    <span className="text-sm text-[#6B7280] font-medium">
                      Verified Company
                    </span>
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/companies/${company.id}`}
                  className="group relative overflow-hidden px-5 py-2 border border-[#1C1B1F] rounded-full text-sm font-medium text-[#1C1B1F] transition-colors"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Profile</span>
                  <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </Link>
                <Link
                  href={`/messages/conv-${company.id}`}
                  className="group relative overflow-hidden px-5 py-2 bg-[#1C1B1F] text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Chat Now</span>
                  <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </Link>
              </div>
            </div>

            {/* Rating Row - Stars + Rating Badge + Experience */}
            <div className="flex items-center gap-2 mt-3">
              {/* 5 Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(company.rating)
                        ? "fill-[#FFA432] text-[#FFA432]"
                        : "fill-[#E5E5E5] text-[#E5E5E5]"
                    }`}
                  />
                ))}
              </div>

              {/* Rating Badge */}
              <span className="bg-[#00A699] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {company.rating.toFixed(1)}
              </span>

              {/* Years of Experience */}
              <span className="text-sm text-[#6B7280]">
                {company.yearsOfExperience || 5} Years of Experience
              </span>
            </div>
          </div>
        </div>

        {/* Description - Inside the card */}
        <p className="text-[15px] text-[#6B7280] leading-relaxed">
          {company.description || defaultDescription}
        </p>
      </div>
    </div>
  )
}
