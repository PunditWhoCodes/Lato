"use client"

import Link from "next/link"
import { DestinationCard } from "./destination-card"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { useTopDestinations, type DestinationData } from "@/app/tours/api"

// Static fallback destinations (used during loading or if API fails)
const FALLBACK_DESTINATIONS: DestinationData[] = [
  { name: "United States", countryCode: "US", flag: "🇺🇸", flagImage: "https://flagcdn.com/us.svg", tourCount: 0, image: "/destinations/peru.jpg" },
  { name: "Italy", countryCode: "IT", flag: "🇮🇹", flagImage: "https://flagcdn.com/it.svg", tourCount: 0, image: "/destinations/italy.jpg" },
  { name: "France", countryCode: "FR", flag: "🇫🇷", flagImage: "https://flagcdn.com/fr.svg", tourCount: 0, image: "/destinations/spain.jpg" },
  { name: "Spain", countryCode: "ES", flag: "🇪🇸", flagImage: "https://flagcdn.com/es.svg", tourCount: 0, image: "/destinations/spain.jpg" },
  { name: "Thailand", countryCode: "TH", flag: "🇹🇭", flagImage: "https://flagcdn.com/th.svg", tourCount: 0, image: "/destinations/thailand.jpg" },
  { name: "Greece", countryCode: "GR", flag: "🇬🇷", flagImage: "https://flagcdn.com/gr.svg", tourCount: 0, image: "/destinations/greece.jpg" },
  { name: "Japan", countryCode: "JP", flag: "🇯🇵", flagImage: "https://flagcdn.com/jp.svg", tourCount: 0, image: "/destinations/nepal.png" },
  { name: "United Kingdom", countryCode: "GB", flag: "🇬🇧", flagImage: "https://flagcdn.com/gb.svg", tourCount: 0, image: "/destinations/london.jpg" },
]

// Map country codes to destination images
const DESTINATION_IMAGES: Record<string, string> = {
  US: "/destinations/peru.jpg",
  IT: "/destinations/italy.jpg",
  FR: "/destinations/spain.jpg",
  ES: "/destinations/spain.jpg",
  TH: "/destinations/thailand.jpg",
  GR: "/destinations/greece.jpg",
  JP: "/destinations/nepal.png",
  GB: "/destinations/london.jpg",
  NL: "/destinations/milan.jpg",
  DE: "/destinations/greece.jpg",
  PE: "/destinations/peru.jpg",
  NP: "/destinations/nepal.png",
}

export function TopDestinationsSection() {
  const { data: destinations, isLoading, isError } = useTopDestinations(8)

  // Use API data if available, otherwise fallback
  const displayDestinations = destinations && destinations.length > 0
    ? destinations.map(dest => ({
        ...dest,
        // Use local image if available, otherwise use flagImage
        image: DESTINATION_IMAGES[dest.countryCode] || dest.flagImage
      }))
    : FALLBACK_DESTINATIONS

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-sm md:text-base font-light font-poppins text-black mb-2">
              Find your next adventure in destinations that inspire you
            </p>
            <h2 className="font-poppins font-light text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
              Top Destinations
            </h2>
          </div>

          {/* View More Button */}
          <Link
            href="/tours"
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="text-[#495560] text-base group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center overflow-hidden">
              <ArrowUpRight className="relative z-10 text-white w-[22px] h-[22px] transition-transform duration-300 group-hover:rotate-45" />

              {/* Radial expanding hover overlay */}
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#00A699]" />
            <span className="ml-3 text-gray-500">Loading destinations...</span>
          </div>
        )}

        {/* Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {displayDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.countryCode || index}
                name={destination.name}
                image={destination.image}
                href={`/tours?countries=${destination.countryCode}`}
                tourCount={destination.tourCount}
                flag={destination.flag}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
