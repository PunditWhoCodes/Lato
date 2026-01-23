'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, MapPin, Download, FileText } from 'lucide-react'
import type { Booking, BookingStatus } from '@/lib/types/profile'

interface BookingCardProps {
  booking: Booking
  onCancel?: (booking: Booking) => void
  onViewDetails?: (booking: Booking) => void
  className?: string
}

const statusConfig: Record<BookingStatus, { label: string; bgColor: string; textColor: string }> = {
  upcoming: {
    label: 'Confirmed',
    bgColor: 'rgba(28, 152, 247, 0.08)',
    textColor: '#1C98F7',
  },
  completed: {
    label: 'Completed',
    bgColor: 'rgba(0, 167, 146, 0.18)',
    textColor: '#00A792',
  },
  cancelled: {
    label: 'Cancelled',
    bgColor: 'rgba(242, 56, 19, 0.08)',
    textColor: '#F23813',
  },
  pending: {
    label: 'Pending',
    bgColor: 'rgba(255, 164, 50, 0.08)',
    textColor: '#FFA432',
  },
}

export function BookingCard({
  booking,
  onCancel,
  onViewDetails,
  className,
}: BookingCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const formatYear = (dateString: string) => {
    const date = new Date(dateString)
    return date.getFullYear()
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const status = statusConfig[booking.status]

  return (
    <>
      {/* Mobile Card - Figma: 369px x 393.68px - Show on all screens */}
      <div className="flex justify-center">
        <div
          className={cn(
            "flex flex-col items-end w-[369px] bg-white border-[0.72px] border-black/10 rounded-[11.08px] p-[16px_10px] gap-[10px]",
            className
          )}
        >
          {/* Image - Figma: 349px x 192px */}
          <div className="relative w-[349px] h-[192px] rounded-[7.07px] overflow-hidden bg-[#D9D9D9] self-stretch">
            <Image
              src={booking.tourImage || '/placeholder-tour.jpg'}
              alt={booking.tourTitle}
              fill
              className="object-cover"
            />
          </div>

          {/* Title - Figma: 18.071px Poppins semibold */}
          <h3 className="w-[347px] font-poppins font-semibold text-[18.07px] leading-[18px] text-[#1C2B38] self-stretch">
            {booking.tourTitle}
          </h3>

          {/* Info Row - Two columns */}
          <div className="flex justify-between items-center w-[349px] h-[48.84px] self-stretch">
            {/* Left Column - Location & People */}
            <div className="flex flex-col gap-[10.84px]">
              {/* Location */}
              <div className="flex items-center gap-[4.34px]">
                <MapPin className="w-[14.46px] h-[14.46px] text-[#495560]" strokeWidth={1.5} />
                <span className="font-poppins font-normal text-[12.69px] leading-[19px] text-[#495560]">
                  {booking.destination || 'Bali, Indonesia'}
                </span>
              </div>
              {/* People */}
              <div className="flex items-center gap-[2.89px]">
                <Users className="w-[15.9px] h-[15.9px] text-[#495560]" strokeWidth={1.5} />
                <span className="font-poppins font-normal text-[12.69px] leading-[19px] text-[#495560]">
                  {booking.travelers} Adult{booking.travelers > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Right Column - Date & Booking ID */}
            <div className="flex flex-col gap-[10.84px]">
              {/* Date */}
              <div className="flex items-center gap-[6.51px]">
                <Calendar className="w-[17.35px] h-[17.35px] text-[#495560]" strokeWidth={1.5} />
                <span className="font-poppins font-normal text-[12.69px] leading-[19px] text-[#495560]">
                  {formatDate(booking.travelDate)}- {booking.endDate ? formatDate(booking.endDate) : formatDate(booking.travelDate)}, {formatYear(booking.travelDate)}
                </span>
              </div>
              {/* Booking ID */}
              <div className="flex items-center gap-[3.61px]">
                <FileText className="w-[17.35px] h-[17.35px] text-[#495560]" strokeWidth={1.5} />
                <span className="font-poppins font-normal text-[12.69px] leading-[19px] text-[#495560]">
                  #BK - {booking.id.toString().slice(-4)}
                </span>
              </div>
            </div>
          </div>

          {/* Status + Buttons Row */}
          <div className="flex flex-col items-end w-[347px] gap-0">
            {/* Status Badge - positioned above buttons */}
            <div
              className="flex items-center justify-center px-[7.23px] py-[7.23px] rounded-[7.23px] -mb-[17px]"
              style={{ backgroundColor: status.bgColor }}
            >
              <span
                className="font-poppins font-normal text-[9.06px] leading-[14px]"
                style={{ color: status.textColor }}
              >
                {status.label}
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-[9.92px] w-[347px]">
              {/* Invoice Button */}
              <button className="flex items-center justify-center gap-[5.06px] w-[107.7px] h-[32.53px] border-[0.72px] border-black/[0.11] rounded-[15.3px]">
                <Download className="w-[17.35px] h-[17.35px] text-[#141B34]" strokeWidth={1.5} />
                <span className="font-poppins font-normal text-[11.57px] text-black">Invoice</span>
              </button>

              {/* View Details Button */}
              <button
                onClick={() => onViewDetails?.(booking)}
                className="flex items-center justify-center w-[107.7px] h-[32.53px] bg-black rounded-[15.3px]"
              >
                <span className="font-poppins font-normal text-[11.57px] text-white">View Details</span>
              </button>
            </div>
          </div>

          {/* Total Price Section */}
          <div className="flex flex-col items-start gap-[3.61px] w-[107.7px]">
            <span className="font-poppins font-normal text-[9.06px] leading-[14px] text-[#A7A9AF]">
              Total Price
            </span>
            <div className="flex items-center gap-[3.61px]">
              <span className="font-volkhov font-bold text-[18.07px] leading-[12px] text-black">
                {formatCurrency(booking.totalAmount, booking.currency)}
              </span>
              {/* Paid Badge */}
              <div className="flex items-center justify-center px-[7.23px] py-[7.23px] bg-[rgba(0,167,146,0.18)] rounded-[7.23px]">
                <span className="font-poppins font-normal text-[9.06px] leading-[14px] text-[#00A792]">
                  Paid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Card - Hidden for now, using mobile Figma design on all screens */}
      <Card className={cn('hidden overflow-hidden bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]', className)}>
        <div className="flex flex-col sm:flex-row">
          {/* Tour Image */}
          <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
            <Image
              src={booking.tourImage || '/placeholder-tour.jpg'}
              alt={booking.tourTitle}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Status Badge */}
                <Badge
                  variant="outline"
                  className="mb-2"
                  style={{
                    backgroundColor: status.bgColor,
                    color: status.textColor,
                    borderColor: status.textColor,
                  }}
                >
                  {status.label}
                </Badge>

                {/* Tour Title */}
                <h3 className="font-semibold text-gray-900 mb-1">
                  {booking.tourTitle}
                </h3>

                {/* Company */}
                <p className="text-sm text-gray-500 mb-3">{booking.companyName}</p>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(booking.travelDate)}</span>
                    {booking.endDate && (
                      <span> - {formatDate(booking.endDate)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>
                      {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                    </span>
                  </div>
                  {booking.destination && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.destination}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Actions */}
              <div className="text-right">
                <p className="font-semibold text-lg text-gray-900">
                  {formatCurrency(booking.totalAmount, booking.currency)}
                </p>
                <p className="text-xs text-gray-500 mb-3">Total</p>

                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[#00A792] border-[#00A792] hover:bg-[#00A792] hover:text-white"
                    onClick={() => onViewDetails?.(booking)}
                  >
                    View Details
                  </Button>
                  {booking.status === 'upcoming' && onCancel && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onCancel(booking)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default BookingCard
