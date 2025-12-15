"use client"

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react"
import Link from "next/link"
import Image from "next/image"

interface RegisterOTPStepProps {
  email: string
  onVerify: (otp: string) => void
  onResend: () => void
  isLoading?: boolean
}

export function RegisterOTPStep({ email, onVerify, onResend, isLoading = false }: RegisterOTPStepProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 4) {
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
    const pastedData = e.clipboardData.getData("text").slice(0, 5)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split("").forEach((char, index) => {
      if (index < 5) newOtp[index] = char
    })
    setOtp(newOtp)

    const lastIndex = Math.min(pastedData.length - 1, 4)
    inputRefs.current[lastIndex]?.focus()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join("")
    if (otpString.length === 5) {
      onVerify(otpString)
    }
  }

  const isComplete = otp.every(digit => digit !== "")

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-[540px]">
      <div className="flex justify-center mb-4">
        <Link href="/">
          <Image
            src="/lato-logo.png"
            alt="Lato"
            width={120}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
      </div>

      <h2 className="text-center text-2xl font-semibold text-[#1C1B1F] mb-2">
        Verify Account
      </h2>

      <p className="text-center text-sm text-[#6B7280] mb-8">
        We have send a 5 digit pin codes to{" "}
        <span className="text-[#00A699]">{email}</span>. Please enter the code below
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-14 h-14 text-center text-xl font-semibold border-2 border-dashed border-[#D1D5DB] rounded-xl text-[#1C1B1F] focus:outline-none focus:border-[#00A699] focus:border-solid transition-colors"
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isComplete || isLoading}
          className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <p className="text-center text-sm text-[#6B7280] mt-6">
        Did not get the code? please check your spam male folder{" "}
        <br />
        or{" "}
        <button
          type="button"
          onClick={onResend}
          className="text-[#00A699] hover:underline font-medium"
          disabled={isLoading}
        >
          Resend again
        </button>
      </p>
    </div>
  )
}

export default RegisterOTPStep
