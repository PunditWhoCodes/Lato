"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Filter, ChevronDown, Check, SlidersHorizontal } from "lucide-react"
import { destinations, travelStyles, durations, groupSizes, tourTypes } from "../data"
import type { TravelStyleType, Tour } from "../types"

interface FiltersSidebarProps {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  selectedDestinations: string[]
  setSelectedDestinations: (destinations: string[]) => void
  selectedDuration: string[]
  setSelectedDuration: (durations: string[]) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  selectedTourTypes: string[]
  setSelectedTourTypes: (types: string[]) => void
  maxGroupSize: string[]
  setMaxGroupSize: (sizes: string[]) => void
  selectedOperatorCountries: string[]
  setSelectedOperatorCountries: (countries: string[]) => void
  expandedTravelStyles: string[]
  setExpandedTravelStyles: (styles: string[]) => void
  selectedTravelStyleTypes: string[]
  setSelectedTravelStyleTypes: (types: string[]) => void
  tours: Tour[]
}

export function FiltersSidebar({
  showFilters,
  setShowFilters,
  selectedDestinations,
  setSelectedDestinations,
  selectedDuration,
  setSelectedDuration,
  priceRange,
  setPriceRange,
  selectedTourTypes,
  setSelectedTourTypes,
  maxGroupSize,
  setMaxGroupSize,
  selectedOperatorCountries,
  setSelectedOperatorCountries,
  expandedTravelStyles,
  setExpandedTravelStyles,
  selectedTravelStyleTypes,
  setSelectedTravelStyleTypes,
  tours,
}: FiltersSidebarProps) {
  const getOperatorCountries = () => {
    const allCountries = Array.from(new Set(tours.map((tour) => tour.companyCountry))).sort()

    if (selectedDestinations.length > 0) {
      const destinationCountries = tours
        .filter((tour) => selectedDestinations.includes(tour.destination))
        .map((tour) => tour.companyCountry)
      const uniqueDestinationCountries = Array.from(new Set(destinationCountries))
      const otherCountries = allCountries.filter((country) => !uniqueDestinationCountries.includes(country))
      return [...uniqueDestinationCountries, ...otherCountries]
    }

    return allCountries
  }

  return (
    <div className="lg:w-80">
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full justify-between">
          <span className="flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className={`space-y-4 sm:space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
        <Card className="p-4 sm:p-6">
          <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </h3>

          {/* Destination Filter */}
          <div className="space-y-3 mb-6">
            <Label className="text-sm font-semibold">Destination</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between bg-transparent">
                  {selectedDestinations.length === 0 ? "All Destinations" : `${selectedDestinations.length} selected`}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search destinations..." />
                  <CommandList>
                    <CommandEmpty>No destinations found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem onSelect={() => setSelectedDestinations([])}>
                        <Check
                          className={`mr-2 h-4 w-4 ${selectedDestinations.length === 0 ? "opacity-100" : "opacity-0"}`}
                        />
                        All Destinations
                      </CommandItem>
                      {destinations.map((destination) => (
                        <CommandItem
                          key={destination}
                          onSelect={() => {
                            setSelectedDestinations(
                              selectedDestinations.includes(destination)
                                ? selectedDestinations.filter((d) => d !== destination)
                                : [...selectedDestinations, destination],
                            )
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${selectedDestinations.includes(destination) ? "opacity-100" : "opacity-0"}`}
                          />
                          {destination}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Duration Filter */}
          <div className="space-y-3 mb-6">
            <Label className="text-sm font-semibold">Duration</Label>
            <div className="space-y-2">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox
                    id={`duration-${duration}`}
                    checked={selectedDuration.includes(duration)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedDuration([...selectedDuration, duration])
                      } else {
                        setSelectedDuration(selectedDuration.filter((d) => d !== duration))
                      }
                    }}
                  />
                  <Label htmlFor={`duration-${duration}`} className="text-sm font-normal">
                    {duration}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 mb-6">
            <Label className="text-sm font-semibold">
              Price Range: €{priceRange[0]} - €{priceRange[1]}
            </Label>
            <Slider value={priceRange} onValueChange={setPriceRange} max={50000} min={0} step={100} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>€0</span>
              <span>€50,000</span>
            </div>
          </div>

          {/* Tour Type Filter */}
          <div className="space-y-3 mb-6">
            <Label className="text-sm font-semibold">Tour Type</Label>
            <div className="space-y-2">
              {tourTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={selectedTourTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTourTypes([...selectedTourTypes, type])
                      } else {
                        setSelectedTourTypes(selectedTourTypes.filter((t) => t !== type))
                      }
                    }}
                  />
                  <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Group Size Filter */}
          {(selectedTourTypes.length === 0 || selectedTourTypes.includes("Group Tour")) && (
            <div className="space-y-3 mb-6">
              <Label className="text-sm font-semibold">Group tour size (max.)</Label>
              <div className="space-y-2">
                {groupSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={maxGroupSize.includes(size)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setMaxGroupSize([...maxGroupSize, size])
                        } else {
                          setMaxGroupSize(maxGroupSize.filter((s) => s !== size))
                        }
                      }}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm font-normal">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operator Country Filter */}
          <div className="space-y-3 mb-6">
            <Label className="text-sm font-semibold">Operator Country</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between bg-transparent">
                  {selectedOperatorCountries.length === 0
                    ? "All Countries"
                    : `${selectedOperatorCountries.length} selected`}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search countries..." />
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem onSelect={() => setSelectedOperatorCountries([])}>
                        <Check
                          className={`mr-2 h-4 w-4 ${selectedOperatorCountries.length === 0 ? "opacity-100" : "opacity-0"}`}
                        />
                        All Countries
                      </CommandItem>
                      {getOperatorCountries().map((country) => (
                        <CommandItem
                          key={country}
                          onSelect={() => {
                            setSelectedOperatorCountries(
                              selectedOperatorCountries.includes(country)
                                ? selectedOperatorCountries.filter((c) => c !== country)
                                : [...selectedOperatorCountries, country]
                            )
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${selectedOperatorCountries.includes(country) ? "opacity-100" : "opacity-0"}`}
                          />
                          {country}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Travel Style Filter */}
          <div className="space-y-3 mb-6">
            <Label className="text-sm font-semibold">Travel Style</Label>
            <div className="space-y-2">
              {travelStyles.map((style) => (
                <div key={style.name} className="border rounded-lg">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      setExpandedTravelStyles(
                        expandedTravelStyles.includes(style.name)
                          ? expandedTravelStyles.filter((s) => s !== style.name)
                          : [...expandedTravelStyles, style.name]
                      )
                    }}
                  >
                    <span className="font-medium">{style.name}</span>
                    <span className="text-muted-foreground">{expandedTravelStyles.includes(style.name) ? "−" : "+"}</span>
                  </button>
                  {expandedTravelStyles.includes(style.name) && (
                    <div className="px-3 pb-3 space-y-2">
                      {style.types.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`travel-style-${type}`}
                            checked={selectedTravelStyleTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTravelStyleTypes([...selectedTravelStyleTypes, type])
                              } else {
                                setSelectedTravelStyleTypes(selectedTravelStyleTypes.filter((t) => t !== type))
                              }
                            }}
                          />
                          <Label htmlFor={`travel-style-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
