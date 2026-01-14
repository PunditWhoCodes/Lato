'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, MapPin } from 'lucide-react'
import type { Booking, BookingStatus } from '@/lib/types/profile'

interface BookingCardProps {
  booking: Booking
  onCancel?: (booking: Booking) => void
  onViewDetails?: (booking: Booking) => void
  className?: string
}

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  upcoming: {
    label: 'Upcoming',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
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
      year: 'numeric',
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const status = statusConfig[booking.status]

  return (
    <Card className={cn('overflow-hidden bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]', className)}>
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
                className={cn('mb-2', status.className)}
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
  )
}

export default BookingCard
