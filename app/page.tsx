"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { FeaturedTours } from "@/components/home/featured-tours"
import { HowItWorks } from "@/components/home/how-it-works"
import { TopDestinationsSection } from "@/components/home/top-destinations-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { AttractionsCarousel } from "@/components/home/attractions-carousel"
import { AttractionsVerticalScroll } from "@/components/home/attractions-vertical-scroll"
import { TrendingAdventuresSection } from "@/components/home/trending-adventures-section"
import { FeaturedActivitiesSection } from "@/components/home/featured-activities-section"
import { EmailSubscriptionSection } from "@/components/home/email-subscription-section"
import { CTASection } from "@/components/home/cta-section"
import type { SearchFilters } from "@/types"
import { FeaturedActivities } from "@/components/home/featured-activities"

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: "",
    month: "",
    year: new Date().getFullYear(),
    duration: "",
    travelStyle: "",
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <HeroSection />

      <StatsSection />

      <div id="featured-tours">
        <FeaturedTours filters={searchFilters} />
      </div>

      <HowItWorks />

      <TopDestinationsSection />

      <TestimonialsSection />

      {/* <AttractionsVerticalScroll /> */}

      <TrendingAdventuresSection />

      <FeaturedActivities />

      <EmailSubscriptionSection />

      <CTASection />
    </div>
  )
}
