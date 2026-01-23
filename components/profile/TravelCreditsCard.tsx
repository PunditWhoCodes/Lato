'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'

interface TravelCreditsCardProps {
  amount: number
  currency?: string
  variant?: 'sidebar' | 'card'
  className?: string
}

export function TravelCreditsCard({
  amount,
  currency = 'USD',
  variant = 'card',
  className,
}: TravelCreditsCardProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)

  // Sidebar variant - used in BookingsSidebar
  if (variant === 'sidebar') {
    return (
      <>
        {/* Mobile Sidebar - Figma: 370px x 154.97px */}
        <div className="lg:hidden flex justify-center">
          <div
            className={cn(
              "flex items-center w-[370px] h-[154.97px] bg-white rounded-[6.46px] shadow-[0px_6.46px_12.01px_#D0E2E5] px-[17.43px] py-[23.89px] gap-[29.7px]",
              className
            )}
          >
            {/* Shopping Cart Icon */}
            <ShoppingCart className="w-[27.77px] h-[27.77px] text-[#9CA3AF] shrink-0" />

            {/* Text Section */}
            <div className="flex flex-col gap-[18.73px]">
              <p className="font-poppins font-light text-[16.14px] leading-[24px] text-black capitalize">
                Travel Credits
              </p>
              <p className="font-poppins font-semibold text-[22.6px] leading-[34px] text-[#00A792]">
                {formattedAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className={cn(
          'hidden lg:block p-6 bg-white rounded-[10px] shadow-[0px_10px_18.6px_#D0E2E5]',
          className
        )}>
          <div className="flex items-center gap-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
            <div>
              <p className="font-poppins font-light text-base text-gray-600 capitalize">Travel Credits</p>
              <p className="font-poppins font-semibold text-2xl text-[#00A792]">
                {formattedAmount}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Default card variant - Show Figma mobile design on all screens
  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "flex items-center w-[370px] h-[154.97px] bg-white rounded-[6.46px] shadow-[0px_6.46px_12.01px_#D0E2E5] px-[17.43px] py-[23.89px] gap-[29.7px]",
          className
        )}
      >
        {/* Shopping Cart Icon */}
        <ShoppingCart className="w-[27.77px] h-[27.77px] text-[#9CA3AF] shrink-0" />

        {/* Text Section */}
        <div className="flex flex-col gap-[18.73px]">
          <p className="font-poppins font-light text-[16.14px] leading-[24px] text-black capitalize">
            Travel Credits
          </p>
          <p className="font-poppins font-semibold text-[22.6px] leading-[34px] text-[#00A792]">
            {formattedAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TravelCreditsCard
