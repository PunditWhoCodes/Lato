'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TourData {
  id: string
  title: string
  currency: string
  totalPrice: number
}

interface PaymentFormProps {
  tourData: TourData
  onBack?: () => void
}

// Info Icon SVG Component
const InfoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 14C11.0899 14 14 11.0899 14 7.5C14 3.91015 11.0899 1 7.5 1C3.91015 1 1 3.91015 1 7.5C1 11.0899 3.91015 14 7.5 14Z" stroke="#5E81F4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 10.5V7.5" stroke="#5E81F4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.5 4.5H7.507" stroke="#5E81F4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Lock Icon SVG Component for button
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 7.33333H3.33333C2.59695 7.33333 2 7.93029 2 8.66667V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V8.66667C14 7.93029 13.403 7.33333 12.6667 7.33333Z" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66667 7.33333V4.66667C4.66667 3.78261 5.01786 2.93477 5.64298 2.30964C6.2681 1.68452 7.11595 1.33333 8 1.33333C8.88406 1.33333 9.7319 1.68452 10.357 2.30964C10.9821 2.93477 11.3333 3.78261 11.3333 4.66667V7.33333" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function PaymentForm({ tourData, onBack }: PaymentFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'paypal' | 'googlepay'>('card')
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [billingCountry, setBillingCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [payLater, setPayLater] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <>
      {/* Mobile Design - Figma: 370px width */}
      <div className="lg:hidden flex flex-col w-full">
        {/* Choose Payment Option Header - Figma: Poppins 16.86px bold #323637 */}
        <h2 className="font-poppins text-[16.86px] font-bold text-[#323637] mb-[12.64px]">
          Choose Payment Option
        </h2>

        {/* SSL Security Notice - Figma: bg #EFF1FD, border-radius 8.43px */}
        <div className="flex items-start gap-[8.43px] p-[12.64px] bg-[#EFF1FD] rounded-[8.43px] mb-[16.86px]">
          <div className="flex-shrink-0 mt-[2px]">
            <InfoIcon />
          </div>
          <p className="font-poppins text-[10.54px] leading-[15.81px] text-[#6B7280]">
            This is a secure and SSL encrypted payment. Your credit card details are safe.
          </p>
        </div>

        {/* Select Payment Method Label */}
        <p className="font-poppins text-[10.54px] text-[#6B7280] mb-[12.64px]">
          Select your payment method:
        </p>

        {/* Pay by Card Option - Figma: border 1.05px, border-radius 8.43px */}
        <div
          className={cn(
            'border rounded-[8.43px] mb-[12.64px] transition-colors',
            selectedPaymentMethod === 'card'
              ? 'border-[#00A792] border-[1.5px]'
              : 'border-[#E5E7EB] border-[1.05px]'
          )}
        >
          <div
            className="flex items-center justify-between p-[16.86px] cursor-pointer"
            onClick={() => setSelectedPaymentMethod('card')}
          >
            <div className="flex items-center gap-[12.64px]">
              {/* Radio Button - Figma: 21.07px */}
              <div
                className={cn(
                  'w-[21.07px] h-[21.07px] rounded-full border-[2px] flex items-center justify-center',
                  selectedPaymentMethod === 'card'
                    ? 'border-[#00A792] bg-[#00A792]'
                    : 'border-[#D1D5DB]'
                )}
              >
                {selectedPaymentMethod === 'card' && (
                  <div className="w-[8.43px] h-[8.43px] rounded-full bg-white" />
                )}
              </div>
              <span className="font-poppins text-[13.49px] font-medium text-[#111928]">
                Pay by card
              </span>
            </div>
            {/* Card Logos */}
            <div className="flex items-center gap-[4.21px]">
              <Image src="/visa.svg" alt="Visa" width={32} height={20} className="h-[21px] w-auto" />
              <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-[21px] w-auto" />
              <Image src="/amex.svg" alt="Amex" width={32} height={20} className="h-[21px] w-auto" />
              <Image src="/discover.svg" alt="Discover" width={32} height={20} className="h-[21px] w-auto" />
            </div>
          </div>

          {/* Card Form - Only shown when card is selected */}
          {selectedPaymentMethod === 'card' && (
            <div className="px-[16.86px] pb-[16.86px] flex flex-col gap-[16.86px]">
              {/* Cardholder Name - Figma: floating label style */}
              <div className="relative">
                <label className="font-poppins text-[10.54px] font-normal text-black mb-[4.21px] block">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="i.e. John Smith"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full h-[42.14px] px-[12.64px] rounded-[8.43px] border border-[#E5E7EB] font-poppins text-[13.49px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A792]"
                />
              </div>

              {/* Card Number */}
              <div className="relative">
                <label className="font-poppins text-[10.54px] font-normal text-black mb-[4.21px] block">
                  Card Number <span className="text-[#F23813]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full h-[42.14px] px-[12.64px] rounded-[8.43px] border border-[#E5E7EB] font-poppins text-[13.49px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A792]"
                />
              </div>

              {/* Expiry Date */}
              <div className="relative">
                <label className="font-poppins text-[10.54px] font-normal text-black mb-[4.21px] block">
                  Expiry Date <span className="text-[#F23813]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full h-[42.14px] px-[12.64px] rounded-[8.43px] border border-[#E5E7EB] font-poppins text-[13.49px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A792]"
                />
              </div>

              {/* CVV */}
              <div className="relative">
                <label className="font-poppins text-[10.54px] font-normal text-black mb-[4.21px] block">
                  CVV <span className="text-[#F23813]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full h-[42.14px] px-[12.64px] rounded-[8.43px] border border-[#E5E7EB] font-poppins text-[13.49px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A792]"
                />
              </div>

              {/* Country & Zip Code Section */}
              <div>
                <label className="font-poppins text-[10.54px] font-normal text-black mb-[8.43px] block">
                  Country<span className="text-[#F23813]">*</span> & Zip code<span className="text-[#F23813]">*</span>
                </label>

                {/* Billing Country */}
                <p className="font-poppins text-[8.43px] text-[#6B7280] mb-[4.21px]">Billing Country*</p>
                <div className="relative mb-[12.64px]">
                  <select
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full h-[42.14px] px-[12.64px] rounded-[8.43px] border border-[#E5E7EB] bg-white font-poppins text-[13.49px] appearance-none cursor-pointer focus:outline-none focus:border-[#00A792]"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                  <ChevronDown className="absolute right-[12.64px] top-1/2 -translate-y-1/2 w-[16.86px] h-[16.86px] text-[#9CA3AF] pointer-events-none" />
                </div>

                {/* Zip Code */}
                <p className="font-poppins text-[8.43px] text-[#6B7280] mb-[4.21px]">Zip Code*</p>
                <input
                  type="text"
                  placeholder=""
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full h-[42.14px] px-[12.64px] rounded-[8.43px] border border-[#E5E7EB] font-poppins text-[13.49px] focus:outline-none focus:border-[#00A792]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Pay with PayPal Option */}
        <div
          className={cn(
            'border rounded-[8.43px] mb-[12.64px] transition-colors cursor-pointer',
            selectedPaymentMethod === 'paypal'
              ? 'border-[#00A792] border-[1.5px]'
              : 'border-[#E5E7EB] border-[1.05px]'
          )}
          onClick={() => setSelectedPaymentMethod('paypal')}
        >
          <div className="flex items-center justify-between p-[16.86px]">
            <div className="flex items-center gap-[12.64px]">
              <div
                className={cn(
                  'w-[21.07px] h-[21.07px] rounded-full border-[2px] flex items-center justify-center',
                  selectedPaymentMethod === 'paypal'
                    ? 'border-[#00A792] bg-[#00A792]'
                    : 'border-[#D1D5DB]'
                )}
              >
                {selectedPaymentMethod === 'paypal' && (
                  <div className="w-[8.43px] h-[8.43px] rounded-full bg-white" />
                )}
              </div>
              <span className="font-poppins text-[13.49px] font-medium text-[#111928]">
                Pay with PayPal
              </span>
            </div>
            <Image src="/paypal.svg" alt="PayPal" width={50} height={30} className="h-[30px] w-auto" />
          </div>
        </div>

        {/* Pay with Google Pay Option */}
        <div
          className={cn(
            'border rounded-[8.43px] mb-[16.86px] transition-colors cursor-pointer',
            selectedPaymentMethod === 'googlepay'
              ? 'border-[#00A792] border-[1.5px]'
              : 'border-[#E5E7EB] border-[1.05px]'
          )}
          onClick={() => setSelectedPaymentMethod('googlepay')}
        >
          <div className="flex items-center justify-between p-[16.86px]">
            <div className="flex items-center gap-[12.64px]">
              <div
                className={cn(
                  'w-[21.07px] h-[21.07px] rounded-full border-[2px] flex items-center justify-center',
                  selectedPaymentMethod === 'googlepay'
                    ? 'border-[#00A792] bg-[#00A792]'
                    : 'border-[#D1D5DB]'
                )}
              >
                {selectedPaymentMethod === 'googlepay' && (
                  <div className="w-[8.43px] h-[8.43px] rounded-full bg-white" />
                )}
              </div>
              <span className="font-poppins text-[13.49px] font-medium text-[#111928]">
                Pay with Google Pay
              </span>
            </div>
            <Image src="/gpay.svg" alt="Google Pay" width={50} height={30} className="h-[30px] w-auto" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1.05px] bg-[#E5E7EB] mb-[16.86px]" />

        {/* Book Now, Pay Later Section */}
        <h3 className="font-poppins text-[13.49px] font-semibold text-[#111928] mb-[8.43px]">
          Book Now. Pay Later.<span className="text-[#F23813]">*</span>
        </h3>
        <p className="font-poppins text-[10.54px] leading-[15.81px] text-[#6B7280] mb-[12.64px]">
          You won&apos;t be charged interest if you pay your balance in full within 6 months with the PayPal financing option.
        </p>
        <p className="font-poppins text-[8.43px] text-[#9CA3AF] mb-[12.64px]">
          *Financing is subject to credit approval.
        </p>

        <label className="flex items-center gap-[12.64px] cursor-pointer mb-[16.86px]">
          <div
            className={cn(
              'w-[21.07px] h-[21.07px] rounded-full border-[2px] flex items-center justify-center',
              payLater ? 'border-[#00A792] bg-[#00A792]' : 'border-[#D1D5DB]'
            )}
            onClick={() => setPayLater(!payLater)}
          >
            {payLater && <div className="w-[8.43px] h-[8.43px] rounded-full bg-white" />}
          </div>
          <Image src="/paypal.svg" alt="PayPal" width={50} height={30} className="h-[30px] w-auto" />
        </label>

        {/* Divider */}
        <div className="h-[1.05px] bg-[#E5E7EB] mb-[16.86px]" />

        {/* Terms Checkbox */}
        <label className="flex items-start gap-[12.64px] cursor-pointer mb-[21.07px]">
          <div className="mt-[2px]">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-[16.86px] h-[16.86px] rounded-[4.21px] border-[#D1D5DB] text-[#00A792] focus:ring-[#00A792] accent-[#00A792]"
            />
          </div>
          <span className="font-poppins text-[10.54px] leading-[15.81px] text-[#6B7280]">
            I accept Lato&apos;s{' '}
            <a href="#" className="text-[#00A792] underline">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-[#00A792] underline">G Adventures&apos;s</a>
          </span>
        </label>

        {/* Confirm Payment Button - Figma: 330px x 48.88px, bg #00A792 */}
        <Button
          disabled={!acceptTerms}
          className="w-[330px] h-[48.88px] mx-auto rounded-[8.43px] bg-[#00A792] hover:bg-[#008577] disabled:bg-[#9CA3AF] text-white font-poppins font-medium text-[14.54px] flex items-center justify-center gap-[8.43px]"
        >
          <LockIcon />
          Confirm Payment
        </Button>

        {/* Payment Confirmation Notice */}
        <p className="font-poppins text-[10.54px] text-center text-[#6B7280] mt-[16.86px]">
          You will be charged <span className="font-semibold text-black">${formatPrice(tourData.totalPrice)}</span> once your booking is confirmed.
        </p>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-[12.64px] mt-[12.64px] font-poppins text-[13.49px] text-[#6B7280] hover:text-[#00A792] transition-colors"
        >
          &larr; Back to Your Details
        </button>
      </div>

      {/* Desktop Design - Original layout preserved */}
      <div className="hidden lg:block space-y-6">
        {/* Choose Payment Option Header */}
        <div>
          <h2 className="font-poppins text-[16px] font-semibold text-[#111928] mb-3">
            Choose Payment Option
          </h2>

          {/* Security Notice */}
          <div className="flex items-start gap-2 p-3 bg-[#EFF1FD] rounded-[8px] mb-4">
            <div className="flex-shrink-0 mt-0.5">
              <InfoIcon />
            </div>
            <p className="font-poppins text-[12px] text-[#6b7280]">
              This is a secure and SSL encrypted payment. Your credit card details are safe.
            </p>
          </div>

          {/* Payment Method Selection */}
          <p className="font-poppins text-[12px] text-[#6b7280] mb-3">
            Select your payment method:
          </p>

          {/* Pay by Card Option */}
          <div
            className={cn(
              'border rounded-[8px] mb-3 transition-colors',
              selectedPaymentMethod === 'card' ? 'border-[#00a792]' : 'border-[#e5e7eb]'
            )}
          >
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setSelectedPaymentMethod('card')}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    selectedPaymentMethod === 'card'
                      ? 'border-[#00a792] bg-[#00a792]'
                      : 'border-[#d1d5db]'
                  )}
                >
                  {selectedPaymentMethod === 'card' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-poppins text-[13px] font-medium text-[#111928]">
                  Pay by card
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/visa.svg" alt="Visa" width={32} height={20} className="h-5 w-auto" />
                <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-5 w-auto" />
                <Image src="/amex.svg" alt="Amex" width={32} height={20} className="h-5 w-auto" />
                <Image src="/discover.svg" alt="Discover" width={32} height={20} className="h-5 w-auto" />
              </div>
            </div>

            {/* Card Form - Only shown when card is selected */}
            {selectedPaymentMethod === 'card' && (
              <div className="px-4 pb-4 space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="i.e. John Smith"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00a792]"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00a792]"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00a792]"
                  />
                </div>

                {/* CVV */}
                <div>
                  <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    CVV *
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00a792]"
                  />
                </div>

                {/* Country & Zip Code */}
                <div>
                  <label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    Country* & Zip code*
                  </label>
                  <p className="font-poppins text-[10px] text-[#6b7280] mb-2">Billing Country*</p>
                  <div className="relative mb-3">
                    <select
                      value={billingCountry}
                      onChange={(e) => setBillingCountry(e.target.value)}
                      className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer focus:outline-none focus:border-[#00a792]"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <p className="font-poppins text-[10px] text-[#6b7280] mb-2">Zip Code*</p>
                  <input
                    type="text"
                    placeholder=""
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] font-poppins text-[13px] focus:outline-none focus:border-[#00a792]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pay with PayPal Option */}
          <div
            className={cn(
              'border rounded-[8px] mb-3 transition-colors cursor-pointer',
              selectedPaymentMethod === 'paypal' ? 'border-[#00a792]' : 'border-[#e5e7eb]'
            )}
            onClick={() => setSelectedPaymentMethod('paypal')}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    selectedPaymentMethod === 'paypal'
                      ? 'border-[#00a792] bg-[#00a792]'
                      : 'border-[#d1d5db]'
                  )}
                >
                  {selectedPaymentMethod === 'paypal' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-poppins text-[13px] font-medium text-[#111928]">
                  Pay with PayPal
                </span>
              </div>
              <Image src="/paypal.svg" alt="PayPal" width={50} height={30} className="h-[30px] w-auto" />
            </div>
          </div>

          {/* Pay with Google Pay Option */}
          <div
            className={cn(
              'border rounded-[8px] mb-4 transition-colors cursor-pointer',
              selectedPaymentMethod === 'googlepay' ? 'border-[#00a792]' : 'border-[#e5e7eb]'
            )}
            onClick={() => setSelectedPaymentMethod('googlepay')}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    selectedPaymentMethod === 'googlepay'
                      ? 'border-[#00a792] bg-[#00a792]'
                      : 'border-[#d1d5db]'
                  )}
                >
                  {selectedPaymentMethod === 'googlepay' && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-poppins text-[13px] font-medium text-[#111928]">
                  Pay with Google Pay
                </span>
              </div>
              <Image src="/gpay.svg" alt="Google Pay" width={50} height={30} className="h-[30px] w-auto" />
            </div>
          </div>
        </div>

        {/* Book Now, Pay Later */}
        <div className="border-t border-[#e5e7eb] pt-4">
          <h3 className="font-poppins text-[13px] font-semibold text-[#111928] mb-2">
            Book Now. Pay Later.*
          </h3>
          <p className="font-poppins text-[11px] text-[#6b7280] mb-3">
            You won&apos;t be charged interest if you pay your balance in full within 6 months with the PayPal financing option.
          </p>
          <p className="font-poppins text-[10px] text-[#9ca3af] mb-3">
            *Financing is subject to credit approval.
          </p>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                payLater ? 'border-[#00a792] bg-[#00a792]' : 'border-[#d1d5db]'
              )}
              onClick={() => setPayLater(!payLater)}
            >
              {payLater && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <Image src="/paypal.svg" alt="PayPal" width={50} height={30} className="h-[30px] w-auto" />
          </label>
        </div>

        {/* Terms Checkbox */}
        <div className="border-t border-[#e5e7eb] pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-[#d1d5db] text-[#00a792] focus:ring-[#00a792] accent-[#00a792]"
            />
            <span className="font-poppins text-[12px] text-[#6b7280]">
              I accept Lato&apos;s{' '}
              <a href="#" className="text-[#00a792] underline">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-[#00a792] underline">G Adventures&apos;s</a>
            </span>
          </label>
        </div>

        {/* Confirm Payment Button */}
        <Button
          disabled={!acceptTerms}
          className="w-full h-[48px] rounded-[8px] bg-[#00a792] hover:bg-[#008577] disabled:bg-[#9ca3af] text-white font-poppins font-medium text-[14px] flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Confirm Payment
        </Button>

        {/* Payment Confirmation Notice */}
        <p className="font-poppins text-[11px] text-center text-[#6b7280]">
          You will be charged <span className="font-semibold text-black">${formatPrice(tourData.totalPrice)}</span> once your booking is confirmed.
        </p>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full py-2 font-poppins text-[13px] text-[#6b7280] hover:text-[#00a792] transition-colors"
        >
          &larr; Back to Your Details
        </button>
      </div>
    </>
  )
}
