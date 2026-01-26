"use client"

import Link from "next/link"
import { DestinationCard } from "./destination-card"
import { ArrowUpRight, Loader2 } from "lucide-react"
import { useTopDestinations, type DestinationData } from "@/app/tours/api"

// Default fallback image for destinations without specific images
const DEFAULT_DESTINATION_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"

// Map country codes to destination images (local or Unsplash)
const DESTINATION_IMAGES: Record<string, string> = {
  // Local images (available in /public/destinations/)
  IT: "/destinations/italy.jpg",
  ES: "/destinations/spain.jpg",
  TH: "/destinations/thailand.jpg",
  GR: "/destinations/greece.jpg",
  GB: "/destinations/london.jpg",
  PE: "/destinations/peru.jpg",
  NP: "/destinations/nepal.png",

  // Unsplash images for countries without local images
  US: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80", // NYC skyline
  FR: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", // Paris Eiffel Tower
  JP: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", // Japan temple
  DE: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", // Germany
  NL: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80", // Amsterdam
  AU: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80", // Sydney
  CA: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80", // Canada
  MX: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&q=80", // Mexico
  BR: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80", // Brazil Rio
  AR: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=800&q=80", // Argentina
  PT: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80", // Portugal
  CH: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80", // Switzerland
  AT: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80", // Austria
  IN: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", // India Taj Mahal
  CN: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80", // China Great Wall
  EG: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80", // Egypt pyramids
  ZA: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80", // South Africa
  AE: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", // Dubai
  TR: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80", // Turkey
  ID: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", // Bali Indonesia
  VN: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80", // Vietnam
  PH: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80", // Philippines
  KR: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80", // South Korea
  NZ: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80", // New Zealand
  IE: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80", // Ireland
  HR: "https://images.unsplash.com/photo-1555990538-1e7a7210c674?w=800&q=80", // Croatia
  CZ: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80", // Czech Republic Prague
  MA: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80", // Morocco
  CO: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=80", // Colombia
  CL: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=800&q=80", // Chile
}

// Static fallback destinations (used during loading or if API fails)
const FALLBACK_DESTINATIONS: DestinationData[] = [
  { name: "Italy", countryCode: "IT", flag: "🇮🇹", flagImage: "https://flagcdn.com/it.svg", tourCount: 0, image: DESTINATION_IMAGES.IT },
  { name: "Spain", countryCode: "ES", flag: "🇪🇸", flagImage: "https://flagcdn.com/es.svg", tourCount: 0, image: DESTINATION_IMAGES.ES },
  { name: "Thailand", countryCode: "TH", flag: "🇹🇭", flagImage: "https://flagcdn.com/th.svg", tourCount: 0, image: DESTINATION_IMAGES.TH },
  { name: "Greece", countryCode: "GR", flag: "🇬🇷", flagImage: "https://flagcdn.com/gr.svg", tourCount: 0, image: DESTINATION_IMAGES.GR },
  { name: "France", countryCode: "FR", flag: "🇫🇷", flagImage: "https://flagcdn.com/fr.svg", tourCount: 0, image: DESTINATION_IMAGES.FR },
  { name: "Japan", countryCode: "JP", flag: "🇯🇵", flagImage: "https://flagcdn.com/jp.svg", tourCount: 0, image: DESTINATION_IMAGES.JP },
  { name: "United Kingdom", countryCode: "GB", flag: "🇬🇧", flagImage: "https://flagcdn.com/gb.svg", tourCount: 0, image: DESTINATION_IMAGES.GB },
  { name: "United States", countryCode: "US", flag: "🇺🇸", flagImage: "https://flagcdn.com/us.svg", tourCount: 0, image: DESTINATION_IMAGES.US },
]

// Helper to get destination image with fallback
function getDestinationImage(countryCode: string, flagImage?: string): string {
  return DESTINATION_IMAGES[countryCode] || flagImage || DEFAULT_DESTINATION_IMAGE
}

export function TopDestinationsSection() {
  const { data: destinations, isLoading, isError } = useTopDestinations(8)

  // Use API data if available, otherwise fallback
  const displayDestinations = destinations && destinations.length > 0
    ? destinations.map(dest => ({
        ...dest,
        // Use mapped image with proper fallback chain
        image: getDestinationImage(dest.countryCode, dest.flagImage)
      }))
    : FALLBACK_DESTINATIONS

  return (
    <section className="py-6 md:py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-[22px] md:px-6">

        {/* Header - Figma: gap-10px, subtitle 10px */}
        <div className="flex justify-between items-start mb-[12px] lg:mb-16">
          <div className="flex flex-col gap-[10px] lg:gap-2">
            <p className="text-[10px] md:text-sm lg:text-base font-light font-poppins text-black leading-[150%]">
              Find your next adventure in destinations
            </p>
            <h2 className="font-poppins font-light text-[22px] md:text-4xl lg:text-5xl text-black leading-[150%]">
              Top Destinations
            </h2>
          </div>

          {/* View More - Mobile - Figma: 14.2px button, 6.3px text */}
          <Link
            href="/tours"
            className="md:hidden flex items-center gap-[2.5px] group"
          >
            <span className="font-mulish font-semibold text-[6.3px] text-[#495560] group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative flex items-center justify-center bg-black rounded-[7.1px] overflow-hidden w-[14.2px] h-[14.2px] p-[3.2px]">
              <ArrowUpRight className="relative z-10 text-white w-[7.6px] h-[7.6px] transition-transform duration-300 group-hover:rotate-45" />
              <span className="absolute inset-0 bg-[#00A792] rounded-[7.1px] scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>

          {/* View More Button - Desktop */}
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

        {/* Grid - Mobile: 2 cols, 6.81px h-gap, 12.39px v-gap | Desktop: 4 cols */}
        {!isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[6.81px] gap-y-[12.39px] md:gap-6 lg:gap-10">
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
