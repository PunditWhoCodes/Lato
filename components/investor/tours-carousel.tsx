"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { InvestorTourCard } from "./investor-tour-card"
import type { CompanyTour } from "@/lib/types/investor"

interface ToursCarouselProps {
  title: string
  tours: CompanyTour[]
}

export function ToursCarousel({ title, tours }: ToursCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  if (tours.length === 0) {
    return null
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-[14px] lg:mb-5">
        <h2 className="font-poppins font-semibold text-[12px] lg:text-xl text-black">
          {title}
        </h2>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-[9px] lg:gap-3">
          <button
            onClick={() => scroll("left")}
            disabled={!showLeftArrow}
            className={`size-[28px] lg:size-10 rounded-full border flex items-center justify-center transition-all hover:border-gray-400 hover:bg-gray-50 ${
              !showLeftArrow ? "opacity-40 cursor-not-allowed" : ""
            }`}
            aria-label="Previous tours"
          >
            <ArrowLeft className="size-[14px] lg:size-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!showRightArrow}
            className={`size-[28px] lg:size-10 rounded-full border flex items-center justify-center transition-all hover:border-gray-400 hover:bg-gray-50 ${
              !showRightArrow ? "opacity-40 cursor-not-allowed" : ""
            }`}
            aria-label="Next tours"
          >
            <ArrowRight className="size-[14px] lg:size-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-[9px] lg:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-[14px] lg:pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="flex-shrink-0"
          >
            <InvestorTourCard tour={tour} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
