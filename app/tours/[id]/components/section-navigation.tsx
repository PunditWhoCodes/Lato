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
    <div className="sticky top-[48px] lg:top-20 z-40 py-[10px] lg:py-6 lg:bg-[#F7F7F7]">
      {/* Centered Navigation - Same style as investor section-nav */}
      <div className="flex justify-center">
        {/* Mobile: p-[4.52px] gap-[4.52px] rounded-[45.25px] border */}
        {/* Desktop: original styling */}
        <nav className="flex items-center gap-[4.5px] lg:gap-8 bg-white rounded-[45px] lg:rounded-full p-[4.5px] lg:px-8 lg:py-3 border border-[#E5E7EB] lg:shadow-sm">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "font-poppins transition-colors",
                // Mobile: h-[27.15px] rounded-[45.25px] text-[12px] font-light
                // Desktop: original styling
                "px-[14px] h-[27px] lg:px-4 lg:py-1 lg:h-auto rounded-[45px] lg:rounded-full",
                "text-[12px] lg:text-base font-light lg:font-normal",
                activeSection === section.id
                  ? "text-[#00A792] bg-[#7BBCB038] border border-[#00A792]"
                  : "text-black hover:text-[#00A792] hover:bg-[#7BBCB038] lg:font-extralight"
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
