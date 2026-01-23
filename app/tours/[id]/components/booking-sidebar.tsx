"use client"

import { useState } from "react"
import { Check, Lock, Users } from "lucide-react"
import { TourAvailabilityModal } from "./tour-availability-modal"

interface BookingSidebarProps {
  price: number
  originalPrice: number
  currency?: string
  savings: number
  creditEarned: number
}

export function BookingSidebar({
  price,
  originalPrice,
  currency = "USD",
  savings,
  creditEarned
}: BookingSidebarProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)

  return (
    <div className="lg:sticky lg:top-24 space-y-[14px] lg:space-y-6">

      {/* ------- TOP CARD ------- */}
      <div className="bg-white border border-[#E5E5E5] rounded-[14px] lg:rounded-[28px] shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-[14px] lg:p-6">

        {/* Price + Discount */}
        <div className="flex items-start justify-between">

          <div>
            <p className="font-poppins text-[9px] lg:text-[13px] text-[#6B7280]">
              From <span className="line-through text-[#9CA3AF] ml-[3px]">{currency} {originalPrice.toLocaleString()}</span>
            </p>

            <p className="font-volkhov text-[18px] lg:text-[28px] font-bold text-[#7BBCB0] leading-tight mt-[2px] lg:mt-1">
              {currency} {price.toLocaleString()}
            </p>
          </div>

          <div className="text-right space-y-[3px] lg:space-y-1">
            <span className="bg-[#F23813] text-white font-poppins text-[7px] lg:text-[10px] font-medium px-[8px] lg:px-3 py-[2px] rounded-full inline-block uppercase">
              5% Off Today
            </span>

            <p className="font-poppins text-[8px] lg:text-[13px] text-[#6B7280] flex items-center justify-end gap-[3px]">
              Saving {currency} {savings}
              <Lock size={10} className="text-[#00C29A] lg:w-3 lg:h-3" />
            </p>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={() => setIsAvailabilityModalOpen(true)}
          className="group relative overflow-hidden w-full mt-[14px] lg:mt-5 bg-[#00A792] text-white font-poppins text-[11px] lg:text-[15px] font-medium py-[10px] lg:py-3.5 rounded-full transition"
        >
          <span className="relative z-10">Check Availability</span>
          <span className="absolute inset-0 bg-[#1C1B1F] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
        </button>

        <button className="group relative overflow-hidden w-full mt-[8px] lg:mt-3 border border-[#E5E5E5] text-[#1C1B1F] font-poppins text-[11px] lg:text-[15px] py-[10px] lg:py-3.5 rounded-full font-medium bg-[#F9FAFB] transition">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Make an Enquiry</span>
          <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
        </button>

        <p className="font-poppins text-[8px] lg:text-[11px] mt-[10px] lg:mt-4 flex items-center gap-[4px] text-[#00A0FF]">
          <Users size={12} className="text-[#00A0FF] lg:w-[14px] lg:h-[14px]" />
          2 other people are considering this tour right now.
        </p>
      </div>

      {/* ------- GUARANTEE BOX ------- */}
      <div className="bg-white border border-[#E5E5E5] rounded-[14px] lg:rounded-[28px] p-[14px] lg:p-6 shadow-[0_4px_40px_rgba(0,0,0,0.08)] space-y-[10px] lg:space-y-3.5">

        <div className="flex items-start gap-[8px] lg:gap-3">
          <Check className="text-[#00C29A] mt-[1px] shrink-0 w-[12px] h-[12px] lg:w-4 lg:h-4" />
          <p className="font-poppins text-[10px] lg:text-[14px] text-[#1C1B1F]">Best price guaranteed</p>
        </div>

        <div className="flex items-start gap-[8px] lg:gap-3">
          <Check className="text-[#00C29A] mt-[1px] shrink-0 w-[12px] h-[12px] lg:w-4 lg:h-4" />
          <p className="font-poppins text-[10px] lg:text-[14px] text-[#1C1B1F]">No booking fees</p>
        </div>

        <div className="flex items-start gap-[8px] lg:gap-3">
          <Check className="text-[#00C29A] mt-[1px] shrink-0 w-[12px] h-[12px] lg:w-4 lg:h-4" />
          <p className="font-poppins text-[10px] lg:text-[14px] text-[#1C1B1F]">
            Earn up to <span className="text-[#00C29A] font-semibold">{currency} {creditEarned}</span> in travel credits
          </p>
        </div>

      </div>

      {/* Tour Availability Modal */}
      <TourAvailabilityModal
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
      />
    </div>
  )
}
