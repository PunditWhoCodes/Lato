"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ChevronDown, LayoutGrid, List, SlidersHorizontal, X, Loader2, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ListingHero } from "./listing-hero"
import { AppliedFilters } from "./applied-filters"
import { ListingFiltersSidebar } from "./listing-filters-sidebar"
import { ListingTourCard, type TourCardData } from "./listing-tour-card"
import { ListingPagination } from "./listing-pagination"
import { useMarketplaceTrips, mapUserTripToTour } from "../api"
import type { Tour } from "@/types"
import type { APIUserTrip } from "../api"

const ITEMS_PER_PAGE = 12
// Default slider range - filters only apply when user changes from these defaults
const DEFAULT_PRICE_RANGE: [number, number] = [2000, 12000]

/**
 * Parse duration string to number of days
 * Examples: "5 Days", "7 days", "10 Days / 9 Nights", "Multiple days"
 */
function parseDurationDays(duration: string): number | null {
  if (!duration) return null
  const match = duration.match(/(\d+)\s*day/i)
  return match ? parseInt(match[1], 10) : null
}

/**
 * Check if tour matches group type filter
 */
function matchesGroupType(tour: TourCardData, selectedGroups: string[]): boolean {
  if (selectedGroups.length === 0) return true

  const groupSize = tour.groupSize?.toLowerCase() || ""
  const hasFamilyPlan = tour.hasFamilyPlan

  return selectedGroups.some(group => {
    const g = group.toLowerCase()
    if (g === "solo") return groupSize.includes("solo") || groupSize.includes("1")
    if (g === "couple") return groupSize.includes("couple") || groupSize.includes("2")
    if (g === "family") return hasFamilyPlan || groupSize.includes("family")
    if (g === "group") return groupSize.includes("group") || groupSize.includes("small")
    if (g === "private") return groupSize.includes("private")
    return false
  })
}

/**
 * Map Tour from API to TourCardData format for the listing card
 */
function mapTourToCardData(tour: Tour): TourCardData {
  return {
    id: tour.id,
    uuid: tour.uuid,
    image: tour.image || "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
    title: tour.title,
    subtitle: tour.companyCountry || tour.location,
    location: tour.location,
    rating: Number(tour.rating?.toFixed(1)) || 4.5,
    groupSize: tour.groupSize || "Small Group",
    originalPrice: tour.originalPrice,
    price: tour.price || 0,
    duration: tour.duration || "Multiple days",
    hasTransport: true,
    hasFamilyPlan: tour.tourType === "Group Tour",
  }
}

interface AppliedFilter {
  id: string
  label: string
  type: string
}

// Country code to name mapping
const COUNTRY_NAMES: Record<string, string> = {
  US: "United States",
  IT: "Italy",
  FR: "France",
  ES: "Spain",
  TH: "Thailand",
  GR: "Greece",
  JP: "Japan",
  GB: "United Kingdom",
  NL: "Netherlands",
  DE: "Germany",
  PE: "Peru",
  NP: "Nepal",
  AU: "Australia",
  CA: "Canada",
  MX: "Mexico",
  BR: "Brazil",
  AR: "Argentina",
  PT: "Portugal",
  CH: "Switzerland",
  AT: "Austria",
}

