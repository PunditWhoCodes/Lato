"use client"

import type { Policy } from "@/lib/types/investor"

interface PoliciesSectionProps {
  policies: Policy[]
}

export function PoliciesSection({ policies }: PoliciesSectionProps) {
  return (
    <div>
      {/* Mobile title: "Fair Policies", Desktop: "Our Policies" */}
      <h2 className="font-poppins font-semibold text-[12px] lg:text-xl text-black lg:text-center mb-[14px] lg:mb-6">
        <span className="lg:hidden">Fair Policies</span>
        <span className="hidden lg:inline">Our Policies</span>
      </h2>

      {/* Mobile: Single column, Desktop: 2 columns */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-[14px] lg:gap-0">
        {policies.map((policy, index) => {
          const isTopRow = index < 2
          const isLeftCol = index % 2 === 0
          return (
            <div
              key={index}
              className={`
                lg:p-5
                ${isTopRow ? "lg:border-b lg:border-gray-200" : ""}
                ${isLeftCol ? "lg:border-r lg:border-gray-200" : ""}
              `}
            >
              <h3 className="font-poppins font-semibold text-[10px] lg:text-base text-black mb-[6px] lg:mb-2">
                {policy.title}
              </h3>
              <p className="font-poppins text-[9px] lg:text-sm text-gray-500 leading-[1.5] lg:leading-relaxed">
                {policy.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
