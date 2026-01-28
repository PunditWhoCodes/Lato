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
    <div className="bg-white rounded-[10.5px] md:rounded-[20px] shadow-2xl px-[70px] py-8 md:px-[125px] md:py-[68px] w-full max-w-[357px] md:max-w-[719px] mx-auto">
      <div className="flex flex-col items-center gap-[25px]">
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

        {/* Success Icon and Message */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#E6F7F5] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#00A792]" />
          </div>
          <h2 className="text-center text-[19.6px] md:text-[30px] font-normal text-black">
            Email Verified
          </h2>
        </div>

        {!autoRedirect && onContinue && (
          <button
            onClick={onContinue}
            className="w-[264px] md:w-[404px] h-[32.7px] md:h-[50px] bg-[#00A792] hover:bg-[#008F7A] text-white font-semibold text-[9.15px] md:text-[14px] rounded-[30px] transition-colors"
          >
            Continue
          </button>
        )}

        {autoRedirect && (
          <p className="text-center text-[9.15px] md:text-[14px] text-black">
            Redirecting you shortly...
          </p>
        )}
      </div>
    </div>
  )
}

export default RegisterVerifiedStep
