"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
  SlidersHorizontal,
  Grid3X3,
  List,
  Building2,
  ChevronDown,
  Check,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { ChatButton } from "@/components/chat-button"
import { SearchBar } from "@/components/home/search-bar"
import { tours } from "@/lib/data"
import type { Tour, SearchFilters } from "@/types"

const mockTours: Tour[] = tours

export default function ToursPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: "",
    month: "",
    year: new Date().getFullYear(),
    duration: "",
    travelStyle: "",
  })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDestination, setSelectedDestination] = useState("all")
  const [selectedTravelStyle, setSelectedTravelStyle] = useState("all")
  const [selectedOperator, setSelectedOperator] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState<string[]>([])
  const [selectedOperatorCountry, setSelectedOperatorCountry] = useState("all")
  const [maxGroupSize, setMaxGroupSize] = useState<string[]>([])
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showFilters, setShowFilters] = useState(false)
  const [chatResponses, setChatResponses] = useState<Record<string, string>>({})
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState("popular")
  const [currentStep, setCurrentStep] = useState(0)
  const [expandedTravelStyles, setExpandedTravelStyles] = useState<string[]>([])
  const [selectedTravelStyleTypes, setSelectedTravelStyleTypes] = useState<string[]>([])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedOperatorCountries, setSelectedOperatorCountries] = useState<string[]>([])

  const chatQuestions = [
    {
      id: "destination",
      question: "Where would you like to travel?",
      type: "select",
      options: ["Europe", "Asia", "Americas", "Africa", "Oceania", "I'm flexible"],
    },
    {
      id: "travelStyle",
      question: "What type of experience are you looking for?",
      type: "select",
      options: ["Adventure", "Cultural", "Relaxation", "Nature", "Family-friendly", "Food & Drink"],
    },
    {
      id: "duration",
      question: "How long is your ideal trip?",
      type: "select",
      options: ["Half day (2-4 hours)", "Full day (6-8 hours)", "Multi-day (2-3 days)", "Week-long", "I'm flexible"],
    },
    {
      id: "budget",
      question: "What's your budget per person?",
      type: "select",
      options: [
        "Under €50",
        "€50-€100",
        "€100-€200",
        "€200-€500",
        "€500-€1000",
        "€1000-€5000",
        "€5000+",
        "I'm flexible",
      ],
    },
    {
      id: "groupSize",
      question: "How many people will be traveling?",
      type: "select",
      options: ["Just me", "2 people", "3-5 people", "6-10 people", "Large group (10+)"],
    },
  ]

  useEffect(() => {
    const destination = searchParams.get("destination")
    const travelStyle = searchParams.get("travelStyle")

    if (destination) {
      setSelectedDestination(destination)
    }
    if (travelStyle) {
      setSelectedTravelStyle(travelStyle)
    }
  }, [searchParams])

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
    // You can add additional search logic here if needed
  }

  // Mock user - in real app this would come from auth context
  const user = undefined

  const categories = ["Cultural", "Food & Drink", "Adventure", "Photography", "Nature"]

  const destinations = [
    "France",
    "Italy",
    "Spain",
    "Greece",
    "Portugal",
    "Germany",
    "Netherlands",
    "United Kingdom",
    "Japan",
    "Thailand",
    "Indonesia",
    "Vietnam",
    "China",
    "India",
    "South Korea",
    "Philippines",
    "United States",
    "Canada",
    "Mexico",
    "Brazil",
    "Argentina",
    "Peru",
    "Chile",
    "Costa Rica",
    "Egypt",
    "Morocco",
    "South Africa",
    "Kenya",
    "Tanzania",
    "Madagascar",
    "Australia",
    "New Zealand",
    "Fiji",
  ]

  const travelStyles = [
    {
      name: "Adventure",
      types: [
        "Bungee Jumping",
        "Hiking & Trekking",
        "Mountain Biking",
        "Rock Climbing",
        "Skydiving",
        "White Water Rafting",
      ],
    },
    {
      name: "Cultural",
      types: ["Architecture", "Art & Museums", "Festivals", "Food & Wine", "Historical Tours", "Local Experiences"],
    },
    {
      name: "Family",
      types: ["Beach Resorts", "City Breaks", "Educational Tours", "Kid-Friendly", "Multi-Generation", "Theme Parks"],
    },
    {
      name: "Nature",
      types: ["Bird Watching", "Camping", "Eco Tours", "National Parks", "Photography Tours", "Wildlife Safari"],
    },
    {
      name: "Relaxation",
      types: ["Beach Holidays", "Cruise Ships", "Luxury Resorts", "Spa Retreats", "Wellness Tours", "Yoga Retreats"],
    },
  ]

  const operators = [
    "Bali Explorer Co.",
    "Tokyo Taste Tours",
    "Greek Island Adventures",
    "Wild Amazon Tours",
    "Marrakech Flavors",
    "Arctic Adventures",
  ]

  const durations = ["2-3 days", "4-7 days", "1-2 weeks", "2+ weeks"]

  const getOperatorCountries = () => {
    const allCountries = Array.from(new Set(mockTours.map((tour) => tour.companyCountry))).sort()

    if (selectedDestinations.length > 0) {
      const destinationCountries = mockTours
        .filter((tour) => selectedDestinations.includes(tour.destination))
        .map((tour) => tour.companyCountry)
      const uniqueDestinationCountries = Array.from(new Set(destinationCountries))
      const otherCountries = allCountries.filter((country) => !uniqueDestinationCountries.includes(country))
      return [...uniqueDestinationCountries, ...otherCountries]
    }

    return allCountries
  }

  const groupSizes = ["1-4 people", "5-8 people", "9-12 people", "13-20 people", "20+ people"]

  const tourTypes = ["Group Tour", "Private Tour"]

  const filteredTours = mockTours.filter((tour) => {
    const matchesSearch =
      !searchFilters.destination ||
      tour.title.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
      tour.company.toLowerCase().includes(searchFilters.destination.toLowerCase())

    const matchesCategory = selectedCategory === "all" || tour.category === selectedCategory
    const matchesDestination = selectedDestinations.length === 0 || selectedDestinations.includes(tour.destination)
    const matchesTravelStyle =
      selectedTravelStyleTypes.length === 0 || selectedTravelStyleTypes.some((type) => tour.travelStyle === type)
    const matchesOperator = selectedOperator === "all" || tour.company === selectedOperator
    const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1]
    const matchesOperatorCountry =
      selectedOperatorCountries.length === 0 || selectedOperatorCountries.includes(tour.companyCountry)

    // Match duration from SearchBar filters
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
      matchesCategory &&
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

  const CompanyHoverCard = ({ tour, children }: { tour: any; children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
        >
          {children}
        </div>
        {isVisible && (
          <div
            className="fixed z-50 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 pointer-events-none"
            style={{
              left: position.x - 192, // Center the card (384px / 2 = 192px)
              top: position.y,
              transform: "translateY(-100%)",
            }}
          >
            <div className="space-y-4">
              {/* Header with logo, name, and country */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Company logo placeholder */}
                  <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">{tour.company}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                  <span className="text-lg">{tour.companyFlag}</span>
                  <span className="text-sm font-medium text-gray-600">{tour.companyCountry}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{tour.location}</span>
              </div>

              {/* Expertise badges */}
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  Cooking Master
                </Badge>
                <Badge variant="secondary" className="text-xs font-medium">
                  Market Expert
                </Badge>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                Traditional {tour.companyCountry.toLowerCase()} cooking experts sharing authentic recipes and market
                secrets.
              </p>

              {/* Statistics grid */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-sm">{tour.rating}</span>
                  <span className="text-xs text-gray-500">({tour.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">6 years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">10 tours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600">3 languages</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <Link
                  href={`/companies/${tour.companyId}`}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors pointer-events-auto text-center"
                >
                  View Profile
                </Link>
                <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg transition-colors pointer-events-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const handleCardClick = (tourId: number, e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("a") || target.closest("[data-prevent-navigation]")) {
      return
    }
    router.push(`/tours/${tourId}`)
  }

  const handleChatResponse = (response: string) => {
    const currentQuestion = chatQuestions[currentStep]
    setChatResponses((prev) => ({ ...prev, [currentQuestion.id]: response }))

    if (currentStep < chatQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Apply filters based on responses
      applyRecommendedFilters()
    }
  }

  const applyRecommendedFilters = () => {
    if (chatResponses.travelStyle && chatResponses.travelStyle !== "I'm flexible") {
      setSelectedTravelStyle(chatResponses.travelStyle)
    }

    if (chatResponses.budget) {
      const budgetMap: Record<string, [number, number]> = {
        "Under €50": [0, 50],
        "€50-€100": [50, 100],
        "€100-€200": [100, 200],
        "€200-€500": [200, 500],
        "€500-€1000": [500, 1000],
        "€1000-€5000": [1000, 5000],
        "€5000+": [5000, 50000],
      }
      const range = budgetMap[chatResponses.budget]
      if (range) {
        setPriceRange(range)
      }
    }

    setTimeout(() => {
      setIsChatOpen(false)
      setCurrentStep(0)
      setChatResponses({})
    }, 2000)
  }

  const resetChat = () => {
    setCurrentStep(0)
    setChatResponses({})
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5 py-6 sm:py-8 md:py-12 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 leading-tight">
              Explore Amazing
              <span className="block text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text mt-1">
                Tours
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover unique experiences from trusted local guides around the world. Create memories that last a
              lifetime.
            </p>
          </div>

          {/* Search Bar Component */}
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full justify-between">
                <span className="flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </div>

            <div className={`space-y-4 sm:space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <Card className="p-4 sm:p-6">
                <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h3>

                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-semibold">Destination</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between bg-transparent">
                        {selectedDestinations.length === 0
                          ? "All Destinations"
                          : `${selectedDestinations.length} selected`}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search destinations..." />
                        <CommandList>
                          <CommandEmpty>No destinations found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={() => setSelectedDestinations([])}>
                              <Check
                                className={`mr-2 h-4 w-4 ${selectedDestinations.length === 0 ? "opacity-100" : "opacity-0"
                                  }`}
                              />
                              All Destinations
                            </CommandItem>
                            {destinations.map((destination) => (
                              <CommandItem
                                key={destination}
                                onSelect={() => {
                                  setSelectedDestinations((prev) =>
                                    prev.includes(destination)
                                      ? prev.filter((d) => d !== destination)
                                      : [...prev, destination],
                                  )
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${selectedDestinations.includes(destination) ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                                {destination}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-semibold">Duration</Label>
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox
                          id={`duration-${duration}`}
                          checked={selectedDuration.includes(duration)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedDuration([...selectedDuration, duration])
                            } else {
                              setSelectedDuration(selectedDuration.filter((d) => d !== duration))
                            }
                          }}
                        />
                        <Label htmlFor={`duration-${duration}`} className="text-sm font-normal">
                          {duration}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-semibold">
                    Price Range: €{priceRange[0]} - €{priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>€0</span>
                    <span>€50,000</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-semibold">Tour Type</Label>
                  <div className="space-y-2">
                    {tourTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTourTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTourTypes((prev) => [...prev, type])
                            } else {
                              setSelectedTourTypes((prev) => prev.filter((t) => t !== type))
                            }
                          }}
                        />
                        <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedTourTypes.length === 0 || selectedTourTypes.includes("Group Tour")) && (
                  <div className="space-y-3 mb-6">
                    <Label className="text-sm font-semibold">Group tour size (max.)</Label>
                    <div className="space-y-2">
                      {groupSizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={`size-${size}`}
                            checked={maxGroupSize.includes(size)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setMaxGroupSize([...maxGroupSize, size])
                              } else {
                                setMaxGroupSize(maxGroupSize.filter((s) => s !== size))
                              }
                            }}
                          />
                          <Label htmlFor={`size-${size}`} className="text-sm font-normal">
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-semibold">Operator Country</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-full justify-between bg-transparent">
                        {selectedOperatorCountries.length === 0
                          ? "All Countries"
                          : `${selectedOperatorCountries.length} selected`}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search countries..." />
                        <CommandList>
                          <CommandEmpty>No countries found.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem onSelect={() => setSelectedOperatorCountries([])}>
                              <Check
                                className={`mr-2 h-4 w-4 ${selectedOperatorCountries.length === 0 ? "opacity-100" : "opacity-0"
                                  }`}
                              />
                              All Countries
                            </CommandItem>
                            {getOperatorCountries().map((country) => (
                              <CommandItem
                                key={country}
                                onSelect={() => {
                                  setSelectedOperatorCountries((prev) =>
                                    prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country],
                                  )
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${selectedOperatorCountries.includes(country) ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                                {country}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-semibold">Travel Style</Label>
                  <div className="space-y-2">
                    {travelStyles.map((style) => (
                      <div key={style.name} className="border rounded-lg">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            setExpandedTravelStyles((prev) =>
                              prev.includes(style.name) ? prev.filter((s) => s !== style.name) : [...prev, style.name],
                            )
                          }}
                        >
                          <span className="font-medium">{style.name}</span>
                          <span className="text-muted-foreground">
                            {expandedTravelStyles.includes(style.name) ? "−" : "+"}
                          </span>
                        </button>
                        {expandedTravelStyles.includes(style.name) && (
                          <div className="px-3 pb-3 space-y-2">
                            {style.types.map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`travel-style-${type}`}
                                  checked={selectedTravelStyleTypes.includes(type)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedTravelStyleTypes((prev) => [...prev, type])
                                    } else {
                                      setSelectedTravelStyleTypes((prev) => prev.filter((t) => t !== type))
                                    }
                                  }}
                                />
                                <Label htmlFor={`travel-style-${type}`} className="text-sm cursor-pointer">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tours Grid/List */}
          <div className="flex-1 min-w-0">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                Showing {sortedTours.length} of {mockTours.length} tours
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                {/* Grid/List Toggle Buttons */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex-1 sm:flex-none px-3"
                  >
                    <List className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">List</span>
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="flex-1 sm:flex-none px-3"
                  >
                    <Grid3X3 className="w-4 h-4" />
                    <span className="ml-2 sm:hidden">Grid</span>
                  </Button>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {sortedTours.map((tour) => (
                  <div key={tour.id} onClick={(e) => handleCardClick(tour.id, e)}>
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg h-full">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.title}
                          className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-3 sm:top-4 right-3 sm:right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4 sm:p-5 md:p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {tour.title}
                          </h3>
                          <div className="text-right ml-2">
                            <span className="font-heading font-bold text-xl text-primary">€{tour.price}</span>
                            {tour.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">€{tour.originalPrice}</div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <CompanyHoverCard tour={tour}>
                            <span>{tour.company}</span>
                          </CompanyHoverCard>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">{tour.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{tour.duration}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 mb-3 sm:mb-4">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                          <span className="text-xs sm:text-sm text-muted-foreground">{tour.groupSize}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{tour.rating}</span>
                            </div>
                            <span className="text-muted-foreground">({tour.reviews} reviews)</span>
                          </div>
                          <div data-prevent-navigation onClick={(e) => e.stopPropagation()}>
                            <ChatButton companyId={tour.companyId} tourId={tour.id} />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {tour.badges.map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} className="bg-accent text-accent-foreground">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {sortedTours.map((tour) => (
                  <div key={tour.id} onClick={(e) => handleCardClick(tour.id, e)}>
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-64 md:w-80 shrink-0">
                            <div className="relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none">
                              <img
                                src={tour.image || "/placeholder.svg"}
                                alt={tour.title}
                                className="w-full h-48 sm:h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-3 sm:top-4 right-3 sm:right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex-1 p-4 sm:p-5 md:p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 sm:mb-4">
                              <div className="flex-1">
                                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                                  {tour.title}
                                </h3>

                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                  <CompanyHoverCard tour={tour}>
                                    <span className="text-sm sm:text-base">{tour.company}</span>
                                  </CompanyHoverCard>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{tour.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{tour.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>{tour.groupSize}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{tour.rating}</span>
                                  </div>
                                  <span className="text-muted-foreground">({tour.reviews} reviews)</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                  {tour.badges.map((badge, badgeIndex) => (
                                    <Badge key={badgeIndex} className="bg-accent text-accent-foreground">
                                      {badge}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 mt-3 md:mt-0 md:ml-6">
                                <div className="text-left sm:text-right">
                                  <span className="font-heading font-bold text-xl sm:text-2xl text-primary">€{tour.price}</span>
                                  {tour.originalPrice && (
                                    <div className="text-xs sm:text-sm text-muted-foreground line-through">
                                      €{tour.originalPrice}
                                    </div>
                                  )}
                                </div>
                                <div data-prevent-navigation onClick={(e) => e.stopPropagation()}>
                                  <ChatButton companyId={tour.companyId} tourId={tour.id} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            )}

            {sortedTours.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">No tours found</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md mx-auto">
                  Try adjusting your search criteria or filters to find more tours.
                </p>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                  onClick={() => {
                    setSelectedDestinations([])
                    setPriceRange([0, 50000])
                    setSelectedOperator("all")
                    setSelectedDuration([])
                    setSelectedOperatorCountries([])
                    setMaxGroupSize([])
                    setSelectedTourTypes([])
                    setSelectedTravelStyleTypes([])
                    setExpandedTravelStyles([])
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

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
