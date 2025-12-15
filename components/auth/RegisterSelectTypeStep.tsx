"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plane, Monitor } from "lucide-react"

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
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-[540px]">
      <div className="flex justify-center mb-4">
        <Link href="/">
          <Image
            src="/lato-logo.png"
            alt="Lato"
            width={120}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
      </div>

      <h2 className="text-center text-2xl font-semibold text-[#1C1B1F] mb-8">
        Join as a Traveler or Investor
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setSelectedType("traveler")}
            className={`relative p-6 rounded-xl border-2 transition-all ${
              selectedType === "traveler"
                ? "border-[#00A699] bg-[#F0FDFC]"
                : "border-[#E5E7EB] hover:border-[#D1D5DB]"
            }`}
            disabled={isLoading}
          >
            <div className="absolute top-4 right-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === "traveler"
                  ? "border-[#00A699]"
                  : "border-[#D1D5DB]"
              }`}>
                {selectedType === "traveler" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A699]" />
                )}
              </div>
            </div>

            <div className="flex justify-start mb-4">
              <Plane className="w-6 h-6 text-[#1C1B1F]" />
            </div>

            <p className="text-sm text-[#6B7280] text-left">
              Hey, I am a Traveler
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedType("tour_operator")}
            className={`relative p-6 rounded-xl border-2 transition-all ${
              selectedType === "tour_operator"
                ? "border-[#00A699] bg-[#F0FDFC]"
                : "border-[#E5E7EB] hover:border-[#D1D5DB]"
            }`}
            disabled={isLoading}
          >
            <div className="absolute top-4 right-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === "tour_operator"
                  ? "border-[#00A699]"
                  : "border-[#D1D5DB]"
              }`}>
                {selectedType === "tour_operator" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A699]" />
                )}
              </div>
            </div>

            <div className="flex justify-start mb-4">
              <Monitor className="w-6 h-6 text-[#1C1B1F]" />
            </div>

            <p className="text-sm text-[#6B7280] text-left">
              Hey, I am a Tour Operator
            </p>
          </button>
        </div>

        <button
          type="submit"
          disabled={!selectedType || isLoading}
          className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-[#6B7280] mt-6">
        Don't have an account?{" "}
        <Link href="/login" className="text-[#00A699] font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default RegisterSelectTypeStep
