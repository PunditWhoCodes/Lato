"use client"

import { SearchBar } from "./search-bar"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-[#F7F7F7] px-[14px] pt-[21px] md:pt-12 pb-0 md:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Figma pixel-perfect */}
        <div className="md:hidden flex flex-col items-center gap-[20px]">
          {/* Top Section - Heading and Subtitle */}
          <div className="flex flex-col items-end w-[345px]">
            {/* Heading - Full width, left aligned */}
            <h1 className="font-poppins font-medium text-[27px] leading-[100%] text-black w-full">
              Your Next Adventure<br />Awaits
            </h1>

            {/* Subtitle and Button - Right aligned container */}
            <div className="flex flex-col items-start gap-[9px] w-[159px]">
              <p className="font-poppins font-light text-[8.2px] leading-[150%] text-black">
                Explore stunning destinations, unique experience, and unforgettable journey with Lato.
              </p>
              {/* Book Now Button */}
              <div className="group">
                <Link
                  href="/tours"
                  className="relative overflow-hidden bg-black text-white rounded-[30px] h-[21px] w-[81px] px-[6px] py-[3.7px] font-poppins font-light flex items-center justify-between"
                >
                  <span className="relative z-10 text-[7.4px] leading-[150%]">Book Now</span>
                  <ArrowUpRight className="relative z-10 w-[10px] h-[10px] transition-transform duration-300 group-hover:rotate-45" />
                  <span className="absolute inset-0 bg-[#00A792] rounded-[30px] scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Image - Figma: 375px wide, 647px tall, rounded-[20px] */}
          <div className="relative w-full rounded-[20px] overflow-hidden h-[647px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/hero-image.jpg')",
              }}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Top Section - Heading and Subtitle */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 mb-8 px-4 lg:px-20">
            {/* Left Side - Heading */}
            <div className="w-full lg:max-w-[984px]">
              <h1 className="font-poppins font-medium text-black leading-none text-5xl lg:text-6xl">
                Your Next Adventure Awaits
              </h1>
            </div>

            {/* Right Side - Subtitle and Book Now Button */}
            <div className="flex flex-col items-start w-full lg:max-w-[386px] space-y-6">
              <p className="font-poppins text-base font-light text-black/80 leading-relaxed">
                Explore stunning destinations, unique experience, and unforgettable journey with Lato.
              </p>
              <div className="group">
                <Button
                  asChild
                  className="relative overflow-hidden bg-black text-white rounded-full h-auto py-2 px-5 font-poppins font-light flex items-center gap-[34px] text-lg"
                >
                  <Link href="/tours">
                    <span className="relative z-10">Book Now</span>
                    <ArrowUpRight className="relative z-10 size-8 transition-transform duration-300 group-hover:rotate-45" />
                    <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Image Container */}
          <div className="relative px-4 lg:px-20">
            <div className="relative rounded-[30px] overflow-hidden h-[500px] lg:h-[557px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/hero-image.jpg')",
                }}
              />
            </div>

            {/* Search Bar - Overlapping Hero Image */}
            <div className="absolute w-[calc(100%-10rem)] -bottom-20 z-20 px-4 lg:px-20">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
