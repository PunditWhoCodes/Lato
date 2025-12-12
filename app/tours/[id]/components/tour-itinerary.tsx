"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Bed, MapPin, Flag } from "lucide-react"

interface ItineraryDay {
  day: number
  title: string
  location: string
  description: string
  accommodation?: string
  meals?: string[]
}

interface TourItineraryProps {
  itinerary?: ItineraryDay[]
}

// Dummy Figma-style itinerary data
const defaultItinerary: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival in Lima",
    location: "Lima",
    description: "Private transfer from airport to hotel. Optional city tour in the afternoon.",
    accommodation: "Hotel",
    meals: ["Dinner"]
  },
  {
    day: 2,
    title: "Lima to Cusco",
    location: "Cusco",
    description: "Morning flight to Cusco. Guided city walk including Plaza de Armas.",
    accommodation: "Hotel",
    meals: ["Breakfast", "Lunch"]
  },
  {
    day: 3,
    title: "Sacred Valley Tour",
    location: "Sacred Valley",
    description: "Visit Pisac Market and Ollantaytambo ruins. Lunch in Urubamba.",
    accommodation: "Hotel",
    meals: ["Breakfast", "Lunch", "Dinner"]
  },
  {
    day: 4,
    title: "Machu Picchu",
    location: "Machu Picchu",
    description: "Train to Aguas Calientes. Guided tour of Machu Picchu ruins.",
    accommodation: "Hotel",
    meals: ["Breakfast", "Lunch"]
  },
  {
    day: 5,
    title: "Return to Cusco",
    location: "Cusco",
    description: "Return from Machu Picchu to Cusco. Free afternoon.",
    accommodation: "Hotel",
    meals: ["Breakfast"]
  },
  {
    day: 6,
    title: "Cusco City Tour",
    location: "Cusco",
    description: "Visit Sacsayhuamán, Q'enqo, Puca Pucara, and Tambomachay.",
    accommodation: "Hotel",
    meals: ["Breakfast", "Lunch"]
  },
  {
    day: 7,
    title: "Departure",
    location: "Cusco",
    description: "Transfer to airport for flight back home.",
    meals: ["Breakfast"]
  }
]

export function TourItinerary({ itinerary = defaultItinerary }: TourItineraryProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>(itinerary.map(d => d.day))
  const [collapsed, setCollapsed] = useState(false)

  const toggleDay = (day: number) => {
    setExpandedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <div className="py-8 relative">
      {/* Collapse all button top-right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1 text-[14px] text-[#374151] rounded-full border border-[#E5E7EB] font-medium p-2"
        >
          {collapsed ? (
            <>
              Expand all
            </>
          ) : (
            <>
              Collapse all
            </>
          )}
        </button>
      </div>

      <div className="relative">
        {itinerary.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === itinerary.length - 1
          const isExpanded = expandedDays.includes(item.day) && !collapsed

          return (
            <div key={item.day} className="relative">
              {/* Vertical line - centered through dots */}
              {index !== itinerary.length - 1 && (
                <div
                  className="absolute left-[9px] top-[24px] bottom-0 w-[2px] bg-[#00A699]"
                />
              )}

              <div className="flex gap-3 pb-6">
                {/* Dot or special icons - fixed width container for alignment */}
                <div className="relative z-10 shrink-0 w-5 h-5 flex items-center justify-center">
                  {isFirst ? (
                    <MapPin className="w-5 h-5 text-[#00A699]" />
                  ) : isLast ? (
                    <div className="w-5 h-5 rounded-full bg-[#EF4444] flex items-center justify-center">
                      <Flag className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-[#00A699]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <button
                    onClick={() => toggleDay(item.day)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-[#1C1B1F]">{`Day ${item.day} -`}</span> {" "}
                        <span className="text-base font-semibold text-[#1C1B1F]">{item.title}</span>
                        <p className="text-[13px] text-[#6B7280] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#6B7280]" /> {item.location}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#6B7280]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                      )}
                    </div>
                  </button>

                  {/* Description accordion */}
                  {isExpanded && (
                    <div className="mt-2 text-[14px] text-[#6B7280] leading-relaxed whitespace-pre-line">
                      {item.description}
                    </div>
                  )}

                  {/* Accommodation outside accordion */}
                  {item.accommodation && (
                    <div className="flex items-center gap-2 mt-2 bg-[#F9FAFB] p-6 rounded-md">
                      <Bed className="size-4 text-[#00A699]" />
                      <span className="text-base text-[#111928] font-semibold">Accommodation:</span>
                      <span className="text-[13px] text-[#6B7280] text-center font-medium">
                        {item.accommodation}
                      </span>
                    </div>
                  )}

                  {/* Meals */}
                  {item.meals && item.meals.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-1">
                      {item.meals.map((meal, i) => (
                        <span
                          key={i}
                          className="text-[12px] px-2 py-0.5 bg-[#F3F4F6] rounded-md text-[#6B7280]"
                        >
                          {meal}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
