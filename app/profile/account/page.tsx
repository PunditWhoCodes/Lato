'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Pencil, Lock, Briefcase, MessageSquare, CreditCard } from 'lucide-react'

const accountMenuItems = [
  {
    id: 'edit-profile',
    label: 'Edit Profile',
    description: 'Update Your Personal Information',
    href: '/profile/edit',
    icon: Pencil,
  },
  {
    id: 'change-password',
    label: 'Change Password',
    description: 'Update Your Account Password',
    href: '/profile/password',
    icon: Lock,
  },
  {
    id: 'my-bookings',
    label: 'My Bookings',
    description: 'View An Manage Your Travel Bookings',
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

export default function AccountManagementPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile } = useProfile()

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.push('/login?redirect=/profile/account')
    return null
  }

  const travelCredits = profile?.travelCredits ?? 0
  const currency = profile?.currency ?? 'USD'

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Account Management Card */}
          <Card className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[10px] p-6">
            <h1 className="font-poppins text-[20px] font-semibold text-black mb-6">
              Account Management
            </h1>

            <nav className="flex flex-col gap-5">
              {accountMenuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-4 py-2 hover:opacity-70 transition-opacity"
                  >
                    <Icon className="h-6 w-6 text-black" strokeWidth={1.5} />
                    <div>
                      <p className="font-poppins font-medium text-[16px] text-black">
                        {item.label}
                      </p>
                      <p className="font-poppins font-light text-[13px] text-[#6b7280]">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                )
              })}

              {/* Travel Credits */}
              <div className="flex items-center gap-4 py-2">
                <CreditCard className="h-6 w-6 text-black" strokeWidth={1.5} />
                <div>
                  <p className="font-poppins font-medium text-[16px] text-black">
                    Travel Credits
                  </p>
                  <p className="font-poppins font-light text-[13px] text-[#6b7280]">
                    Available: {currency} {travelCredits}
                  </p>
                </div>
              </div>
            </nav>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
