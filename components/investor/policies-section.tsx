"use client"

import type { Policy } from "@/lib/types/investor"

interface PoliciesSectionProps {
  policies: Policy[]
}

export function PoliciesSection({ policies }: PoliciesSectionProps) {
  return (
    <div>
      <h2 className="font-poppins font-semibold text-lg md:text-xl text-black text-center mb-6">
        Our Policies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {policies.map((policy, index) => {
          const isTopRow = index < 2
          const isLeftCol = index % 2 === 0
          return (
            <div
              key={index}
              className={`p-4 md:p-5 ${
                isTopRow ? "md:border-b md:border-gray-200" : ""
              } ${isLeftCol ? "md:border-r md:border-gray-200" : ""} ${
                index < policies.length - 2 ? "border-b border-gray-200 md:border-b-0" : ""
              } ${isTopRow && isLeftCol ? "md:border-b md:border-r" : ""}`}
            >
              <h3 className="font-poppins font-semibold text-sm md:text-base text-black mb-2">
                {policy.title}
              </h3>
              <p className="font-poppins text-xs md:text-sm text-gray-500 leading-relaxed">
                {policy.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
