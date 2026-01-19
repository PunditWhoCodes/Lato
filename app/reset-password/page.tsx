"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, CheckCircle, ChevronLeft } from "lucide-react"
import { resetPassword } from "@/lib/api/auth"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user has a valid recovery session from the email link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      // If there's a session from the recovery link, user can reset password
      if (session) {
        setIsValidSession(true)
      } else {
        // Try to get session from URL hash (Supabase PKCE flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const type = hashParams.get('type')

        if (accessToken && type === 'recovery') {
          setIsValidSession(true)
        } else {
          setIsValidSession(false)
        }
      }
    }

    checkSession()

    // Listen for auth state changes (when user clicks the recovery link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!password) {
      setError("Please enter a new password")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setIsLoading(true)
      await resetPassword({ newPassword: password, token: "" })
      setIsSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reset password. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while checking session
  if (isValidSession === null) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
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
        <div className="relative z-10">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      </div>
    )
  }

  // Show error if no valid session
  if (isValidSession === false) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
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

        <div className="absolute bottom-6 right-6 z-10">
          <span className="text-white text-2xl font-medium">Iceland</span>
        </div>

        <div className="relative z-10 w-full max-w-[520px] mx-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
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

            <h1 className="text-2xl font-medium text-[#1C1B1F] mb-4">
              Invalid or Expired Link
            </h1>
            <p className="text-[#6B7280] mb-8">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block w-full bg-[#00A699] hover:bg-[#008F84] text-white font-semibold py-3.5 rounded-full transition-colors text-center"
            >
              Request New Link
            </Link>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-[#1C1B1F] hover:text-[#00A699] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
            Reset Password
          </h1>

          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-[#00A699]" />
              </div>
              <h2 className="text-xl font-medium text-[#1C1B1F] mb-2">
                Password Reset Successful
              </h2>
              <p className="text-[#6B7280] mb-6">
                Your password has been reset successfully. You will be redirected to the login page.
              </p>
              <Link
                href="/login"
                className="inline-block w-full bg-[#00A699] hover:bg-[#008F84] text-white font-semibold py-3.5 rounded-full transition-colors text-center"
              >
                Go to Login
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password Field */}
                <div>
                  <label className="block text-sm text-[#1C1B1F] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-6 py-3.5 border border-[#D9D9D9] rounded-full text-[#1C1B1F] placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A699] transition-colors pr-12"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm text-[#1C1B1F] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-6 py-3.5 border border-[#D9D9D9] rounded-full text-[#1C1B1F] placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A699] transition-colors pr-12"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <p className="text-xs text-[#9CA3AF]">
                  Password must be at least 6 characters long
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-semibold py-3.5 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Resetting...
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
