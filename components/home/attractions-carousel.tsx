"use client"

import { useState } from "react"
import { AttractionCard } from "./attraction-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Compass } from "lucide-react"

interface Attraction {
  name: string
  location: string
  description: string
  image: string
  href: string
}

const ATTRACTIONS: Attraction[] = [
  {
    name: "Eiffel Tower",
    location: "Paris, France",
    description: "Experience the iconic symbol of Paris with breathtaking views from the top. Our expert guides will share fascinating stories about its history and architecture.",
    image: "/attractions/eiffel-tower.jpg",
    href: "/tours?attraction=eiffel-tower",
  },
  {
    name: "Santorini Sunset",
    location: "Santorini, Greece",
    description: "Witness the world-famous sunset in Oia village. Explore the stunning white-washed buildings and blue-domed churches with our local guides.",
    image: "/attractions/santorini.jpg",
    href: "/tours?attraction=santorini",
  },
  {
    name: "Great Wall of China",
    location: "Beijing, China",
    description: "Walk along one of the world's most impressive ancient structures. Our tours take you to less crowded sections for an authentic experience.",
    image: "/attractions/great-wall.jpg",
    href: "/tours?attraction=great-wall",
  },
]

export function AttractionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ATTRACTIONS.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ATTRACTIONS.length) % ATTRACTIONS.length)
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-mulish font-semibold mb-4">
            <Compass className="w-4 h-4" />
            Must-See Attractions
          </div>
          <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Attractions You Can't Miss
          </h2>
          <p className="text-base md:text-lg font-poppins text-text-muted max-w-2xl mx-auto">
            Discover the most iconic landmarks and hidden gems around the world
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 rounded-full w-12 h-12 bg-white shadow-lg hover:bg-primary hover:text-white border-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 rounded-full w-12 h-12 bg-white shadow-lg hover:bg-primary hover:text-white border-0"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Attraction Card */}
          <div className="transition-all duration-500">
            <AttractionCard
              name={ATTRACTIONS[currentIndex].name}
              location={ATTRACTIONS[currentIndex].location}
              description={ATTRACTIONS[currentIndex].description}
              image={ATTRACTIONS[currentIndex].image}
              href={ATTRACTIONS[currentIndex].href}
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {ATTRACTIONS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-text-light hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
