'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Info, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
    <div className="space-y-6">
      {/* Choose Payment Option Header */}
      <div>
        <h2 className="font-poppins text-[16px] font-semibold text-[#111928] mb-3">
          Choose Payment Option
        </h2>

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 bg-[#f0fdf4] rounded-[8px] border border-[#bbf7d0] mb-4">
          <Info className="w-4 h-4 text-[#00a792] flex-shrink-0 mt-0.5" />
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
                <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                  Cardholder Name
                </Label>
                <Input
                  placeholder="i.e. John Smith"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af]"
                />
              </div>

              {/* Card Number */}
              <div>
                <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                  Card Number *
                </Label>
                <Input
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af]"
                />
              </div>

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    Expiry Date *
                  </Label>
                  <Input
                    placeholder="MM / YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af]"
                  />
                </div>
                <div>
                  <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                    CVV *
                  </Label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px] placeholder:text-[#9ca3af]"
                  />
                </div>
              </div>

              {/* Country & Zip Code */}
              <div>
                <Label className="font-poppins text-[12px] font-normal text-black mb-1 block">
                  Country* & Zip code*
                </Label>
                <p className="font-poppins text-[10px] text-[#6b7280] mb-2">Billing Country*</p>
                <div className="relative mb-3">
                  <select
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full h-[40px] px-4 rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[13px] appearance-none cursor-pointer"
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
                <Input
                  placeholder=""
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="h-[40px] rounded-[8px] border-[#e5e7eb] font-poppins text-[13px]"
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
            <div className="flex items-center">
              <span className="font-bold text-[16px] text-[#003087]">Pay</span>
              <span className="font-bold text-[16px] text-[#009cde]">Pal</span>
            </div>
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
            <div className="flex items-center gap-1">
              <span className="font-medium text-[14px] text-[#5f6368]">G</span>
              <span className="font-medium text-[14px] text-[#5f6368]">Pay</span>
            </div>
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
          <div className="flex items-center gap-2">
            <span className="font-bold text-[14px] text-[#003087]">Pay</span>
            <span className="font-bold text-[14px] text-[#009cde]">Pal</span>
          </div>
        </label>
      </div>

      {/* Terms Checkbox */}
      <div className="border-t border-[#e5e7eb] pt-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-[#d1d5db] text-[#00a792] focus:ring-[#00a792]"
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
        className="w-full h-[48px] rounded-full bg-[#00a792] hover:bg-[#008577] disabled:bg-[#9ca3af] text-white font-poppins font-medium text-[14px]"
      >
        <Lock className="w-4 h-4 mr-2" />
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
  )
}
