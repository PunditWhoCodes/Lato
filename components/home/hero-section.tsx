"use client"

import { SearchBar } from "./search-bar"

export function HeroSection() {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image Container */}
        <div className="relative rounded-5xl overflow-hidden h-[600px] md:h-[700px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-image.jpg')",
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
            {/* Heading */}
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-white text-center mb-8 max-w-4xl leading-tight">
              Your Next Adventure Awaits
            </h1>

            <p className="font-poppins text-lg md:text-xl text-white/90 text-center mb-12 max-w-2xl">
              Discover unique travel experiences tailored just for you
            </p>

            {/* Search Bar with Glassmorphism */}
            <div className="w-full max-w-5xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
