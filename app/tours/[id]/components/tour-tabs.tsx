"use client"

import { cn } from "@/lib/utils"

interface TourTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "included", label: "What's included" },
  { id: "itinerary", label: "Itinerary" },
  { id: "meeting", label: "Meeting Point" },
]

export function TourTabs({ activeTab, onTabChange }: TourTabsProps) {
  return (
    <div className="border-b border-[#E5E5E5]">
      <nav className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-[#00A699]"
                : "text-[#6B7280] hover:text-[#1C1B1F]"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A699]" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
