'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { ProfileInfoCard, InfoField, InfoGrid } from '@/components/profile/ProfileInfoCard'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Navigation } from '@/components/navigation'

export default function MyProfilePage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile, isLoading: profileLoading } = useProfile()

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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500 mt-1">
              Manage your personal information and account settings
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                travelCredits={profile?.travelCredits ?? 0}
                currency={profile?.currency ?? 'INR'}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Personal Information Card */}
              <ProfileInfoCard
                title="Personal Information"
                onEdit={() => router.push('/profile/edit')}
              >
                {isLoading ? (
                  <ProfileInfoSkeleton />
                ) : (
                  <div className="space-y-6">
                    {/* Avatar and basic info */}
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={profile?.avatar || user?.avatar}
                          alt={profile?.firstName || user?.name || 'Profile'}
                        />
                        <AvatarFallback className="bg-[#00A792] text-white text-lg">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Info fields grid */}
                    <InfoGrid columns={2}>
                      <InfoField
                        label="Full Name"
                        value={
                          profile?.firstName && profile?.lastName
                            ? `${profile.firstName} ${profile.lastName}`
                            : user?.name
                        }
                      />
                      <InfoField
                        label="Email"
                        value={profile?.email || user?.email}
                      />
                      <InfoField
                        label="Date Of Birth"
                        value={profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : null}
                      />
                      <InfoField
                        label="Contact Number"
                        value={
                          profile?.phone?.number
                            ? `${profile.phone.countryCode} ${profile.phone.number}`
                            : null
                        }
                      />
                      <InfoField
                        label="Nationality"
                        value={profile?.nationality}
                      />
                    </InfoGrid>
                  </div>
                )}
              </ProfileInfoCard>

              {/* Passport Information Card */}
              <ProfileInfoCard
                title="Passport Information"
                isEmpty={!profile?.passport?.number}
                emptyMessage="No passport information provided"
              >
                {isLoading ? (
                  <ProfileInfoSkeleton rows={2} />
                ) : profile?.passport ? (
                  <InfoGrid columns={2}>
                    <InfoField
                      label="Passport Number"
                      value={profile.passport.number}
                    />
                    <InfoField
                      label="Issue Date"
                      value={profile.passport.issueDate ? formatDate(profile.passport.issueDate) : null}
                    />
                    <InfoField
                      label="Expired Date"
                      value={profile.passport.expiryDate ? formatDate(profile.passport.expiryDate) : null}
                    />
                    <InfoField
                      label="Issue Country"
                      value={profile.passport.issueCountry}
                    />
                  </InfoGrid>
                ) : null}
              </ProfileInfoCard>

              {/* Emergency Contact Card */}
              <ProfileInfoCard
                title="Emergency Contact"
                isEmpty={!profile?.emergencyContacts?.length}
                emptyMessage="No Emergency Contact Information Provided"
              >
                {isLoading ? (
                  <ProfileInfoSkeleton rows={1} />
                ) : profile?.emergencyContacts?.length ? (
                  <div className="space-y-4">
                    {profile.emergencyContacts.map((contact, index) => (
                      <div key={contact.id || index} className="p-4 bg-gray-50 rounded-lg">
                        <InfoGrid columns={2}>
                          <InfoField
                            label="Name"
                            value={`${contact.firstName} ${contact.lastName}`}
                          />
                          <InfoField
                            label="Relationship"
                            value={contact.relationship}
                          />
                          {contact.phone && (
                            <InfoField
                              label="Phone"
                              value={contact.phone}
                            />
                          )}
                        </InfoGrid>
                      </div>
                    ))}
                  </div>
                ) : null}
              </ProfileInfoCard>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// Helper function to format dates
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

// Skeleton loader for profile info
function ProfileInfoSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}
