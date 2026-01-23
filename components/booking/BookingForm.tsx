'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Minus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'IN', name: 'India', dialCode: '+91' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
]

// Info Icon SVG Component
const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6.5 12.5C9.53757 12.5 12 10.0376 12 7C12 3.96243 9.53757 1.5 6.5 1.5C3.46243 1.5 1 3.96243 1 7C1 10.0376 3.46243 12.5 6.5 12.5Z"
      stroke="#4B5563"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6.5 9.5V7" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 4.5H6.506" stroke="#4B5563" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// XCover Logo SVG Component
const XCoverLogo = ({ className }: { className?: string }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="21" height="21" rx="4" fill="#125FD2" />
    <path d="M5.5 6L10.5 10.5L5.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 6L10.5 10.5L15.5 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Shield Icon for No Protection
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10.5 19.25C10.5 19.25 17.5 15.75 17.5 10.5V4.375L10.5 1.75L3.5 4.375V10.5C3.5 15.75 10.5 19.25 10.5 19.25Z"
      stroke="#505557"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7.875 10.5L9.625 12.25L13.125 8.75" stroke="#505557" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function BookingForm({ tourData, onContinue }: BookingFormProps) {
  const [numberOfTravelers, setNumberOfTravelers] = useState(1)
  const [selectedAccommodation, setSelectedAccommodation] = useState('shared')
  const [activeTraveler, setActiveTraveler] = useState(1)
  const [travelers, setTravelers] = useState<TravelerInfo[]>([{ ...defaultTraveler }])
  const [promoCode, setPromoCode] = useState('')
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null)

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
      price: '+ INR 0',
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

  const insuranceOptions = [
    {
      id: 'premium',
      title: 'Premium Protection',
      price: '+US$288.83',
      bgColor: '#DFE4FC',
      features: [
        'Trip Cancellation',
        'Medical and Dental',
        'Trip Interruption',
        'Emergency Assistance and Transportation',
        'Baggage Loss or Theft',
        'Travel Delays',
      ],
      linkText: 'See summary of benefits',
    },
    {
      id: 'cancellation',
      title: 'Trip Cancellation Only',
      price: '+US$162.89',
      bgColor: '#EFF1FD',
      description:
        'For US$162.89, this reimburses prepaid travel costs if you or your travel partners cancel due to injury or illness, prior to your departure',
      linkText: 'See summary of benefits',
    },
    {
      id: 'none',
      title: 'No Protection',
      price: '',
      bgColor: '#F1F2F3',
      description:
        "Your prepaid trip costs would be lost if you or your travel companions can't travel or need to cut your trip short due to illness or injuries, including to family members back home. You would also have no medical protection",
      checkboxLabel: "No thanks, I'll risk it.",
    },
  ]

  return (
    <>
      {/* Mobile Design - Figma specs */}
      <div className="lg:hidden flex flex-col gap-[16.44px] w-full max-w-[375px] mx-auto">
        {/* Travelers Section */}
        <div>
          <h2 className="font-poppins text-[13.02px] font-semibold text-[#111928] mb-[6.51px]">Travelers</h2>
          <div className="border border-[#E5E7EB] rounded-[6.51px] px-[13.02px] py-[9.77px]">
            <div className="flex items-center justify-between">
              <span className="font-poppins text-[9.77px] font-semibold text-[#374151] capitalize">
                Number of Travelers
              </span>
              <div className="flex items-center border border-[#E5E7EB] rounded-full p-[1.63px]">
                <button
                  onClick={() => handleTravelerCountChange(-1)}
                  className="w-[26.05px] h-[26.05px] rounded-full border border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center hover:bg-gray-100 transition-colors"
                  disabled={numberOfTravelers <= 1}
                >
                  <Minus className="w-[13.02px] h-[13.02px] text-gray-600" />
                </button>
                <span className="font-poppins text-[10.59px] font-normal text-[#111928] w-[32.54px] text-center">
                  {numberOfTravelers}
                </span>
                <button
                  onClick={() => handleTravelerCountChange(1)}
                  className="w-[26.05px] h-[26.05px] rounded-full border border-[#00A792] bg-white flex items-center justify-center hover:bg-[#00A792] hover:text-white transition-colors group"
                  disabled={numberOfTravelers >= 10}
                >
                  <Plus className="w-[13.02px] h-[13.02px] text-[#00A792] group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Options Section - Figma: 371.08px width */}
        <div>
          <div className="mb-[16px]">
            <h2 className="font-poppins text-[13.02px] font-semibold text-[#111928]">Accommodation Options</h2>
            <p className="font-poppins text-[9.77px] text-[#6B7280]">
              Please assign <span className="font-semibold text-[#00A792]">1 traveler</span> to a room.
            </p>
          </div>

          <div className="flex flex-col gap-[20px]">
            {accommodationOptions.map((option, index) => (
              <div key={option.id} className="flex flex-col gap-[8px]">
                {/* Option Label */}
                <span className="font-poppins text-[10px] font-medium leading-[15px] text-[#6B7280]">
                  Option {index + 1}
                </span>

                <div className="flex items-center justify-between gap-[22px] w-full h-[40.88px]">
                  {/* Left: Name, Info icon, Description */}
                  <div className="flex flex-col gap-[4.88px] w-[179.28px]">
                    <div className="flex items-center gap-0">
                      <span className="font-poppins text-[11.4px] font-bold leading-[17px] text-[#111928]">
                        {option.label.length > 25 ? option.label.slice(0, 25) + '...' : option.label}
                      </span>
                      <InfoIcon className="w-[13.02px] h-[13.02px] ml-[3.26px]" />
                    </div>
                    <span className="font-poppins text-[10px] leading-[17px] text-[#6B7280] whitespace-nowrap">
                      {option.description}
                    </span>
                  </div>

                  {/* Right: Price and Select button */}
                  <div className="flex items-center gap-[9.92px]">
                    {/* Price */}
                    <div className="flex flex-col items-end">
                      <span className="font-poppins text-[11.4px] font-medium leading-[17px] text-black">
                        {option.price}
                      </span>
                      <span className="font-poppins text-[10px] leading-[17px] text-[#6B7280]">per traveler</span>
                    </div>

                    {/* Select travelers button - Figma: 91px x 30px */}
                    <div className="relative">
                      <select
                        className="w-[91px] h-[30px] px-[8.35px] py-[5.22px] bg-white border-[0.52px] border-[#E5E7EB] rounded-[4.17px] font-poppins text-[8.35px] leading-[13px] text-[#6B7280] text-center appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select travelers
                        </option>
                        {Array.from({ length: numberOfTravelers }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} traveler{i > 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-[8.35px] top-1/2 -translate-y-1/2 w-[8.35px] h-[8.35px] text-[#6B7280] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler Details Section */}
        <div>
          <div className="mb-[6.51px]">
            <h2 className="font-poppins text-[13.02px] font-semibold text-[#111928]">Traveler Details</h2>
            <p className="font-poppins text-[9.77px] text-[#6B7280]">
              Fill in the name and contact info section, each traveler will serve as the contact person for the
              booking.
            </p>
          </div>

          {/* Traveler Form Card - Figma: 375px width, border 0.81px #E5E7EB, border-radius 6.74px */}
          {Array.from({ length: numberOfTravelers }, (_, travelerIndex) => (
            <div
              key={travelerIndex}
              className="relative bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.74px] mt-[13.03px] pt-[29px] pb-[19px] px-[19px]"
            >
              {/* Traveler Header - Badge + Title + Lead Tag */}
              <div className="absolute top-[3px] left-[19px] flex items-center gap-[6.51px]">
                {/* Badge Circle - Figma: 19.54px, bg #00A792 */}
                <div className="flex items-center justify-center w-[19.54px] h-[19.54px] bg-[#00A792] rounded-full">
                  <span className="font-poppins text-[9.77px] font-medium leading-[15px] text-white">
                    {travelerIndex + 1}
                  </span>
                </div>
                {/* Traveler Title - Figma: Poppins 13.02px bold #111928 */}
                <span className="font-poppins text-[13.02px] font-bold leading-[20px] text-[#111928]">
                  Traveler {travelerIndex + 1}
                </span>
              </div>

              {/* Lead Traveler Badge - Figma: bg #E5E7EB, border-radius 3.26px */}
              {travelerIndex === 0 && (
                <div className="absolute top-[3.87px] left-[118.82px] flex items-center px-[6.51px] py-[1.63px] bg-[#E5E7EB] rounded-[3.26px]">
                  <span className="font-poppins text-[9.77px] font-medium leading-[15px] text-[#374151]">
                    Lead Traveler
                  </span>
                </div>
              )}

              {/* Form Fields */}
              <div className="flex flex-col gap-[16.44px] mt-[20px]">
                {/* Full Name (Required) */}
                <div className="flex flex-col gap-[6.51px]">
                  <div className="flex items-center gap-[3.26px]">
                    <span className="font-poppins text-[11.4px] font-medium leading-[17px] text-[#374151]">
                      Full Name
                    </span>
                    <span className="font-poppins text-[9.77px] leading-[15px] text-[#6B7280]">(Required)</span>
                  </div>
                  <div className="flex gap-[13.02px]">
                    {/* Title Dropdown - Figma: 65.12px width */}
                    <div className="relative w-[65.12px]">
                      <select
                        value={travelers[travelerIndex]?.title || ''}
                        onChange={(e) => updateTraveler(travelerIndex, 'title', e.target.value)}
                        className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                      >
                        <option value="">Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                      <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[12.17px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                    </div>
                    {/* First Name - Figma: 109px width */}
                    <input
                      type="text"
                      value={travelers[travelerIndex]?.firstName || ''}
                      onChange={(e) => updateTraveler(travelerIndex, 'firstName', e.target.value)}
                      className="w-[109px] h-[37.45px] px-[13.02px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] focus:outline-none focus:border-[#00A792]"
                    />
                    {/* Last Name - Figma: 125px width */}
                    <input
                      type="text"
                      value={travelers[travelerIndex]?.lastName || ''}
                      onChange={(e) => updateTraveler(travelerIndex, 'lastName', e.target.value)}
                      className="w-[125px] h-[37.45px] px-[13.02px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] focus:outline-none focus:border-[#00A792]"
                    />
                  </div>
                </div>

                {/* Email Address (Required) */}
                <div className="flex flex-col gap-[6.51px]">
                  <div className="flex items-center gap-[3.26px]">
                    <span className="font-poppins text-[11.4px] font-medium leading-[17px] text-[#374151]">
                      Email Address
                    </span>
                    <span className="font-poppins text-[9.77px] leading-[15px] text-[#6B7280]">(Required)</span>
                  </div>
                  {/* Single Email Input */}
                  <input
                    type="email"
                    value={travelers[travelerIndex]?.email || ''}
                    onChange={(e) => updateTraveler(travelerIndex, 'email', e.target.value)}
                    className="w-full h-[37.45px] px-[13.02px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] focus:outline-none focus:border-[#00A792]"
                  />
                </div>

                {/* Contact Number (Required) */}
                <div className="flex flex-col gap-[6.51px]">
                  <div className="flex items-center gap-[3.26px]">
                    <span className="font-poppins text-[11.4px] font-medium leading-[17px] text-[#374151]">
                      Contact Number
                    </span>
                    <span className="font-poppins text-[9.77px] leading-[15px] text-[#6B7280]">(Required)</span>
                  </div>
                  <div className="flex gap-[13.02px]">
                    {/* Country Dropdown - Figma: 99px width */}
                    <div className="relative w-[99px]">
                      <select
                        value={travelers[travelerIndex]?.contactCountry || ''}
                        onChange={(e) => updateTraveler(travelerIndex, 'contactCountry', e.target.value)}
                        className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                      >
                        <option value="">Country</option>
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.dialCode}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                    </div>
                    {/* Phone - Figma: 222px width */}
                    <input
                      type="tel"
                      value={travelers[travelerIndex]?.contactNumber || ''}
                      onChange={(e) => updateTraveler(travelerIndex, 'contactNumber', e.target.value)}
                      className="flex-1 h-[37px] px-[13.02px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] focus:outline-none focus:border-[#00A792]"
                    />
                  </div>
                  <p className="font-poppins text-[9.77px] leading-[15px] text-[#374151]">
                    This is how we will get in touch with you, if we need to reach you at your destination
                  </p>
                </div>

                {/* Date of Birth and Nationality (Required) */}
                <div className="flex flex-col gap-[6.51px]">
                  <div className="flex items-center gap-[3.26px]">
                    <span className="font-poppins text-[11.4px] font-medium leading-[17px] text-[#374151]">
                      Date of Birth and Nationality
                    </span>
                    <span className="font-poppins text-[9.77px] leading-[15px] text-[#6B7280]">(Required)</span>
                  </div>
                  <div className="flex gap-[13.02px]">
                    {/* DOB Fields - DD, MM, YYYY - Figma: 44.85px each */}
                    <div className="flex gap-[13.02px] flex-1">
                      <div className="relative w-[44.85px]">
                        <select
                          value={travelers[travelerIndex]?.dateOfBirth?.day || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'dateOfBirth.day', e.target.value)}
                          className="w-full h-[37.91px] px-[8px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">DD</option>
                          {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                      <div className="relative w-[44.85px]">
                        <select
                          value={travelers[travelerIndex]?.dateOfBirth?.month || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'dateOfBirth.month', e.target.value)}
                          className="w-full h-[37.91px] px-[8px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                      <div className="relative w-[44.85px]">
                        <select
                          value={travelers[travelerIndex]?.dateOfBirth?.year || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'dateOfBirth.year', e.target.value)}
                          className="w-full h-[37.91px] px-[6px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">YYYY</option>
                          {Array.from({ length: 100 }, (_, i) => (
                            <option key={2024 - i} value={2024 - i}>
                              {2024 - i}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                    </div>
                    {/* Nationality Dropdown - Figma: 160.6px */}
                    <div className="relative flex-1">
                      <select
                        value={travelers[travelerIndex]?.nationality || ''}
                        onChange={(e) => updateTraveler(travelerIndex, 'nationality', e.target.value)}
                        className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                      >
                        <option value="">Select nationality</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="PK">Pakistan</option>
                        <option value="IN">India</option>
                      </select>
                      <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                    </div>
                  </div>
                  <p className="font-poppins text-[9.77px] leading-[15px] text-[#374151]">
                    The lead traveler should be 18 years or above.
                  </p>
                </div>

                {/* Passport (Required) */}
                <div className="flex flex-col gap-[6.51px]">
                  <div className="flex items-center gap-[3.26px]">
                    <span className="font-poppins text-[11.4px] font-medium leading-[17px] text-[#374151]">
                      Passport
                    </span>
                    <span className="font-poppins text-[9.77px] leading-[15px] text-[#6B7280]">(Required)</span>
                  </div>
                  <div className="flex gap-[13.02px]">
                    {/* Passport Number - Figma: 160.6px */}
                    <input
                      type="text"
                      value={travelers[travelerIndex]?.passport || ''}
                      onChange={(e) => updateTraveler(travelerIndex, 'passport', e.target.value)}
                      className="flex-1 h-[37.45px] px-[13.02px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] focus:outline-none focus:border-[#00A792]"
                    />
                    {/* Passport Issue Country - Figma: 160.6px */}
                    <div className="relative flex-1">
                      <select
                        value={travelers[travelerIndex]?.passportIssueCountry || ''}
                        onChange={(e) => updateTraveler(travelerIndex, 'passportIssueCountry', e.target.value)}
                        className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[10px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                      >
                        <option value="">Passport Issue Country</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="PK">Pakistan</option>
                        <option value="IN">India</option>
                      </select>
                      <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                    </div>
                  </div>
                  <p className="font-poppins text-[9.77px] leading-[15px] text-[#374151]">
                    Passport details are required for all travelers.
                  </p>
                </div>

                {/* Passport Issued Date & Expiry Date - Side by side */}
                <div className="flex gap-[13.02px]">
                  {/* Passport Issued Date */}
                  <div className="flex-1 flex flex-col gap-[6.51px]">
                    <div className="flex items-center gap-[3.26px]">
                      <span className="font-poppins text-[10px] font-medium leading-[17px] text-[#374151]">
                        Passport Issued Date
                      </span>
                      <span className="font-poppins text-[10px] leading-[15px] text-[#6B7280]">(Required)</span>
                    </div>
                    <div className="flex flex-col gap-[13.02px]">
                      {/* DD */}
                      <div className="relative w-full">
                        <select
                          value={travelers[travelerIndex]?.passportIssueDate?.day || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'passportIssueDate.day', e.target.value)}
                          className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">DD</option>
                          {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                      {/* MM */}
                      <div className="relative w-full">
                        <select
                          value={travelers[travelerIndex]?.passportIssueDate?.month || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'passportIssueDate.month', e.target.value)}
                          className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                      {/* YYYY */}
                      <div className="relative w-full">
                        <select
                          value={travelers[travelerIndex]?.passportIssueDate?.year || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'passportIssueDate.year', e.target.value)}
                          className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">YYYY</option>
                          {Array.from({ length: 50 }, (_, i) => (
                            <option key={2024 - i} value={2024 - i}>
                              {2024 - i}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Passport Expiration Date */}
                  <div className="flex-1 flex flex-col gap-[6.51px]">
                    <div className="flex items-center gap-[3.26px]">
                      <span className="font-poppins text-[10px] font-medium leading-[17px] text-[#374151]">
                        Passport Expiration Date
                      </span>
                      <span className="font-poppins text-[9.77px] leading-[15px] text-[#6B7280]">(Required)</span>
                    </div>
                    <div className="flex flex-col gap-[13.02px]">
                      {/* DD */}
                      <div className="relative w-full">
                        <select
                          value={travelers[travelerIndex]?.passportExpiryDate?.day || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'passportExpiryDate.day', e.target.value)}
                          className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">DD</option>
                          {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                      {/* MM */}
                      <div className="relative w-full">
                        <select
                          value={travelers[travelerIndex]?.passportExpiryDate?.month || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'passportExpiryDate.month', e.target.value)}
                          className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                      {/* YYYY */}
                      <div className="relative w-full">
                        <select
                          value={travelers[travelerIndex]?.passportExpiryDate?.year || ''}
                          onChange={(e) => updateTraveler(travelerIndex, 'passportExpiryDate.year', e.target.value)}
                          className="w-full h-[37.91px] px-[13.02px] py-[8.14px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[13.02px] leading-[20px] text-[#6B7280] appearance-none cursor-pointer"
                        >
                          <option value="">YYYY</option>
                          {Array.from({ length: 20 }, (_, i) => (
                            <option key={2024 + i} value={2024 + i}>
                              {2024 + i}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-[13.02px] top-1/2 -translate-y-1/2 w-[13.02px] h-[13.02px] text-[#6B7280] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Insurance Section - Figma: 370px width */}
        <div className="bg-white border-[0.67px] border-[#E5E7EB] rounded-[9.37px] pt-[20.45px] px-0 pb-[20.45px]">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center px-[20.45px] mb-[20.45px]">
            <h2 className="font-poppins text-[17.04px] font-bold leading-[24px] tracking-[-0.17px] text-[#323637]">
              Travel Insurance
            </h2>
            <div className="flex items-center justify-end">
              <span className="font-poppins text-[11.93px] leading-[19px] text-[#767676]">In partnership with</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-poppins text-[13.63px] leading-[20px] text-[#323637] px-[20.45px] mb-[20.45px]">
            Our travel protection from our award-winning partner, XCover, means you and your travel companions can book
            with peace of mind knowing there&apos;s protection available in case your trip doesn&apos;t go to plan.
          </p>

          {/* Insurance Cards - Vertical layout with absolute positioning per Figma */}
          <div className="flex flex-col items-center gap-[13.63px] px-[20.45px] pb-[13.63px]">
            {/* Premium Protection Card - Figma: Component 5 - 186.49px x 327.21px */}
            <div
              className={cn(
                'relative w-[186.49px] h-[327.21px] rounded-[7.67px] shadow-[0px_0.85px_1.7px_rgba(3,54,63,0.4),0px_-0.85px_1.7px_rgba(3,54,63,0.04)]',
                selectedInsurance === 'premium' && 'ring-2 ring-[#00A792]'
              )}
              style={{ background: 'rgba(255, 255, 255, 0.002)' }}
            >
              {/* Heading 4:margin - Header at top: 6.82px */}
              <div className="absolute left-[6.82px] right-[7.44px] top-[6.82px] h-[67.32px] pb-[6.82px]">
                {/* Heading 4 - Blue Header: 172.23px x 60.5px */}
                <div
                  className="relative w-[172.23px] h-[60.5px] rounded-[5.96px]"
                  style={{ background: '#DFE4FC', padding: '34.08px 20.45px 6.82px 6.82px' }}
                >
                  {/* Logo at top-left of header */}
                  <div className="absolute left-[6.82px] top-[6.82px] w-[20.45px] h-[20.45px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_6138_14258)">
                        <g clip-path="url(#clip1_6138_14258)">
                          <mask id="mask0_6138_14258" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                            <path d="M0 0H20.4509V20.4509H0V0Z" fill="white" />
                          </mask>
                          <g mask="url(#mask0_6138_14258)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0117 -0.000213632C12.7031 -0.0242495 15.3692 0.519895 17.8359 1.59666L17.8461 1.60092C18.1795 1.75387 18.4618 1.99964 18.6592 2.30884C18.8565 2.61803 18.9606 2.97755 18.959 3.34436V3.34692L18.3199 3.34266H18.959V9.8307C18.9586 12.0106 18.2978 14.1392 17.0638 15.9361C15.8297 17.733 14.0802 19.1139 12.0457 19.8968L11.1595 20.2376C10.421 20.5218 9.60331 20.5218 8.86478 20.2376L7.97772 19.8968C5.9433 19.1139 4.1938 17.733 2.95971 15.9361C1.72563 14.1392 1.06486 12.0106 1.06447 9.8307V3.34436V3.34692L1.70356 3.34266H2.34265V9.8307C2.343 11.7522 2.92542 13.6285 4.01316 15.2124C5.10091 16.7963 6.64296 18.0136 8.43616 18.7038L9.32322 19.0447C9.76632 19.2151 10.2571 19.2151 10.7002 19.0447L11.5865 18.7038C13.3798 18.0137 14.922 16.7965 16.01 15.2126C17.0979 13.6286 17.6804 11.7523 17.6808 9.8307V3.33754C17.6812 3.21753 17.6473 3.09989 17.5832 2.99846C17.519 2.89702 17.4273 2.816 17.3187 2.76492L17.3246 2.76747L17.5803 2.18207L17.3144 2.76321L17.3187 2.76492C15.0167 1.76126 12.5289 1.25458 10.0177 1.27797H10.0058C7.49462 1.25458 5.00678 1.76126 2.7048 2.76492L2.70906 2.76321L2.4432 2.18207L2.69884 2.76747L2.7048 2.76492C2.59607 2.81607 2.50421 2.89722 2.44005 2.99882C2.37589 3.10042 2.3421 3.21823 2.34265 3.33839L1.70356 3.34266H1.06447V3.34436C1.06299 2.97769 1.16716 2.61836 1.36452 2.30933C1.56187 2.0003 1.84406 1.75466 2.17734 1.60177L2.18756 1.59666C4.65425 0.519895 7.32038 -0.0242495 10.0117 -0.000213632Z" fill="#125FD2" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7744 5.94524C14.8922 6.06698 14.9568 6.2305 14.9541 6.39986C14.9514 6.56923 14.8815 6.73059 14.7599 6.84849L9.24581 12.1913H9.24411C8.99163 12.432 8.65648 12.5668 8.30763 12.5679C7.96082 12.5679 7.62423 12.4358 7.372 12.193L7.37115 12.1921L5.35162 10.2604C5.22913 10.1432 5.15821 9.98216 5.15445 9.81269C5.1507 9.64322 5.21442 9.47919 5.3316 9.3567C5.44878 9.23421 5.60982 9.16329 5.77929 9.15953C5.94876 9.15578 6.11278 9.2195 6.23527 9.33668L8.2565 11.2701L8.25821 11.2718C8.26673 11.2804 8.28462 11.2897 8.30763 11.2897C8.32978 11.2897 8.34768 11.2812 8.35705 11.2718L13.8703 5.93075C13.992 5.81297 14.1555 5.74834 14.3249 5.75106C14.4943 5.75378 14.6565 5.82362 14.7744 5.94524Z" fill="#125FD2" />
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_6138_14258">
                          <rect width="20.4509" height="20.4509" fill="white" />
                        </clipPath>
                        <clipPath id="clip1_6138_14258">
                          <rect width="20.4509" height="20.4509" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  {/* Title */}
                  <span className="font-helvetica text-[11.93px] font-bold leading-[20px] text-[#323637]">
                    Premium Protection
                  </span>
                </div>
              </div>

              {/* List - Features at top: 74.13px, height: 159.12px */}
              <div
                className="absolute left-[6.82px] right-[7.44px] top-[74.13px] h-[159.12px] flex flex-col items-start gap-[3.41px]"
                style={{ padding: '6.82px 0px 6.82px 20.45px' }}
              >
                <span className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">• Trip Cancellation</span>
                <span className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">• Medical and Dental</span>
                <span className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">• Trip Interruption</span>
                <span className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">• Emergency Assistance and Transportation</span>
                <span className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">• Baggage Loss or Theft</span>
                <span className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">• Travel Delays</span>
              </div>

              {/* Link:margin - at top: 230.07px */}
              <div
                className="absolute left-[6.82px] right-[7.44px] top-[230.07px] h-[20.82px]"
                style={{ padding: '0px 6.82px 6.82px' }}
              >
                <span className="font-helvetica text-[11.93px] font-normal leading-[14px] text-[#177FA4] cursor-pointer">
                  See summary of benefits
                </span>
              </div>

              {/* Container - Price at top: 250.52px */}
              <div className="absolute left-[6.82px] right-[7.44px] top-[250.52px] h-[29.63px] p-[6.82px]">
                <span className="font-helvetica text-[15.34px] font-bold leading-[15px] text-[#323637]">
                  +US$288.83
                </span>
              </div>

              {/* Container - Checkbox at bottom: 7.03px */}
              <div className="absolute left-[6.82px] right-[7.44px] bottom-[7.03px] h-[41.27px] flex items-center">
                <button
                  onClick={() => setSelectedInsurance(selectedInsurance === 'premium' ? null : 'premium')}
                  className={cn(
                    'absolute left-[6.82px] top-[11.93px] w-[17.04px] h-[17.04px] rounded-[8.52px] border-[1.7px] flex items-center justify-center',
                    selectedInsurance === 'premium' ? 'border-[#00A792] bg-[#00A792]' : 'border-[#505557] bg-white'
                  )}
                >
                  {selectedInsurance === 'premium' && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                </button>
                <div className="w-[172.23px] h-[41.27px] flex items-center" style={{ padding: '13.63px 0px 13.63px 37.49px' }}>
                  <span className="font-helvetica text-[11.93px] font-normal leading-[14px] text-[#323637]">Add to booking</span>
                </div>
              </div>
            </div>

            {/* Trip Cancellation Only Card */}
            <div
              className={cn(
                'relative w-[186.49px] h-[327.21px] rounded-[7.67px] shadow-[0px_0.85px_1.7px_rgba(3,54,63,0.4),0px_-0.85px_1.7px_rgba(3,54,63,0.04)]',
                selectedInsurance === 'cancellation' && 'ring-2 ring-[#00A792]'
              )}
              style={{ background: 'rgba(255, 255, 255, 0.002)' }}
            >
              {/* Heading 4:margin - Header */}
              <div className="absolute left-[6.82px] right-[7.44px] top-[6.82px] h-[67.32px] pb-[6.82px]">
                <div
                  className="relative w-[172.23px] h-[60.5px] rounded-[5.96px]"
                  style={{ background: '#EFF1FD', padding: '34.08px 20.45px 6.82px 6.82px' }}
                >
                  <div className="absolute left-[6.82px] top-[6.82px] w-[20.45px] h-[20.45px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_6138_14258)">
                        <g clip-path="url(#clip1_6138_14258)">
                          <mask id="mask0_6138_14258" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="21">
                            <path d="M0 0H20.4509V20.4509H0V0Z" fill="white" />
                          </mask>
                          <g mask="url(#mask0_6138_14258)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0117 -0.000213632C12.7031 -0.0242495 15.3692 0.519895 17.8359 1.59666L17.8461 1.60092C18.1795 1.75387 18.4618 1.99964 18.6592 2.30884C18.8565 2.61803 18.9606 2.97755 18.959 3.34436V3.34692L18.3199 3.34266H18.959V9.8307C18.9586 12.0106 18.2978 14.1392 17.0638 15.9361C15.8297 17.733 14.0802 19.1139 12.0457 19.8968L11.1595 20.2376C10.421 20.5218 9.60331 20.5218 8.86478 20.2376L7.97772 19.8968C5.9433 19.1139 4.1938 17.733 2.95971 15.9361C1.72563 14.1392 1.06486 12.0106 1.06447 9.8307V3.34436V3.34692L1.70356 3.34266H2.34265V9.8307C2.343 11.7522 2.92542 13.6285 4.01316 15.2124C5.10091 16.7963 6.64296 18.0136 8.43616 18.7038L9.32322 19.0447C9.76632 19.2151 10.2571 19.2151 10.7002 19.0447L11.5865 18.7038C13.3798 18.0137 14.922 16.7965 16.01 15.2126C17.0979 13.6286 17.6804 11.7523 17.6808 9.8307V3.33754C17.6812 3.21753 17.6473 3.09989 17.5832 2.99846C17.519 2.89702 17.4273 2.816 17.3187 2.76492L17.3246 2.76747L17.5803 2.18207L17.3144 2.76321L17.3187 2.76492C15.0167 1.76126 12.5289 1.25458 10.0177 1.27797H10.0058C7.49462 1.25458 5.00678 1.76126 2.7048 2.76492L2.70906 2.76321L2.4432 2.18207L2.69884 2.76747L2.7048 2.76492C2.59607 2.81607 2.50421 2.89722 2.44005 2.99882C2.37589 3.10042 2.3421 3.21823 2.34265 3.33839L1.70356 3.34266H1.06447V3.34436C1.06299 2.97769 1.16716 2.61836 1.36452 2.30933C1.56187 2.0003 1.84406 1.75466 2.17734 1.60177L2.18756 1.59666C4.65425 0.519895 7.32038 -0.0242495 10.0117 -0.000213632Z" fill="#125FD2" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7744 5.94524C14.8922 6.06698 14.9568 6.2305 14.9541 6.39986C14.9514 6.56923 14.8815 6.73059 14.7599 6.84849L9.24581 12.1913H9.24411C8.99163 12.432 8.65648 12.5668 8.30763 12.5679C7.96082 12.5679 7.62423 12.4358 7.372 12.193L7.37115 12.1921L5.35162 10.2604C5.22913 10.1432 5.15821 9.98216 5.15445 9.81269C5.1507 9.64322 5.21442 9.47919 5.3316 9.3567C5.44878 9.23421 5.60982 9.16329 5.77929 9.15953C5.94876 9.15578 6.11278 9.2195 6.23527 9.33668L8.2565 11.2701L8.25821 11.2718C8.26673 11.2804 8.28462 11.2897 8.30763 11.2897C8.32978 11.2897 8.34768 11.2812 8.35705 11.2718L13.8703 5.93075C13.992 5.81297 14.1555 5.74834 14.3249 5.75106C14.4943 5.75378 14.6565 5.82362 14.7744 5.94524Z" fill="#125FD2" />
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_6138_14258">
                          <rect width="20.4509" height="20.4509" fill="white" />
                        </clipPath>
                        <clipPath id="clip1_6138_14258">
                          <rect width="20.4509" height="20.4509" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <span className="font-helvetica text-[11.93px] font-bold leading-[20px] text-[#323637]">
                    Trip Cancellation Only
                  </span>
                </div>
              </div>

              {/* Description */}
              <div
                className="absolute left-[6.82px] right-[7.44px] top-[74.13px] flex flex-col items-start"
                style={{ padding: '6.82px 0px 6.82px 6.82px' }}
              >
                <p className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">
                  For US$162.89, this reimburses prepaid travel costs if you or your travel partners cancel due to injury or illness, prior to your departure
                </p>
              </div>

              {/* Link:margin */}
              <div
                className="absolute left-[6.82px] right-[7.44px] top-[230.07px] h-[20.82px]"
                style={{ padding: '0px 6.82px 6.82px' }}
              >
                <span className="font-helvetica text-[11.93px] font-normal leading-[14px] text-[#177FA4] cursor-pointer">
                  See summary of benefits
                </span>
              </div>

              {/* Price */}
              <div className="absolute left-[6.82px] right-[7.44px] top-[250.52px] h-[29.63px] p-[6.82px]">
                <span className="font-helvetica text-[15.34px] font-bold leading-[15px] text-[#323637]">
                  +US$162.89
                </span>
              </div>

              {/* Checkbox */}
              <div className="absolute left-[6.82px] right-[7.44px] bottom-[7.03px] h-[41.27px] flex items-center">
                <button
                  onClick={() => setSelectedInsurance(selectedInsurance === 'cancellation' ? null : 'cancellation')}
                  className={cn(
                    'absolute left-[6.82px] top-[11.93px] w-[17.04px] h-[17.04px] rounded-[8.52px] border-[1.7px] flex items-center justify-center',
                    selectedInsurance === 'cancellation' ? 'border-[#00A792] bg-[#00A792]' : 'border-[#505557] bg-white'
                  )}
                >
                  {selectedInsurance === 'cancellation' && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                </button>
                <div className="w-[172.23px] h-[41.27px] flex items-center" style={{ padding: '13.63px 0px 13.63px 37.49px' }}>
                  <span className="font-helvetica text-[11.93px] font-normal leading-[14px] text-[#323637]">Add to booking</span>
                </div>
              </div>
            </div>

            {/* No Protection Card */}
            <div
              className={cn(
                'relative w-[186.49px] h-[327.21px] rounded-[7.67px] shadow-[0px_0.85px_1.7px_rgba(3,54,63,0.4),0px_-0.85px_1.7px_rgba(3,54,63,0.04)]',
                selectedInsurance === 'none' && 'ring-2 ring-[#00A792]'
              )}
              style={{ background: 'rgba(255, 255, 255, 0.002)' }}
            >
              {/* Heading 4:margin - Header */}
              <div className="absolute left-[6.82px] right-[7.44px] top-[6.82px] h-[67.32px] pb-[6.82px]">
                <div
                  className="relative w-[172.23px] h-[60.5px] rounded-[5.96px]"
                  style={{ background: '#F1F2F3', padding: '34.08px 20.45px 6.82px 6.82px' }}
                >
                  <div className="absolute left-[6.82px] top-[6.82px] w-[20.45px] h-[20.45px]">
                    <ShieldIcon className="w-[20.45px] h-[20.45px]" />
                  </div>
                  <span className="font-helvetica text-[11.93px] font-bold leading-[20px] text-[#323637]">
                    No Protection
                  </span>
                </div>
              </div>

              {/* Description */}
              <div
                className="absolute left-[6.82px] right-[7.44px] top-[74.13px] flex flex-col items-start"
                style={{ padding: '6.82px 0px 6.82px 6.82px' }}
              >
                <p className="font-helvetica text-[11.93px] font-normal leading-[18px] text-[#323637]">
                  Your prepaid trip costs would be lost if you or your travel companions can&apos;t travel or need to cut your trip short due to illness or injuries, including to family members back home. You would also have no medical protection
                </p>
              </div>

              {/* Checkbox at bottom */}
              <div className="absolute left-[6.82px] right-[7.44px] bottom-[7.03px] h-[41.27px] flex items-center">
                <button
                  onClick={() => setSelectedInsurance(selectedInsurance === 'none' ? null : 'none')}
                  className={cn(
                    'absolute left-[6.82px] top-[11.93px] w-[17.04px] h-[17.04px] rounded-[8.52px] border-[1.7px] flex items-center justify-center',
                    selectedInsurance === 'none' ? 'border-[#00A792] bg-[#00A792]' : 'border-[#505557] bg-white'
                  )}
                >
                  {selectedInsurance === 'none' && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                </button>
                <div className="w-[172.23px] h-[41.27px] flex items-center" style={{ padding: '13.63px 0px 13.63px 37.49px' }}>
                  <span className="font-helvetica text-[11.93px] font-normal leading-[14px] text-[#323637]">
                    No thanks, I&apos;ll risk it.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Disclaimer */}
          <p className="font-poppins text-[10.11px] leading-[18px] text-[#323637] px-[20.45px]">
            Insurance coverage underwritten by individual member companies of Zurich in North America, including Zurich
            American Insurance Company (NAIC #16535, state of domicile: New York), 1299 Zurich Way, Schaumburg, IL 60196
            and sold by Cover Genius Insurance Services LLC, via their platform XCover. Certain coverages not available
            in all states.
          </p>
        </div>

        {/* Latos Savings Section */}
        <div>
          <h2 className="font-poppins text-[13.02px] font-semibold text-[#111928] mb-[6.51px]">Latos Savings</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Add Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full h-[39.13px] px-[13.02px] pr-[110px] bg-white border-[0.81px] border-[#E5E7EB] rounded-[6.51px] font-poppins text-[10.59px] focus:outline-none focus:border-[#00A792]"
            />
            <Button className="absolute right-[4.88px] top-1/2 -translate-y-1/2 h-[29.33px] px-[16.28px] rounded-[6.51px] bg-[#00A792] hover:bg-[#008577] text-white font-poppins font-medium text-[10.59px]">
              Promo Code
            </Button>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          className="w-full h-[39.13px] rounded-[6.51px] bg-[#00A792] hover:bg-[#008577] text-white font-poppins font-medium text-[11.4px]"
        >
          Continue to Secure Payment
        </Button>

        {/* Payment Info */}
        <div className="flex flex-col items-center gap-[6.51px]">
          <div className="flex items-center gap-[6.51px]">
            <span className="font-poppins text-[8.95px] text-[#6B7280]">Secured by</span>
            <span className="font-semibold text-[10.59px] text-[#635BFF]">Stripe</span>
          </div>
          <div className="flex items-center gap-[6.51px]">
            <span className="font-poppins text-[8.95px] text-[#6B7280]">Supported cards:</span>
            <div className="flex gap-[3.26px]">
              <Image src="/visa.svg" alt="Visa" width={26} height={16} className="h-[16.28px] w-auto" />
              <Image src="/mastercard.svg" alt="Mastercard" width={26} height={16} className="h-[16.28px] w-auto" />
              <Image src="/amex.svg" alt="Amex" width={26} height={16} className="h-[16.28px] w-auto" />
              <Image src="/discover.svg" alt="Discover" width={26} height={16} className="h-[16.28px] w-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Design - Original layout preserved */}
      <div className="hidden lg:block space-y-6">
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
            <p className="font-poppins text-[12px] text-[#6b7280] mb-1">
              Please assign <span className="font-semibold text-[#00a792]">1 traveler</span> to a room.
            </p>
          </div>

          <div className="">
            {accommodationOptions.map((option, index) => (
              <div
                key={option.id}
                className={cn('px-4 py-4 flex items-center justify-between', index > 0 && 'border-t border-[#e5e7eb]')}
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
                      <InfoIcon className="w-[13px] h-[13px]" />
                    </div>
                    <p className="font-poppins text-[12px] text-[#6b7280] whitespace-nowrap">{option.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-poppins text-[12px] font-medium text-black">{option.price}</p>
                    <p className="font-poppins text-[12px] text-[#6b7280]">per traveler</p>
                  </div>
                  <button className="px-3 py-2 text-[13px] font-normal text-[#6b7280] border border-[#e5e7eb] rounded-[8px] hover:border-[#00a792] hover:text-[#00a792] transition-colors flex items-center gap-2 whitespace-nowrap">
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
            {/* Full Name (Required) */}
            <div>
              <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Full Name <span className="text-gray-400">(Required)</span>
              </label>
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
                <input
                  type="text"
                  placeholder=""
                  value={travelers[activeTraveler - 1]?.firstName || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'firstName', e.target.value)}
                  className="h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
                />
                <input
                  type="text"
                  placeholder=""
                  value={travelers[activeTraveler - 1]?.lastName || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'lastName', e.target.value)}
                  className="h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
                />
              </div>
            </div>

            {/* Email Address (Required) */}
            <div>
              <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Email Address <span className="text-gray-400">(Required)</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder=""
                  value={travelers[activeTraveler - 1]?.email || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'email', e.target.value)}
                  className="h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
                />
              </div>
            </div>

            {/* Contact Number (Required) */}
            <div>
              <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Contact Number <span className="text-gray-400">(Required)</span>
              </label>
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
                <input
                  type="tel"
                  placeholder=""
                  value={travelers[activeTraveler - 1]?.contactNumber || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'contactNumber', e.target.value)}
                  className="h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
                />
              </div>
              <p className="font-poppins text-[10px] text-[#6b7280] mt-1">
                This is how we will get in touch with you, if we need to reach you at your destination
              </p>
            </div>

            {/* Date of Birth and Nationality (Required) */}
            <div>
              <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Date of Birth and Nationality <span className="text-gray-400">(Required)</span>
              </label>
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

            {/* Passport (Required) */}
            <div>
              <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                Passport <span className="text-gray-400">(Required)</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder=""
                  value={travelers[activeTraveler - 1]?.passport || ''}
                  onChange={(e) => updateTraveler(activeTraveler - 1, 'passport', e.target.value)}
                  className="h-[40px] px-3 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
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
                <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                  Passport Issued Date <span className="text-gray-400">(Required)</span>
                </label>
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
                <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                  Passport Expiration Date <span className="text-gray-400">(Required)</span>
                </label>
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
            Our travel protection from our award winning partners, XCover, means you and your travel companions can book
            with peace of mind knowing there&apos;s protection available in case your trip doesn&apos;t go to plan.
          </p>

          {/* Insurance Options - 3 Cards */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {insuranceOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'rounded-[8px] border border-[#e5e7eb] overflow-hidden cursor-pointer transition-all',
                  selectedInsurance === option.id && 'ring-2 ring-[#00A792]'
                )}
                onClick={() => setSelectedInsurance(selectedInsurance === option.id ? null : option.id)}
              >
                <div className="p-3" style={{ backgroundColor: option.bgColor }}>
                  <span className="font-poppins text-[12px] font-bold text-[#323637]">{option.title}</span>
                </div>
                <div className="p-3">
                  {option.features ? (
                    <ul className="list-disc pl-4 text-[11px] text-[#323637] space-y-1">
                      {option.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-[#323637] whitespace-nowrap">{option.description}</p>
                  )}
                  {option.price && (
                    <p className="font-bold text-[14px] text-[#323637] mt-2">{option.price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="font-poppins text-[9px] text-[#9ca3af] leading-relaxed">
            Insurance coverage offered may be declined if declined before submitting a Request For Travel Service,
            including travel arrangements to you or to your Seller Service, including All America Travel Insurance
            Company (ATTIC), a Member of Farmers, New York, TLIC) Zurich-ving, Underwriting, LLC (CAO) via operating as
            Zurich Zurich Cover America Insurance Company (US) / Zurich Canadian Insurance Co. (Canada).
          </p>
        </div>

        {/* Latos Savings Section */}
        <div>
          <h2 className="font-poppins text-[16px] font-semibold text-[#111928] mb-3">Latos Savings</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Add Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full h-[48px] px-4 pr-[130px] rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
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
    </>
  )
}
