'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Pencil, Lock, Briefcase, MessageSquare, CreditCard, ChevronRight } from 'lucide-react'

interface SidebarItem {
  id: string
  label: string
  description: string
  href: string
  icon: React.ElementType
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'profile',
    label: 'Edit Profile',
    description: 'Update Your Personal Information',
    href: '/profile/edit',
    icon: Pencil,
  },
  {
    id: 'password',
    label: 'Change Password',
    description: 'Update Your Account Password',
    href: '/profile/password',
    icon: Lock,
  },
  {
    id: 'bookings',
    label: 'My Bookings',
    description: 'View And Manage Your Travel Bookings',
    href: '/my-bookings',
    icon: Briefcase,
  },
  {
    id: 'trip-planner',
    label: 'Trip Planner Request',
    description: 'Manage Your Custom Trip Requests',
    href: '/trip-planner',
    icon: MessageSquare,
  },
]

interface ProfileSidebarProps {
  travelCredits?: number
  currency?: string
  className?: string
}

export function ProfileSidebar({
  travelCredits = 0,
  currency = 'USD',
  className,
}: ProfileSidebarProps) {
  const pathname = usePathname()

  // Determine active item based on pathname
  const getActiveItem = () => {
    if (pathname === '/profile/edit') return 'profile'
    if (pathname === '/profile/password') return 'password'
    if (pathname?.startsWith('/my-bookings')) return 'bookings'
    if (pathname?.startsWith('/trip-planner')) return 'trip-planner'
    return null
  }

  const activeItem = getActiveItem()
  const isSubPage = pathname !== '/profile'

  return (
    <Card className={cn('lg:w-[298px] px-[30px] py-8 bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px]', className)}>
      <h2 className="font-poppins font-semibold text-[18px] text-black mb-8 capitalize">
        Account Management
      </h2>

      <nav className="flex flex-col gap-4">
        {/* Back to Profile link - shown on sub-pages */}
        {isSubPage && (
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-gray-600 hover:text-[#00a792] hover:bg-gray-50 transition-colors mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            <div>
              <p className="font-poppins font-medium text-sm capitalize">Back To Profile</p>
              <p className="font-poppins font-light text-xs text-gray-500 capitalize">View Your Profile</p>
            </div>
          </Link>
        )}

        {sidebarItems.map((item) => {
          const isActive = activeItem === item.id
          const Icon = item.icon

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center justify-between p-3 rounded-[10px] transition-colors',
                isActive
                  ? 'bg-[rgba(0,167,146,0.06)] border border-[#00a792]'
                  : 'hover:bg-gray-50'
              )}
            >
              <div className="flex items-center gap-4">
                <Icon className="h-5 w-5 text-black" strokeWidth={1.5} />
                <div>
                  <p className={cn(
                    'font-poppins font-medium text-[16px] capitalize',
                    isActive ? 'text-[#00a792]' : 'text-black'
                  )}>
                    {item.label}
                  </p>
                  <p className={cn(
                    'font-poppins font-light text-[13px] capitalize',
                    isActive ? 'text-[#00a792]' : 'text-[#6b7280]'
                  )}>
                    {item.description}
                  </p>
                </div>
              </div>
              {isActive && (
                <ChevronRight className="h-5 w-5 text-[#00a792]" />
              )}
            </Link>
          )
        })}

        {/* Travel Credits - styled as menu item */}
        <div className="flex items-center p-3 rounded-[10px] hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-4">
            <CreditCard className="h-5 w-5 text-black" strokeWidth={1.5} />
            <div>
              <p className="font-poppins font-medium text-[16px] text-black capitalize">
                Travel Credits
              </p>
              <p className="font-poppins font-light text-[13px] text-[#6b7280]">
                Available: {currency} {travelCredits.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </Card>
  )
}

export default ProfileSidebar
