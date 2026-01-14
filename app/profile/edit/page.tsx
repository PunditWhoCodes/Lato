'use client'

import { useRouter } from 'next/navigation'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/lib/hooks/useAuth'
import { useProfile, useUpdateProfile } from '@/lib/hooks/useProfile'
import { editProfileSchema, type EditProfileFormData } from '@/lib/validations/profile'
import { ProfileSidebar } from '@/components/profile/ProfileSidebar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Navigation } from '@/components/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect } from 'react'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile()

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      title: undefined,
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      phone: { countryCode: '', number: '' },
      nationality: '',
      height: '',
      passport: null,
      emergencyContacts: [],
      travelPreference: null,
      travelInsurance: null,
    },
  })

  const { fields: emergencyContacts, append, remove } = useFieldArray({
    control: form.control,
    name: 'emergencyContacts',
  })

  // Populate form with existing profile data
  useEffect(() => {
    if (profile) {
      form.reset({
        title: profile.title,
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || user?.email || '',
        dateOfBirth: profile.dateOfBirth || '',
        phone: profile.phone || { countryCode: '', number: '' },
        nationality: profile.nationality || '',
        height: profile.height || '',
        passport: profile.passport || null,
        emergencyContacts: profile.emergencyContacts || [],
        travelPreference: profile.travelPreference || null,
        travelInsurance: profile.travelInsurance || null,
      })
    }
  }, [profile, user, form])

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    router.push('/login?redirect=/profile/edit')
    return null
  }

  const isLoading = authLoading || profileLoading

  const onSubmit = (data: EditProfileFormData) => {
    // Transform null values to undefined for API compatibility
    const transformedData = {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth || undefined,
      phone: data.phone && data.phone.countryCode && data.phone.number
        ? { countryCode: data.phone.countryCode, number: data.phone.number }
        : undefined,
      nationality: data.nationality || undefined,
      height: data.height || undefined,
      passport: data.passport && data.passport.number
        ? {
            number: data.passport.number,
            issueCountry: data.passport.issueCountry,
            issueDate: data.passport.issueDate,
            expiryDate: data.passport.expiryDate,
          }
        : undefined,
      emergencyContacts: data.emergencyContacts?.length
        ? data.emergencyContacts.map((c) => ({
            firstName: c.firstName,
            lastName: c.lastName,
          }))
        : undefined,
      travelPreference: data.travelPreference && (data.travelPreference.firstName || data.travelPreference.lastName)
        ? { firstName: data.travelPreference.firstName || '', lastName: data.travelPreference.lastName || '' }
        : undefined,
      travelInsurance: data.travelInsurance && (data.travelInsurance.firstName || data.travelInsurance.lastName)
        ? { firstName: data.travelInsurance.firstName || '', lastName: data.travelInsurance.lastName || '' }
        : undefined,
    }

    updateProfile(transformedData, {
      onSuccess: () => {
        router.push('/profile')
      },
    })
  }

  const addEmergencyContact = () => {
    if (emergencyContacts.length < 3) {
      append({ firstName: '', lastName: '' })
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-500 mt-1 text-sm">
              We only display your profile picture, name and bio to other users. All other details are private and will make it easier for you to make tour bookings on Lato.
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

            {/* Main Content - Form */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <FormSkeleton />
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <Card className="bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                      <p className="text-sm text-gray-500">
                        Your contact details are only shared with the tour provider you book with.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Title */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Title</Label>
                        <Controller
                          name="title"
                          control={form.control}
                          render={({ field }) => (
                            <div className="flex gap-3 mt-2">
                              {['Mr', 'Mrs', 'Ms'].map((title) => (
                                <label
                                  key={title}
                                  className={`flex items-center justify-center cursor-pointer px-4 py-2 rounded-[5px] border transition-colors ${
                                    field.value === title
                                      ? 'border-[#00A792] bg-[rgba(0,167,146,0.06)]'
                                      : 'border-[rgba(0,0,0,0.3)]'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    checked={field.value === title}
                                    onChange={() => field.onChange(title)}
                                    className="sr-only"
                                  />
                                  <span className={`font-poppins font-light text-sm capitalize ${
                                    field.value === title
                                      ? 'text-[#00A792]'
                                      : 'text-[rgba(0,0,0,0.7)]'
                                  }`}>
                                    {title}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        />
                      </div>

                      {/* Name fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First name</Label>
                          <Input
                            id="firstName"
                            {...form.register('firstName')}
                            placeholder="Enter your first name"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                          {form.formState.errors.firstName && (
                            <p className="text-sm text-red-500 mt-1">
                              {form.formState.errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last name</Label>
                          <Input
                            id="lastName"
                            {...form.register('lastName')}
                            placeholder="Enter your last name"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                          {form.formState.errors.lastName && (
                            <p className="text-sm text-red-500 mt-1">
                              {form.formState.errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email and DOB */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            {...form.register('email')}
                            placeholder="Enter your email"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                            disabled
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            {...form.register('dateOfBirth')}
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <Label>Mobile Number</Label>
                        <div className="grid grid-cols-3 gap-4 mt-1">
                          <div>
                            <Controller
                              name="phone.countryCode"
                              control={form.control}
                              render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <SelectTrigger className="bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]">
                                    <SelectValue placeholder="Country Code" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="+1">+1 (US)</SelectItem>
                                    <SelectItem value="+44">+44 (UK)</SelectItem>
                                    <SelectItem value="+91">+91 (IN)</SelectItem>
                                    <SelectItem value="+92">+92 (PK)</SelectItem>
                                    <SelectItem value="+61">+61 (AU)</SelectItem>
                                    <SelectItem value="+81">+81 (JP)</SelectItem>
                                    <SelectItem value="+49">+49 (DE)</SelectItem>
                                    <SelectItem value="+33">+33 (FR)</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              {...form.register('phone.number')}
                              placeholder="Enter your phone number"
                              className="bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Nationality and Height */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input
                            id="nationality"
                            {...form.register('nationality')}
                            placeholder="Enter your nationality"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Height in cm</Label>
                          <Input
                            id="height"
                            {...form.register('height')}
                            placeholder="Enter your height"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Passport Information */}
                  <Card className="bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
                    <CardHeader>
                      <CardTitle className="text-lg">Passport Information</CardTitle>
                      <p className="text-sm text-gray-500">
                        Passport details are only shared with the tour provider you book with.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="passportNumber">Passport Number</Label>
                          <Input
                            id="passportNumber"
                            {...form.register('passport.number')}
                            placeholder="Enter passport number"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="issueCountry">Issue Country</Label>
                          <Input
                            id="issueCountry"
                            {...form.register('passport.issueCountry')}
                            placeholder="Select issue country"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expire date</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            {...form.register('passport.expiryDate')}
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                        <div>
                          <Label htmlFor="issueDate">Issue date</Label>
                          <Input
                            id="issueDate"
                            type="date"
                            {...form.register('passport.issueDate')}
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Next of Kin Information */}
                  <Card className="bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
                    <CardHeader>
                      <CardTitle className="text-lg">The Next Of Kin Information</CardTitle>
                      <p className="text-sm text-gray-500">
                        Next of kin is used only in emergencies and can be your father, sister, mother or partner who we will contact if needed.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {emergencyContacts.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>First name</Label>
                              <Input
                                {...form.register(`emergencyContacts.${index}.firstName`)}
                                placeholder="Enter first name"
                                className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                              />
                            </div>
                            <div>
                              <Label>Last name</Label>
                              <Input
                                {...form.register(`emergencyContacts.${index}.lastName`)}
                                placeholder="Enter last name"
                                className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="mt-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {emergencyContacts.length < 3 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addEmergencyContact}
                          className="border-dashed"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Emergency Contact
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Travel Preference */}
                  <Card className="bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
                    <CardHeader>
                      <CardTitle className="text-lg">Travel Preference</CardTitle>
                      <p className="text-sm text-gray-500">
                        We will use this information to make sure you are comfortable with the tour provider you book with.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>First name</Label>
                          <Input
                            {...form.register('travelPreference.firstName')}
                            placeholder="Enter first name"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                        <div>
                          <Label>Last name</Label>
                          <Input
                            {...form.register('travelPreference.lastName')}
                            placeholder="Enter last name"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Travel Insurance */}
                  <Card className="bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]">
                    <CardHeader>
                      <CardTitle className="text-lg">Travel Insurance</CardTitle>
                      <p className="text-sm text-gray-500">
                        Travel insurance details are only shared with the tour provider you book with.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>First name</Label>
                          <Input
                            {...form.register('travelInsurance.firstName')}
                            placeholder="Enter first name"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                        <div>
                          <Label>Last name</Label>
                          <Input
                            {...form.register('travelInsurance.lastName')}
                            placeholder="Enter last name"
                            className="mt-1 bg-[#FAFBFC] border border-[#D9D9D9] rounded-[10px] placeholder:text-[#D9D9D9]"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/profile')}
                      disabled={isUpdating}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isUpdating}
                      className="bg-[#00A792] hover:bg-[#008577] text-white px-8"
                    >
                      {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
