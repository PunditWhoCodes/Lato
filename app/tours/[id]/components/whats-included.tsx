"use client"

import { Check, X } from "lucide-react"

interface WhatsIncludedProps {
  included: string[]
  notIncluded: string[]
}

export function WhatsIncluded({ included, notIncluded }: WhatsIncludedProps) {
  return (
    <div className="py-8 border-[#E5E5E5]">
      {/* What's Included Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-[#1C1B1F] mb-4">What's Included</h2>
        <ul className="space-y-3">
          {included.map((item, index) => (
            <li key={index} className="flex items-start gap-3 pl-5">
              <div className="flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#059669]" />
              </div>
              <span className="text-sm text-[#4B5563]">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What's Excluded Section */}
      <div>
        <h2 className="text-lg font-semibold text-[#1C1B1F] mb-4">What's Excluded</h2>
        <ul className="space-y-3">
          {notIncluded.map((item, index) => (
            <li key={index} className="flex items-start gap-3 pl-5">
              <div className="flex items-center justify-center shrink-0 mt-0.5">
                <X className="w-3 h-3 text-[#DC2626]" />
              </div>
              <span className="text-sm text-[#4B5563]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
