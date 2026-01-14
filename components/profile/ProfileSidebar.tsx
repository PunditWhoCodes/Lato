'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface SidebarItem {
  id: string
  label: string
  description: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'profile',
    label: 'Edit Profile',
    description: 'Update Your Personal Information',
    href: '/profile/edit',
  },
  {
    id: 'password',
    label: 'Change Password',
    description: 'Update Your Account Password',
    href: '/profile/password',
  },
  {
    id: 'bookings',
    label: 'My Bookings',
    description: 'View And Manage Your Travel Bookings',
    href: '/my-bookings',
  },
]

interface ProfileSidebarProps {
  travelCredits?: number
  currency?: string
  className?: string
}

export function ProfileSidebar({
  travelCredits = 0,
  currency = 'INR',
  className,
}: ProfileSidebarProps) {
  const pathname = usePathname()

  // Determine active item based on pathname
  const getActiveItem = () => {
    if (pathname === '/profile/edit') return 'profile'
    if (pathname === '/profile/password') return 'password'
    if (pathname?.startsWith('/my-bookings')) return 'bookings'
    return null
  }

  const activeItem = getActiveItem()
  const isSubPage = pathname !== '/profile'

  return (
    <Card className={cn('p-5 bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]', className)}>
      <h2 className="font-poppins font-semibold text-base text-gray-900 mb-5">
        Account Management
      </h2>

      <nav className="space-y-2">
        {/* Back to Profile link - shown on sub-pages */}
        {isSubPage && (
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-gray-600 hover:text-[#00A792] hover:bg-gray-50 transition-colors mb-3"
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

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-[10px] transition-colors',
                isActive
                  ? 'bg-[rgba(0,167,146,0.06)] border border-[#00A792]'
                  : 'hover:bg-gray-50'
              )}
            >
              <div>
                <p className={cn(
                  'font-poppins font-medium text-sm capitalize',
                  isActive ? 'text-[#00A792]' : 'text-gray-700'
                )}>
                  {item.label}
                </p>
                <p className={cn(
                  'font-poppins font-light text-xs capitalize',
                  isActive ? 'text-[#00A792]' : 'text-gray-500'
                )}>
                  {item.description}
                </p>
              </div>
              {isActive && <ChevronRight className="h-4 w-4 text-[#00A792]" />}
            </Link>
          )
        })}

        {/* Travel Credits */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="px-4 py-2">
            <p className="font-poppins font-medium text-sm text-gray-900 capitalize">Travel Credits</p>
            <p className="font-poppins font-light text-xs text-gray-500">
              Available: {currency} {travelCredits.toLocaleString()}
            </p>
          </div>
        </div>
      </nav>
    </Card>
  )
}

export default ProfileSidebar
