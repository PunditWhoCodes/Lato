"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface NoToursFoundProps {
  onClearFilters: () => void
}

export function NoToursFound({ onClearFilters }: NoToursFoundProps) {
  return (
    <div className="text-center py-8 sm:py-12 px-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
      </div>
      <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">No tours found</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md mx-auto">
        Try adjusting your search criteria or filters to find more tours.
      </p>
      <Button variant="outline" className="w-full sm:w-auto bg-transparent" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </div>
  )
}
