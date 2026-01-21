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
import { ShoppingCart, Mail, Briefcase, Star, CheckCircle2 } from 'lucide-react'

type ProfileTab = 'inbox' | 'bookings' | 'reviews'

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
    { id: 'inbox' as ProfileTab, label: 'Inbox', icon: Mail },
    { id: 'bookings' as ProfileTab, label: 'Bookings', icon: Briefcase },
    { id: 'reviews' as ProfileTab, label: 'My Reviews', icon: Star },
  ]

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
          <Card className="bg-[#fafbfc] border border-[#e5e7eb] rounded-[10px] p-4 mb-6">
            <div className="flex items-start">
              <ShoppingCart className="h-6 w-6 text-[#6b7280] mr-3" strokeWidth={1.5} />
            </div>
            <p className="font-poppins text-[14px] text-black mt-3">Travel Credits</p>
            <p className="font-poppins text-[20px] font-semibold text-[#00a792]">
              ${travelCredits.toFixed(2)}
            </p>
          </Card>

          {/* Tab Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-[10px] transition-colors ${
                    isActive
                      ? 'bg-[#00a792] text-white'
                      : 'bg-white border border-[#e5e7eb] text-[#6b7280]'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="font-poppins text-[14px] font-medium">
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
                    <button className="mt-3 px-4 py-1.5 bg-[#00a792] text-white text-[12px] font-medium rounded-[5px]">
                      Open
                    </button>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <Card className="overflow-hidden border border-[#e5e7eb] rounded-[10px]">
                  <div className="relative h-[180px]">
                    <Image
                      src="/destinations/italy.jpg"
                      alt="3-Day Island Hopping Adventure"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-poppins text-[16px] font-semibold text-black mb-2">
                      3-Day Island Hopping Adventure
                    </h4>
                    <div className="flex items-center gap-4 text-[13px] text-[#6b7280] mb-2">
                      <span>📍 Bali, Indonesia</span>
                      <span>📅 Oct 12- Oct 15, 2023</span>
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-[#6b7280] mb-3">
                      <span>👥 2 Adults</span>
                      <span>🎫 #BK - 7839</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-[#e5e7eb] rounded-[5px] text-[13px] font-medium">
                          ↓ Invoice
                        </button>
                        <button className="px-4 py-2 bg-[#1f2937] text-white rounded-[5px] text-[13px] font-medium">
                          View Details
                        </button>
                      </div>
                      <span className="px-2 py-1 bg-[#dcfce7] text-[#16a34a] text-[12px] rounded">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#e5e7eb]">
                      <span className="text-[12px] text-[#6b7280]">Total Price</span>
                      <div className="flex items-center gap-2">
                        <span className="font-poppins text-[16px] font-semibold text-black">
                          $350.00
                        </span>
                        <span className="px-2 py-0.5 bg-[#00a792] text-white text-[10px] rounded">
                          Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
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
                              <span className="flex items-center gap-1 text-[12px] text-[#00a792]">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified Traveler
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="font-poppins text-[11px] text-[#9ca3af]">
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
