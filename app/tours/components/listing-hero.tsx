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
    <section className="bg-[#F7F7F7]">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-[13px] text-gray-500">
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
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="relative h-[360px] rounded-[28px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2400&auto=format&fit=crop')",
            }}
          />

          {/* Center Card */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-[#F4F6F6] rounded-[24px] px-10 md:px-14 py-8 shadow-[0_10px_32px_rgba(0,0,0,0.12)] max-w-[520px] w-full text-center">
              
              {/* Title */}
              <h1 className="font-poppins font-medium text-[32px] text-[#111827] mb-6">
                {displayName} Tour & Trips
              </h1>

              {/* Features — stacked vertically */}
              <div className="flex flex-col gap-3 text-left mx-auto w-fit">
                <Feature text={`Choose from ${tourCountDisplay} ${displayName} tours`} />
                <Feature text="500+ verified reviews from Lato traveler’s" />
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
    <div className="flex items-center gap-2 text-[14px] text-gray-600">
      <Check className="w-4 h-4 text-[#00A792]" strokeWidth={2.5} />
      <span>{text}</span>
    </div>
  )
}
