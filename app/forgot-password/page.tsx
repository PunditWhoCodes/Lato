"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Loader2, CheckCircle } from "lucide-react"
import { forgotPassword } from "@/lib/api/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    try {
      setIsLoading(true)
      await forgotPassword({ email })
      setIsSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send reset email. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/logo-page-bg.jpg"
          alt="Iceland mountains with flowers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Top Left Back Button */}
      <Link
        href="/login"
        className="absolute top-8 left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </Link>

      {/* Location Badge */}
      <div className="absolute bottom-6 right-6 z-10">
        <span className="text-white text-2xl font-medium">Iceland</span>
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-[520px] mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
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

          {/* Title */}
          <h1 className="text-center text-2xl md:text-3xl font-normal text-black mb-10">
            Forget Password
          </h1>

          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-[#00A699]" />
              </div>
              <h2 className="text-xl font-medium text-[#1C1B1F] mb-2">
                Check your email
              </h2>
              <p className="text-[#6B7280] mb-6">
                We've sent a password reset link to <span className="font-medium text-[#1C1B1F]">{email}</span>
              </p>
              <p className="text-sm text-[#9CA3AF] mb-8">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-[#00A699] hover:underline"
                >
                  try again
                </button>
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-[#1C1B1F] hover:text-[#00A699] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            // Form State
            <>
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm text-[#1C1B1F] mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-3.5 border border-[#D9D9D9] rounded-full text-[#1C1B1F] placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A699] transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-semibold py-3.5 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              {/* Back to Login Link */}
              <div className="mt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-[#1C1B1F] hover:text-[#00A699] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
