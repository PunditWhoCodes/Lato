"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight, Loader2, AlertCircle } from "lucide-react"
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
      <section className="py-8 sm:py-10 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-medium mb-3 shadow-lg">
              <Award className="w-3 h-3" />
              Featured Experiences
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">
              Handpicked Adventures
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Loading featured tours...</p>
          </div>
        </div>
      </section>
    )
  }

  // Error State
  if (isError) {
    return (
      <section className="py-8 sm:py-10 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-medium mb-3 shadow-lg">
              <Award className="w-3 h-3" />
              Featured Experiences
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">
              Handpicked Adventures
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-lg text-muted-foreground">Unable to load featured tours</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-medium mb-3 shadow-lg">
            <Award className="w-3 h-3" />
            Featured Experiences
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">
            Handpicked Adventures
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Discover extraordinary experiences curated by our trusted local partners
          </p>
          {filters.destination || filters.duration || filters.travelStyle ? (
            <p className="text-sm text-primary font-semibold mt-2">
              Showing top {topTours.length} featured tours based on your filters
            </p>
          ) : null}
        </div>

        {topTours.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-base sm:text-lg mb-4">
              No tours found matching your criteria
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {topTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

        <div className="text-center mt-6 sm:mt-8">
          <Button
            size="lg"
            className="rounded-full px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-linear-to-r from-primary to-primary"
            asChild
          >
            <Link href="/tours">
              Explore All Tours
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
