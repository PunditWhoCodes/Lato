'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { Navigation } from '@/components/navigation'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { TravelCreditsCard } from '@/components/profile/TravelCreditsCard'
import { BookingCard } from '@/components/profile/BookingCard'
import { CheckCircle2, Star } from 'lucide-react'

type ProfileTab = 'inbox' | 'bookings' | 'reviews'

// Custom SVG Icons with color support
const MailIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M1.72485 5.1748L7.68713 8.55308C9.8852 9.79852 10.8139 9.79852 13.012 8.55308L18.9743 5.1748"
      stroke={isActive ? "white" : "#141B34"}
      strokeOpacity={isActive ? "1" : "0.3"}
      strokeWidth="0.646853"
      strokeLinejoin="round"
    />
    <path
      d="M1.73845 11.6222C1.79484 14.2662 1.82303 15.5881 2.79859 16.5674C3.77416 17.5467 5.1319 17.5808 7.84739 17.649C9.521 17.6911 11.1781 17.6911 12.8517 17.649C15.5672 17.5808 16.925 17.5467 17.9005 16.5674C18.8761 15.5881 18.9043 14.2662 18.9607 11.6222C18.9788 10.7721 18.9788 9.92701 18.9607 9.07689C18.9043 6.43296 18.8761 5.11099 17.9005 4.13171C16.925 3.15244 15.5672 3.11832 12.8517 3.05009C11.1781 3.00804 9.52099 3.00804 7.84738 3.05009C5.1319 3.11831 3.77416 3.15242 2.79859 4.1317C1.82302 5.11098 1.79483 6.43294 1.73845 9.07688C1.72032 9.927 1.72032 10.7721 1.73845 11.6222Z"
      stroke={isActive ? "white" : "#141B34"}
      strokeOpacity={isActive ? "1" : "0.3"}
      strokeWidth="0.646853"
      strokeLinejoin="round"
    />
  </svg>
)

const ReviewIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12.2096 3.06378L13.7749 6.22008C13.9883 6.65945 14.5575 7.08088 15.0377 7.16158L17.8746 7.63682C19.6889 7.94169 20.1157 9.26877 18.8084 10.5779L16.6029 12.8017C16.2294 13.1783 16.0248 13.9046 16.1405 14.4246L16.7719 17.1774C17.2699 19.3563 16.1227 20.1992 14.2106 19.0604L11.5515 17.4733C11.0713 17.1864 10.2798 17.1864 9.79068 17.4733L7.13159 19.0604C5.22844 20.1992 4.07232 19.3474 4.57034 17.1774L5.20176 14.4246C5.31737 13.9046 5.11283 13.1783 4.73931 12.8017L2.53379 10.5779C1.23537 9.26877 1.65335 7.94169 3.46758 7.63682L6.30452 7.16158C6.77586 7.08088 7.34503 6.65945 7.55847 6.22008L9.12368 3.06378C9.97743 1.35114 11.3648 1.35114 12.2096 3.06378Z"
      stroke={isActive ? "white" : "#141B34"}
      strokeOpacity={isActive ? "1" : "0.3"}
      strokeWidth="0.646853"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const BookingIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M21.2106 8.23332C21.3798 8.0642 21.6712 8.04695 21.8426 8.23392C22.8464 9.32875 23.4019 10.1394 23.5848 11.0372C23.6901 11.5537 23.7051 12.0795 23.6291 12.5909C23.4237 13.973 22.3039 15.0928 20.0644 17.3323L17.3326 20.0641C15.093 22.3037 13.9733 23.4234 12.5911 23.6288C12.0798 23.7048 11.554 23.6898 11.0375 23.5846C10.1398 23.4017 9.32918 22.8462 8.23453 21.8427C8.04734 21.6711 8.06464 21.3793 8.23396 21.21C9.17691 20.267 9.13211 18.6934 8.13389 17.6952C7.13566 16.697 5.56203 16.6522 4.61907 17.5951C4.44976 17.7644 4.158 17.7817 3.98639 17.5945C2.98283 16.4999 2.42741 15.6893 2.24448 14.7916C2.13923 14.2751 2.12426 13.7493 2.20025 13.2379C2.40563 11.8558 3.52541 10.736 5.76495 8.4965L8.49674 5.7647C10.7363 3.52516 11.8561 2.40539 13.2382 2.2C13.7495 2.12402 14.2754 2.13899 14.7919 2.24424C15.6897 2.42719 16.5003 2.98272 17.5952 3.98649C17.7821 4.1579 17.7649 4.44931 17.5958 4.61844C16.6528 5.56139 16.6976 7.13502 17.6958 8.13325C18.694 9.13147 20.2677 9.17627 21.2106 8.23332Z"
      stroke={isActive ? "white" : "#141B34"}
      strokeOpacity={isActive ? "1" : "0.3"}
      strokeWidth="0.645724"
      strokeLinejoin="round"
    />
    <path
      d="M20.4481 16.1429L9.68604 5.38086"
      stroke={isActive ? "white" : "#141B34"}
      strokeOpacity={isActive ? "1" : "0.3"}
      strokeWidth="0.645724"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Mock data for demonstration
