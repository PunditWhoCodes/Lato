"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react"

/* ---------- TYPES ---------- */

interface ListingFiltersSidebarProps {
  selectedDestination: string
  setSelectedDestination: (destination: string) => void

  priceType: "person" | "day"
  setPriceType: (type: "person" | "day") => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void

  selectedGroup: string[]
  setSelectedGroup: (group: string[]) => void

  selectedBestFor: string[]
  setSelectedBestFor: (bestFor: string[]) => void

  selectedTourStyle: string[]
  setSelectedTourStyle: (style: string[]) => void

  operatorSearch: string
  setOperatorSearch: (search: string) => void

  tourStyleRadio: string
  setTourStyleRadio: (style: string) => void

  durationMin: string
  setDurationMin: (min: string) => void
  durationMax: string
  setDurationMax: (max: string) => void

  expandedTravelStyles: string[]
  setExpandedTravelStyles: (styles: string[]) => void
  selectedTravelStyleTypes: string[]
  setSelectedTravelStyleTypes: (types: string[]) => void

  selectedMonth: string
  setSelectedMonth: (month: string) => void
  selectedYear: number
  setSelectedYear: (year: number) => void
  selectedDays: number[]
  setSelectedDays: (days: number[]) => void

  dateType: "start" | "end"
  setDateType: (type: "start" | "end") => void

  startDate: number | null
  setStartDate: (day: number | null) => void
  endDate: number | null
  setEndDate: (day: number | null) => void

  onApply: () => void
  onReset: () => void
}

/* ---------- CONSTANTS ---------- */

const DESTINATIONS = ["Peru", "Nepal", "Italy", "Thailand", "Greece"]
const GROUP_OPTIONS = ["Solo", "Couple", "Family", "Group", "Private"]
const BEST_FOR_OPTIONS = ["First-timers", "Solo Travelers", "Couples", "Friends", "Seniors"]
const TOUR_STYLE_OPTIONS = ["Guided Tour", "Self-Guided", "Private Tour", "Local Expert"]
const TOUR_OPERATORS = ["Brazil", "Peru", "Colombia", "Argentina", "Chile"]

