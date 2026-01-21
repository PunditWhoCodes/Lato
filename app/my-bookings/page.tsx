'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile, useBookings } from '@/lib/hooks/useProfile'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { BookingCard } from '@/components/profile'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import { ChevronLeft } from 'lucide-react'
import type { Booking } from '@/lib/types/profile'

type BookingTab = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function MyBookingsPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile } = useProfile()
  const { data: bookings, isLoading: bookingsLoading } = useBookings()

  const [activeTab, setActiveTab] = useState<BookingTab>('all')

  // Filter bookings by status
  const filteredBookings = useMemo(() => {
    if (!bookings) return []
    if (activeTab === 'all') return bookings
    return bookings.filter((b) => b.status === activeTab)
  }, [bookings, activeTab])

  // Count upcoming bookings
  const upcomingCount = useMemo(() => {
    return bookings?.filter((b) => b.status === 'upcoming').length || 0
  }, [bookings])

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.push('/login?redirect=/my-bookings')
    return null
  }

  const handleViewBookingDetails = (booking: Booking) => {
    router.push(`/tours/${booking.tourId}`)
  }

  const handleCancelBooking = (booking: Booking) => {
    // TODO: Implement cancel booking dialog
    console.log('Cancel booking:', booking.id)
  }

  const tabs: { id: BookingTab; label: string; count?: number }[] = [
    { id: 'all', label: 'All Bookings' },
    { id: 'upcoming', label: 'Upcoming', count: upcomingCount },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Mobile Back Header */}
          <div className="lg:hidden mb-6">
            <Link
              href="/profile/account"
              className="inline-flex items-center gap-1 text-black hover:text-[#00a792] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-poppins text-[18px] font-semibold">My Bookings</span>
            </Link>
            <p className="font-poppins text-[13px] text-[rgba(0,0,0,0.7)] mt-1 ml-6">
              View and manage all your travel bookings and hold my seat requests
            </p>
          </div>

          {/* Desktop Page Header */}
          <div className="hidden lg:block mb-8">
            <h1 className="font-poppins text-[28px] font-medium text-black">
              My Bookings
            </h1>
            <p className="font-poppins font-light text-[14px] text-[rgba(0,0,0,0.7)] mt-2">
              View and manage all your travel bookings and hold my seat requests
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Left Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <ProfileSidebar
                travelCredits={profile?.travelCredits ?? 0}
                currency="USD"
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`font-poppins text-[14px] pb-3 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'text-[#00a792] border-[#00a792]'
                          : 'text-[#6b7280] border-transparent hover:text-[#00a792]'
                      }`}
                    >
                      {tab.label}
                      {tab.count !== undefined && tab.count > 0 && (
                        <span className="ml-1">{tab.count}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mt-6">
                {bookingsLoading ? (
                  <BookingsLoadingSkeleton />
                ) : filteredBookings.length === 0 ? (
                  <EmptyBookingsState />
                ) : (
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onViewDetails={handleViewBookingDetails}
                        onCancel={handleCancelBooking}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// Empty State Component
function EmptyBookingsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <h3 className="font-poppins text-[20px] font-semibold text-black text-center mb-2">
        No bookings yet
      </h3>
      <p className="font-poppins text-[14px] text-[#6b7280] text-center max-w-md mb-6">
        You haven't made any bookings yet. Start exploring our amazing tours and experiences!
      </p>
      <Button
        asChild
        className="bg-[#00a792] hover:bg-[#008577] text-white rounded-full h-[44px] px-10 font-poppins text-[14px] font-medium"
      >
        <Link href="/tours">Browse Tours</Link>
      </Button>
    </div>
  )
}

// Loading Skeleton
function BookingsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4 bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
          <div className="flex gap-4">
            <Skeleton className="w-48 h-32" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
