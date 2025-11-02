"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3X3, List } from "lucide-react"
import type { ViewMode, SortByType } from "../types"

interface ToursToolbarProps {
  totalResults: number
  totalTours: number
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  sortBy: SortByType
  setSortBy: (sort: SortByType) => void
}

export function ToursToolbar({
  totalResults,
  totalTours,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
}: ToursToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
      <p className="text-sm sm:text-base text-muted-foreground">
        Showing {totalResults} of {totalTours} tours
      </p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        {/* Grid/List Toggle Buttons */}
        <div className="flex items-center border rounded-lg p-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex-1 sm:flex-none px-3"
          >
            <List className="w-4 h-4" />
            <span className="ml-2 sm:hidden">List</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="flex-1 sm:flex-none px-3"
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="ml-2 sm:hidden">Grid</span>
          </Button>
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortByType)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
