"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

interface RegisterVerifiedStepProps {
  onContinue?: () => void
  autoRedirect?: boolean
  redirectDelay?: number
}

export function RegisterVerifiedStep({
  onContinue,
  autoRedirect = true,
  redirectDelay = 3000
}: RegisterVerifiedStepProps) {

  useEffect(() => {
    if (autoRedirect && onContinue) {
      const timer = setTimeout(() => {
        onContinue()
      }, redirectDelay)
      return () => clearTimeout(timer)
    }
  }, [autoRedirect, onContinue, redirectDelay])

  return (
    <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 w-full max-w-[400px]">
      <div className="flex justify-center mb-3">
        <Link href="/">
          <Image
            src="/lato-logo.png"
            alt="Lato"
            width={100}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2">
        <h2 className="text-center text-xl font-semibold text-[#1C1B1F]">
          Number Verified
        </h2>
        <CheckCircle2 className="w-5 h-5 text-[#00A699]" />
      </div>

      {!autoRedirect && onContinue && (
        <button
          onClick={onContinue}
          className="w-full mt-6 bg-[#00A699] hover:bg-[#008F84] text-white font-medium py-3 rounded-full transition-colors"
        >
          Continue
        </button>
      )}

      {autoRedirect && (
        <p className="text-center text-xs text-[#9CA3AF] mt-4">
          Redirecting you shortly...
        </p>
      )}
    </div>
  )
}

export default RegisterVerifiedStep
