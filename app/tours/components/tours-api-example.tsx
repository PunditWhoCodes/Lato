/**
 * Example Component: Tours with API Integration
 * This demonstrates how to use the new API integration
 */

"use client"

import { useState } from "react"
import { useToursData } from "../hooks/useToursData"
import { TourGridCard, TourListCard, NoToursFound } from "."
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ToursAPIExample() {
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  // Fetch tours using the custom hook
  const { tours, isLoading, isError, error, totalCount, refetch } = useToursData({
    page,
    itemsPerPage: 10,
    countries: "US", // Filter by country (optional)
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading tours...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <p className="text-red-500">Error loading tours: {error?.message}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  if (tours.length === 0) {
    return <NoToursFound onClearFilters={() => refetch()} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Available Tours</h2>
          <p className="text-muted-foreground">
            Showing {tours.length} of {totalCount} tours
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            List
          </Button>
        </div>
      </div>

      {/* Tours Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourGridCard
              key={tour.id}
              tour={tour}
              onClick={(id, e) => {
                e.preventDefault()
                window.location.href = `/tours/${id}`
              }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tours.map((tour) => (
            <TourListCard
              key={tour.id}
              tour={tour}
              onClick={(id, e) => {
                e.preventDefault()
                window.location.href = `/tours/${id}`
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="flex items-center px-4">
          Page {page} of {Math.ceil(totalCount / 10)}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(totalCount / 10)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
