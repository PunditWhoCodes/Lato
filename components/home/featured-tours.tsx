"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight, ArrowUpRight, Loader2, AlertCircle } from "lucide-react"
import { TourCard } from "./tour-card"
import type { SearchFilters } from "@/types"
import { useToursData } from "@/app/tours/hooks/useToursData"

interface FeaturedToursProps {
  filters: SearchFilters
}

export function FeaturedTours({ filters }: FeaturedToursProps) {
  // Fetch tours from API
  const { tours: apiTours, isLoading, isError } = useToursData({
    page: 1,
    itemsPerPage: 100,
    countries: "US,FR,JP,GR,IS,MA,ID", // Featured countries
  })
  // Filter tours based on search criteria (matches tours page logic)
  const filteredTours = useMemo(() => {
    if (!apiTours || apiTours.length === 0) return []

    return apiTours.filter((tour) => {
      // Destination/Search filter (case-insensitive)
      const matchesSearch =
        !filters.destination ||
        tour.title.toLowerCase().includes(filters.destination.toLowerCase()) ||
        tour.location.toLowerCase().includes(filters.destination.toLowerCase()) ||
        tour.company.toLowerCase().includes(filters.destination.toLowerCase())

      // Travel style filter (case-insensitive, partial match)
      const matchesTravelStyle =
        !filters.travelStyle ||
        filters.travelStyle === "all" ||
        tour.travelStyle.toLowerCase().includes(filters.travelStyle.toLowerCase())

      // Duration filter (matches tours page pattern)
      const matchesDuration =
        !filters.duration ||
        filters.duration === "all" ||
        (() => {
          const tourDays = Number.parseInt(tour.duration)
          switch (filters.duration) {
            case "2-3-days":
              return tourDays >= 2 && tourDays <= 3
            case "4-7-days":
              return tourDays >= 4 && tourDays <= 7
            case "1-2-weeks":
              return tourDays >= 8 && tourDays <= 14
            case "2-weeks-plus":
              return tourDays > 14
            default:
              return true
          }
        })()

      return matchesSearch && matchesTravelStyle && matchesDuration
    })
  }, [apiTours, filters])

  // Take only top 6 tours for featured section (sorted by rating)
  const topTours = useMemo(() => {
    return [...filteredTours]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
  }, [filteredTours])

  // Loading State
  if (isLoading) {
    return (
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-mulish font-semibold mb-4">
              <Award className="w-4 h-4" />
              Featured Experiences
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Handpicked Adventures
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-poppins text-text-muted">Loading featured tours...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error State
  if (isError) {
    return (
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-mulish font-semibold mb-4">
              <Award className="w-4 h-4" />
              Featured Experiences
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
              Handpicked Adventures
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-accent mb-4" />
            <p className="text-lg font-poppins text-text-muted">Unable to load featured tours</p>
            <p className="text-sm font-mulish text-text-muted mt-2">Please try again later</p>
          </div>
        </div>
      </section>
    )
  }

  // Show only top 3 tours for Figma design
  const displayTours = topTours.slice(0, 3)

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-16 gap-6">
          {/* Left Side - Title */}
          <div className="flex flex-col gap-4 lg:gap-[43.35px]">
            <p className="font-poppins font-light text-base lg:text-[18.85px] text-black">
              Tour Packages
            </p>
            <h2 className="font-poppins font-light text-3xl md:text-4xl lg:text-[56.54px] lg:leading-[85px] text-black max-w-[592px]">
              Explore Our Exclusive Tour Packages
            </h2>
          </div>

          {/* Right Side - View More Button */}
          {/* <Link
            href="/tours"
            className="hidden lg:flex items-center gap-[7.54px] group"
          >
            <span className="text-[#495560] text-base group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative flex items-center justify-center bg-black rounded-full overflow-hidden" style={{ width: '42.4px', height: '42.4px', padding: '9.42px' }}>
              <ArrowUpRight className="relative z-10 text-white transition-transform duration-300 group-hover:rotate-45" style={{ width: '22.62px', height: '22.62px' }} />

              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link> */}
        </div>

        {/* Tour Cards */}
        {displayTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted font-poppins text-lg mb-4">
              No tours found matching your criteria
            </p>
            <p className="text-sm font-mulish text-text-muted">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-[19.22px]">
            {displayTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} variant="featured" />
            ))}
          </div>
        )}

        {/* Mobile View More Button */}
        <div className="lg:hidden text-center mt-8">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 group"
          >
            <span className="font-mulish font-semibold text-base text-[#495560]">
              View More
            </span>
            <div className="relative flex items-center justify-center w-10 h-10 bg-black rounded-full overflow-hidden p-2">
              <ArrowUpRight className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-45" />

              {/* Radial expanding hover overlay */}
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
