"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Bed, MapPin, Flag, Clock, Activity } from "lucide-react"
import Image from "next/image"
import type { ItineraryDay as APIItineraryDay } from "@/types"

// Legacy interface for fallback data
interface LegacyItineraryDay {
  day: number
  title: string
  location: string
  description: string
  accommodation?: string
  meals?: string[]
}

// Unified display item type
interface DisplayItineraryItem {
  day: number
  title: string
  location: string
  description: string
  accommodation?: string
  accommodationType?: string
  accommodationRating?: number
  accommodationImages: string[]
  activities: Array<{
    title: string
    description?: string
    time?: string | null
    isOptional?: boolean
  }>
  image?: string
  nrOfNights: number
}

interface TourItineraryProps {
  itinerary?: LegacyItineraryDay[] // Legacy format
  itineraryDays?: APIItineraryDay[] // New format from API
  nrOfDays?: number
}

// Default fallback itinerary data
const defaultItinerary: LegacyItineraryDay[] = [
  {
    day: 1,
    title: "Arrival",
    location: "Arrival City",
    description: "Welcome to your adventure! Transfer from airport to hotel.",
    accommodation: "Hotel",
    meals: ["Dinner"]
  },
  {
    day: 2,
    title: "Exploration Day",
    location: "City Center",
    description: "Guided tour of the main attractions and landmarks.",
    accommodation: "Hotel",
    meals: ["Breakfast", "Lunch"]
  }
]

export function TourItinerary({
  itinerary,
  itineraryDays = [],
  nrOfDays
}: TourItineraryProps) {
  // Use API itineraryDays if available, otherwise fall back to legacy format
  const hasApiData = itineraryDays && itineraryDays.length > 0

  // Helper to convert legacy format to display format
  const mapLegacyToDisplay = (d: LegacyItineraryDay): DisplayItineraryItem => ({
    day: d.day,
    title: d.title,
    location: d.location,
    description: d.description,
    accommodation: d.accommodation,
    accommodationType: undefined,
    accommodationRating: undefined,
    accommodationImages: [],
    activities: [],
    image: undefined,
    nrOfNights: 0
  })

  // Convert API data to display format
  const displayItinerary: DisplayItineraryItem[] = hasApiData
    ? itineraryDays.map(day => ({
        day: day.dayNumber,
        title: day.title,
        location: day.location?.name || 'Unknown',
        description: day.description,
        accommodation: day.accommodation?.name,
        accommodationType: day.accommodation?.type,
        accommodationRating: day.accommodation?.rating,
        accommodationImages: day.accommodation?.images || [],
        activities: day.activities || [],
        image: day.image,
        nrOfNights: day.nrOfNights
      }))
    : (itinerary ? itinerary.map(mapLegacyToDisplay) : defaultItinerary.map(mapLegacyToDisplay))

  const [expandedDays, setExpandedDays] = useState<number[]>(displayItinerary.map(d => d.day))
  const [collapsed, setCollapsed] = useState(false)

  const toggleDay = (day: number) => {
    setExpandedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  // Show message if no itinerary data
  if (displayItinerary.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-xl font-semibold text-[#1C1B1F] mb-4">Itinerary</h2>
        <p className="text-[#6B7280]">
          {nrOfDays
            ? `This tour spans ${nrOfDays} days. Detailed itinerary coming soon.`
            : "Detailed itinerary coming soon."}
        </p>
      </div>
    )
  }

  return (
    <div className="py-8 relative">
      {/* Collapse all button top-right */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1C1B1F] mr-2">Itinerary</h2>
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
        {displayItinerary.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === displayItinerary.length - 1
          const isExpanded = expandedDays.includes(item.day) && !collapsed

          return (
            <div key={item.day} className="relative">
              {/* Vertical line - centered through dots */}
              {index !== displayItinerary.length - 1 && (
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
                    <div className="mt-3 space-y-4">
                      {/* Day Image if available */}
                      {item.image && (
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Description */}
                      {item.description && (
                        <div
                          className="text-[14px] text-[#6B7280] leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}

                      {/* Activities */}
                      {item.activities && item.activities.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-[#1C1B1F] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#00A699]" />
                            Activities
                          </h4>
                          <div className="space-y-2">
                            {item.activities.map((activity, actIdx) => (
                              <div
                                key={actIdx}
                                className="flex items-start gap-2 text-[13px] text-[#6B7280] bg-[#F9FAFB] p-3 rounded-lg"
                              >
                                {activity.time && (
                                  <span className="flex items-center gap-1 text-[#00A699] shrink-0">
                                    <Clock className="w-3 h-3" />
                                    {activity.time}
                                  </span>
                                )}
                                <div>
                                  <span className="font-medium text-[#1C1B1F]">
                                    {activity.title}
                                    {activity.isOptional && (
                                      <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded">
                                        Optional
                                      </span>
                                    )}
                                  </span>
                                  {activity.description && (
                                    <p className="mt-1">{activity.description}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Accommodation outside accordion */}
                  {item.accommodation && (
                    <div className="flex items-center gap-2 mt-3 bg-[#F9FAFB] p-4 rounded-md">
                      <Bed className="size-4 text-[#00A699] shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm text-[#111928] font-semibold">
                          {item.accommodation}
                        </span>
                        {item.accommodationType && (
                          <span className="text-[12px] text-[#6B7280] ml-2">
                            ({item.accommodationType})
                          </span>
                        )}
                        {item.accommodationRating && item.accommodationRating > 0 && (
                          <span className="text-[12px] text-[#6B7280] ml-2">
                            Rating: {item.accommodationRating}/10
                          </span>
                        )}
                        {item.nrOfNights > 0 && (
                          <span className="text-[12px] text-[#6B7280] ml-2">
                            ({item.nrOfNights} {item.nrOfNights === 1 ? 'night' : 'nights'})
                          </span>
                        )}
                      </div>
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
