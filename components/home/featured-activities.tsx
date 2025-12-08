"use client"

import { useState, useRef } from "react"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface Activity {
  id: number
  title: string
  tourCount: string
  image: string
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Hiking",
    tourCount: "450+ Tours",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    id: 2,
    title: "City Sightseeing",
    tourCount: "450+ Tours",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    id: 3,
    title: "Art & Culture",
    tourCount: "450+ Tours",
    image: "https://images.unsplash.com/photo-1640350168509-756f1ef84b37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFydCUyMGFuZCUyMGN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    title: "Adventure",
    tourCount: "450+ Tours",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  },
  {
    id: 5,
    title: "Architecture",
    tourCount: "450+ Tours",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
  },
]

export function FeaturedActivities() {
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
      const scrollAmount = 400
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

  return (
    <section className="py-20 bg-white md:py-16 lg:py-20 px-4 md:px-10">
      <div className="max-w-[1920px] mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 md:mb-12">
          <div>
            <p className="font-poppins font-light text-sm md:text-base mb-2">
              Discover the world your way
            </p>
            <h2 className="font-poppins font-light text-3xl md:text-4xl lg:text-[42px] lg:leading-[56px] text-black">
              Featured Tour Activities
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!showLeftArrow}
              className={`size-10 rounded-full border flex items-center justify-center transition-all hover:border-gray-400 hover:bg-gray-50 ${
                !showLeftArrow ? "opacity-40 cursor-not-allowed" : ""
              }`}
              aria-label="Previous activities"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!showRightArrow}
              className={`size-10 rounded-full border flex items-center justify-center transition-all hover:border-gray-400 hover:bg-gray-50 ${
                !showRightArrow ? "opacity-40 cursor-not-allowed" : ""
              }`}
              aria-label="Next activities"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Activity Cards Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="relative flex-shrink-0 w-[280px] md:w-[340px] lg:w-[380px] h-[280px] md:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${activity.image})`,
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-poppins font-medium text-2xl md:text-3xl text-white mb-2">
                  {activity.title}
                </h3>
                <p className="font-mulish font-light text-sm md:text-base text-white/90">
                  {activity.tourCount}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {activities.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
