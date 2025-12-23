"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react"

const continents = [
  { id: "africa", name: "Africa", places: 23 },
  { id: "europe", name: "Europe", places: 23 },
  { id: "asia", name: "Asia", places: 23 },
  { id: "south-america", name: "South America", places: 23 },
]

const destinations: Record<string, string[]> = {
  africa: [
    "Morocco", "Egypt", "Kenya", "Tanzania", "South Africa",
    "Tunisia", "Ghana", "Nigeria", "Ethiopia", "Rwanda",
    "Uganda", "Zambia", "Zimbabwe", "Botswana", "Namibia",
    "Senegal", "Madagascar", "Mauritius", "Seychelles", "Cape Verde",
  ],
  europe: [
    "Italy", "Spain", "Turkey", "France", "Greece",
    "Portugal", "Germany", "Netherlands", "Switzerland", "Austria",
    "Czech Republic", "Poland", "Croatia", "Hungary", "Belgium",
    "Ireland", "Scotland", "Norway", "Sweden", "Denmark",
    "Finland", "Iceland",
  ],
  asia: [
    "Japan", "Thailand", "Vietnam", "Indonesia", "Malaysia",
    "Singapore", "Philippines", "South Korea", "China", "India",
    "Sri Lanka", "Nepal", "Cambodia", "Laos", "Myanmar",
    "Taiwan", "Hong Kong", "Maldives", "Bhutan", "Mongolia",
  ],
  "south-america": [
    "Brazil", "Argentina", "Peru", "Chile", "Colombia",
    "Ecuador", "Bolivia", "Uruguay", "Paraguay", "Venezuela",
    "Costa Rica", "Panama", "Mexico", "Guatemala", "Cuba",
    "Dominican Republic", "Puerto Rico", "Jamaica", "Belize",
  ],
}

interface DestinationsDropdownTriggerProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function DestinationsDropdownTrigger({
  isOpen,
  onOpen,
}: DestinationsDropdownTriggerProps) {
  return (
    <button
      onMouseEnter={onOpen}
      className={`flex items-center gap-1 font-normal text-[15px] transition-colors ${
        isOpen ? "text-[#00A792]" : "text-gray-700 hover:text-black"
      }`}
    >
      Top Destination
      {isOpen ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  )
}

interface DestinationsDropdownPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function DestinationsDropdownPanel({ isOpen, onClose }: DestinationsDropdownPanelProps) {
  const [selectedContinent, setSelectedContinent] = useState("africa")
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null)

  if (!isOpen) return null

  const currentDestinations = destinations[selectedContinent] || []
  const currentContinent = continents.find(c => c.id === selectedContinent)

  return (
    <div
      className="absolute left-0 right-0 top-full bg-[#F9FAFB] border-t border-gray-100 shadow-sm z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-12">
          {/* Left Sidebar - Continents */}
          <div className="w-[220px] space-y-2 flex-shrink-0">
            {continents.map((continent) => (
              <button
                key={continent.id}
                onClick={() => setSelectedContinent(continent.id)}
                onMouseEnter={() => setSelectedContinent(continent.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  selectedContinent === continent.id
                    ? "bg-[#00A792] text-white"
                    : "bg-white border border-gray-200 text-[#1C1B1F] hover:border-gray-300"
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{continent.name}</div>
                  <div className={`text-sm ${
                    selectedContinent === continent.id ? "text-white/80" : "text-gray-500"
                  }`}>
                    {continent.places} Places
                  </div>
                </div>
                {selectedContinent === continent.id && (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>

          {/* Right Content - Destinations Grid */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-[#1C1B1F] mb-6">
              {currentContinent?.name}
            </h3>

            <div className="grid grid-cols-5 gap-x-8 gap-y-3">
              {currentDestinations.map((destination) => (
                <Link
                  key={destination}
                  href={`/destinations/${destination.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={onClose}
                  onMouseEnter={() => setHoveredDestination(destination)}
                  onMouseLeave={() => setHoveredDestination(null)}
                  className={`flex items-center gap-1 py-1 text-[15px] transition-colors ${
                    hoveredDestination === destination
                      ? "text-[#00A792]"
                      : "text-[#1C1B1F]"
                  }`}
                >
                  {destination}
                  {hoveredDestination === destination && (
                    <ChevronRight className="h-4 w-4 text-[#00A792]" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
