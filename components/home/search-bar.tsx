"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CountrySelect } from "@/components/ui/country-select"
import { MapPin, Calendar, Users, Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import type { SearchFilters } from "@/types"

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    destination: "",
    month: "",
    year: new Date().getFullYear(),
    duration: "",
    travelStyle: "",
  })

  const handleSearch = () => {
    onSearch(filters)
  }

  const updateFilter = (key: keyof SearchFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleYearChange = (direction: "prev" | "next") => {
    setFilters((prev) => ({
      ...prev,
      year: direction === "prev" ? prev.year - 1 : prev.year + 1,
    }))
  }

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary rounded-3xl md:rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-card/90 dark:bg-card/95 backdrop-blur-sm rounded-3xl md:rounded-full p-2 shadow-2xl border border-border">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            {/* Destination Field */}
            <CountrySelect
              value={filters.destination}
              onChange={(value) => updateFilter("destination", value)}
              placeholder="Where to?"
              variant="search-bar"
              showIcon={true}
            />

            {/* Separator */}
            <div className="hidden md:block w-px h-8 bg-border"></div>

            {/* Date Field */}
            <div className="flex items-center flex-1 min-w-0 py-1 md:py-0">
              <Calendar className="ml-4 text-muted-foreground h-5 w-5 shrink-0" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border-0 bg-transparent text-base focus:ring-0 px-3 justify-start font-normal hover:bg-transparent hover:text-muted-foreground"
                  >
                    {filters.month ? `${filters.month} ${filters.year}` : "When?"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <div className="p-6">
                    {/* Year Header with Navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-foreground">{filters.year}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleYearChange("prev")}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleYearChange("next")}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Month Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {MONTHS.map((month) => (
                        <Button
                          key={month}
                          variant={filters.month === month ? "default" : "outline"}
                          className={`h-12 text-sm font-medium ${filters.month === month
                            ? "bg-foreground text-background hover:bg-foreground/90"
                            : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border-muted"
                            }`}
                          onClick={() => updateFilter("month", month)}
                        >
                          {month}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-8 bg-border"></div>

            {/* Duration Filter */}
            <div className="flex items-center flex-1 min-w-0 py-1 md:py-0">
              <Users className="ml-4 text-muted-foreground h-5 w-5 shrink-0" />
              <Select value={filters.duration} onValueChange={(value) => updateFilter("duration", value)}>
                <SelectTrigger className="border-0 bg-transparent text-base focus:ring-0 px-3 py-2 md:py-1">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any duration</SelectItem>
                  <SelectItem value="2-3-days">2-3 days</SelectItem>
                  <SelectItem value="4-7-days">4-7 days</SelectItem>
                  <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-weeks-plus">2+ weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Separator */}
            <div className="hidden md:block w-px h-8 bg-border"></div>

            {/* Travel Style Field */}
            <div className="flex items-center flex-1 min-w-0 py-1 md:py-0">
              <Globe className="ml-4 text-muted-foreground h-5 w-5 shrink-0" />
              <Select value={filters.travelStyle} onValueChange={(value) => updateFilter("travelStyle", value)}>
                <SelectTrigger className="border-0 bg-transparent text-base focus:ring-0 px-3 py-2 md:py-1">
                  <SelectValue placeholder="All adventures" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All adventures</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              className="rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 md:ml-2 w-full md:w-auto"
              onClick={handleSearch}
            >
              Search
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
