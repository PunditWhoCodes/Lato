"use client"

import { SearchBar } from "@/components/home/search-bar"

export function ToursHeader() {
  return (
    <section className="relative bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5 dark:from-primary/10 dark:via-primary/5 dark:to-secondary/10 py-6 sm:py-8 md:py-12 px-4 overflow-hidden transition-colors">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 sm:mb-4 leading-tight">
            Explore Amazing
            <span className="block text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text mt-1">
              Tours
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover unique experiences from trusted local guides around the world. Create memories that last a
            lifetime.
          </p>
        </div>

        {/* Search Bar Component */}
        <SearchBar />
      </div>
    </section>
  )
}