const TRAVEL_STYLE_CATEGORIES = [
  { name: "Adventure", types: ["Bungee Jumping", "Hiking & Trekking", "Mountain Biking", "Rock Climbing", "Skydiving"] },
  { name: "Cultural", types: ["Architecture", "Festivals", "Food & Wine"] },
  { name: "Family", types: ["Kid-Friendly", "Theme Parks"] },
  { name: "Nature", types: ["Wildlife Safari", "Camping"] },
  { name: "Calm Escape", types: ["Yoga Retreats", "Spa Retreats"] },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

/* ---------- COMPONENT ---------- */

export function ListingFiltersSidebar({
  selectedDestination,
  setSelectedDestination,
  priceType,
  setPriceType,
  priceRange,
  setPriceRange,
  selectedGroup,
  setSelectedGroup,
  selectedBestFor,
  setSelectedBestFor,
  selectedTourStyle,
  setSelectedTourStyle,
  tourStyleRadio,
  setTourStyleRadio,
  expandedTravelStyles,
  setExpandedTravelStyles,
  selectedTravelStyleTypes,
  setSelectedTravelStyleTypes,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  dateType,
  setDateType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApply,
  onReset,
}: ListingFiltersSidebarProps) {
  const [openDestination, setOpenDestination] = useState(false)
  const [openOperator, setOpenOperator] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState("Brazil")
  const [travelerRange, setTravelerRange] = useState([3, 15])
  const [durationRange, setDurationRange] = useState([5, 21])

  const toggleValue = (value: string, list: string[], setter: (v: string[]) => void) =>
    list.includes(value)
      ? setter(list.filter((v) => v !== value))
      : setter([...list, value])

  const daysInMonth = new Date(selectedYear, MONTHS.indexOf(selectedMonth) + 1, 0).getDate()
  const firstDay = new Date(selectedYear, MONTHS.indexOf(selectedMonth), 1).getDay()

  const handlePrevMonth = () => {
    const currentIndex = MONTHS.indexOf(selectedMonth)
    if (currentIndex === 0) {
      setSelectedMonth(MONTHS[11])
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(MONTHS[currentIndex - 1])
    }
  }

  const handleNextMonth = () => {
    const currentIndex = MONTHS.indexOf(selectedMonth)
    if (currentIndex === 11) {
      setSelectedMonth(MONTHS[0])
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(MONTHS[currentIndex + 1])
    }
  }

  const handleDayClick = (day: number) => {
    if (dateType === "start") {
      setStartDate(day)
    } else {
      setEndDate(day)
    }
  }

  return (
    <aside className="w-full lg:w-[280px] bg-white p-5 rounded-xl border border-[#E5E5E5]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-[18px] text-[#1C2B38]">Filter</h2>
        <button onClick={onReset} className="text-[#00A792] text-[14px] font-medium cursor-pointer">
          Reset all
        </button>
      </div>

      {/* Destination */}
      <Section title="Destination">
        <div className="relative">
          <button
            onClick={() => setOpenDestination(!openDestination)}
            className="w-full flex justify-between items-center pb-2 border-b border-[#E5E5E5] text-[14px] text-[#1C2B38] cursor-pointer"
          >
            {selectedDestination}
            <ChevronDown size={18} className="text-[#778088]" />
          </button>

          {openDestination && (
            <div className="absolute top-full left-0 right-0 bg-white border border-[#E5E5E5] rounded-lg mt-1 shadow-lg z-10">
              {DESTINATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setSelectedDestination(d)
                    setOpenDestination(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-[#F7F7F7] text-[14px] first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
                    selectedDestination === d ? "text-[#00A792] bg-[#F0FAF8]" : "text-[#1C2B38]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price toggle */}
        <div className="mt-5 bg-[#F5F5F5] rounded-full p-1 flex">
          {["person", "day"].map((t) => (
            <button
              key={t}
              onClick={() => setPriceType(t as "person" | "day")}
              className={`flex-1 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                priceType === t
                  ? "bg-white shadow-sm text-[#1C2B38]"
                  : "text-[#778088]"
              }`}
            >
              {t === "person" ? "Per Person" : "Per day"}
            </button>
          ))}
        </div>

        {/* Price slider */}
        <div className="mt-4">
          <DualRangeSlider
            min={2000}
            max={12000}
            values={priceRange}
            onChange={setPriceRange}
            formatLabel={(v, type) => type === "min" ? `Min. $${v.toLocaleString()}` : `$${v.toLocaleString()}+`}
          />
        </div>
      </Section>

      {/* Group */}
      <Section title="Group">
        <div className="space-y-3">
          {GROUP_OPTIONS.map((g) => (
            <CustomCheckbox
              key={g}
              label={g}
              checked={selectedGroup.includes(g)}
              onChange={() => toggleValue(g, selectedGroup, setSelectedGroup)}
            />
          ))}
        </div>
      </Section>

      {/* Best For */}
      <Section title="Best For">
        <div className="space-y-3">
          {BEST_FOR_OPTIONS.map((b) => (
            <CustomCheckbox
              key={b}
              label={b}
              checked={selectedBestFor.includes(b)}
              onChange={() => toggleValue(b, selectedBestFor, setSelectedBestFor)}
            />
          ))}
        </div>
      </Section>

      {/* Tour Style */}
      <Section title="Tour Style">
        <div className="space-y-3">
          {TOUR_STYLE_OPTIONS.map((s) => (
            <CustomCheckbox
              key={s}
              label={s}
              checked={selectedTourStyle.includes(s)}
              onChange={() => toggleValue(s, selectedTourStyle, setSelectedTourStyle)}
            />
          ))}
        </div>
      </Section>

      {/* Tour Operators */}
      <Section title="Tour Operators">
        <div className="relative">
          <button
            onClick={() => setOpenOperator(!openOperator)}
            className="w-full flex justify-between items-center pb-2 border-b border-[#E5E5E5] text-[14px] text-[#1C2B38] cursor-pointer"
          >
            {selectedOperator}
            <ChevronDown size={18} className="text-[#778088]" />
          </button>

          {openOperator && (
            <div className="absolute top-full left-0 right-0 bg-white border border-[#E5E5E5] rounded-lg mt-1 shadow-lg z-10">
              {TOUR_OPERATORS.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setSelectedOperator(o)
                    setOpenOperator(false)
                  }}
                  className={`w-full text-left px-4 py-2.5 hover:bg-[#F7F7F7] text-[14px] first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
                    selectedOperator === o ? "text-[#00A792] bg-[#F0FAF8]" : "text-[#1C2B38]"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Tour Style Radio with Count */}
      <Section title="Tour Style">
        <div className="space-y-3">
          <CustomCheckbox
            label="Group"
            checked={tourStyleRadio === "Group"}
            onChange={() => setTourStyleRadio(tourStyleRadio === "Group" ? "" : "Group")}
            count={5690}
          />

          {tourStyleRadio === "Group" && (
            <div className="pl-0 mt-3">
              <p className="text-[12px] text-[#778088] mb-2">How Many Travelers?</p>
              <DualRangeSlider
                min={3}
                max={20}
                values={travelerRange}
                onChange={setTravelerRange}
                formatLabel={(v, type) => type === "min" ? `Min. ${v}` : `${v}+`}
              />
            </div>
          )}

          <CustomCheckbox
            label="Private"
            checked={tourStyleRadio === "Private"}
            onChange={() => setTourStyleRadio(tourStyleRadio === "Private" ? "" : "Private")}
            count={3809}
          />
        </div>
      </Section>

      {/* Duration */}
      <Section title="Duration">
        <DualRangeSlider
          min={1}
          max={30}
          values={durationRange}
          onChange={setDurationRange}
          formatLabel={(v, type) => type === "min" ? `Min. ${v} days` : `${v}+ Days`}
        />
      </Section>

      {/* Travel Style Accordion */}
      <Section title="Travel Style">
        <div className="space-y-0">
          {TRAVEL_STYLE_CATEGORIES.map((cat, idx) => (
            <div key={cat.name} className={idx !== TRAVEL_STYLE_CATEGORIES.length - 1 ? "border-b border-[#E5E5E5]" : ""}>
              <button
                onClick={() =>
                  setExpandedTravelStyles(
                    expandedTravelStyles.includes(cat.name)
                      ? expandedTravelStyles.filter((c) => c !== cat.name)
                      : [...expandedTravelStyles, cat.name]
                  )
                }
                className="w-full flex justify-between items-center py-3 text-[14px] text-[#1C2B38] cursor-pointer"
              >
                {cat.name}
                {expandedTravelStyles.includes(cat.name) ? (
                  <ChevronUp size={18} className="text-[#778088]" />
                ) : (
                  <ChevronDown size={18} className="text-[#778088]" />
                )}
              </button>

              {expandedTravelStyles.includes(cat.name) && (
                <div className="pb-3 space-y-2.5">
                  {cat.types.map((t) => (
                    <CustomCheckbox
                      key={t}
                      label={t}
                      checked={selectedTravelStyleTypes.includes(t)}
                      onChange={() =>
                        toggleValue(t, selectedTravelStyleTypes, setSelectedTravelStyleTypes)
                      }
                      small
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Departure Date */}
      <Section title="Departure Month/Date">
        <input
          placeholder="Add Specific Date"
          className="w-full h-10 px-4 border border-[#E5E5E5] rounded-lg mb-4 text-[14px] text-[#1C2B38] placeholder:text-[#778088] focus:outline-none focus:border-[#00A792]"
        />

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setDateType("start")}
            className={`flex-1 min-w-0 py-2.5 px-2 rounded-full text-[11px] font-medium transition-all cursor-pointer text-center ${
              dateType === "start"
                ? "bg-[#00A792] text-white"
                : "border border-[#00A792] text-[#00A792]"
            }`}
          >
            Start Date*
          </button>
          <button
            onClick={() => setDateType("end")}
            className={`flex-1 min-w-0 py-2.5 px-2 rounded-full text-[11px] font-medium transition-all cursor-pointer text-center ${
              dateType === "end"
                ? "bg-[#00A792] text-white"
                : "border border-[#00A792] text-[#00A792]"
            }`}
          >
            End Date*
          </button>
        </div>

        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-3">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-[#F5F5F5] rounded cursor-pointer">
            <ChevronLeft size={18} className="text-[#778088]" />
          </button>
          <span className="font-medium text-[14px] text-[#1C2B38]">
            {selectedMonth} {selectedYear}
          </span>
          <button onClick={handleNextMonth} className="p-1 hover:bg-[#F5F5F5] rounded cursor-pointer">
            <ChevronRight size={18} className="text-[#778088]" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 text-center gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="text-[11px] text-[#778088] py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const isStartDate = dateType === "start" && startDate === day
            const isEndDate = dateType === "end" && endDate === day
            const isSelected = isStartDate || isEndDate
            const isInRange = startDate && endDate && day >= startDate && day <= endDate

            return (
              <button
                key={day}
                className={`h-8 w-8 rounded-full text-[12px] mx-auto transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#00A792] text-white"
                    : isInRange
                      ? "bg-[#E8F5F3] text-[#00A792]"
                      : "text-[#1C2B38] hover:bg-[#F5F5F5]"
                }`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Apply Button */}
      <div className="group mt-6">
        <button
          onClick={onApply}
          className="relative overflow-hidden w-full py-3.5 bg-black text-white rounded-full text-[14px] font-medium cursor-pointer"
        >
          <span className="relative z-10">Apply</span>
          <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
        </button>
      </div>
    </aside>
  )
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-[#E5E5E5] last:border-b-0">
      <h3 className="font-semibold text-[15px] text-[#1C2B38] mb-4">{title}</h3>
      {children}
    </div>
  )
}

function CustomCheckbox({
  label,
  checked,
  onChange,
  small,
  count,
}: {
  label: string
  checked?: boolean
  onChange?: () => void
  small?: boolean
  count?: number
}) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            checked
              ? "bg-[#00A792] border-[#00A792]"
              : "border-[#D1D5DB] group-hover:border-[#00A792]"
          }`}
        >
          {checked && <Check size={14} className="text-white" strokeWidth={3} />}
        </div>
        <span className={`${small ? "text-[13px]" : "text-[14px]"} text-[#1C2B38]`}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-[13px] text-[#778088]">{count}</span>
      )}
    </button>
  )
}

function DualRangeSlider({
  min,
  max,
  values,
  onChange,
  formatLabel,
}: {
  min: number
  max: number
  values: number[]
  onChange: (values: number[]) => void
  formatLabel: (value: number, type: "min" | "max") => string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState<"min" | "max" | null>(null)

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100

  const handleMouseDown = (handle: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(handle)
  }

  const handleTouchStart = (handle: "min" | "max") => (e: React.TouchEvent) => {
    e.preventDefault()
    setDragging(handle)
  }

  const handleMove = useCallback((clientX: number) => {
    if (!trackRef.current || !dragging) return

    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const value = Math.round(min + (percent / 100) * (max - min))

    if (dragging === "min") {
      onChange([Math.min(value, values[1] - 1), values[1]])
    } else {
      onChange([values[0], Math.max(value, values[0] + 1)])
    }
  }, [dragging, min, max, values, onChange])

  useEffect(() => {
    if (!dragging) return

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX)
    }
    const handleEnd = () => setDragging(null)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleEnd)
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleEnd)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleEnd)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleEnd)
    }
  }, [dragging, handleMove])

  // Handle click on track to move nearest handle
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const value = Math.round(min + (percent / 100) * (max - min))

    // Move the nearest handle
    const distToMin = Math.abs(value - values[0])
    const distToMax = Math.abs(value - values[1])

    if (distToMin <= distToMax) {
      onChange([Math.min(value, values[1] - 1), values[1]])
    } else {
      onChange([values[0], Math.max(value, values[0] + 1)])
    }
  }

  return (
    <div>
      <div className="flex justify-between text-[12px] text-[#778088] mb-3">
        <span>{formatLabel(values[0], "min")}</span>
        <span>{formatLabel(values[1], "max")}</span>
      </div>
      <div
        ref={trackRef}
        className="relative h-[4px] bg-[#E5E5E5] rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        <div
          className="absolute h-full bg-[#00A792] rounded-full pointer-events-none"
          style={{
            left: `${getPercent(values[0])}%`,
            right: `${100 - getPercent(values[1])}%`,
          }}
        />
        <div
          className="absolute -top-[6px] w-4 h-4 bg-white border-2 border-[#00A792] rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow touch-none"
          style={{ left: `calc(${getPercent(values[0])}% - 8px)` }}
          onMouseDown={handleMouseDown("min")}
          onTouchStart={handleTouchStart("min")}
        />
        <div
          className="absolute -top-[6px] w-4 h-4 bg-white border-2 border-[#00A792] rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow touch-none"
          style={{ left: `calc(${getPercent(values[1])}% - 8px)` }}
          onMouseDown={handleMouseDown("max")}
          onTouchStart={handleTouchStart("max")}
        />
      </div>
    </div>
  )
}

function SingleSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  const getPercent = (v: number) => ((v - min) / (max - min)) * 100

  const handleMove = useCallback((clientX: number) => {
    if (!trackRef.current || !dragging) return

    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    const newValue = Math.round(min + (percent / 100) * (max - min))
    onChange(newValue)
  }, [dragging, min, max, onChange])

  useEffect(() => {
    if (!dragging) return

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX)
    }
    const handleEnd = () => setDragging(false)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleEnd)
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleEnd)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleEnd)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleEnd)
    }
  }, [dragging, handleMove])

  // Handle click on track to move handle
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const newValue = Math.round(min + (percent / 100) * (max - min))
    onChange(newValue)
  }

  return (
    <div>
      <div className="flex justify-between text-[11px] text-[#778088] mb-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div
        ref={trackRef}
        className="relative h-[4px] bg-[#E5E5E5] rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        <div
          className="absolute h-full bg-[#00A792] rounded-full pointer-events-none"
          style={{ width: `${getPercent(value)}%` }}
        />
        <div
          className="absolute -top-[6px] w-4 h-4 bg-white border-2 border-[#00A792] rounded-full cursor-pointer shadow-sm hover:shadow-md transition-shadow touch-none"
          style={{ left: `calc(${getPercent(value)}% - 8px)` }}
          onMouseDown={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onTouchStart={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
        />
      </div>
    </div>
  )
}
