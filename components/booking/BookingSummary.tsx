'use client'

import Image from 'next/image'
import { Star, Check, ChevronDown, HelpCircle, Info } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TourData {
  id: string
  title: string
  image: string
  duration: string
  rating: number
  reviewCount?: number
  startLocation: string
  startDate: string
  endLocation: string
  endDate: string
  tourType: string
  brochurePrice: number
  specialDiscount: number
  latoDiscount: number
  totalPrice: number
  depositPayable: number
  travelCreditsReward: number
  currency: string
}

interface BookingSummaryProps {
  tourData: TourData
}

export function BookingSummary({ tourData }: BookingSummaryProps) {
  const [showMoreDetails, setShowMoreDetails] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-[8px] border border-[#e5e7eb] overflow-hidden">
      {/* Tour Image and Info */}
      <div className="p-4">
        <div className="flex gap-3">
          <div className="relative w-[100px] h-[80px] rounded-[8px] overflow-hidden flex-shrink-0">
            <Image
              src={tourData.image}
              alt={tourData.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-poppins text-[14px] font-semibold text-[#111928] leading-tight mb-1">
              {tourData.title}
            </h3>
            <p className="font-poppins text-[11px] text-[#6b7280] mb-1">
              Duration: <span className="font-semibold text-[#111928]">{tourData.duration}</span>
            </p>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                ))}
                <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" style={{ clipPath: 'inset(0 10% 0 0)' }} />
              </div>
              <span className="font-poppins text-[12px] font-medium text-[#111928]">{tourData.rating}</span>
            </div>
          </div>
        </div>

        {/* Tour Details */}
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="font-poppins text-[12px] text-[#6b7280]">Starts In</span>
            <div className="text-right">
              <p className="font-poppins text-[12px] font-medium text-[#111928]">{tourData.startLocation}</p>
              <p className="font-poppins text-[11px] text-[#6b7280]">{tourData.startDate}</p>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <span className="font-poppins text-[12px] text-[#6b7280]">Ends</span>
            <div className="text-right">
              <p className="font-poppins text-[12px] font-medium text-[#111928]">{tourData.endLocation}</p>
              <p className="font-poppins text-[11px] text-[#6b7280]">{tourData.endDate}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-poppins text-[12px] text-[#6b7280]">Tour Type</span>
            <span className="font-poppins text-[12px] font-medium text-[#111928]">{tourData.tourType}</span>
          </div>
        </div>

        {/* More Details Toggle */}
        <button
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className="flex items-center gap-1 mt-4 font-poppins text-[12px] text-[#00a792] hover:underline"
        >
          More Details
          <ChevronDown className={`w-4 h-4 transition-transform ${showMoreDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-[#e5e7eb] p-4">
        <h4 className="font-poppins text-[14px] font-semibold text-[#111928] mb-4">Price Breakdown</h4>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-poppins text-[12px] text-[#6b7280]">Brochure Price</span>
            <span className="font-poppins text-[12px] text-[#6b7280]">
              {tourData.currency} {formatPrice(tourData.brochurePrice)}
            </span>
          </div>
          <p className="font-poppins text-[10px] text-[#9ca3af]">
            USD {formatPrice(tourData.brochurePrice)} x 1 Traveler
          </p>

          <div className="flex justify-between items-center">
            <span className="font-poppins text-[12px] text-[#6b7280]">Special Trip Deal (33% Off)</span>
            <span className="font-poppins text-[12px] text-[#6b7280]">
              - USD {formatPrice(tourData.specialDiscount)}
            </span>
          </div>

          <div className="flex justify-between items-center text-[#00a792]">
            <span className="font-poppins text-[12px]">Lato Discount (3% Off)</span>
            <span className="font-poppins text-[12px]">
              - USD {formatPrice(tourData.latoDiscount)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#e5e7eb]">
          <span className="font-poppins text-[14px] font-semibold text-[#111928]">Total Price</span>
          <span className="font-poppins text-[20px] font-bold text-[#00a792]">
            USD {formatPrice(tourData.totalPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-poppins text-[12px] text-[#6b7280]">Deposit Payable Now</span>
          <span className="font-poppins text-[12px] font-semibold text-[#00a792]">
            USD {formatPrice(tourData.depositPayable)}
          </span>
        </div>
      </div>

      {/* Best Price Guarantee */}
      <div className="border-t border-[#e5e7eb] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Check className="w-4 h-4 text-[#00a792]" />
          <span className="font-poppins text-[13px] font-semibold text-[#00a792]">Best Price Guaranteed!</span>
        </div>

        <div className="p-3 bg-[#fef3f2] rounded-[8px] border border-[#fecaca]">
          <p className="font-poppins text-[10px] text-[#b91c1c] leading-relaxed">
            <span className="font-semibold">Important:</span> This above price is converted to show you the approximate cost in USD. You&apos;ll pay in USD. Lato does not charge any booking fees and covers all credit card fees.
          </p>
        </div>
      </div>

      {/* Travel Credits Reward */}
      <div className="border-t border-[#e5e7eb] p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center gap-2">
            <span className="font-poppins text-[13px] font-semibold text-[#111928]">Travel Credits Reward</span>
            <Info className="w-4 h-4 text-[#9ca3af]" />
          </div>
          <span className="font-poppins text-[13px] font-bold text-[#00a792] ml-auto">
            USD {formatPrice(tourData.travelCreditsReward)}
          </span>
        </div>
        <p className="font-poppins text-[10px] text-[#6b7280] mt-1">
          Earn on tour completion + Use on future bookings
        </p>
        <p className="font-poppins text-[10px] text-[#9ca3af] mt-1">Travel Credits</p>
      </div>

      {/* Need Help */}
      <div className="border-t border-[#e5e7eb] p-4">
        <div className="flex items-start gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-[#fef2f2] flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-4 h-4 text-[#ef4444]" />
          </div>
          <div>
            <p className="font-poppins text-[13px] font-semibold text-[#111928]">Need Help?</p>
            <p className="font-poppins text-[11px] text-[#6b7280]">
              Questions about your booking? We&apos;re here to help.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-[40px] rounded-[8px] border-[#00a792] text-[#00a792] hover:bg-[#00a792] hover:text-white font-poppins font-medium text-[13px]"
        >
          Contact Support
        </Button>
      </div>
    </div>
  )
}
