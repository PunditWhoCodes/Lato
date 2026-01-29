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

  const [collapsedDays, setCollapsedDays] = useState<number[]>([])
  const [allCollapsed, setAllCollapsed] = useState(false)

  const toggleDay = (day: number) => {
    setCollapsedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const isItemExpanded = (day: number) => !collapsedDays.includes(day) && !allCollapsed

  // Show message if no itinerary data
  if (displayItinerary.length === 0) {
    return (
      <div className="py-[21px] lg:py-8">
        <h2 className="font-poppins text-[12px] lg:text-xl font-semibold text-[#1C1B1F] mb-[14px] lg:mb-4">Itinerary</h2>
        <p className="font-poppins text-[10px] lg:text-base text-[#6B7280]">
          {nrOfDays
            ? `This tour spans ${nrOfDays} days. Detailed itinerary coming soon.`
            : "Detailed itinerary coming soon."}
        </p>
      </div>
    )
  }

  return (
    <div className="py-[21px] lg:py-8 relative">
      {/* Collapse all button top-right */}
      <div className="flex justify-between mb-[14px] lg:mb-4">
        <h2 className="font-poppins text-[12px] lg:text-xl font-semibold text-[#1C1B1F] mr-2">Itinerary</h2>
        <button
          onClick={() => setAllCollapsed(!allCollapsed)}
          className="flex items-center gap-[4px] font-poppins text-[9px] lg:text-[14px] text-[#374151] rounded-full border border-[#E5E7EB] font-medium px-[10px] py-[6px] lg:p-2"
        >
          {allCollapsed ? "Expand all" : "Collapse all"}
        </button>
      </div>

      <div className="relative">
        {displayItinerary.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === displayItinerary.length - 1
          const isExpanded = isItemExpanded(item.day)

          return (
            <div key={item.day} className="relative">
              {/* Vertical line - centered through dots */}
              {index !== displayItinerary.length - 1 && (
                <div
                  className="absolute left-[7px] lg:left-[9px] top-[18px] lg:top-[24px] bottom-0 w-[1.5px] lg:w-[2px] bg-[#00A699]"
                />
              )}

              <div className="flex gap-[10px] lg:gap-3 pb-[18px] lg:pb-6">
                {/* Dot or special icons - fixed width container for alignment */}
                <div className="relative z-10 shrink-0 w-[14px] h-[14px] lg:w-5 lg:h-5 flex items-center justify-center">
                  {isFirst ? (
                    <MapPin className="w-[14px] h-[14px] lg:w-5 lg:h-5 text-[#00A699]" />
                  ) : isLast ? (
                    <div className="w-[14px] h-[14px] lg:w-5 lg:h-5 rounded-full bg-[#EF4444] flex items-center justify-center">
                      <Flag className="w-[8px] h-[8px] lg:w-3 lg:h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-[8px] h-[8px] lg:w-3 lg:h-3 rounded-full bg-[#00A699]" />
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
                        <span className="font-poppins text-[10px] lg:text-base font-semibold text-[#1C1B1F]">{`Day ${item.day} -`}</span> {" "}
                        <span className="font-poppins text-[10px] lg:text-base font-semibold text-[#1C1B1F]">{item.title}</span>
                        <p className="font-poppins text-[9px] lg:text-[13px] text-[#6B7280] flex items-center gap-[4px] mt-[2px]">
                          <MapPin className="w-[10px] h-[10px] lg:w-3 lg:h-3 text-[#6B7280]" /> {item.location}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-[12px] h-[12px] lg:w-4 lg:h-4 text-[#6B7280]" />
                      ) : (
                        <ChevronDown className="w-[12px] h-[12px] lg:w-4 lg:h-4 text-[#6B7280]" />
                      )}
                    </div>
                  </button>

                  {/* Description accordion */}
                  {isExpanded && (
                    <div className="mt-[10px] lg:mt-3 space-y-[12px] lg:space-y-4">
                      {/* Day Image if available */}
                      {item.image && (
                        <div className="relative w-full h-[120px] lg:h-48 rounded-[6px] lg:rounded-lg overflow-hidden">
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
                          className="font-poppins text-[9px] lg:text-[14px] text-[#6B7280] leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}

                      {/* Activities */}
                      {item.activities && item.activities.length > 0 && (
                        <div className="space-y-[8px] lg:space-y-2">
                          <h4 className="font-poppins text-[10px] lg:text-sm font-medium text-[#1C1B1F] flex items-center gap-[6px] lg:gap-2">
                            <Activity className="w-[12px] h-[12px] lg:w-4 lg:h-4 text-[#00A699]" />
                            Activities
                          </h4>
                          <div className="space-y-[6px] lg:space-y-2">
                            {item.activities.map((activity, actIdx) => (
                              <div
                                key={actIdx}
                                className="flex items-start gap-[6px] lg:gap-2 font-poppins text-[9px] lg:text-[13px] text-[#6B7280] bg-[#F9FAFB] p-[10px] lg:p-3 rounded-[6px] lg:rounded-lg"
                              >
                                {activity.time && (
                                  <span className="flex items-center gap-[3px] text-[#00A699] shrink-0">
                                    <Clock className="w-[10px] h-[10px] lg:w-3 lg:h-3" />
                                    {activity.time}
                                  </span>
                                )}
                                <div>
                                  <span className="font-medium text-[#1C1B1F]">
                                    {activity.title}
                                    {activity.isOptional && (
                                      <span className="ml-[6px] text-[8px] lg:text-xs bg-gray-200 px-[6px] py-[2px] rounded">
                                        Optional
                                      </span>
                                    )}
                                  </span>
                                  {activity.description && (
                                    <div
                                      className="mt-[4px] [&>p]:m-0"
                                      dangerouslySetInnerHTML={{ __html: activity.description }}
                                    />
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
                    <div className="flex items-center gap-[6px] lg:gap-2 mt-[10px] lg:mt-3 bg-[#F9FAFB] p-[12px] lg:p-4 rounded-[6px] lg:rounded-md">
                      <Bed className="w-[12px] h-[12px] lg:w-4 lg:h-4 text-[#00A699] shrink-0" />
                      <div className="flex-1">
                        <span className="font-poppins text-[10px] lg:text-sm text-[#111928] font-semibold">
                          {item.accommodation}
                        </span>
                        {item.accommodationType && (
                          <span className="font-poppins text-[9px] lg:text-[12px] text-[#6B7280] ml-[6px]">
                            ({item.accommodationType})
                          </span>
                        )}
                        {item.nrOfNights > 0 && (
                          <span className="font-poppins text-[9px] lg:text-[12px] text-[#6B7280] ml-[6px]">
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
