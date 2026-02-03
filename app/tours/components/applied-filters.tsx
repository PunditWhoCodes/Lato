"use client"

import { X } from "lucide-react"

interface AppliedFilter {
  id: string
  label: string
  type: string
}

interface AppliedFiltersProps {
  filters: AppliedFilter[]
  onRemoveFilter: (id: string, type: string) => void
  onClearAll: () => void
}

export function AppliedFilters({
  filters,
  onRemoveFilter,
  onClearAll,
}: AppliedFiltersProps) {
  if (filters.length === 0) return null

  return (
    <div className="mb-8 bg-white p-6">
      {/* Title */}
      <h3 className="font-poppins font-medium text-[14px] text-[#1C1B1F] mb-4">
        Applied Filters
      </h3>

      {/* Filters list */}
      <div className="flex flex-col gap-4">
        {filters.map((filter) => (
          <div
            key={`${filter.type}-${filter.id}`}
            className="flex items-center justify-between"
          >
            <span className="text-[14px] text-[#1C1B1F]">
              {filter.label}
            </span>

            <button
              onClick={() => onRemoveFilter(filter.id, filter.type)}
              aria-label="Remove filter"
              className="p-1 hover:opacity-60 transition cursor-pointer"
            >
              <X className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>
        ))}
      </div>

      {/* Clear all */}
      <button
        onClick={onClearAll}
        className="mt-6 w-full rounded-full bg-[#EFEFEF] py-3 text-center text-[14px] font-medium text-[#00A792] hover:bg-[#E5E5E5] transition cursor-pointer"
      >
        Clear all
      </button>
    </div>
  )
}
