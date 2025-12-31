"use client"

import { useState, useMemo, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

interface DepartureDate {
  id: string
  fromLocation: string
  toLocation: string
  departureDate: Date
  returnDate: Date
  originalPrice: number
  price: number
  currency: string
  discountLabel?: string
}

interface TourAvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  departures?: DepartureDate[]
  tourTitle?: string
}

// Generate sample departure dates for demo
function generateSampleDepartures(): DepartureDate[] {
  const departures: DepartureDate[] = []
  const baseDate = new Date(2025, 11, 2) // Dec 2, 2025

  for (let i = 0; i < 20; i++) {
    const departureDate = new Date(baseDate)
    departureDate.setDate(baseDate.getDate() + i)

    const returnDate = new Date(departureDate)
    returnDate.setDate(departureDate.getDate() + 9) // 10-day tour

    departures.push({
      id: `dep-${i}`,
      fromLocation: "Lima",
      toLocation: "Lima",
      departureDate,
      returnDate,
      originalPrice: 1765,
      price: 1677,
      currency: "USD",
      discountLabel: "5% OFF TODAY"
    })
  }

  return departures
}

// Generate month options from Dec 2025 to Dec 2027
function generateMonthOptions(): { month: string; year: number; date: Date }[] {
  const months: { month: string; year: number; date: Date }[] = []
  const startDate = new Date(2025, 11, 1) // Dec 2025
  const endDate = new Date(2027, 11, 1) // Dec 2027

  let current = new Date(startDate)
  while (current <= endDate) {
    months.push({
      month: current.toLocaleString('en-US', { month: 'short' }),
      year: current.getFullYear(),
      date: new Date(current)
    })
    current.setMonth(current.getMonth() + 1)
  }

  return months
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function TourAvailabilityModal({
  isOpen,
  onClose,
  departures: propDepartures,
  tourTitle
}: TourAvailabilityModalProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  const departures = propDepartures || generateSampleDepartures()
  const monthOptions = useMemo(() => generateMonthOptions(), [])

  // Handle client-side mounting for portal
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Filter departures based on selected month
  const filteredDepartures = useMemo(() => {
    if (!selectedMonth) return departures

    return departures.filter(dep => {
      return dep.departureDate.getMonth() === selectedMonth.getMonth() &&
             dep.departureDate.getFullYear() === selectedMonth.getFullYear()
    })
  }, [departures, selectedMonth])

  if (!isOpen || !mounted) return null

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl w-full max-w-[1100px] max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-2">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1B1F]">Tour Availability</h2>
            <p className="text-[#6B7280] mt-1 text-sm">
              Select your preferred departure date and secure your spot
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6 p-6 pt-4 max-h-[calc(90vh-100px)] overflow-hidden">
          {/* Left: Month Selector */}
          <div className="lg:w-[55%] flex-shrink-0">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
              {/* All Dates Button */}
              <button
                onClick={() => setSelectedMonth(null)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedMonth === null
                    ? "bg-[#00A792] text-white"
                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                }`}
              >
                <div className="text-center">
                  <div className="font-medium">All</div>
                  <div className="text-xs opacity-80">Dates</div>
                </div>
              </button>

              {/* Month Buttons */}
              {monthOptions.map((option, index) => {
                const isSelected = selectedMonth?.getMonth() === option.date.getMonth() &&
                                   selectedMonth?.getFullYear() === option.date.getFullYear()
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedMonth(option.date)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-[#00A792] text-white"
                        : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium">{option.month}</div>
                      <div className="text-xs opacity-80">{option.year}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Departure List */}
          <div className="lg:w-[45%] overflow-y-auto pr-2 space-y-3 max-h-[400px] lg:max-h-[500px]">
            {filteredDepartures.length === 0 ? (
              <div className="text-center py-8 text-[#6B7280]">
                No departures available for the selected month
              </div>
            ) : (
              filteredDepartures.map((departure) => (
                <div
                  key={departure.id}
                  className="flex items-center justify-between py-3 border-b border-[#E5E5E5] last:border-b-0 cursor-pointer hover:bg-[#F9FAFB] px-3 rounded-lg transition-colors"
                >
                  {/* From/To Info */}
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-[#6B7280]">From {departure.fromLocation}</p>
                      <p className="text-[#00A792] font-medium text-sm">
                        {formatDate(departure.departureDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">To {departure.toLocation}</p>
                      <p className="text-[#00A792] font-medium text-sm">
                        {formatDate(departure.returnDate)}
                      </p>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="text-right flex items-center gap-3">
                    {departure.discountLabel && (
                      <span className="bg-[#E91E63] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                        {departure.discountLabel}
                      </span>
                    )}
                    <div>
                      {departure.originalPrice > departure.price && (
                        <span className="text-[#9CA3AF] text-xs line-through mr-2">
                          {departure.currency} {departure.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-[#00A792] font-bold">
                        {departure.currency} {departure.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
