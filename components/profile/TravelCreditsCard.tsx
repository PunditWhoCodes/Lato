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
      <div className={cn(
        'p-6 bg-white rounded-[10px] shadow-[0px_10px_18.6px_#D0E2E5]',
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
    )
  }

  // Default card variant
  return (
    <div className={cn(
      'p-6 bg-white rounded-[10px] shadow-[0px_10px_18.6px_#D0E2E5]',
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingCart className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <p className="font-poppins font-light text-base text-gray-600 capitalize">Travel Credits</p>
          <p className="font-poppins font-semibold text-2xl text-[#00A792]">
            {formattedAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TravelCreditsCard
