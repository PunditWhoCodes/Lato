"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, ArrowRight } from "lucide-react"
import { TourCard } from "./tour-card"
import type { Tour, SearchFilters } from "@/types"

interface FeaturedToursProps {
  filters: SearchFilters
}

// Mock tour data - in a real app this would come from an API
const TOURS_DATA: Tour[] = [
  {
    id: 1,
    title: "Bali Temple & Rice Terrace Adventure",
    company: "Bali Explorer Co.",
    companyId: "bali-explorer",
    companyCountry: "Indonesia",
    companyFlag: "🇮🇩",
    price: 89,
    rating: 4.9,
    reviews: 127,
    duration: "1 day",
    groupSize: "2-8",
    location: "Bali",
    destination: "bali",
    travelStyle: "cultural",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    badges: ["Best Seller", "Local Guide"],
    category: "Cultural",
    difficulty: "Easy",
    highlights: ["Temple visits", "Rice terraces", "Local guide"],
    tourType: "Group Tour",
  },
  {
    id: 2,
    title: "Tokyo Street Food & Culture Walk",
    company: "Tokyo Taste Tours",
    companyId: "tokyo-taste",
    companyCountry: "Japan",
    companyFlag: "🇯🇵",
    price: 65,
    rating: 4.8,
    reviews: 89,
    duration: "4 hours",
    groupSize: "2-6",
    location: "Tokyo",
    destination: "tokyo",
    travelStyle: "cultural",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    badges: ["Food Tour", "Small Group"],
    category: "Food & Drink",
    difficulty: "Easy",
    highlights: ["Street food", "Local culture", "Food tasting"],
    tourType: "Group Tour",
  },
  {
    id: 3,
    title: "Santorini Sunset Photography Tour",
    company: "Greek Island Adventures",
    companyId: "greek-adventures",
    companyCountry: "Greece",
    companyFlag: "🇬🇷",
    price: 120,
    rating: 5.0,
    reviews: 45,
    duration: "3 hours",
    groupSize: "2-4",
    location: "Santorini",
    destination: "santorini",
    travelStyle: "photography",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    badges: ["Photography", "Sunset"],
    category: "Photography",
    difficulty: "Easy",
    highlights: ["Photography", "Sunset views", "Professional tips"],
    tourType: "Private Tour",
  },
  {
    id: 4,
    title: "Iceland Northern Lights Expedition",
    company: "Arctic Adventures",
    companyId: "arctic-adventures",
    companyCountry: "Iceland",
    companyFlag: "🇮🇸",
    price: 150,
    rating: 4.9,
    reviews: 203,
    duration: "5 hours",
    groupSize: "4-12",
    location: "Reykjavik",
    destination: "iceland",
    travelStyle: "adventure",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
    badges: ["Adventure", "Night Tour"],
    category: "Adventure",
    difficulty: "Moderate",
    highlights: ["Northern Lights", "Expert guide", "Winter landscape"],
    tourType: "Group Tour",
  },
  {
    id: 5,
    title: "Moroccan Desert Safari & Camping",
    company: "Sahara Experience",
    companyId: "sahara-exp",
    companyCountry: "Morocco",
    companyFlag: "🇲🇦",
    price: 200,
    rating: 4.8,
    reviews: 156,
    duration: "2 days",
    groupSize: "4-8",
    location: "Marrakech",
    destination: "morocco",
    travelStyle: "adventure",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    badges: ["Multi-day", "Camping"],
    category: "Adventure",
    difficulty: "Moderate",
    highlights: ["Desert camp", "Camel ride", "Stargazing"],
    tourType: "Group Tour",
  },
  {
    id: 6,
    title: "Paris Wine & Cheese Tasting",
    company: "French Gourmet Tours",
    companyId: "french-gourmet",
    companyCountry: "France",
    companyFlag: "🇫🇷",
    price: 95,
    rating: 4.9,
    reviews: 78,
    duration: "3 hours",
    groupSize: "2-8",
    location: "Paris",
    destination: "paris",
    travelStyle: "cultural",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
    badges: ["Food Tour", "Wine Tasting"],
    category: "Food & Drink",
    difficulty: "Easy",
    highlights: ["Wine tasting", "French cheese", "Expert sommelier"],
    tourType: "Group Tour",
  },
]

export function FeaturedTours({ filters }: FeaturedToursProps) {
  // Filter tours based on search criteria
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Destination filter
      if (filters.destination && !tour.destination.toLowerCase().includes(filters.destination.toLowerCase()) &&
        !tour.location.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false
      }

      // Duration filter
      if (filters.duration && filters.duration !== "all") {
        const tourDuration = tour.duration.toLowerCase()
        switch (filters.duration) {
          case "2-3-days":
            if (!tourDuration.includes("2 days") && !tourDuration.includes("3 days")) return false
            break
          case "4-7-days":
            if (!tourDuration.includes("4 hours") && !tourDuration.includes("5 hours") &&
              !tourDuration.includes("1 day")) return false
            break
          case "1-2-weeks":
            // No tours match this in our mock data
            return false
          case "2-weeks-plus":
            // No tours match this in our mock data
            return false
        }
      }

      // Travel style filter
      if (filters.travelStyle && filters.travelStyle !== "all") {
        if (tour.travelStyle.toLowerCase() !== filters.travelStyle.toLowerCase()) {
          return false
        }
      }

      return true
    })
  }, [filters])

  return (
    <section className="py-8 sm:py-10 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-xs font-medium mb-3 shadow-lg">
            <Award className="w-3 h-3" />
            Featured Experiences
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">Handpicked Adventures</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Discover extraordinary experiences curated by our trusted local partners
          </p>
          {filteredTours.length < TOURS_DATA.length && (
            <p className="text-sm text-primary font-semibold mt-2">
              Showing {filteredTours.length} of {TOURS_DATA.length} tours based on your filters
            </p>
          )}
        </div>

        {filteredTours.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-muted-foreground text-base sm:text-lg mb-4">No tours found matching your criteria</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredTours.map((tour) => (
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
