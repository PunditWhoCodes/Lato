"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { mockTours } from "./data"
import { ToursHeader, FiltersSidebar, ToursToolbar, TourGridCard, TourListCard, NoToursFound } from "./components"
import type { SearchFilters, ViewMode, SortByType } from "./types"

export default function ToursPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Search and Filter State
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: "",
    month: "",
    year: new Date().getFullYear(),
    duration: "",
    travelStyle: "",
  })
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [maxGroupSize, setMaxGroupSize] = useState<string[]>([])
  const [selectedOperatorCountries, setSelectedOperatorCountries] = useState<string[]>([])
  const [expandedTravelStyles, setExpandedTravelStyles] = useState<string[]>([])
  const [selectedTravelStyleTypes, setSelectedTravelStyleTypes] = useState<string[]>([])
  const [selectedOperator, setSelectedOperator] = useState("all")

  // UI State
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortByType>("popular")

  useEffect(() => {
    const destination = searchParams.get("destination")
    const travelStyle = searchParams.get("travelStyle")

    if (destination) {
      setSelectedDestinations([destination])
    }
    if (travelStyle) {
      setSelectedTravelStyleTypes([travelStyle])
    }
  }, [searchParams])

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
  }

  const handleCardClick = (tourId: number, e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("a") || target.closest("[data-prevent-navigation]")) {
      return
    }
    router.push(`/tours/${tourId}`)
  }

  const handleClearFilters = () => {
    setSelectedDestinations([])
    setPriceRange([0, 50000])
    setSelectedOperator("all")
    setSelectedDuration([])
    setSelectedOperatorCountries([])
    setMaxGroupSize([])
    setSelectedTourTypes([])
    setSelectedTravelStyleTypes([])
    setExpandedTravelStyles([])
  }

  // Filter Tours
  const filteredTours = mockTours.filter((tour) => {
    const matchesSearch =
      !searchFilters.destination ||
      tour.title.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
      tour.company.toLowerCase().includes(searchFilters.destination.toLowerCase())

    const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(tour.destination)
    const matchesTravelStyle =
      selectedTravelStyleTypes.length === 0 || selectedTravelStyleTypes.some((type) => tour.travelStyle === type)
    const matchesOperator = selectedOperator === "all" || tour.company === selectedOperator
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1]
    const matchesOperatorCountry =
      selectedOperatorCountries.length === 0 || selectedOperatorCountries.includes(tour.companyCountry)

    const matchesSearchBarDuration =
      !searchFilters.duration ||
      searchFilters.duration === "all" ||
      (() => {
        const tourDays = Number.parseInt(tour.duration)
        switch (searchFilters.duration) {
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

    const matchesDuration =
      selectedDuration.length === 0 ||
      selectedDuration.some((duration) => {
        const tourDays = Number.parseInt(tour.duration)
        switch (duration) {
          case "2-3 days":
            return tourDays >= 2 && tourDays <= 3
          case "4-7 days":
            return tourDays >= 4 && tourDays <= 7
          case "1-2 weeks":
            return tourDays >= 8 && tourDays <= 14
          case "2+ weeks":
            return tourDays > 14
          default:
            return false
        }
      })
    const matchesGroupSize = maxGroupSize.length === 0 || maxGroupSize.some((size) => tour.groupSize === size)
    const matchesTourType = selectedTourTypes.length === 0 || selectedTourTypes.some((type) => tour.tourType === type)

    return (
      matchesSearch &&
      matchesDestination &&
      matchesTravelStyle &&
      matchesOperator &&
      matchesPrice &&
      matchesSearchBarDuration &&
      matchesDuration &&
      matchesOperatorCountry &&
      matchesGroupSize &&
      matchesTourType
    )
  })

  // Sort Tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popular":
      default:
        return b.reviews - a.reviews
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <ToursHeader onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <FiltersSidebar
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            selectedDestinations={selectedDestinations}
            setSelectedDestinations={setSelectedDestinations}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedTourTypes={selectedTourTypes}
            setSelectedTourTypes={setSelectedTourTypes}
            maxGroupSize={maxGroupSize}
            setMaxGroupSize={setMaxGroupSize}
            selectedOperatorCountries={selectedOperatorCountries}
            setSelectedOperatorCountries={setSelectedOperatorCountries}
            expandedTravelStyles={expandedTravelStyles}
            setExpandedTravelStyles={setExpandedTravelStyles}
            selectedTravelStyleTypes={selectedTravelStyleTypes}
            setSelectedTravelStyleTypes={setSelectedTravelStyleTypes}
            tours={mockTours}
          />

          {/* Tours Grid/List */}
          <div className="flex-1 min-w-0">
            <ToursToolbar
              totalResults={sortedTours.length}
              totalTours={mockTours.length}
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {sortedTours.map((tour) => (
                  <TourGridCard key={tour.id} tour={tour} onClick={handleCardClick} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {sortedTours.map((tour) => (
                  <TourListCard key={tour.id} tour={tour} onClick={handleCardClick} />
                ))}
              </div>
            )}

            {sortedTours.length === 0 && <NoToursFound onClearFilters={handleClearFilters} />}

            {/* Load More */}
            {sortedTours.length > 0 && (
              <div className="text-center mt-8 sm:mt-12">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Load More Tours
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
