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
  image: '/tours/iceland.jpg',
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
      <main className="min-h-screen bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <h1 className="font-poppins text-[24px] font-semibold text-black mb-6">
            {mockTourData.title}
          </h1>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Booking Form */}
            <div className="flex-1 lg:max-w-[740px]">
              {/* White Card Container */}
              <div className="bg-white rounded-[8px] p-6">
                {/* Stepper Tabs */}
                <div className="flex gap-[8px] mb-6">
                  {/* Your Details Tab */}
                  <div className="flex-1 flex flex-col gap-[4px] items-center">
                    <div
                      className={`h-[4px] rounded-[8px] w-full transition-colors ${
                        activeTab === 'details' ? 'bg-[#00a792]' : 'bg-[#e5e7eb]'
                      }`}
                    />
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`font-poppins text-[13px] font-semibold transition-colors ${
                        activeTab === 'details' ? 'text-[#00a792]' : 'text-[#6b7280]'
                      }`}
                    >
                      Your Details
                    </button>
                  </div>

                  {/* Payment Tab */}
                  <div className="flex-1 flex flex-col gap-[4px] items-center">
                    <div
                      className={`h-[4px] rounded-[8px] w-full transition-colors ${
                        activeTab === 'payment' ? 'bg-[#00a792]' : 'bg-[#e5e7eb]'
                      }`}
                    />
                    <button
                      onClick={() => setActiveTab('payment')}
                      className={`font-poppins text-[13px] font-semibold transition-colors ${
                        activeTab === 'payment' ? 'text-[#00a792]' : 'text-[#6b7280]'
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
            <div className="lg:w-[380px]">
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