const mockInboxMessages = [
  {
    id: '1',
    senderName: 'Alice Smith',
    subject: 'Re: Project Update',
    preview: 'A SaaS (Software as a Service) platform offers cloud-based software solutions, accessible via...',
    time: '1 min ago',
  },
  {
    id: '2',
    senderName: 'William Smith',
    subject: 'Meeting Tomorrow',
    preview: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project de...",
    time: '2 days ago',
  },
]

const mockReviews = [
  {
    id: '1',
    reviewerName: 'Leonie',
    isVerified: true,
    date: 'December 14th, 2025',
    rating: 5.0,
    ratingLabel: 'Excellent',
    title: 'Peru Best Tours are awesome',
    content: 'The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.',
  },
  {
    id: '2',
    reviewerName: 'Leonie',
    isVerified: true,
    date: 'December 14th, 2025',
    rating: 5.0,
    ratingLabel: 'Excellent',
    title: 'Peru Best Tours are awesome',
    content: 'The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.',
  },
]

export default function MyProfilePage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile, isLoading: profileLoading } = useProfile()
  const [activeTab, setActiveTab] = useState<ProfileTab>('reviews')

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.push('/login?redirect=/profile')
    return null
  }

  const isLoading = authLoading || profileLoading

  // Get initials for avatar fallback
  const getInitials = () => {
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()
    }
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return 'U'
  }

  const userName = profile?.firstName && profile?.lastName
    ? `${profile.firstName} ${profile.lastName}`
    : user?.name || 'User'

  const userEmail = profile?.email || user?.email || ''
  const travelCredits = profile?.travelCredits ?? 80

  const tabs = [
    { id: 'inbox' as ProfileTab, label: 'Inbox', icon: MailIcon },
    { id: 'bookings' as ProfileTab, label: 'Bookings', icon: BookingIcon },
    { id: 'reviews' as ProfileTab, label: 'My Reviews', icon: ReviewIcon },
  ]

  // Mock booking data for BookingCard component
  const mockBooking = {
    id: '7839',
    tourId: 'tour-123',
    tourTitle: '3-Day Island Hopping Adventure',
    tourImage: '/destinations/italy.jpg',
    companyName: 'Island Tours Co.',
    bookingDate: '2023-09-15',
    travelDate: '2023-10-12',
    endDate: '2023-10-15',
    travelers: 2,
    destination: 'Bali, Indonesia',
    status: 'upcoming' as const,
    totalAmount: 350,
    currency: 'USD',
  }

  const getTabContent = () => {
    switch (activeTab) {
      case 'inbox':
        return {
          title: 'My Inbox',
          description: 'Keep track of your conversation, alerts and booking updates.',
        }
      case 'bookings':
        return {
          title: 'My Bookings',
          description: 'Keep track of your conversation, alerts and booking updates.',
        }
      case 'reviews':
        return {
          title: 'My Reviews',
          description: 'Keep track of your conversation, alerts and booking updates.',
        }
    }
  }

  const tabContent = getTabContent()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="px-4 py-6">
          {/* User Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            {isLoading ? (
              <>
                <Skeleton className="h-[60px] w-[60px] rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </>
            ) : (
              <>
                <Avatar className="h-[60px] w-[60px]">
                  <AvatarImage
                    src={profile?.avatar || user?.avatar}
                    alt={userName}
                  />
                  <AvatarFallback className="bg-[#00a792] text-white text-xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-poppins text-[16px] font-semibold text-black">
                    {userName}
                  </h2>
                  <p className="font-poppins text-[13px] text-[#6b7280]">
                    {userEmail}
                  </p>
                  <Link
                    href="/profile/account"
                    className="font-poppins text-[13px] text-[#00a792] hover:underline"
                  >
                    Account Settings
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Travel Credits Card */}
          <div className="mb-6">
            <TravelCreditsCard amount={travelCredits} currency="USD" variant="card" />
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-[10px] transition-colors ${
                    isActive
                      ? 'bg-[#00a792] text-white'
                      : 'bg-white border border-[rgba(0,0,0,0.09)] text-[rgba(20,27,52,0.3)]'
                  }`}
                >
                  <Icon className="shrink-0" isActive={isActive} />
                  <span className={`font-poppins font-light text-base capitalize ${
                    isActive ? 'text-white' : 'text-[rgba(20,27,52,0.3)]'
                  }`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div>
            <h3 className="font-poppins text-[20px] font-semibold text-black mb-2">
              {tabContent.title}
            </h3>
            <p className="font-poppins text-[14px] text-[#6b7280] mb-6">
              {tabContent.description}
            </p>

            {/* Content based on active tab */}
            {activeTab === 'inbox' && (
              <div className="space-y-4">
                {mockInboxMessages.map((message) => (
                  <Card key={message.id} className="p-4 border border-[#e5e7eb] rounded-[10px]">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-poppins text-[14px] font-semibold text-black">
                          {message.senderName}
                        </p>
                        <p className="font-poppins text-[13px] text-[#6b7280]">
                          {message.subject}
                        </p>
                      </div>
                      <span className="font-poppins text-[12px] text-[#9ca3af]">
                        {message.time}
                      </span>
                    </div>
                    <p className="font-poppins text-[13px] text-[#6b7280] line-clamp-2">
                      {message.preview}
                    </p>
                    <button className="mt-3 px-4 py-1.5 bg-black text-white text-[12px] font-medium rounded-[5px]">
                      Open
                    </button>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <BookingCard booking={mockBooking} />
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id} className="p-4 border border-[#e5e7eb] rounded-[10px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#22c55e] flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {review.reviewerName[0]}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-poppins text-[14px] font-semibold text-black">
                              {review.reviewerName}
                            </span>
                            {review.isVerified && (
                              <span className="flex items-center gap-1 text-[10px] text-[#00a792] whitespace-nowrap">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified Traveler
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="font-poppins text-[8px] text-[#9ca3af] whitespace-nowrap">
                        Written on {review.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
                          />
                        ))}
                      </div>
                      <span className="font-poppins text-[13px] font-semibold text-black">
                        {review.rating.toFixed(1)}
                      </span>
                      <span className="font-poppins text-[13px] text-[#6b7280]">
                        {review.ratingLabel}
                      </span>
                    </div>
                    <h4 className="font-poppins text-[14px] font-semibold text-black mb-2">
                      {review.title}
                    </h4>
                    <p className="font-poppins text-[13px] text-[#6b7280] leading-relaxed">
                      {review.content}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
