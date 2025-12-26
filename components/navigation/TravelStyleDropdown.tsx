"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"

const travelStyles = [
  {
    category: "Adventure",
    items: [
      "Bungee Jumping",
      "Hiking & Trekking",
      "Mountain Biking",
      "Rock Climbing",
      "Skydiving",
    ],
  },
  {
    category: "Cultural",
    items: [
      "Architecture",
      "Art & Museums",
      "Festivals",
      "Food & Wine",
      "Historical Tours",
    ],
  },
  {
    category: "Family",
    items: [
      "Beach Resorts",
      "City Breaks",
      "Educational Tours",
      "Kid-Friendly",
      "Theme Parks",
    ],
  },
  {
    category: "Nature",
    items: [
      "Bird Watching",
      "Camping",
      "Eco Tours",
      "National Parks",
    ],
  },
  {
    category: "Relaxation",
    items: [
      "Beach Holidays",
      "Cruise Ships",
      "Luxury Resorts",
      "Spa Retreats",
      "Wellness Tours",
    ],
  },
]

interface TravelStyleDropdownTriggerProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function TravelStyleDropdownTrigger({
  isOpen,
  onOpen,
}: TravelStyleDropdownTriggerProps) {
  return (
    <button
      onMouseEnter={onOpen}
      className={`flex items-center gap-1 font-normal text-[15px] transition-colors ${
        isOpen ? "text-[#00A792]" : "text-gray-700 hover:text-black"
      }`}
    >
      Travel Style
      {isOpen ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  )
}

interface TravelStyleDropdownPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function TravelStyleDropdownPanel({ isOpen, onClose }: TravelStyleDropdownPanelProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <div
      className="absolute left-0 right-0 top-full bg-[#F9FAFB] border-t border-gray-100 shadow-sm z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Travel Style Categories */}
          <div className="flex-1 grid grid-cols-5 gap-8">
            {travelStyles.map((style) => (
              <div key={style.category}>
                <h4 className="font-semibold text-[#1C1B1F] mb-4">
                  {style.category}
                </h4>
                <ul className="space-y-3">
                  {style.items.map((item) => (
                    <li key={item}>
                      <span
                        onMouseEnter={() => setHoveredItem(item)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`text-[15px] transition-colors cursor-default ${
                          hoveredItem === item
                            ? "text-[#00A792]"
                            : "text-[#1C1B1F]"
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Image */}
          <div className="w-[300px] h-[220px] relative rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src="/cta-img.jpg"
              alt="Travel destination"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
