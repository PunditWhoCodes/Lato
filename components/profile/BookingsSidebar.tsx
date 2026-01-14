'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { TravelCreditsCard } from './TravelCreditsCard'
import { Mail, Calendar, Star } from 'lucide-react'

interface BookingsSidebarProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
  activeTab: 'inbox' | 'bookings' | 'reviews'
  travelCredits?: number
  currency?: string
  className?: string
}

const tabs = [
  {
    id: 'inbox' as const,
    label: 'Inbox',
    icon: Mail,
    param: 'inbox',
  },
  {
    id: 'bookings' as const,
    label: 'Bookings',
    icon: Calendar,
    param: 'bookings',
  },
  {
    id: 'reviews' as const,
    label: 'My Reviews',
    icon: Star,
    param: 'reviews',
  },
]

export function BookingsSidebar({
  user,
  activeTab,
  travelCredits = 0,
  currency = 'USD',
  className,
}: BookingsSidebarProps) {
  // Get initials for avatar fallback
  const getInitials = () => {
    if (user.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return 'U'
  }

  return (
    <div className={cn('space-y-5', className)}>
      {/* User Profile Header */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-[#D9D9D9] text-gray-600 text-lg">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-poppins font-medium text-lg text-black capitalize">
              {user.name}
            </p>
            <p className="font-poppins font-light text-sm text-[rgba(0,0,0,0.66)] lowercase">
              {user.email}
            </p>
          </div>
          <Link
            href="/profile"
            className="font-poppins font-light text-sm text-[#00A792] capitalize hover:underline"
          >
            Account Settings
          </Link>
        </div>
      </div>

      {/* Travel Credits */}
      <TravelCreditsCard
        amount={travelCredits}
        currency={currency}
        variant="sidebar"
      />

      {/* Navigation Tabs */}
      <div className="space-y-3">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <Link
              key={tab.id}
              href={`/my-bookings?tab=${tab.param}`}
              className={cn(
                'flex items-center gap-4 px-4 py-3 rounded-[10px] transition-colors w-full',
                isActive
                  ? 'bg-[#00A792]'
                  : 'border border-[rgba(0,0,0,0.09)] hover:border-[rgba(0,0,0,0.2)]'
              )}
            >
              <Icon className={cn(
                'h-5 w-5',
                isActive ? 'text-white' : 'text-[rgba(20,27,52,0.3)]'
              )} />
              <span className={cn(
                'font-poppins font-light text-base capitalize',
                isActive ? 'text-white' : 'text-[rgba(20,27,52,0.3)]'
              )}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BookingsSidebar
