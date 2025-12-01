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
          <p className="text-base md:text-lg font-poppins text-text-muted max-w-2xl mx-auto">
            Discover extraordinary experiences curated by our trusted local partners
          </p>
          {filters.destination || filters.duration || filters.travelStyle ? (
            <p className="text-sm font-mulish text-primary font-semibold mt-3">
              Showing top {topTours.length} featured tours based on your filters
            </p>
          ) : null}
        </div>

        {topTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted font-poppins text-lg mb-4">
              No tours found matching your criteria
            </p>
            <p className="text-sm font-mulish text-text-muted">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {topTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="rounded-4xl bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg font-montserrat font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            asChild
          >
            <Link href="/tours">
              Explore All Tours
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
