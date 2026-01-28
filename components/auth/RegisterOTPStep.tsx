"use client"

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface RegisterOTPStepProps {
  email: string
  onVerify: (otp: string) => void
  onResend: () => Promise<void>
  isLoading?: boolean
}

// Supabase uses 6-character OTP tokens by default
const OTP_LENGTH = 6

export function RegisterOTPStep({ email, onVerify, onResend, isLoading = false }: RegisterOTPStepProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    // Allow alphanumeric characters (Supabase OTP can be alphanumeric)
    if (value && !/^[a-zA-Z0-9]$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.toUpperCase()
    setOtp(newOtp)

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\s/g, '').slice(0, OTP_LENGTH)
    if (!/^[a-zA-Z0-9]+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, index) => {
      if (index < OTP_LENGTH) newOtp[index] = char.toUpperCase()
    })
    setOtp(newOtp)

    const lastIndex = Math.min(pastedData.length - 1, OTP_LENGTH - 1)
    inputRefs.current[lastIndex]?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length === OTP_LENGTH) {
      onVerify(otpString)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      await onResend()
    } finally {
      setIsResending(false)
    }
  }

  const isComplete = otp.every(digit => digit !== "")

  return (
    <div className="bg-white rounded-[10.5px] md:rounded-[20px] shadow-2xl px-[70px] py-5 md:px-[125px] md:py-[68px] w-full max-w-[357px] md:max-w-[719px] mx-auto">
      <div className="flex flex-col items-center gap-[25px] md:gap-[25px] w-full">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-[16px] md:gap-[25px] w-full">
          <div className="flex flex-col items-center gap-[16px] md:gap-[25px]">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/lato-logo.png"
                alt="Lato"
                width={117}
                height={45}
                className="h-[29px] md:h-[45px] w-auto"
              />
            </Link>

            {/* Title */}
            <h2 className="text-center text-[19.6px] md:text-[30px] font-normal text-black leading-[16px] md:leading-[24px]">
              Verify Account
            </h2>
          </div>

          {/* Description */}
          <p className="text-center text-[10.5px] md:text-[16px] font-normal text-black leading-normal w-full">
            We have sent a 6 digit code to{" "}
            <span className="text-[#00A792]">{email}</span>. Please enter the code below
          </p>
        </div>

        {/* OTP Input and Button */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[15px] md:gap-[15px] w-full">
          {/* OTP Input Boxes - 6 boxes for Supabase OTP */}
          <div className="flex justify-center gap-[6px] md:gap-[10px] w-full">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-[42px] h-[50px] md:w-[60px] md:h-[77px] text-center text-[18px] md:text-[24px] font-semibold border border-[#D8DADC] rounded-[9.8px] md:rounded-[15px] text-black focus:outline-none focus:border-[#00A792] transition-colors uppercase"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={!isComplete || isLoading}
            className="w-[264px] md:w-[404px] h-[32.7px] md:h-[50px] bg-[#00A792] hover:bg-[#008F7A] text-white font-semibold text-[9.15px] md:text-[14px] rounded-[30px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        {/* Resend Text */}
        <p className="text-center text-[9.15px] md:text-[14px] font-normal text-black leading-normal w-[269px] md:w-[412px]">
          Did not get the code? please check your spam male folder or{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading || isResending}
            className="text-[#00A792] hover:underline disabled:opacity-50"
          >
            {isResending ? "Sending..." : "Resent again."}
          </button>
        </p>
      </div>
    </div>
  )
}

export default RegisterOTPStep
