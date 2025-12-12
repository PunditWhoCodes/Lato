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
  }
}

export function CompanySection({ company }: CompanySectionProps) {
  const defaultDescription = `${company.name} offers curated travel experiences across Peru's most iconic landscapes and cultural sites. The company combines guided adventures with meaningful cultural immersion to provide travelers with a deeper understanding of the region. Each journey is designed to be seamless, authentic, and memorable.`

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold text-[#1C1B1F] mb-4">About Company</h2>

      {/* Company Card */}
      <div className="border border-[#00A79233] bg-[#00A79208] p-5 rounded-2xl">
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
                <button className="group relative overflow-hidden px-5 py-2 bg-[#1C1B1F] text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2">
                  <span className="relative z-10">Chat Now</span>
                  <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </button>
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
