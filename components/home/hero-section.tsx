"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, MapPin, Heart, Globe, Users } from "lucide-react"
import { SearchBar } from "./search-bar"
import type { SearchFilters } from "@/types"

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void
  onCategoryClick?: (category: string) => void
}

const QUICK_CATEGORIES = [
  { icon: MapPin, label: "Adventure Tours", value: "adventure" },
  { icon: Heart, label: "Cultural Experiences", value: "cultural" },
  { icon: Globe, label: "City Tours", value: "city" },
  { icon: Users, label: "Group Travel", value: "group" },
]

export function HeroSection({ onSearch, onCategoryClick }: HeroSectionProps) {
  const handleCategoryClick = (categoryValue: string) => {
    onCategoryClick?.(categoryValue)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(67,168,160,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,129,125,0.08),transparent_50%)]"></div>

      <div className="relative py-6 sm:py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <Sparkles className="w-3 h-3" />
              Discover Your Next Adventure
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
              Curated Travel
              <span className="text-primary block mt-1">Experiences</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Connect with local experts and discover authentic adventures tailored just for you
            </p>

            {/* Enhanced Search Bar */}
            <SearchBar onSearch={onSearch} />

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {QUICK_CATEGORIES.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/60 backdrop-blur-sm border-white/30 hover:bg-white/80 hover:scale-105 transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 h-auto"
                  onClick={() => handleCategoryClick(category.value)}
                >
                  <category.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" />
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
