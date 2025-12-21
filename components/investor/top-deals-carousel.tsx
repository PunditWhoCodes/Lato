"use client"

import { ToursCarousel } from "./tours-carousel"
import type { CompanyTour } from "@/lib/types/investor"

interface TopDealsCarouselProps {
  tours: CompanyTour[]
}

export function TopDealsCarousel({ tours }: TopDealsCarouselProps) {
  return <ToursCarousel title="Top Deals" tours={tours} />
}
