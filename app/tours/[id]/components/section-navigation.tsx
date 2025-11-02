"use client"

import { Button } from "@/components/ui/button"
import { SectionNavigationProps } from "../types"

export function SectionNavigation({ activeSection, onSectionClick }: SectionNavigationProps) {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "company", label: "Company" },
    { id: "reviews", label: "Reviews" },
  ]

  return (
    <div className="sticky top-20 z-30 bg-background/95 dark:bg-background/98 backdrop-blur supports-backdrop-filter:bg-background/60 dark:supports-backdrop-filter:bg-background/70 border border-border rounded-lg p-2 transition-colors">
      <div className="grid grid-cols-4 gap-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            onClick={() => onSectionClick(section.id)}
            className="justify-center"
          >
            {section.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
