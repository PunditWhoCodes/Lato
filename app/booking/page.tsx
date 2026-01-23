'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { BookingForm } from '@/components/booking/BookingForm'
import { BookingSummary } from '@/components/booking/BookingSummary'
import { PaymentForm } from '@/components/booking/PaymentForm'

// Mock tour data - in real app this would come from API/params
const mockTourData = {
  id: '1',
  title: 'Iceland Northern Lights & Golden Circle',
  image: '/destinations/spain.jpg',
  duration: '7 days',
  rating: 4.9,
  reviewCount: 245,
  startLocation: 'Isla De Tenerife, Spain',
  startDate: '24 January 2026',
  endLocation: 'San Miguel Marina, Spain',
  endDate: '30 January 2026',
  tourType: 'Group Tour',
  brochurePrice: 117083,
  specialDiscount: 38687,
  latoDiscount: 2352,
  totalPrice: 76063,
  depositPayable: 76063,
  travelCreditsReward: 2662,
  currency: 'USD',
}

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<'details' | 'payment'>('details')

  const handleContinueToPayment = () => {
    setActiveTab('payment')
  }

  const handleBackToDetails = () => {
    setActiveTab('details')
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F7F7F7]">
        <div className="max-w-[1594px] mx-auto px-4 md:px-8 lg:px-16 xl:px-[163px] py-8">
          {/* Page Title */}
          <h1 className="font-poppins text-[24px] font-semibold text-black leading-[36px] mb-6">
            {mockTourData.title}
          </h1>

          {/* Mobile Layout - Photo section first */}
          <div className="lg:hidden flex flex-col gap-[24.67px] px-0">
            {/* Photo Section / Booking Summary - First on mobile */}
            <BookingSummary tourData={mockTourData} />

            {/* Details/Payment Section - Second on mobile */}
            <div className="bg-white rounded-[9.27px] shadow-[0px_0.84px_1.69px_rgba(3,54,63,0.4),0px_-0.84px_1.69px_rgba(3,54,63,0.04)] p-[19.95px]">
              {/* Stepper Tabs */}
              <div className="flex gap-2 mb-6">
                {/* Your Details Tab */}
                <div className="flex-1 flex flex-col gap-1 items-center">
                  <div
                    className={`h-[5px] rounded-lg w-full transition-colors ${
                      activeTab === 'details' ? 'bg-[#00A792]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`font-poppins text-[14px] font-semibold leading-6 transition-colors ${
                      activeTab === 'details' ? 'text-[#00A792]' : 'text-[#6B7280]'
                    }`}
                  >
                    Your Details
                  </button>
                </div>

                {/* Payment Tab */}
                <div className="flex-1 flex flex-col gap-1 items-center">
                  <div
                    className={`h-[5px] rounded-lg w-full transition-colors ${
                      activeTab === 'payment' ? 'bg-[#00A792]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                  <button
                    onClick={() => setActiveTab('payment')}
                    className={`font-poppins text-[14px] font-semibold leading-6 transition-colors ${
                      activeTab === 'payment' ? 'text-[#00A792]' : 'text-[#6B7280]'
                    }`}
                  >
                    Payment
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {activeTab === 'details' && (
                <BookingForm
                  tourData={mockTourData}
                  onContinue={handleContinueToPayment}
                />
              )}

              {activeTab === 'payment' && (
                <PaymentForm
                  tourData={mockTourData}
                  onBack={handleBackToDetails}
                />
              )}
            </div>
          </div>

          {/* Desktop Layout - Two columns */}
          <div className="hidden lg:flex lg:flex-row gap-5">
            {/* Left Column - Booking Form */}
            <div className="flex-1 lg:w-[922px] lg:max-w-[922px]">
              {/* White Card Container */}
              <div className="bg-white rounded-lg p-6">
                {/* Stepper Tabs */}
                <div className="flex gap-2 mb-6 max-w-[456px]">
                  {/* Your Details Tab */}
                  <div className="flex-1 flex flex-col gap-1 items-center">
                    <div
                      className={`h-[5px] rounded-lg w-full transition-colors ${
                        activeTab === 'details' ? 'bg-[#00A792]' : 'bg-[#E5E7EB]'
                      }`}
                    />
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`font-poppins text-[14px] font-semibold leading-6 transition-colors ${
                        activeTab === 'details' ? 'text-[#00A792]' : 'text-[#6B7280]'
                      }`}
                    >
                      Your Details
                    </button>
                  </div>

                  {/* Payment Tab */}
                  <div className="flex-1 flex flex-col gap-1 items-center">
                    <div
                      className={`h-[5px] rounded-lg w-full transition-colors ${
                        activeTab === 'payment' ? 'bg-[#00A792]' : 'bg-[#E5E7EB]'
                      }`}
                    />
                    <button
                      onClick={() => setActiveTab('payment')}
                      className={`font-poppins text-[14px] font-semibold leading-6 transition-colors ${
                        activeTab === 'payment' ? 'text-[#00A792]' : 'text-[#6B7280]'
                      }`}
                    >
                      Payment
                    </button>
                  </div>
                </div>

                {/* Form Content */}
                {activeTab === 'details' && (
                  <BookingForm
                    tourData={mockTourData}
                    onContinue={handleContinueToPayment}
                  />
                )}

                {activeTab === 'payment' && (
                  <PaymentForm
                    tourData={mockTourData}
                    onBack={handleBackToDetails}
                  />
                )}
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:w-[628px] lg:flex-shrink-0">
              <div className="lg:sticky lg:top-8">
                <BookingSummary tourData={mockTourData} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
