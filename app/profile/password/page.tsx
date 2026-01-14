'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile } from '@/lib/hooks/useProfile'
import { changePassword } from '@/lib/api/auth'
import { getAccessToken } from '@/lib/utils/token'
import { simpleChangePasswordSchema, type SimpleChangePasswordFormData } from '@/lib/validations/profile'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

export default function ChangePasswordPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile } = useProfile()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const form = useForm<SimpleChangePasswordFormData>({
    resolver: zodResolver(simpleChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const { mutate: submitChangePassword, isPending } = useMutation({
    mutationFn: async (data: SimpleChangePasswordFormData) => {
      const token = getAccessToken()
      if (!token) {
        throw new Error('Not authenticated')
      }
      return changePassword(
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        token
      )
    },
    onSuccess: () => {
      toast.success('Password changed successfully')
      form.reset()
      router.push('/profile')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to change password')
    },
  })

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.push('/login?redirect=/profile/password')
    return null
  }

  const onSubmit = (data: SimpleChangePasswordFormData) => {
    submitChangePassword(data)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
            <p className="text-gray-500 mt-1">
              Update your account password to keep your account secure
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
            <div className="lg:col-span-3">
              <Card className="bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
                    {/* Current Password */}
                    <div>
                      <Label htmlFor="currentPassword">Current password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          {...form.register('currentPassword')}
                          placeholder="Enter your current password"
                          className="bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9] pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <Label htmlFor="newPassword">New password</Label>
                      <div className="relative mt-1">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          {...form.register('newPassword')}
                          placeholder="Enter your new Password"
                          className="bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9] pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Password must be at Least 8 characters long
                      </p>
                      {form.formState.errors.newPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-[#00A792] hover:bg-[#008577] text-white rounded-full h-11"
                    >
                      {isPending ? 'Changing Password...' : 'Change Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