export function ListingClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get countries filter from URL (e.g., ?countries=US)
  const countriesParam = searchParams.get("countries") || ""

  // Get destination from URL (legacy param) or derive from countries
  const destinationParam = searchParams.get("destination") || ""

  // Get initial page from URL (e.g., ?page=2)
  const pageParam = searchParams.get("page")
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1

  // View mode state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Sort state
  const [sortBy, setSortBy] = useState("popular")

  // Pagination state - initialize from URL param
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Derive initial destination name from countries param or destination param
  const initialDestination = countriesParam
    ? (COUNTRY_NAMES[countriesParam] || countriesParam)
    : (destinationParam || "All Destinations")

  // Filter states
  const [selectedDestination, setSelectedDestination] = useState(initialDestination)
  const [priceType, setPriceType] = useState<"person" | "day">("person")
  const [priceRange, setPriceRange] = useState([2000, 12000])
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [selectedBestFor, setSelectedBestFor] = useState<string[]>([])
  const [selectedTourStyle, setSelectedTourStyle] = useState<string[]>([])
  const [operatorSearch, setOperatorSearch] = useState("")
  const [tourStyleRadio, setTourStyleRadio] = useState("")
  const [durationMin, setDurationMin] = useState("")
  const [durationMax, setDurationMax] = useState("")
  const [expandedTravelStyles, setExpandedTravelStyles] = useState<string[]>([])
  const [selectedTravelStyleTypes, setSelectedTravelStyleTypes] = useState<string[]>([])
  // Initialize with current month/year, no pre-selected days
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.toLocaleString('default', { month: 'long' }))
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [dateType, setDateType] = useState<"start" | "end">("start")
  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)

  // Mobile filters state
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Reset page when countries filter changes
  useEffect(() => {
    setCurrentPage(1)
    // Update destination name when countries param changes
    if (countriesParam) {
      setSelectedDestination(COUNTRY_NAMES[countriesParam] || countriesParam)
    } else if (!destinationParam) {
      setSelectedDestination("All Destinations")
    }
  }, [countriesParam, destinationParam])

  // Fetch tours from API with country filter
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useMarketplaceTrips({
    page: currentPage,
    step: ITEMS_PER_PAGE,
    sample: true,
    countries: countriesParam || undefined, // Filter by country if specified
  })

  // Map API UserTrips to Tour format, then to TourCardData
  const apiTours = useMemo(() => {
    if (!apiResponse?.data) return []
    return apiResponse.data.map((userTrip: APIUserTrip) => {
      try {
        const tour = mapUserTripToTour(userTrip)
        return mapTourToCardData(tour)
      } catch (err) {
        console.error("Error mapping tour:", err)
        return null
      }
    }).filter((tour): tour is TourCardData => tour !== null)
  }, [apiResponse])

  // Derive display country name from API data or fallback to mapping
  const displayCountryName = useMemo(() => {
    if (!countriesParam) return selectedDestination || "All Destinations"

    // Try to get country name from first tour's location
    if (apiTours.length > 0 && apiTours[0].location) {
      return apiTours[0].location
    }

    // Fallback to mapping or the param itself
    return COUNTRY_NAMES[countriesParam] || countriesParam
  }, [countriesParam, apiTours, selectedDestination])

  const appliedFilters: AppliedFilter[] = useMemo(() => {
    const filters: AppliedFilter[] = []

    // Price range filter (show if different from default)
    if (priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1]) {
      filters.push({
        id: "priceRange",
        label: `$${priceRange[0].toLocaleString()} - $${priceRange[1].toLocaleString()}`,
        type: "priceRange",
      })
    }

    // Duration filter
    if (durationMin || durationMax) {
      const label = durationMin && durationMax
        ? `${durationMin} - ${durationMax} days`
        : durationMin
        ? `Min ${durationMin} days`
        : `Max ${durationMax} days`
      filters.push({
        id: "duration",
        label,
        type: "duration",
      })
    }

    if (startDate !== null) {
      const suffix = startDate === 1 || startDate === 21 || startDate === 31 ? "st"
        : startDate === 2 || startDate === 22 ? "nd"
        : startDate === 3 || startDate === 23 ? "rd"
        : "th"
      filters.push({
        id: "startDate",
        label: `Start: ${selectedMonth} ${startDate}${suffix}, ${selectedYear}`,
        type: "startDate",
      })
    }

    if (endDate !== null) {
      const suffix = endDate === 1 || endDate === 21 || endDate === 31 ? "st"
        : endDate === 2 || endDate === 22 ? "nd"
        : endDate === 3 || endDate === 23 ? "rd"
        : "th"
      filters.push({
        id: "endDate",
        label: `End: ${selectedMonth} ${endDate}${suffix}, ${selectedYear}`,
        type: "endDate",
      })
    }

    selectedDays.forEach((day) => {
      const suffix = day === 1 || day === 21 || day === 31 ? "st"
        : day === 2 || day === 22 ? "nd"
        : day === 3 || day === 23 ? "rd"
        : "th"
      filters.push({
        id: day.toString(),
        label: `Departs ${selectedMonth} ${day}${suffix}`,
        type: "day",
      })
    })

    selectedGroup.forEach((group) => {
      filters.push({ id: group, label: group, type: "group" })
    })

    selectedBestFor.forEach((bf) => {
      filters.push({ id: bf, label: bf, type: "bestFor" })
    })

    selectedTourStyle.forEach((style) => {
      filters.push({ id: style, label: style, type: "tourStyle" })
    })

    selectedTravelStyleTypes.forEach((type) => {
      filters.push({ id: type, label: type, type: "travelStyleType" })
    })

    return filters
  }, [priceRange, durationMin, durationMax, startDate, endDate, selectedMonth, selectedYear, selectedDays, selectedGroup, selectedBestFor, selectedTourStyle, selectedTravelStyleTypes])

  // Remove individual filter
  const handleRemoveFilter = (id: string, type: string) => {
    switch (type) {
      case "priceRange":
        setPriceRange([...DEFAULT_PRICE_RANGE])
        break
      case "duration":
        setDurationMin("")
        setDurationMax("")
        break
      case "startDate":
        setStartDate(null)
        break
      case "endDate":
        setEndDate(null)
        break
      case "day":
        setSelectedDays(selectedDays.filter((d) => d.toString() !== id))
        break
      case "group":
        setSelectedGroup(selectedGroup.filter((g) => g !== id))
        break
      case "bestFor":
        setSelectedBestFor(selectedBestFor.filter((b) => b !== id))
        break
      case "tourStyle":
        setSelectedTourStyle(selectedTourStyle.filter((s) => s !== id))
        break
      case "travelStyleType":
        setSelectedTravelStyleTypes(selectedTravelStyleTypes.filter((t) => t !== id))
        break
    }
  }

  // Clear all filters
  const handleClearAllFilters = () => {
    setPriceRange([...DEFAULT_PRICE_RANGE])
    setSelectedGroup([])
    setSelectedBestFor([])
    setSelectedTourStyle([])
    setSelectedTravelStyleTypes([])
    setSelectedDays([])
    setDurationMin("")
    setDurationMax("")
    setTourStyleRadio("")
    setStartDate(null)
    setEndDate(null)
    setCurrentPage(1)
  }

  // Reset all filters
  const handleResetFilters = () => {
    handleClearAllFilters()
    setPriceRange([...DEFAULT_PRICE_RANGE])
    setPriceType("person")
    setExpandedTravelStyles([])
    setOperatorSearch("")
    setStartDate(null)
    setEndDate(null)
  }

  // Apply filters
  const handleApplyFilters = () => {
    setCurrentPage(1)
    setShowMobileFilters(false)
  }

  // Handle tour card click - use UUID for navigation
  const handleCardClick = (tour: TourCardData) => {
    // Use UUID if available (from API), otherwise fall back to numeric id
    const routeId = tour.uuid || tour.id.toString()
    router.push(`/tours/${routeId}`)
  }

  // Handle page change - maintain country filter in URL
  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    // Update URL with page and maintain countries filter
    const params = new URLSearchParams()
    if (countriesParam) params.set("countries", countriesParam)
    if (page > 1) params.set("page", String(page))

    const queryString = params.toString()
    router.replace(`/tours${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }

  // Check if price range has been changed from default
  const isPriceFilterActive = priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1]

  // Filter tours based on all selected filters
  const filteredTours = useMemo(() => {
    return apiTours.filter(tour => {
      // Price filter - only apply if user changed the slider
      if (isPriceFilterActive) {
        if (tour.price < priceRange[0] || tour.price > priceRange[1]) {
          return false
        }
      }

      // Duration filter
      if (durationMin || durationMax) {
        const tourDays = parseDurationDays(tour.duration)
        if (tourDays !== null) {
          if (durationMin && tourDays < parseInt(durationMin, 10)) return false
          if (durationMax && tourDays > parseInt(durationMax, 10)) return false
        }
      }

      // Group type filter
      if (!matchesGroupType(tour, selectedGroup)) {
        return false
      }

      // Tour style filter (Guided Tour, Self-Guided, etc.)
      if (selectedTourStyle.length > 0) {
        const tourTitle = tour.title?.toLowerCase() || ""
        const tourSubtitle = tour.subtitle?.toLowerCase() || ""
        const hasMatch = selectedTourStyle.some(style => {
          const s = style.toLowerCase()
          return tourTitle.includes(s) || tourSubtitle.includes(s)
        })
        if (!hasMatch) return false
      }

      // Travel style types filter (Adventure, Cultural, etc.)
      if (selectedTravelStyleTypes.length > 0) {
        const tourTitle = tour.title?.toLowerCase() || ""
        const tourLocation = tour.location?.toLowerCase() || ""
        const hasMatch = selectedTravelStyleTypes.some(type => {
          const t = type.toLowerCase()
          return tourTitle.includes(t) || tourLocation.includes(t)
        })
        if (!hasMatch) return false
      }

      return true
    })
  }, [apiTours, isPriceFilterActive, priceRange, durationMin, durationMax, selectedGroup, selectedTourStyle, selectedTravelStyleTypes])

  // Sort filtered tours
  const sortedTours = useMemo(() => {
    const sorted = [...filteredTours]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "popular":
      default:
        return sorted.sort((a, b) => b.rating - a.rating)
    }
  }, [sortBy, filteredTours])

  // Total count - use filtered count for display, API count for pagination
  const apiTotalCount = apiResponse?.count || 0
  const filteredCount = sortedTours.length
  const hasActiveFilters = appliedFilters.length > 0

  // When filters are active, show filtered count; otherwise show API total
  const displayCount = hasActiveFilters ? filteredCount : apiTotalCount
  const totalPages = hasActiveFilters
    ? Math.ceil(filteredCount / ITEMS_PER_PAGE)
    : Math.ceil(apiTotalCount / ITEMS_PER_PAGE)

  // Tours to display
  const paginatedTours = sortedTours

  const getSortLabel = () => {
    switch (sortBy) {
      case "price-low":
        return "Price: Low to High"
      case "price-high":
        return "Price: High to Low"
      case "rating":
        return "Highest Rated"
      case "popular":
      default:
        return "Most Popular First"
    }
  }

  return (
    <>
      {/* Hero Section */}
      <ListingHero destination={displayCountryName} tourCount={displayCount} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Applied Filters + Filter Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0">
            {/* Applied Filters */}
            <AppliedFilters
              filters={appliedFilters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-[#E5E5E5] rounded-[6px] text-[13px] font-medium text-[#495560]"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setShowMobileFilters(false)}
                />
                <div className="absolute right-0 top-0 h-full w-full max-w-[300px] bg-white overflow-y-auto">
                  <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b">
                    <h2 className="font-semibold text-[15px]">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <ListingFiltersSidebar
                      selectedDestination={selectedDestination}
                      setSelectedDestination={setSelectedDestination}
                      priceType={priceType}
                      setPriceType={setPriceType}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      selectedGroup={selectedGroup}
                      setSelectedGroup={setSelectedGroup}
                      selectedBestFor={selectedBestFor}
                      setSelectedBestFor={setSelectedBestFor}
                      selectedTourStyle={selectedTourStyle}
                      setSelectedTourStyle={setSelectedTourStyle}
                      operatorSearch={operatorSearch}
                      setOperatorSearch={setOperatorSearch}
                      tourStyleRadio={tourStyleRadio}
                      setTourStyleRadio={setTourStyleRadio}
                      durationMin={durationMin}
                      setDurationMin={setDurationMin}
                      durationMax={durationMax}
                      setDurationMax={setDurationMax}
                      expandedTravelStyles={expandedTravelStyles}
                      setExpandedTravelStyles={setExpandedTravelStyles}
                      selectedTravelStyleTypes={selectedTravelStyleTypes}
                      setSelectedTravelStyleTypes={setSelectedTravelStyleTypes}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      selectedDays={selectedDays}
                      setSelectedDays={setSelectedDays}
                      dateType={dateType}
                      setDateType={setDateType}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      onApply={handleApplyFilters}
                      onReset={handleResetFilters}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block">
              <ListingFiltersSidebar
                selectedDestination={selectedDestination}
                setSelectedDestination={setSelectedDestination}
                priceType={priceType}
                setPriceType={setPriceType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                selectedBestFor={selectedBestFor}
                setSelectedBestFor={setSelectedBestFor}
                selectedTourStyle={selectedTourStyle}
                setSelectedTourStyle={setSelectedTourStyle}
                operatorSearch={operatorSearch}
                setOperatorSearch={setOperatorSearch}
                tourStyleRadio={tourStyleRadio}
                setTourStyleRadio={setTourStyleRadio}
                durationMin={durationMin}
                setDurationMin={setDurationMin}
                durationMax={durationMax}
                setDurationMax={setDurationMax}
                expandedTravelStyles={expandedTravelStyles}
                setExpandedTravelStyles={setExpandedTravelStyles}
                selectedTravelStyleTypes={selectedTravelStyleTypes}
                setSelectedTravelStyleTypes={setSelectedTravelStyleTypes}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                dateType={dateType}
                setDateType={setDateType}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
              />
            </div>
          </div>

          {/* Right Column - Tours Grid/List */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Results Count */}
              <p className="text-[#1C1B1F] text-[14px] font-medium">
                {isLoading ? "Loading..." : `${displayCount} Results`}
              </p>

              {/* Sort & View Toggle */}
              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#495560]">Popularity:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center justify-between gap-2 w-[180px] px-3 py-2 bg-white border border-[#E5E5E5] rounded-[6px] text-[13px] text-[#1C1B1F] hover:bg-[#F7F7F7] transition-colors">
                        <span>{getSortLabel()}</span>
                        <ChevronDown className="w-4 h-4 text-[#495560]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[180px] bg-white border border-[#E5E5E5] rounded-[6px] shadow-lg p-0">
                      <DropdownMenuItem
                        onClick={() => setSortBy("popular")}
                        className="text-[13px] cursor-pointer hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] px-3 py-2 rounded-none"
                      >
                        Most Popular First
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("rating")}
                        className="text-[13px] cursor-pointer hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] px-3 py-2 rounded-none"
                      >
                        Highest Rated
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("price-low")}
                        className="text-[13px] cursor-pointer hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] px-3 py-2 rounded-none"
                      >
                        Price: Low to High
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSortBy("price-high")}
                        className="text-[13px] cursor-pointer hover:bg-[#F7F7F7] focus:bg-[#F7F7F7] px-3 py-2 rounded-none"
                      >
                        Price: High to Low
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 border border-[#E5E5E5] rounded-[6px] p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-[4px] transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#00A792] text-white"
                        : "text-[#495560] hover:bg-[#F7F7F7]"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-[4px] transition-colors ${
                      viewMode === "list"
                        ? "bg-[#00A792] text-white"
                        : "text-[#495560] hover:bg-[#F7F7F7]"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-[#00A792] mb-4" />
                <p className="text-[#495560] text-[14px]">Loading tours...</p>
              </div>
            )}

            {/* Error State */}
            {isError && !isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-[#1C1B1F] font-semibold text-[16px] mb-2">Unable to load tours</h3>
                <p className="text-[#495560] text-[14px] mb-4 text-center max-w-md">
                  {(error as Error)?.message || "We couldn't load the tours. Please try again."}
                </p>
                <Button onClick={() => refetch()} className="bg-[#00A792] hover:bg-[#008577]">
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && paginatedTours.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-[#495560] text-[14px]">No tours found. Try adjusting your filters.</p>
              </div>
            )}

            {/* Tours Grid/List */}
            {!isLoading && !isError && paginatedTours.length > 0 && (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {paginatedTours.map((tour) => (
                      <ListingTourCard
                        key={tour.uuid || tour.id}
                        tour={tour}
                        viewMode="grid"
                        onClick={() => handleCardClick(tour)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {paginatedTours.map((tour) => (
                      <ListingTourCard
                        key={tour.uuid || tour.id}
                        tour={tour}
                        viewMode="list"
                        onClick={() => handleCardClick(tour)}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <ListingPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
