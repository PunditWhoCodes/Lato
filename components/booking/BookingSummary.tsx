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
    <>
      {/* Mobile Design - Figma: 370px width */}
      <div className="lg:hidden flex flex-col items-start gap-[16.44px] w-[370px] mx-auto bg-white">
        {/* Photo Section Card - Figma: 370px x 365.56px */}
        <div className="w-[370px] border border-[#E5E7EB] rounded-[8.22px] p-[16.44px] flex flex-col gap-[16.44px]">
          {/* Tour Info Row */}
          <div className="flex gap-[12.33px] w-[335.06px]">
            {/* Tour Image - Figma: 82.22px x 82.22px */}
            <div className="relative w-[82.22px] h-[82.22px] rounded-[8.22px] overflow-hidden flex-shrink-0 border border-[rgba(229,231,235,0.5)]">
              <Image
                src={tourData.image}
                alt={tourData.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Tour Details */}
            <div className="flex flex-col gap-[8.22px] flex-1">
              {/* Title - Figma: Poppins 16.44px bold */}
              <h3 className="font-poppins text-[16.44px] font-bold text-[#111928] leading-[25px]">
                {tourData.title}
              </h3>

              {/* Duration - Figma: Poppins 14.39px 500 */}
              <p className="font-poppins text-[14.39px] font-medium text-[#374151] leading-[22px]">
                Duration: {tourData.duration}
              </p>

              {/* Rating Row */}
              <div className="flex items-center gap-[1px]">
                {/* Stars - Figma: 20.56px each, fill #FFAB53 */}
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-[20.56px] h-[20.56px] fill-[#FFAB53] text-[#FFAB53]" />
                ))}
                <Star className="w-[20.56px] h-[20.56px] fill-[#FFAB53] text-[#FFAB53]" style={{ clipPath: 'inset(0 10% 0 0)' }} />
                {/* Rating Text - Figma: Poppins 14.39px 500 */}
                <span className="ml-[4px] font-poppins text-[14.39px] font-medium text-[#111928] leading-[22px]">
                  {tourData.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[335.06px] h-[1.03px] bg-[#E5E7EB]" />

          {/* Tour Details Section */}
          <div className="flex flex-col gap-[12.33px] w-[335.06px]">
            {/* Starts In Row */}
            <div className="flex justify-between items-start gap-[12.33px]">
              <span className="font-poppins text-[14.39px] font-medium text-[#374151] leading-[22px] w-[123.33px]">
                Starts in
              </span>
              <div className="flex flex-col gap-[2.06px] flex-1">
                <p className="font-poppins text-[14.39px] font-medium text-[#111928] leading-[23px]">
                  {tourData.startLocation}
                </p>
                <p className="font-poppins text-[14.39px] font-normal text-[#374151] leading-[23px]">
                  {tourData.startDate}
                </p>
              </div>
            </div>

            {/* Ends Row */}
            <div className="flex justify-between items-start gap-[12.33px]">
              <span className="font-poppins text-[14.39px] font-medium text-[#374151] leading-[22px] w-[123.33px]">
                Ends
              </span>
              <div className="flex flex-col gap-[2.06px] flex-1">
                <p className="font-poppins text-[14.39px] font-medium text-[#111928] leading-[23px]">
                  {tourData.endLocation}
                </p>
                <p className="font-poppins text-[14.39px] font-normal text-[#374151] leading-[23px]">
                  {tourData.endDate}
                </p>
              </div>
            </div>

            {/* Tour Type Row */}
            <div className="flex justify-between items-center gap-[12.33px]">
              <span className="font-poppins text-[14.39px] font-medium text-[#374151] leading-[22px] w-[123.33px]">
                Tour Type
              </span>
              <span className="font-poppins text-[14.39px] font-medium text-[#111928] leading-[22px] flex-1">
                {tourData.tourType}
              </span>
            </div>
          </div>

          {/* More Details Button */}
          <button
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="flex items-center gap-[2.06px] pt-[4.11px]"
          >
            <span className="font-poppins text-[14.39px] font-medium text-[#374151] leading-[22px]">
              More Details
            </span>
            <ChevronDown className={`w-[20.56px] h-[20.56px] text-[#374151] transition-transform ${showMoreDetails ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Price Breakdown Card - Figma: 370px */}
        <div className="w-[370px] border border-[#E5E7EB] rounded-[8.22px] p-[16.44px] flex flex-col gap-[16.44px]">
          {/* Price Breakdown Title */}
          <h4 className="font-poppins text-[16.44px] font-bold text-[#111928] leading-[25px]">
            Price Breakdown
          </h4>

          {/* Price Items */}
          <div className="flex flex-col gap-[16.44px]">
            {/* Brochure Price */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-poppins text-[14.39px] font-medium text-[#111928] leading-[22px] capitalize">
                  Brochure Price
                </span>
                <span className="font-poppins text-[14.39px] font-normal text-[#6B7280] leading-[22px]">
                  USD {formatPrice(tourData.brochurePrice)} x 1 traveler
                </span>
              </div>
              <span className="font-poppins text-[14.39px] font-medium text-[#111928] leading-[22px]">
                USD {formatPrice(tourData.brochurePrice)}
              </span>
            </div>

            {/* Special Trip Deal */}
            <div className="flex justify-between items-center">
              <span className="font-poppins text-[14.39px] font-medium text-[#B4B4B4] leading-[22px]">
                Special Trip Deal (33% Off)
              </span>
              <span className="font-poppins text-[14.39px] font-medium text-[#B4B4B4] leading-[22px]">
                - USD {formatPrice(tourData.specialDiscount)}
              </span>
            </div>

            {/* Lato Discount */}
            <div className="flex justify-between items-center">
              <span className="font-poppins text-[14.39px] font-medium text-[#00A792] leading-[22px]">
                Lato Discount (3% Off)
              </span>
              <span className="font-poppins text-[14.39px] font-medium text-[#00B67A] leading-[22px]">
                - USD {formatPrice(tourData.latoDiscount)}
              </span>
            </div>
          </div>

          {/* Total Price Section */}
          <div className="flex flex-col gap-[16.44px]">
            {/* Total */}
            <div className="flex justify-between items-center pt-[16.44px] border-t border-[#E5E7EB]">
              <span className="font-poppins text-[16.44px] font-bold text-[#111928] leading-[25px]">
                Total Price
              </span>
              <span className="font-poppins text-[20.56px] font-bold text-[#00B67A] leading-[31px]">
                USD {formatPrice(tourData.totalPrice)}
              </span>
            </div>

            {/* Deposit Payable */}
            <div className="flex justify-between items-center">
              <span className="font-poppins text-[14.39px] font-medium text-[#111928] leading-[22px]">
                Deposit Payable Now
              </span>
              <span className="font-poppins text-[14.39px] font-bold text-[#00B67A] leading-[22px]">
                USD {formatPrice(tourData.depositPayable)}
              </span>
            </div>

            {/* Best Price Guarantee Section */}
            <div className="pt-[16.44px] border-t-[2.06px] border-[#00A792] flex flex-col gap-[12.33px]">
              {/* Checkmark + Title */}
              <div className="flex items-center gap-[8.22px]">
                <span className="font-poppins text-[16.44px] text-[#00A792]">✓</span>
                <span className="font-poppins text-[16.44px] font-bold text-[#111928] leading-[25px]">
                  Best Price Guaranteed!
                </span>
              </div>

              {/* Info Box - Figma: bg #ECF8F0, border #00A792 */}
              <div className="w-[335.06px] p-[16.44px] bg-[#ECF8F0] border border-[#00A792] rounded-[8.22px]">
                <p className="font-poppins text-[14.15px] font-bold text-[#111928] leading-[22px]">
                  Important: This above price is converted to show you the approximate cost in USD. You&apos;ll pay in USD. Lato does not charge any booking fees and covers all credit card fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Credits Reward Card - Figma: 370px */}
        <div className="w-[370px] border border-[#E5E7EB] rounded-[8.22px] p-[12.33px_16.44px] relative">
          {/* Teal Left Border */}
          <div className="absolute left-[1.03px] top-[1.03px] bottom-[0.64px] w-[4.11px] bg-[#00A792] rounded-l-[8.22px]" />

          <div className="flex justify-between items-start gap-[16.44px] pl-[8px]">
            {/* Left Content */}
            <div className="flex flex-col gap-[4.11px]">
              {/* Title + Info Icon */}
              <div className="flex items-center gap-[8.22px]">
                <span className="font-poppins text-[14.39px] font-bold text-[#374151] leading-[22px]">
                  Travel Credits Reward
                </span>
                <Info className="w-[18.5px] h-[18.5px] text-[#374151]" strokeWidth={1.5} />
              </div>
              {/* Description */}
              <p className="font-poppins text-[12.86px] font-normal text-[#374151] leading-[22px]">
                Earn on tour completion • Use on future bookings
              </p>
            </div>

            {/* Right Content - Amount */}
            <div className="flex flex-col items-end gap-[2.06px]">
              <span className="font-poppins text-[14.39px] font-bold text-[#374151] leading-[22px]">
                USD {formatPrice(tourData.travelCreditsReward)}
              </span>
              <span className="font-poppins text-[14.39px] font-normal text-[#374151] leading-[22px]">
                Travel Credits
              </span>
            </div>
          </div>
        </div>

        {/* Need Help Card - Figma: 370px */}
        <div className="w-[370px] border border-[#E5E7EB] rounded-[8.22px] p-[24.67px] flex flex-col gap-[8.22px]">
          {/* Header Row */}
          <div className="flex items-center gap-[8.22px]">
            {/* Teal Circle with Icon */}
            <div className="w-[24.67px] h-[24.67px] rounded-full bg-[#00A792] flex items-center justify-center">
              <HelpCircle className="w-[12.33px] h-[12.33px] text-white" />
            </div>
            <span className="font-poppins text-[14.39px] font-bold text-[#111928] leading-[22px]">
              Need Help?
            </span>
          </div>

          {/* Description */}
          <p className="font-poppins text-[14.39px] font-normal text-[#374151] leading-[22px]">
            Questions about your booking? We&apos;re here to help.
          </p>

          {/* Contact Support Button */}
          <Button
            variant="outline"
            className="w-[318.61px] h-[38.44px] rounded-[8.22px] bg-[rgba(0,167,146,0.2)] border-0 text-[#00A792] hover:bg-[rgba(0,167,146,0.3)] font-poppins font-medium text-[14.39px] leading-[22px]"
          >
            Contact Support
          </Button>
        </div>
      </div>

      {/* Desktop Design - Original */}
      <div className="hidden lg:block bg-white rounded-[8px] border border-[#e5e7eb] overflow-hidden">
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
    </>
  )
}
