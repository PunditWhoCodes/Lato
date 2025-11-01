"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { FeaturedTours } from "@/components/home/featured-tours"
import { HowItWorks } from "@/components/home/how-it-works"
import { ReviewsSection } from "@/components/home/reviews-section"
import { CTASection } from "@/components/home/cta-section"
import type { SearchFilters } from "@/types"

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: "",
    month: "",
    year: new Date().getFullYear(),
    duration: "",
    travelStyle: "",
  })

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
    const toursSection = document.getElementById("featured-tours")
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleCategoryClick = (category: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      travelStyle: category,
    }))
    const toursSection = document.getElementById("featured-tours")
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <HeroSection onSearch={handleSearch} onCategoryClick={handleCategoryClick} />

      <StatsSection />

      <div id="featured-tours">
        <FeaturedTours filters={searchFilters} />
      </div>

      <HowItWorks />

      <ReviewsSection />

      <CTASection />
    </div>
  )
}
