'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus, ChevronDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface TourData {
  id: string
  title: string
  currency: string
}

interface BookingFormProps {
  tourData: TourData
  onContinue?: () => void
}

interface TravelerInfo {
  title: string
  firstName: string
  lastName: string
  email: string
  confirmEmail: string
  contactCountry: string
  contactNumber: string
  dateOfBirth: {
    day: string
    month: string
    year: string
  }
  nationality: string
  passport: string
  passportIssueCountry: string
  passportIssueDate: {
    day: string
    month: string
    year: string
  }
  passportExpiryDate: {
    day: string
    month: string
    year: string
  }
}

const defaultTraveler: TravelerInfo = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  contactCountry: '',
  contactNumber: '',
  dateOfBirth: { day: '', month: '', year: '' },
  nationality: '',
  passport: '',
  passportIssueCountry: '',
  passportIssueDate: { day: '', month: '', year: '' },
  passportExpiryDate: { day: '', month: '', year: '' },
}

const countryCodes = [
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "PK", name: "Pakistan", dialCode: "+92" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
]

export function BookingForm({ tourData, onContinue }: BookingFormProps) {
  const [numberOfTravelers, setNumberOfTravelers] = useState(1)
  const [selectedAccommodation, setSelectedAccommodation] = useState('shared')
  const [activeTraveler, setActiveTraveler] = useState(1)
  const [travelers, setTravelers] = useState<TravelerInfo[]>([{ ...defaultTraveler }])
  const [promoCode, setPromoCode] = useState('')

  const handleTravelerCountChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(10, numberOfTravelers + delta))
    setNumberOfTravelers(newCount)

    if (newCount > travelers.length) {
      const newTravelers = [...travelers]
      for (let i = travelers.length; i < newCount; i++) {
        newTravelers.push({ ...defaultTraveler })
      }
      setTravelers(newTravelers)
    } else if (newCount < travelers.length) {
      setTravelers(travelers.slice(0, newCount))
      if (activeTraveler > newCount) {
        setActiveTraveler(newCount)
      }
    }
  }

  const updateTraveler = (index: number, field: string, value: string | object) => {
    const newTravelers = [...travelers]
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      newTravelers[index] = {
        ...newTravelers[index],
        [parent]: {
          ...(newTravelers[index][parent as keyof TravelerInfo] as object),
          [child]: value,
        },
      }
    } else {
      newTravelers[index] = { ...newTravelers[index], [field]: value }
    }
    setTravelers(newTravelers)
  }

  const accommodationOptions = [
    {
      id: 'shared',
      label: 'Shared Bathroom - Twin - D',
      price: '+ USD 0',
      perPerson: true,
      description: 'Per person in a room for 2 people',
    },
    {
      id: 'single',
      label: 'Shared Bathroom - Twin - D (Single Supplement)',
      price: '+ $16,582.68',
      perPerson: true,
      description: 'Per person surcharge',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Travelers Section */}
      <div>
        <h2 className="font-poppins text-[16px] font-semibold text-[#111928] mb-3">Travelers</h2>
        <div className="border border-[#e5e7eb] rounded-[8px] px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-poppins text-[12px] font-semibold text-[#374151] capitalize">
              Number of Travelers
            </span>
            <div className="flex items-center border border-[#e5e7eb] rounded-full p-[2px]">
              <button
                onClick={() => handleTravelerCountChange(-1)}
                className="w-[32px] h-[32px] rounded-full border border-[#d1d5db] bg-[#f9fafb] flex items-center justify-center hover:bg-gray-100 transition-colors"
                disabled={numberOfTravelers <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="font-poppins text-[13px] font-normal text-[#111928] w-10 text-center">
                {numberOfTravelers}
              </span>
              <button
                onClick={() => handleTravelerCountChange(1)}
                className="w-[32px] h-[32px] rounded-full border border-[#00a792] bg-white flex items-center justify-center hover:bg-[#00a792] hover:text-white transition-colors group"
                disabled={numberOfTravelers >= 10}
              >
                <Plus className="w-4 h-4 text-[#00a792] group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accommodation Options Section */}
      <div>
        <div className="mb-3">
          <h2 className="font-poppins text-[16px] font-semibold text-[#111928]">Accommodation Options</h2>
          <p className="font-poppins text-[12px] text-[#6b7280]">
            Please assign <span className="font-semibold text-[#00a792]">1 traveler</span> to a room.
          </p>
        </div>

        <div className="border border-[#e5e7eb] rounded-[8px] overflow-hidden">
          {accommodationOptions.map((option, index) => (
            <div
              key={option.id}
              className={cn(
                'px-4 py-4 flex items-center justify-between',
                index > 0 && 'border-t border-[#e5e7eb]'
              )}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="accommodation"
                  value={option.id}
                  checked={selectedAccommodation === option.id}
                  onChange={() => setSelectedAccommodation(option.id)}
                  className="sr-only"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-poppins text-[12px] font-semibold text-[#111928]">{option.label}</p>
                    <Info className="w-[13px] h-[13px] text-[#6b7280]" />
                  </div>
                  <p className="font-poppins text-[12px] text-[#6b7280]">{option.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-poppins text-[12px] font-medium text-black">{option.price}</p>
                  <p className="font-poppins text-[12px] text-[#6b7280]">per traveler</p>
                </div>
                <button className="px-3 py-2 text-[13px] font-normal text-[#6b7280] border border-[#e5e7eb] rounded-[8px] hover:border-[#00a792] hover:text-[#00a792] transition-colors flex items-center gap-2">
                  Select travelers
                  <ChevronDown className="w-[13px] h-[13px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traveler Details Section */}
      <div>
        <div className="mb-3">
          <h2 className="font-poppins text-[16px] font-semibold text-[#111928]">Traveler Details</h2>
          <p className="font-poppins text-[12px] text-[#6b7280]">
            Fill in the name and contact info section, each traveler will serve as the contact person for the booking.
          </p>
        </div>

        {/* Traveler Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {Array.from({ length: numberOfTravelers }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setActiveTraveler(i + 1)}
              className={cn(
                'px-4 py-2 rounded-full text-[12px] font-medium transition-colors',
                activeTraveler === i + 1
                  ? 'bg-[#00a792] text-white'
                  : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-gray-200'
              )}
            >
              Traveller {i + 1} {i === 0 && <span className="text-[10px]">(lead traveler)</span>}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name (Required) - Title + First Name + Last Name in one row */}
          <div>
            <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
              Full Name <span className="text-gray-400">(Required)</span>
            </Label>
            <div className="grid grid-cols-[80px_1fr_1fr] gap-3">
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.title || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'title', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">Title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <Input
                placeholder=""
                value={travelers[activeTraveler - 1]?.firstName || ''}
                onChange={(e) => updateTraveler(activeTraveler - 1, 'firstName', e.target.value)}
                className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
              />
              <Input
                placeholder=""
                value={travelers[activeTraveler - 1]?.lastName || ''}
                onChange={(e) => updateTraveler(activeTraveler - 1, 'lastName', e.target.value)}
                className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
              />
            </div>
          </div>

          {/* Email Address (Required) - Two fields side by side */}
          <div>
            <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
              Email Address <span className="text-gray-400">(Required)</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="email"
                placeholder=""
                value={travelers[activeTraveler - 1]?.email || ''}
                onChange={(e) => updateTraveler(activeTraveler - 1, 'email', e.target.value)}
                className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
              />
              <Input
                type="email"
                placeholder=""
                value={travelers[activeTraveler - 1]?.confirmEmail || ''}
                onChange={(e) => updateTraveler(activeTraveler - 1, 'confirmEmail', e.target.value)}
                className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
              />
            </div>
          </div>

          {/* Contact Number (Required) - Country dropdown + phone */}
          <div>
            <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
              Contact Number <span className="text-gray-400">(Required)</span>
            </Label>
            <div className="grid grid-cols-[140px_1fr] gap-3">
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.contactCountry || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'contactCountry', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">Country</option>
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <Input
                placeholder=""
                value={travelers[activeTraveler - 1]?.contactNumber || ''}
                onChange={(e) => updateTraveler(activeTraveler - 1, 'contactNumber', e.target.value)}
                className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
              />
            </div>
            <p className="font-poppins text-[10px] text-[#6b7280] mt-1">
              This is how we will get in touch with you, if we need to reach you at your destination
            </p>
          </div>

          {/* Date of Birth and Nationality (Required) - DD/MM/YYYY + Select nationality in same row */}
          <div>
            <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
              Date of Birth and Nationality <span className="text-gray-400">(Required)</span>
            </Label>
            <div className="grid grid-cols-[70px_70px_90px_1fr] gap-3">
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.dateOfBirth?.day || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'dateOfBirth.day', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">DD</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.dateOfBirth?.month || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'dateOfBirth.month', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.dateOfBirth?.year || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'dateOfBirth.year', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={2024 - i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.nationality || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'nationality', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">Select nationality</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="PK">Pakistan</option>
                  <option value="IN">India</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <p className="font-poppins text-[10px] text-[#6b7280] mt-1">
              The lead traveler should be 18 years or above.
            </p>
          </div>

          {/* Passport (Required) - Passport number + Issue Country in same row */}
          <div>
            <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
              Passport <span className="text-gray-400">(Required)</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder=""
                value={travelers[activeTraveler - 1]?.passport || ''}
                onChange={(e) => updateTraveler(activeTraveler - 1, 'passport', e.target.value)}
                className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
              />
              <div className="relative">
                <select
                  value={travelers[activeTraveler - 1]?.passportIssueCountry || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'passportIssueCountry', e.target.value)}
                  className="w-full h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
                >
                  <option value="">Passport Issue Country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="PK">Pakistan</option>
                  <option value="IN">India</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <p className="font-poppins text-[10px] text-[#6b7280] mt-1">
              Passport details are required for all travelers.
            </p>
          </div>

          {/* Passport Issued Date & Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Passport Issued Date <span className="text-gray-400">(Required)</span>
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <select className="w-full h-[40px] px-2 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] appearance-none cursor-pointer">
                    <option value="">DD</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full h-[40px] px-2 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] appearance-none cursor-pointer">
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full h-[40px] px-2 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] appearance-none cursor-pointer">
                    <option value="">YYYY</option>
                    {Array.from({ length: 50 }, (_, i) => (
                      <option key={2024 - i} value={2024 - i}>
                        {2024 - i}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Passport Expiration Date <span className="text-gray-400">(Required)</span>
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <select className="w-full h-[40px] px-2 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] appearance-none cursor-pointer">
                    <option value="">DD</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full h-[40px] px-2 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] appearance-none cursor-pointer">
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select className="w-full h-[40px] px-2 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] appearance-none cursor-pointer">
                    <option value="">YYYY</option>
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={2024 + i} value={2024 + i}>
                        {2024 + i}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Insurance Section */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-poppins text-[16px] font-semibold text-[#111928]">Travel Insurance</h2>
          <span className="text-[11px] text-[#6b7280]">in partnership with</span>
        </div>
        <p className="font-poppins text-[11px] text-[#6b7280] mb-4">
          Our travel protection from our award winning partners, XCover, means you and your travel companions can book with peace of mind knowing there&apos;s protection available in case your trip doesn&apos;t go to plan.
        </p>

        {/* Insurance Options - 3 Image Placeholders */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-[#f3f4f6] rounded-[8px] border border-[#e5e7eb] flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <p className="font-poppins text-[9px] text-[#9ca3af] leading-relaxed">
          Insurance coverage offered may be declined if declined before submitting a Request For Travel Service, including travel arrangements to you or to your Seller Service, including All
          America Travel Insurance Company (ATTIC), a Member of Farmers, New York, TLIC) Zurich-ving, Underwriting, LLC (CAO) via operating as Zurich
          Zurich Cover America Insurance Company (US) / Zurich Canadian Insurance Co. (Canada). Travel protection to understand our protection policies and to find out
          what they includes by visiting the Cover Website. Rights reserved. Non-discrimination & Accessibility may be viewed here.
        </p>
      </div>

      {/* Latos Savings Section */}
      <div>
        <h2 className="font-poppins text-[16px] font-semibold text-[#111928] mb-3">Latos Savings</h2>
        <div className="relative">
          <Input
            placeholder="Add Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="h-[48px] rounded-[8px] border-[#e5e7eb] pr-[130px] font-poppins text-[13px]"
          />
          <Button
            variant="outline"
            className="absolute right-[6px] top-1/2 -translate-y-1/2 h-[36px] px-5 rounded-[8px] border-[#00a792] bg-[#00a792] text-white hover:bg-[#008577] font-poppins font-medium text-[13px]"
          >
            Promo Code
          </Button>
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        className="w-full h-[48px] rounded-[8px] bg-[#00a792] hover:bg-[#008577] text-white font-poppins font-medium text-[14px]"
      >
        Continue to Secure Payment
      </Button>

      {/* Payment Info */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#6b7280]">Secured by</span>
          <span className="font-semibold text-[13px] text-[#635bff]">Stripe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#6b7280]">Supported cards:</span>
          <div className="flex gap-1">
            <Image src="/visa.svg" alt="Visa" width={32} height={20} className="h-5 w-auto" />
            <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-5 w-auto" />
            <Image src="/amex.svg" alt="Amex" width={32} height={20} className="h-5 w-auto" />
            <Image src="/discover.svg" alt="Discover" width={32} height={20} className="h-5 w-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
