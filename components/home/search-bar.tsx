"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SearchBar() {
  const [fromTo, setFromTo] = useState("")
  const [departReturn, setDepartReturn] = useState("")
  const [passengerClass, setPassengerClass] = useState("")

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log({ fromTo, departReturn, passengerClass })
  }

  const handleSwap = () => {
    console.log("Swap clicked")
  }

  return (
    <div className="mx-auto w-full max-w-[1462px] p-4 md:p-8 lg:py-[46px] lg:px-[32px] bg-white/[0.08] backdrop-blur-[55.55px] rounded-[19.69px]">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row justify-between items-center bg-white mx-auto w-full max-w-[1380px] h-[69px] rounded-[30px]">
        {/* Three Input Fields Container */}
        <div className="relative bg-white flex items-center flex-1 h-[69px] rounded-[30px]">
          {/* First Field - From/To */}
          <div className="flex items-center flex-1 h-full bg-white border-r border-black/[0.09] rounded-l-[30px] px-4 lg:px-5">
            <input
              type="text"
              value={fromTo}
              onChange={(e) => setFromTo(e.target.value)}
              placeholder="Destination"
              className="w-full h-full outline-none bg-transparent font-montserrat text-sm lg:text-base"
              style={{
                fontWeight: 400,
                color: '#112211',
              }}
            />
          </div>

          {/* Swap Icon */}
          <button
            onClick={handleSwap}
            className="hidden lg:flex items-center justify-center absolute left-[calc(29.88%-29.53px)] z-10 w-[59.06px] h-[59.06px] p-[14.77px]"
          >
            <div className="flex items-center justify-center">
              <MapPin className="siz-4 text-[#00A792]" />
            </div>
          </button>

          {/* Second Field - Depart/Return */}
          <div className="flex items-center flex-1 h-full bg-white px-4 lg:px-5">
            <input
              type="text"
              value={departReturn}
              onChange={(e) => setDepartReturn(e.target.value)}
              placeholder="Departure"
              className="w-full h-full outline-none bg-transparent font-montserrat text-sm lg:text-base"
              style={{
                fontWeight: 400,
                color: '#',
              }}
            />
          </div>

          {/* Third Field - Passenger/Class */}
          <div className="flex items-center flex-1 h-full bg-white border-l border-black/[0.2] rounded-r-[30px] px-4 lg:px-5">
            <input
              type="text"
              value={passengerClass}
              onChange={(e) => setPassengerClass(e.target.value)}
              placeholder="Passenger - Class"
              className="w-full h-full outline-none bg-transparent font-montserrat text-sm lg:text-base"
              style={{
                fontWeight: 400,
                color: '#1C1B1F',
              }}
            />
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
        {/* First Field - From/To */}
        <div className="flex items-center h-12 bg-gray-50 border border-black/[0.09] rounded-2xl px-4">
          <input
            type="text"
            value={fromTo}
            onChange={(e) => setFromTo(e.target.value)}
            placeholder="From - To"
            className="w-full h-full outline-none bg-transparent font-montserrat text-sm"
            style={{
              fontWeight: 400,
              color: '#112211',
            }}
          />
        </div>

        {/* Second Field - Depart/Return */}
        <div className="flex items-center h-12 bg-gray-50 border border-black/[0.09] rounded-2xl px-4">
          <input
            type="text"
            value={departReturn}
            onChange={(e) => setDepartReturn(e.target.value)}
            placeholder="Depart - Return"
            className="w-full h-full outline-none bg-transparent font-montserrat text-sm"
            style={{
              fontWeight: 400,
              color: '#1C1B1F',
            }}
          />
        </div>

        {/* Third Field - Passenger/Class */}
        <div className="flex items-center h-12 bg-gray-50 border border-black/[0.09] rounded-2xl px-4">
          <input
            type="text"
            value={passengerClass}
            onChange={(e) => setPassengerClass(e.target.value)}
            placeholder="Passenger - Class"
            className="w-full h-full outline-none bg-transparent font-montserrat text-sm"
            style={{
              fontWeight: 400,
              color: '#1C1B1F',
            }}
          />
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
