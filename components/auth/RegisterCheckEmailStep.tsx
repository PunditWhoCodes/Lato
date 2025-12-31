"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Loader2 } from "lucide-react"
import { useState } from "react"

interface RegisterCheckEmailStepProps {
  email: string
  onResend: () => Promise<void>
  onChangeEmail: () => void
}

export function RegisterCheckEmailStep({
  email,
  onResend,
  onChangeEmail,
}: RegisterCheckEmailStepProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  const handleResend = async () => {
    setIsResending(true)
    setResendMessage(null)
    try {
      await onResend()
      setResendMessage("Verification email sent!")
    } catch {
      setResendMessage("Failed to resend. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // Mask email for display (show first 3 chars and domain)
  const maskedEmail = email.length > 3
    ? `${email.slice(0, 3)}***@${email.split("@")[1]}`
    : email

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-[540px]">
      <div className="flex justify-center mb-6">
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

      {/* Email Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#E6F7F5] rounded-full flex items-center justify-center">
          <Mail className="w-10 h-10 text-[#00A699]" />
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold text-[#1C1B1F] mb-3">
        Check your email
      </h2>

      <p className="text-center text-[#6B7280] mb-2">
        We&apos;ve sent a verification link to
      </p>

      <p className="text-center text-[#1C1B1F] font-medium mb-6">
        {maskedEmail}
      </p>

      <div className="bg-[#F9FAFB] rounded-xl p-4 mb-6">
        <p className="text-sm text-[#6B7280] text-center">
          Click the link in the email to verify your account.
          If you don&apos;t see it, check your spam folder.
        </p>
      </div>

      {/* Resend Message */}
      {resendMessage && (
        <p className={`text-center text-sm mb-4 ${
          resendMessage.includes("sent") ? "text-[#00A699]" : "text-red-500"
        }`}>
          {resendMessage}
        </p>
      )}

      {/* Resend Button */}
      <button
        onClick={handleResend}
        disabled={isResending}
        className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
      >
        {isResending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          "Resend verification email"
        )}
      </button>

      {/* Change Email Link */}
      <p className="text-center text-sm text-[#6B7280]">
        Wrong email?{" "}
        <button
          onClick={onChangeEmail}
          className="text-[#00A699] font-medium hover:underline"
        >
          Change email address
        </button>
      </p>
    </div>
  )
}

export default RegisterCheckEmailStep
