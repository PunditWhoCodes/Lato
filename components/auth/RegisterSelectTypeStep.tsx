"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plane, Camera } from "lucide-react"

export type UserType = "traveler" | "tour_operator"

interface RegisterSelectTypeStepProps {
  onSelect: (type: UserType) => void
  isLoading?: boolean
}

export function RegisterSelectTypeStep({ onSelect, isLoading = false }: RegisterSelectTypeStepProps) {
  const [selectedType, setSelectedType] = useState<UserType | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedType) {
      onSelect(selectedType)
    }
  }

  return (
    <div className="bg-white rounded-[10px] md:rounded-3xl shadow-2xl px-[27px] py-5 md:p-8 lg:p-10 w-full max-w-[357px] md:max-w-[540px] mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-4 md:mb-6">
        <Link href="/">
          <Image
            src="/lato-logo.png"
            alt="Lato"
            width={63}
            height={24}
            className="h-6 md:h-12 w-auto"
          />
        </Link>
      </div>

      {/* Title */}
      <h2 className="text-center text-[15px] md:text-2xl font-normal text-black mb-6 md:mb-8">
        Join as a Traveler or Investor
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Selection Cards - Stacked on mobile, grid on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-4 mb-4 md:mb-8">
          {/* Traveler Card */}
          <button
            type="button"
            onClick={() => setSelectedType("traveler")}
            className={`relative h-[141px] md:h-auto md:p-6 rounded-[10px] md:rounded-xl border transition-all cursor-pointer ${
              selectedType === "traveler"
                ? "border-[#00A792] bg-[#F0FDFC]"
                : "border-[#D9D9D9] hover:border-[#D1D5DB]"
            }`}
            disabled={isLoading}
          >
            {/* Radio Button - Top Right */}
            <div className="absolute top-4 right-4 md:top-4 md:right-4">
              <div className={`w-6 h-6 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === "traveler"
                  ? "border-[#00A792]"
                  : "border-[#D9D9D9]"
              }`}>
                {selectedType === "traveler" && (
                  <div className="w-3 h-3 md:w-2.5 md:h-2.5 rounded-full bg-[#00A792]" />
                )}
              </div>
            </div>

            {/* Airplane Icon - Top Left */}
            <div className="absolute top-5 left-6 md:relative md:top-auto md:left-auto md:flex md:justify-start md:mb-4">
              <Plane className="w-6 h-6 text-[#1C1B1F]" />
            </div>

            {/* Text - Centered on mobile */}
            <div className="flex items-center justify-center h-full md:block">
              <p className="text-[15px] md:text-sm text-black/45 md:text-[#6B7280] md:text-left">
                Hey, I am a Traveler
              </p>
            </div>
          </button>

          {/* Tour Operator Card */}
          <button
            type="button"
            onClick={() => setSelectedType("tour_operator")}
            className={`relative h-[141px] md:h-auto md:p-6 rounded-[10px] md:rounded-xl border transition-all cursor-pointer ${
              selectedType === "tour_operator"
                ? "border-[#00A792] bg-[#F0FDFC]"
                : "border-[#D9D9D9] hover:border-[#D1D5DB]"
            }`}
            disabled={isLoading}
          >
            {/* Radio Button - Top Right */}
            <div className="absolute top-4 right-4 md:top-4 md:right-4">
              <div className={`w-6 h-6 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === "tour_operator"
                  ? "border-[#00A792]"
                  : "border-[#D9D9D9]"
              }`}>
                {selectedType === "tour_operator" && (
                  <div className="w-3 h-3 md:w-2.5 md:h-2.5 rounded-full bg-[#00A792]" />
                )}
              </div>
            </div>

            {/* Camera/Tour Icon - Top Left */}
            <div className="absolute top-5 left-6 md:relative md:top-auto md:left-auto md:flex md:justify-start md:mb-4">
              <Camera className="w-6 h-6 text-[#1C1B1F]" />
            </div>

            {/* Text - Centered on mobile */}
            <div className="flex items-center justify-center h-full md:block">
              <p className="text-[15px] md:text-sm text-black/45 md:text-[#6B7280] font-medium md:font-normal md:text-left">
                Hey, I am a Tour Operator
              </p>
            </div>
          </button>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={!selectedType || isLoading}
          className="w-full max-w-[245px] md:max-w-full mx-auto block bg-[#00A792] hover:bg-[#008F84] text-white font-semibold py-2 md:py-3.5 h-[30px] md:h-auto text-[8px] md:text-base rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-[12px] md:text-sm text-black mt-4 md:mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-[#00A792] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterSelectTypeStep
