"use client"

import { cn } from "@/lib/utils"

interface SectionNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = [
  { id: "highlights", label: "Highlights" },
  { id: "itinerary", label: "Itinerary" },
  { id: "company", label: "Company" },
  { id: "reviews", label: "Reviews" },
]

export function SectionNavigation({
  activeSection,
  onSectionChange,
}: SectionNavigationProps) {
  return (
    <div className="sticky top-20 z-40 py-6">
      <div className="flex justify-center">
        <nav className="flex items-center gap-4 md:gap-8 bg-white rounded-full px-4 md:px-8 py-3 border border-black/5 shadow-sm">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "font-poppins text-sm md:text-base transition-colors",
              activeSection === section.id
                ? "text-[#00A792] rounded-full bg-[#7BBCB038] px-4 py-1 border border-[#00A792]"
                : "text-black font-extralight hover:text-[#00A792] hover:rounded-full hover:bg-[#7BBCB038] px-4 py-1"
            )}
          >
            {section.label}
          </button>
        ))}
        </nav>
      </div>
    </div>
  )
}
