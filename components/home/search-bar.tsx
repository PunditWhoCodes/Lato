"use client"

import { MapPin, ChevronDown, ChevronLeft, ChevronRight, Calendar, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

// Destination names with their country codes for URL navigation
const DESTINATIONS: { name: string; code: string }[] = [
  { name: "Thailand", code: "TH" },
  { name: "Japan", code: "JP" },
  { name: "Indonesia", code: "ID" },
  { name: "Vietnam", code: "VN" },
  { name: "Malaysia", code: "MY" },
  { name: "Singapore", code: "SG" },
  { name: "Philippines", code: "PH" },
  { name: "South Korea", code: "KR" },
  { name: "China", code: "CN" },
  { name: "India", code: "IN" },
  { name: "Italy", code: "IT" },
  { name: "Spain", code: "ES" },
  { name: "Greece", code: "GR" },
  { name: "France", code: "FR" },
  { name: "Portugal", code: "PT" },
  { name: "Germany", code: "DE" },
  { name: "Netherlands", code: "NL" },
  { name: "Switzerland", code: "CH" },
  { name: "Turkey", code: "TR" },
  { name: "Croatia", code: "HR" },
  { name: "Morocco", code: "MA" },
  { name: "Egypt", code: "EG" },
  { name: "Kenya", code: "KE" },
  { name: "South Africa", code: "ZA" },
  { name: "Tanzania", code: "TZ" },
  { name: "Peru", code: "PE" },
  { name: "Brazil", code: "BR" },
  { name: "Argentina", code: "AR" },
  { name: "Mexico", code: "MX" },
  { name: "Colombia", code: "CO" },
]

// Legacy array for backward compatibility
const destinations = DESTINATIONS.map(d => d.name)

export function SearchBar() {
  const router = useRouter()

  // Destination state
  const [destination, setDestination] = useState("")
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false)

  // Date state - Start and End dates
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dateType, setDateType] = useState<"start" | "end">("start")
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Passengers state
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false)

  // Refs for desktop
  const destinationDesktopRef = useRef<HTMLDivElement>(null)
  const calendarDesktopRef = useRef<HTMLDivElement>(null)
  const passengerDesktopRef = useRef<HTMLDivElement>(null)

  // Refs for mobile
  const destinationMobileRef = useRef<HTMLDivElement>(null)
  const calendarMobileRef = useRef<HTMLDivElement>(null)
  const passengerMobileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node

      // Check destination dropdowns (both desktop and mobile)
      const isOutsideDestination =
        (!destinationDesktopRef.current || !destinationDesktopRef.current.contains(target)) &&
        (!destinationMobileRef.current || !destinationMobileRef.current.contains(target))

      if (isOutsideDestination && showDestinationDropdown) {
        setShowDestinationDropdown(false)
      }

      // Check calendar dropdowns (both desktop and mobile)
      const isOutsideCalendar =
        (!calendarDesktopRef.current || !calendarDesktopRef.current.contains(target)) &&
        (!calendarMobileRef.current || !calendarMobileRef.current.contains(target))

      if (isOutsideCalendar && showCalendar) {
        setShowCalendar(false)
      }

      // Check passenger dropdowns (both desktop and mobile)
      const isOutsidePassenger =
        (!passengerDesktopRef.current || !passengerDesktopRef.current.contains(target)) &&
        (!passengerMobileRef.current || !passengerMobileRef.current.contains(target))

      if (isOutsidePassenger && showPassengerDropdown) {
        setShowPassengerDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showDestinationDropdown, showCalendar, showPassengerDropdown])

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams()

    // Add country code if destination is selected
    if (destination) {
      const destInfo = DESTINATIONS.find(d => d.name === destination)
      if (destInfo) {
        params.set("countries", destInfo.code)
      }
    }

    // Add dates if selected (format: YYYY-MM-DD)
    if (startDate) {
      const startDateStr = startDate.toISOString().split("T")[0]
      params.set("startDate", startDateStr)
    }
    if (endDate) {
      const endDateStr = endDate.toISOString().split("T")[0]
      params.set("endDate", endDateStr)
    }

    // Add passengers
    if (adults > 0) {
      params.set("adults", String(adults))
    }
    if (children > 0) {
      params.set("children", String(children))
    }

    // Navigate to tours page with filters
    const queryString = params.toString()
    router.push(`/tours${queryString ? `?${queryString}` : ""}`)
  }

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const isStartDate = (day: number) => {
    if (!startDate) return false
    return (
      day === startDate.getDate() &&
      currentMonth.getMonth() === startDate.getMonth() &&
      currentMonth.getFullYear() === startDate.getFullYear()
    )
  }

  const isEndDate = (day: number) => {
    if (!endDate) return false
    return (
      day === endDate.getDate() &&
      currentMonth.getMonth() === endDate.getMonth() &&
      currentMonth.getFullYear() === endDate.getFullYear()
    )
  }

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return currentDate > startDate && currentDate < endDate
  }

  const handleDateSelect = useCallback((day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    if (dateType === "start") {
      setStartDate(newDate)
      // If end date is before start date, clear it
      if (endDate && newDate > endDate) {
        setEndDate(null)
      }
      // Auto-switch to end date selection
      setDateType("end")
    } else {
      // If selected end date is before start date, swap them
      if (startDate && newDate < startDate) {
        setEndDate(startDate)
        setStartDate(newDate)
      } else {
        setEndDate(newDate)
      }
      // Close calendar after selecting end date
      setShowCalendar(false)
      setDateType("start") // Reset for next time
    }
  }, [currentMonth, dateType, startDate, endDate])

  // Format date range for display
  const getDateRangeDisplay = () => {
    if (!startDate && !endDate) return "Select Dates"

    const formatShort = (date: Date) => {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    if (startDate && endDate) {
      return `${formatShort(startDate)} - ${formatShort(endDate)}`
    }
    if (startDate) {
      return `${formatShort(startDate)} - ?`
    }
    if (endDate) {
      return `? - ${formatShort(endDate)}`
    }
    return "Select Dates"
  }

  const goToPrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Passenger summary text
  const getPassengerSummary = () => {
    const parts = []
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`)
    if (children > 0) parts.push(`${children} Child${children > 1 ? "ren" : ""}`)
    return parts.length > 0 ? parts.join(", ") : "Passengers"
  }

  // Handle passenger count changes
  const handleAdultsChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation()
    setAdults(prev => Math.max(1, prev + delta))
  }

  const handleChildrenChange = (e: React.MouseEvent, delta: number) => {
    e.stopPropagation()
    setChildren(prev => Math.max(0, prev + delta))
  }

  // Handle done button
  const handlePassengerDone = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPassengerDropdown(false)
  }

  // Handle destination select
  const handleDestinationSelect = (e: React.MouseEvent, dest: string) => {
    e.stopPropagation()
    setDestination(dest)
    setShowDestinationDropdown(false)
  }

  // Handle day select
  const handleDayClick = (e: React.MouseEvent, day: number) => {
    e.stopPropagation()
    handleDateSelect(day)
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)

  return (
    <div className="mx-auto w-full max-w-[1462px] p-4 md:p-8 lg:py-[46px] lg:px-8 bg-white/8 backdrop-blur-[55.55px] rounded-[19.69px]">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row justify-between items-center bg-white mx-auto w-full max-w-[1380px] h-[69px] rounded-[30px]">
        {/* Three Input Fields Container */}
        <div className="relative bg-white flex items-center flex-1 h-[69px] rounded-[30px]">
          {/* First Field - Destination Dropdown */}
          <div ref={destinationDesktopRef} className="relative flex items-center flex-1 h-full bg-white border-r border-black/9 rounded-l-[30px] px-4 lg:px-5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDestinationDropdown(!showDestinationDropdown)
                setShowCalendar(false)
                setShowPassengerDropdown(false)
              }}
              className="w-full h-full flex items-center outline-none bg-transparent font-montserrat text-sm lg:text-base"
            >
              <span className={destination ? "text-[#112211]" : "text-[#112211]/50"}>
                {destination || "Destination"}
              </span>
            </button>

            {/* Destination Dropdown */}
            {showDestinationDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                {destinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={(e) => handleDestinationSelect(e, dest)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-[#F0FDFC] transition-colors ${
                      destination === dest ? "bg-[#E6F7F5] text-[#00A792]" : "text-[#112211]"
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Icon */}
          <button
            className="hidden lg:flex items-center justify-center absolute left-[calc(29.88%-29.53px)] z-10 w-[59.06px] h-[59.06px] p-[14.77px]"
          >
            <div className="flex items-center justify-center">
              <MapPin className="size-4 text-[#00A792]" />
            </div>
          </button>

          {/* Second Field - Calendar Dropdown */}
          <div ref={calendarDesktopRef} className="relative flex items-center flex-1 h-full bg-white px-4 lg:px-5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowCalendar(!showCalendar)
                setShowDestinationDropdown(false)
                setShowPassengerDropdown(false)
              }}
              className="w-full h-full flex items-center justify-between outline-none bg-transparent font-montserrat text-sm lg:text-base"
            >
              <span className={startDate || endDate ? "text-[#112211]" : "text-[#112211]/50"}>
                {getDateRangeDisplay()}
              </span>
              <Calendar className="w-5 h-5 text-[#00A792]" />
            </button>

            {/* Calendar Dropdown */}
            {showCalendar && (
              <div
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 w-[320px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Date Type Toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDateType("start")
                    }}
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                      dateType === "start"
                        ? "bg-[#00A792] text-white"
                        : "border border-[#00A792] text-[#00A792] hover:bg-[#E6F7F5]"
                    }`}
                  >
                    Start Date {startDate ? "✓" : "*"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setDateType("end")
                    }}
                    className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                      dateType === "end"
                        ? "bg-[#00A792] text-white"
                        : "border border-[#00A792] text-[#00A792] hover:bg-[#E6F7F5]"
                    }`}
                  >
                    End Date {endDate ? "✓" : "*"}
                  </button>
                </div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={goToPrevMonth}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#112211]" />
                  </button>
                  <span className="font-medium text-[#112211]">
                    {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </span>
                  <button
                    onClick={goToNextMonth}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#112211]" />
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for days before the first day of the month */}
                  {Array.from({ length: startingDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="w-9 h-9" />
                  ))}
                  {/* Actual days */}
                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1
                    const isStart = isStartDate(day)
                    const isEnd = isEndDate(day)
                    const inRange = isInRange(day)

                    return (
                      <button
                        key={day}
                        onClick={(e) => handleDayClick(e, day)}
                        className={`w-9 h-9 rounded-full text-sm transition-colors ${
                          isStart || isEnd
                            ? "bg-[#00A792] text-white"
                            : inRange
                            ? "bg-[#E6F7F5] text-[#00A792]"
                            : isToday(day)
                            ? "ring-1 ring-[#00A792] text-[#00A792]"
                            : "hover:bg-gray-100 text-[#112211]"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>

                {/* Selected dates summary */}
                {(startDate || endDate) && (
                  <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-[#6B7280]">
                    {startDate && <div>Start: {formatDate(startDate)}</div>}
                    {endDate && <div>End: {formatDate(endDate)}</div>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Third Field - Passenger Dropdown */}
          <div ref={passengerDesktopRef} className="relative flex items-center flex-1 h-full bg-white border-l border-black/[0.2] rounded-r-[30px] px-4 lg:px-5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowPassengerDropdown(!showPassengerDropdown)
                setShowDestinationDropdown(false)
                setShowCalendar(false)
              }}
              className="w-full h-full flex items-center justify-between outline-none bg-transparent font-montserrat text-sm lg:text-base"
            >
              <span className={adults > 0 || children > 0 ? "text-[#112211]" : "text-[#112211]/50"}>
                {getPassengerSummary()}
              </span>
              <ChevronDown className={`w-5 h-5 text-[#00A792] transition-transform ${showPassengerDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Passenger Dropdown */}
            {showPassengerDropdown && (
              <div
                className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4 w-[250px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Adults Row */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#112211] font-medium">Adults</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={(e) => handleAdultsChange(e, -1)}
                      className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-9 h-9 flex items-center justify-center text-[#112211] font-medium border-x border-gray-200">
                      {adults}
                    </span>
                    <button
                      onClick={(e) => handleAdultsChange(e, 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children Row */}
                <div className="flex items-center justify-between py-3">
                  <span className="text-[#112211] font-medium">Children</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={(e) => handleChildrenChange(e, -1)}
                      className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-9 h-9 flex items-center justify-center text-[#112211] font-medium border-x border-gray-200">
                      {children}
                    </span>
                    <button
                      onClick={(e) => handleChildrenChange(e, 1)}
                      className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Done Button */}
                <div className="group pt-3">
                  <button
                    onClick={handlePassengerDone}
                    className="relative overflow-hidden w-full bg-[#00A792] text-white rounded-[30px] font-montserrat font-medium h-10 text-sm"
                  >
                    <span className="relative z-10">Done</span>
                    <span className="absolute inset-0 bg-black rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="group flex-none ml-4 lg:ml-0 mr-2 lg:mr-4">
          <Button
            onClick={handleSearch}
            className="relative overflow-hidden bg-[#00A792] text-white rounded-[30px] font-montserrat font-medium"
            style={{
              width: '150px',
              height: '50px',
              fontSize: '16px',
            }}
          >
            <span className="relative z-10">Search</span>

            {/* Radial expanding hover overlay */}
            <span className="absolute inset-0 bg-black rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden bg-white rounded-[20px] p-4 space-y-3">
        {/* First Field - Destination Dropdown */}
        <div ref={destinationMobileRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDestinationDropdown(!showDestinationDropdown)
              setShowCalendar(false)
              setShowPassengerDropdown(false)
            }}
            className="w-full flex items-center h-12 bg-gray-50 border border-black/[0.09] rounded-2xl px-4"
          >
            <span className={`font-montserrat text-sm ${destination ? "text-[#112211]" : "text-[#112211]/50"}`}>
              {destination || "Destination"}
            </span>
          </button>

          {/* Destination Dropdown - Mobile */}
          {showDestinationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
              {destinations.map((dest) => (
                <button
                  key={dest}
                  onClick={(e) => handleDestinationSelect(e, dest)}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-[#F0FDFC] transition-colors ${
                    destination === dest ? "bg-[#E6F7F5] text-[#00A792]" : "text-[#112211]"
                  }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Second Field - Calendar Dropdown */}
        <div ref={calendarMobileRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowCalendar(!showCalendar)
              setShowDestinationDropdown(false)
              setShowPassengerDropdown(false)
            }}
            className="w-full flex items-center justify-between h-12 bg-gray-50 border border-black/[0.09] rounded-2xl px-4"
          >
            <span className={`font-montserrat text-sm ${startDate || endDate ? "text-[#112211]" : "text-[#112211]/50"}`}>
              {getDateRangeDisplay()}
            </span>
            <Calendar className="w-5 h-5 text-[#112211]/50" />
          </button>

          {/* Calendar Dropdown - Mobile */}
          {showCalendar && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Date Type Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDateType("start")
                  }}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                    dateType === "start"
                      ? "bg-[#00A792] text-white"
                      : "border border-[#00A792] text-[#00A792] hover:bg-[#E6F7F5]"
                  }`}
                >
                  Start Date {startDate ? "✓" : "*"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDateType("end")
                  }}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                    dateType === "end"
                      ? "bg-[#00A792] text-white"
                      : "border border-[#00A792] text-[#00A792] hover:bg-[#E6F7F5]"
                  }`}
                >
                  End Date {endDate ? "✓" : "*"}
                </button>
              </div>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPrevMonth}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-[#112211]" />
                </button>
                <span className="font-medium text-[#112211]">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
                <button
                  onClick={goToNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-[#112211]" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startingDay }).map((_, index) => (
                  <div key={`empty-mobile-${index}`} className="w-9 h-9" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const isStart = isStartDate(day)
                  const isEnd = isEndDate(day)
                  const inRange = isInRange(day)

                  return (
                    <button
                      key={day}
                      onClick={(e) => handleDayClick(e, day)}
                      className={`w-9 h-9 rounded-full text-sm transition-colors ${
                        isStart || isEnd
                          ? "bg-[#00A792] text-white"
                          : inRange
                          ? "bg-[#E6F7F5] text-[#00A792]"
                          : isToday(day)
                          ? "ring-1 ring-[#00A792] text-[#00A792]"
                          : "hover:bg-gray-100 text-[#112211]"
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              {/* Selected dates summary */}
              {(startDate || endDate) && (
                <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-[#6B7280]">
                  {startDate && <div>Start: {formatDate(startDate)}</div>}
                  {endDate && <div>End: {formatDate(endDate)}</div>}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Third Field - Passenger Dropdown */}
        <div ref={passengerMobileRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowPassengerDropdown(!showPassengerDropdown)
              setShowDestinationDropdown(false)
              setShowCalendar(false)
            }}
            className="w-full flex items-center justify-between h-12 bg-gray-50 border border-black/[0.09] rounded-2xl px-4"
          >
            <span className={`font-montserrat text-sm ${adults > 0 || children > 0 ? "text-[#112211]" : "text-[#112211]/50"}`}>
              {getPassengerSummary()}
            </span>
            <ChevronDown className={`w-5 h-5 text-[#112211]/50 transition-transform ${showPassengerDropdown ? "rotate-180" : ""}`} />
          </button>

          {/* Passenger Dropdown - Mobile */}
          {showPassengerDropdown && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Adults Row */}
              <div className="flex items-center justify-between py-3">
                <span className="text-[#112211] font-medium">Adults</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={(e) => handleAdultsChange(e, -1)}
                    className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-9 h-9 flex items-center justify-center text-[#112211] font-medium border-x border-gray-200">
                    {adults}
                  </span>
                  <button
                    onClick={(e) => handleAdultsChange(e, 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Children Row */}
              <div className="flex items-center justify-between py-3">
                <span className="text-[#112211] font-medium">Children</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={(e) => handleChildrenChange(e, -1)}
                    className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-9 h-9 flex items-center justify-center text-[#112211] font-medium border-x border-gray-200">
                    {children}
                  </span>
                  <button
                    onClick={(e) => handleChildrenChange(e, 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#00A792] hover:bg-gray-50 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Done Button */}
              <div className="group pt-3">
                <button
                  onClick={handlePassengerDone}
                  className="relative overflow-hidden w-full bg-[#00A792] text-white rounded-[30px] font-montserrat font-medium h-10 text-sm"
                >
                  <span className="relative z-10">Done</span>
                  <span className="absolute inset-0 bg-black rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="group w-full">
          <Button
            onClick={handleSearch}
            className="relative overflow-hidden w-full bg-[#00A792] text-white rounded-full font-montserrat font-medium h-12"
            style={{
              fontSize: '16px',
            }}
          >
            <span className="relative z-10">Search</span>

            {/* Radial expanding hover overlay */}
            <span className="absolute inset-0 bg-black rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
          </Button>
        </div>
      </div>
    </div>
  )
}
