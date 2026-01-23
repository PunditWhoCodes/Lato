"use client"

import Link from "next/link"
import { Check } from "lucide-react"

interface ListingHeroProps {
  destination: string
  tourCount?: number
}

export function ListingHero({ destination, tourCount }: ListingHeroProps) {
  // Handle "All Destinations" case - don't capitalize as a single word
  const displayName = destination === "All Destinations"
    ? "All Destinations"
    : destination.charAt(0).toUpperCase() + destination.slice(1).toLowerCase()

  // Format tour count for display
  const tourCountDisplay = tourCount !== undefined && tourCount > 0
    ? `${tourCount.toLocaleString()}+`
    : "9,900+"

  return (
    <section className="bg-white lg:bg-[#F7F7F7]">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-6 pt-[6px] pb-[6px] lg:py-6">
        <div className="flex items-center gap-1.5 lg:gap-2 text-[11px] lg:text-[13px] text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[#00A792]">
            Home
          </Link>
          <span>{">"}</span>
          <Link href="/tours" className="hover:text-[#00A792]">
            Top Destinations
          </Link>
          <span>{">"}</span>
          <span className="text-[#00A792] font-medium">
            {displayName} Tour & Trips
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-6 lg:pb-10 flex justify-center lg:block">
        <div className="relative w-[359px] lg:w-full h-[565px] lg:h-[360px] rounded-[30px] lg:rounded-[28px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2400&auto=format&fit=crop')",
            }}
          />

          {/* Center Card */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-[#F4F6F6] rounded-[16px] lg:rounded-[24px] px-5 lg:px-14 py-6 lg:py-8 shadow-[0_10px_32px_rgba(0,0,0,0.12)] max-w-[520px] w-full text-center">

              {/* Title */}
              <h1 className="font-poppins font-medium text-[20px] lg:text-[32px] text-[#111827] mb-4 lg:mb-6 leading-tight">
                {displayName} Tour & Trips
              </h1>

              {/* Features — stacked vertically */}
              <div className="flex flex-col gap-2 lg:gap-3 text-left mx-auto w-fit">
                <Feature text={`Choose from ${tourCountDisplay} ${displayName} tours`} />
                <Feature text="500+ verified reviews from Lato traveler's" />
                <Feature text="24/7 customer support" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px] lg:text-[14px] text-gray-600">
      <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#00A792] shrink-0" strokeWidth={2.5} />
      <span>{text}</span>
    </div>
  )
}
