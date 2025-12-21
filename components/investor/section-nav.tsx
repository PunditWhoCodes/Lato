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
    <div className="flex flex-col gap-4 py-6">
      {/* Row 1: Navigation Tabs - Centered */}
      <div className="flex justify-center">
        <nav className="flex items-center gap-4 md:gap-8 bg-white rounded-full px-4 md:px-8 py-3 border border-black/5">
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

      {/* Row 2: Write Review Button - Right aligned */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={onWriteReview}
          className="rounded-full border-[#00A792] text-[#00A792] hover:bg-[#00A792] hover:text-white font-poppins font-extralight text-sm px-5 h-9"
        >
          Write Your Review
        </Button>
      </div>
    </div>
  )
}
