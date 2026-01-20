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
import { Card, CardContent } from '@/components/ui/card'
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
      <main className="min-h-screen bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-poppins text-[28px] font-medium text-black leading-[1.498]">
              Change Password
            </h1>
            <p className="font-poppins font-light text-[14px] text-[rgba(0,0,0,0.7)] mt-2 leading-[1.498]">
              Update your account password to keep your account secure
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                travelCredits={profile?.travelCredits ?? 0}
                currency="USD"
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] p-4 lg:p-5">
                <CardContent className="p-0">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Card Title */}
                    <h2 className="font-poppins text-[13px] font-semibold text-black capitalize">
                      Personal Information
                    </h2>

                    {/* Form Fields Container */}
                    <div className="flex flex-col items-end gap-[50px]">
                      {/* Fields Section */}
                      <div className="w-full flex flex-col gap-3">
                        {/* Current Password */}
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="currentPassword" className="font-poppins text-[12px] font-normal text-black">
                            Current password
                          </Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? 'text' : 'password'}
                              {...form.register('currentPassword')}
                              placeholder="Enter your current password"
                              className="bg-white border border-[#d9d9d9] rounded-[5px] h-[34px] font-poppins text-[12px] placeholder:text-[#d9d9d9] placeholder:font-medium pr-10"
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
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="newPassword" className="font-poppins text-[12px] font-normal text-black">
                            New password
                          </Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? 'text' : 'password'}
                              {...form.register('newPassword')}
                              placeholder="Enter your new Password"
                              className="bg-white border border-[#d9d9d9] rounded-[5px] h-[34px] font-poppins text-[12px] placeholder:text-[#d9d9d9] placeholder:font-medium pr-10"
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
                          {form.formState.errors.newPassword && (
                            <p className="text-sm text-red-500 mt-1">
                              {form.formState.errors.newPassword.message}
                            </p>
                          )}
                        </div>

                        {/* Helper Text */}
                        <p className="font-poppins text-[12px] font-normal text-black">
                          Password must be at Least 8 characters long
                        </p>
                      </div>

                      {/* Submit Button - Aligned Right */}
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-[#00a792] hover:bg-[#008577] text-white rounded-full h-[27px] px-[97px] font-poppins text-[12px] font-semibold"
                      >
                        {isPending ? 'Changing...' : 'Change Password'}
                      </Button>
                    </div>
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
