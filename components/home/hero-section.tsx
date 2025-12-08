"use client"

import { SearchBar } from "./search-bar"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-[#F7F7F7] px-4 pt-8 md:pt-12 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Heading and Subtitle */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 mb-6 md:mb-8 px-2 md:px-4 lg:px-20">
          {/* Left Side - Heading */}
          <div className="w-full lg:max-w-[984px]">
            <h1 className="font-poppins font-medium text-black leading-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Your Next Adventure Awaits
            </h1>
          </div>

          {/* Right Side - Subtitle and Book Now Button */}
          <div className="flex flex-col items-start w-full lg:max-w-[386px] space-y-4 lg:space-y-6">
            <p className="font-poppins text-sm md:text-base font-light text-black/80 leading-relaxed">
              Explore stunning destinations, unique experience, and unforgettable journey with Lato.
            </p>
            <div className="group">
              <Button
                asChild
                className="relative overflow-hidden bg-black text-white rounded-full h-auto px-5 py-1.5 md:py-2 font-poppins font-light flex items-center gap-4 md:gap-[34px] text-base md:text-lg"
              >
                <Link href="/tours">
                  <span className="relative z-10">Book Now</span>
                  <ArrowUpRight className="relative z-10 size-5 md:size-8 transition-transform duration-300 group-hover:rotate-45" />

                  {/* Radial expanding hover overlay */}
                  <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image Container */}
        <div className="relative px-2 md:px-4 lg:px-20">
          <div className="relative rounded-2xl md:rounded-[30px] overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[557px]">
            {/* Background Image - No Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/hero-image.jpg')",
              }}
            />
          </div>

          {/* Search Bar - Overlapping Hero Image */}
          <div className="absolute w-[calc(100%-10rem)] -bottom-20 z-20 px-2 md:px-4 lg:px-20">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  )
}
