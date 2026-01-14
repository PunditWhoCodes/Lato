'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile, useBookings, useInboxMessages, useUserReviews } from '@/lib/hooks/useProfile'
import {
  BookingsSidebar,
  BookingCard,
  InboxMessageCard,
  ReviewCard,
  EmptyState,
} from '@/components/profile'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { Navigation } from '@/components/navigation'
import type { Booking, InboxMessage, BookingStatus } from '@/lib/types/profile'

type MainTab = 'inbox' | 'bookings' | 'reviews'
type BookingTab = 'all' | 'upcoming' | 'completed' | 'cancelled'

export default function MyBookingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile } = useProfile()

  // Get active tab from URL params
  const mainTab = (searchParams.get('tab') as MainTab) || 'bookings'
  const [bookingTab, setBookingTab] = useState<BookingTab>('all')

  // Fetch data based on active tab
  const { data: bookings, isLoading: bookingsLoading } = useBookings()
  const { data: messages, isLoading: messagesLoading } = useInboxMessages()
  const { data: reviews, isLoading: reviewsLoading } = useUserReviews()

  // Filter bookings by status
  const filteredBookings = useMemo(() => {
    if (!bookings) return []
    if (bookingTab === 'all') return bookings
    return bookings.filter((b) => b.status === bookingTab)
  }, [bookings, bookingTab])

  // Count upcoming bookings
  const upcomingCount = useMemo(() => {
    return bookings?.filter((b) => b.status === 'upcoming').length || 0
  }, [bookings])

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.push('/login?redirect=/my-bookings')
    return null
  }

  const handleOpenMessage = (message: InboxMessage) => {
    router.push(`/messages/${message.id}`)
  }

  const handleViewBookingDetails = (booking: Booking) => {
    router.push(`/tours/${booking.tourId}`)
  }

  const handleCancelBooking = (booking: Booking) => {
    // TODO: Implement cancel booking dialog
    console.log('Cancel booking:', booking.id)
  }

  const setMainTab = (tab: string) => {
    router.push(`/my-bookings?tab=${tab}`)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <BookingsSidebar
                user={{
                  name: profile?.firstName && profile?.lastName
                    ? `${profile.firstName} ${profile.lastName}`
                    : user?.name || 'User',
                  email: user?.email || '',
                  avatar: profile?.avatar || user?.avatar,
                }}
                activeTab={mainTab}
                travelCredits={profile?.travelCredits ?? 0}
                currency={profile?.currency ?? 'USD'}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Bookings Tab */}
              {mainTab === 'bookings' && (
                <BookingsContent
                  bookings={filteredBookings}
                  isLoading={bookingsLoading}
                  bookingTab={bookingTab}
                  setBookingTab={setBookingTab}
                  upcomingCount={upcomingCount}
                  onViewDetails={handleViewBookingDetails}
                  onCancel={handleCancelBooking}
                />
              )}

              {/* Inbox Tab */}
              {mainTab === 'inbox' && (
                <InboxContent
                  messages={messages || []}
                  isLoading={messagesLoading}
                  onOpen={handleOpenMessage}
                />
              )}

              {/* Reviews Tab */}
              {mainTab === 'reviews' && (
                <ReviewsContent
                  reviews={reviews || []}
                  isLoading={reviewsLoading}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// Bookings Content Component
function BookingsContent({
  bookings,
  isLoading,
  bookingTab,
  setBookingTab,
  upcomingCount,
  onViewDetails,
  onCancel,
}: {
  bookings: Booking[]
  isLoading: boolean
  bookingTab: BookingTab
  setBookingTab: (tab: BookingTab) => void
  upcomingCount: number
  onViewDetails: (booking: Booking) => void
  onCancel: (booking: Booking) => void
}) {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-1">
          View and manage all your travel bookings and hold my seat requests
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={bookingTab} onValueChange={(v) => setBookingTab(v as BookingTab)}>
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start gap-6 h-auto p-0">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00A792] data-[state=active]:text-[#00A792] data-[state=active]:shadow-none pb-3 px-0"
          >
            All Bookings
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00A792] data-[state=active]:text-[#00A792] data-[state=active]:shadow-none pb-3 px-0"
          >
            Upcoming
            {upcomingCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-gray-100">
                {upcomingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00A792] data-[state=active]:text-[#00A792] data-[state=active]:shadow-none pb-3 px-0"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#00A792] data-[state=active]:text-[#00A792] data-[state=active]:shadow-none pb-3 px-0"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value={bookingTab} className="mt-6">
          {isLoading ? (
            <BookingsLoadingSkeleton />
          ) : bookings.length === 0 ? (
            <EmptyState
              type="bookings"
              title="No bookings yet"
              description="You haven't made any bookings yet. Start exploring our amazing tours and experiences!"
              actionLabel="Browse Tours"
              actionHref="/tours"
            />
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onViewDetails={onViewDetails}
                  onCancel={onCancel}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Inbox Content Component
function InboxContent({
  messages,
  isLoading,
  onOpen,
}: {
  messages: InboxMessage[]
  isLoading: boolean
  onOpen: (message: InboxMessage) => void
}) {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Inbox</h1>
        <p className="text-gray-500 mt-1">
          Keep track of your conversation, alerts and booking updates.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <InboxLoadingSkeleton />
      ) : messages.length === 0 ? (
        <EmptyState
          type="inbox"
          title="No messages yet"
          description="You don't have any messages yet. Messages from tour operators will appear here."
        />
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <InboxMessageCard
              key={message.id}
              message={message}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Reviews Content Component
function ReviewsContent({
  reviews,
  isLoading,
}: {
  reviews: import('@/lib/types/profile').UserReview[]
  isLoading: boolean
}) {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-500 mt-1">
          Keep track of your conversation, alerts and booking updates.
        </p>
      </div>

      {/* Content */}
      {isLoading ? (
        <ReviewsLoadingSkeleton />
      ) : reviews.length === 0 ? (
        <EmptyState
          type="reviews"
          title="No reviews yet"
          description="You haven't written any reviews yet. After completing a tour, you can share your experience here."
          actionLabel="Browse Tours"
          actionHref="/tours"
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  )
}

// Loading Skeletons
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

function InboxLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4 bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
          <div className="flex justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

function ReviewsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <Card key={i} className="p-6 bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
