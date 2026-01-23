"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SectionNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onWriteReview?: () => void
}

const sections = [
  { id: "reviews", label: "Reviews" },
  { id: "find-tours", label: "Find Tours" },
  { id: "about", label: "About" },
  { id: "guides", label: "Guides" },
]

export function SectionNav({
  activeSection,
  onSectionChange,
  onWriteReview,
}: SectionNavProps) {
  return (
    <div className="flex flex-col gap-[10px] lg:gap-4 py-[14px] lg:py-6">
      {/* Row 1: Navigation Tabs - Centered */}
      <div className="flex justify-center">
        {/* Mobile: p-[4.52px] gap-[4.52px] rounded-[45.25px] border */}
        {/* Desktop: original styling */}
        <nav className="flex items-center gap-[4.5px] lg:gap-8 bg-white rounded-[45px] lg:rounded-full p-[4.5px] lg:px-8 lg:py-3 border border-[#E5E7EB]">
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
                  : "text-black hover:text-[#00A792] hover:bg-[#7BBCB038]"
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Row 2: Write Review Button - Right aligned */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={onWriteReview}
          className="rounded-full border-[#00A792] text-[#00A792] hover:bg-[#00A792] hover:text-white font-poppins font-light lg:font-extralight text-[10px] lg:text-sm px-[14px] lg:px-5 h-[28px] lg:h-9"
        >
          Write Your Review
        </Button>
      </div>
    </div>
  )
}
