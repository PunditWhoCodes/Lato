"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

/* ---------- COMPONENT ---------- */

export function ListingFiltersSidebar({
  selectedDestination,
  setSelectedDestination,
  priceType,
  setPriceType,
  selectedGroup,
  setSelectedGroup,
  selectedBestFor,
  setSelectedBestFor,
  selectedTourStyle,
  setSelectedTourStyle,
  operatorSearch,
  setOperatorSearch,
  tourStyleRadio,
  setTourStyleRadio,
  durationMin,
  setDurationMin,
  durationMax,
  setDurationMax,
  expandedTravelStyles,
  setExpandedTravelStyles,
  selectedTravelStyleTypes,
  setSelectedTravelStyleTypes,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  selectedDays,
  setSelectedDays,
  dateType,
  setDateType,
  onApply,
  onReset,
}: ListingFiltersSidebarProps) {
  const [openDestination, setOpenDestination] = useState(false)

  const toggleValue = (value: string, list: string[], setter: (v: string[]) => void) =>
    list.includes(value)
      ? setter(list.filter((v) => v !== value))
      : setter([...list, value])

  const daysInMonth = new Date(selectedYear, MONTHS.indexOf(selectedMonth) + 1, 0).getDate()
  const firstDay = new Date(selectedYear, MONTHS.indexOf(selectedMonth), 1).getDay()

  return (
    <aside className="w-full lg:w-[280px] bg-white p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="font-semibold text-[16px]">Filter</h2>
        <button onClick={onReset} className="text-[#00A792] text-[13px]">
          Reset all
        </button>
      </div>

      {/* Destination */}
      <Section title="Destination">
        <button
          onClick={() => setOpenDestination(!openDestination)}
          className="w-full flex justify-between items-center h-10 px-3 border rounded-lg text-[13px]"
        >
          {selectedDestination}
          <ChevronDown size={16} />
        </button>

        {openDestination && (
          <div className="border rounded-lg mt-1">
            {DESTINATIONS.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDestination(d)
                  setOpenDestination(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-[13px]"
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* Price toggle */}
        <div className="mt-4 bg-[#F1F1F1] rounded-full p-1 flex">
          {["person", "day"].map((t) => (
            <button
              key={t}
              onClick={() => setPriceType(t as any)}
              className={`flex-1 py-2 rounded-full text-[12px] ${
                priceType === t ? "bg-white shadow font-medium" : "text-gray-500"
              }`}
            >
              {t === "person" ? "Per Person" : "Per day"}
            </button>
          ))}
        </div>

        {/* Price slider (visual) */}
        <Slider min="Min. $2,000" max="Min. $12,000+" />
      </Section>

      {/* Group */}
      <Section title="Group">
        {GROUP_OPTIONS.map((g) => (
          <CheckboxRow
            key={g}
            label={g}
            checked={selectedGroup.includes(g)}
            onChange={() => toggleValue(g, selectedGroup, setSelectedGroup)}
          />
        ))}
      </Section>

      {/* Best For */}
      <Section title="Best For">
        {BEST_FOR_OPTIONS.map((b) => (
          <CheckboxRow
            key={b}
            label={b}
            checked={selectedBestFor.includes(b)}
            onChange={() => toggleValue(b, selectedBestFor, setSelectedBestFor)}
          />
        ))}
      </Section>

      {/* Tour Style */}
      <Section title="Tour Style">
        {TOUR_STYLE_OPTIONS.map((s) => (
          <CheckboxRow
            key={s}
            label={s}
            checked={selectedTourStyle.includes(s)}
            onChange={() => toggleValue(s, selectedTourStyle, setSelectedTourStyle)}
          />
        ))}
      </Section>

      {/* Tour Operators */}
      <Section title="Tour Operators">
        <div className="relative mb-3">
          <input
            placeholder="Search"
            value={operatorSearch}
            onChange={(e) => setOperatorSearch(e.target.value)}
            className="w-full h-10 px-3 pr-9 border rounded-lg text-[13px]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>

        {TOUR_OPERATORS.filter((o) =>
          o.toLowerCase().includes(operatorSearch.toLowerCase())
        ).map((o) => (
          <CheckboxRow key={o} label={o} />
        ))}
      </Section>

      {/* Tour Style Radio */}
      <Section title="Tour Style">
        <RadioGroup value={tourStyleRadio} onValueChange={setTourStyleRadio}>
          {["Group", "Private"].map((v) => (
            <div key={v} className="flex justify-between items-center text-[13px]">
              <div className="flex items-center gap-2">
                <RadioGroupItem value={v} />
                <Label>{v}</Label>
              </div>
              <span className="text-gray-400">{v === "Group" ? "5690" : "3809"}</span>
            </div>
          ))}
        </RadioGroup>
      </Section>

      {/* Duration */}
      <Section title="Duration">
        <div className="flex gap-2 mb-3">
          <input placeholder="Min" className="w-1/2 h-10 border rounded-lg px-3 text-[13px]" />
          <input placeholder="Max" className="w-1/2 h-10 border rounded-lg px-3 text-[13px]" />
        </div>
        <Slider min="Min. 10 days" max="21+ Days" />
      </Section>

      {/* Travel Style Accordion */}
      <Section title="Travel Style">
        {TRAVEL_STYLE_CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <button
              onClick={() =>
                setExpandedTravelStyles(
                  expandedTravelStyles.includes(cat.name)
                    ? expandedTravelStyles.filter((c) => c !== cat.name)
                    : [...expandedTravelStyles, cat.name]
                )
              }
              className="w-full flex justify-between py-2 font-medium text-[14px]"
            >
              {cat.name}
              {expandedTravelStyles.includes(cat.name) ? <ChevronDown /> : <ChevronRight />}
            </button>

            {expandedTravelStyles.includes(cat.name) && (
              <div className="pl-4 space-y-2">
                {cat.types.map((t) => (
                  <CheckboxRow
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
      </Section>

      {/* Departure Date */}
      <Section title="Departure Month/Date">
        <input
          placeholder="Add Specific Date"
          className="w-full h-10 px-3 border rounded-lg mb-3 text-[13px]"
        />

        <div className="flex gap-2 mb-3">
          <OutlineButton active={dateType === "start"} onClick={() => setDateType("start")}>
            Select Start Date*
          </OutlineButton>
          <OutlineButton active={dateType === "end"} onClick={() => setDateType("end")}>
            Select End Date*
          </OutlineButton>
        </div>

        <div className="flex justify-between items-center mb-2">
          <ChevronLeft />
          <span className="font-medium text-[13px]">
            {selectedMonth} {selectedYear}
          </span>
          <ChevronRight />
        </div>

        <div className="grid grid-cols-7 text-center gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={i} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const selected = selectedDays.includes(day)
            return (
              <button
                key={day}
                className={`h-8 w-8 rounded-full text-[12px] mx-auto ${
                  selected ? "bg-[#00A792] text-white" : "hover:bg-gray-100"
                }`}
                onClick={() =>
                  setSelectedDays(
                    selected
                      ? selectedDays.filter((d) => d !== day)
                      : [...selectedDays, day]
                  )
                }
              >
                {day}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Apply */}
      <div className="group mt-6">
        <button
          onClick={onApply}
          className="relative overflow-hidden w-full py-3 bg-black text-white rounded-full text-[14px] font-medium"
        >
          <span className="relative z-10">Apply</span>
          <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
        </button>
      </div>
    </aside>
  )
}

/* ---------- REUSABLE ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="font-medium text-[14px] mb-3">{title}</h3>
      {children}
    </div>
  )
}

function CheckboxRow({
  label,
  checked,
  onChange,
  small,
}: {
  label: string
  checked?: boolean
  onChange?: () => void
  small?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <span className={small ? "text-[12px]" : "text-[13px]"}>{label}</span>
    </div>
  )
}

function Slider({ min, max }: { min: string; max: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-gray-500 mb-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div className="relative h-[3px] bg-gray-200 rounded-full">
        <div className="absolute left-[10%] right-[20%] bg-[#00A792] h-full" />
        <div className="absolute left-[10%] -top-[6px] w-4 h-4 bg-white border border-[#00A792] rounded-full" />
        <div className="absolute right-[20%] -top-[6px] w-4 h-4 bg-white border border-[#00A792] rounded-full" />
      </div>
    </div>
  )
}

function OutlineButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 rounded-full text-[12px] ${
        active
          ? "bg-[#00A792] text-white"
          : "border border-[#00A792] text-[#00A792]"
      }`}
    >
      {children}
    </button>
  )
}
