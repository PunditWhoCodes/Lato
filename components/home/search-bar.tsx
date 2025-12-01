"use client"

import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SearchBar() {
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [travelers, setTravelers] = useState("")

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log({ destination, dates, travelers })
  }

  return (
    <div className="glass-effect rounded-4xl p-2 w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-4xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Destination Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border border-border rounded-2xl hover:border-primary/50 focus-within:border-primary transition-colors">
          <MapPin className="w-5 h-5 text-text-muted flex-shrink-0" />
          <div className="flex-1">
            <label htmlFor="destination" className="block text-xs font-mulish font-semibold text-text-muted mb-1">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where to?"
              className="w-full text-sm font-montserrat text-text-primary placeholder:text-text-light outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Dates Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border border-border rounded-2xl hover:border-primary/50 focus-within:border-primary transition-colors">
          <Calendar className="w-5 h-5 text-text-muted flex-shrink-0" />
          <div className="flex-1">
            <label htmlFor="dates" className="block text-xs font-mulish font-semibold text-text-muted mb-1">
              Dates
            </label>
            <input
              id="dates"
              type="text"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="Add dates"
              className="w-full text-sm font-montserrat text-text-primary placeholder:text-text-light outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Travelers Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 border border-border rounded-2xl hover:border-primary/50 focus-within:border-primary transition-colors">
          <Users className="w-5 h-5 text-text-muted flex-shrink-0" />
          <div className="flex-1">
            <label htmlFor="travelers" className="block text-xs font-mulish font-semibold text-text-muted mb-1">
              Travelers
            </label>
            <input
              id="travelers"
              type="text"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              placeholder="Add guests"
              className="w-full text-sm font-montserrat text-text-primary placeholder:text-text-light outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90 text-white rounded-4xl px-8 py-6 font-montserrat font-semibold text-base shadow-md hover:shadow-lg transition-all"
        >
          Search
        </Button>
      </div>
    </div>
  )
}
