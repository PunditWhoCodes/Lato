"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2, ChevronLeft, Menu } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { signInWithGoogle, signInWithApple } from "@/lib/api/auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading, error, clearError } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    clearError()

    if (!email || !password) {
      setLocalError("Please enter both email and password")
      return
    }

    try {
      await login({ email, password })
      const redirectTo = searchParams.get("redirect") || "/"
      router.push(redirectTo)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed. Please try again."
      setLocalError(errorMessage)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Failed to sign in with Google")
    }
  }

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple()
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Failed to sign in with Apple")
    }
  }

  const displayError = localError || error

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Mobile Header - Only visible on mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white px-4 py-3">
        <div className="flex items-center justify-between max-w-[304px] mx-auto">
          <Link href="/">
            <Image
              src="/lato-logo.png"
              alt="Lato"
              width={41}
              height={16}
              className="h-4 w-auto"
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

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

      {/* Back Button - Mobile positioning */}
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-[78px] left-4 md:top-8 md:left-8 z-20 w-[38px] h-[37px] md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors touch-manipulation cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white pointer-events-none" />
      </button>

      {/* Location Badge - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-6 right-6 z-10">
        <span className="text-white text-2xl font-medium">Iceland</span>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-12 md:pt-0 px-4">
        <div className="w-full max-w-[357px] md:max-w-[520px]">
          <div className="bg-white rounded-[10px] md:rounded-3xl shadow-2xl px-[22px] py-5 md:p-8 lg:p-12">
            {/* Logo */}
            <div className="flex justify-center mb-4 md:mb-6">
              <Link href="/">
                <Image
                  src="/lato-logo.png"
                  alt="Lato"
                  width={63}
                  height={24}
                  className="h-6 md:h-12 w-auto"
                />
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-center text-[15px] md:text-2xl lg:text-3xl font-normal text-black mb-5 md:mb-8">
              Welcome back!
            </h2>

            {/* Error Message */}
            {displayError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 md:px-6 py-1.5 md:py-3 h-[25px] md:h-auto border border-[#D9D9D9] rounded-full text-[10px] md:text-base text-black placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A792] transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-3 md:px-6 py-1.5 md:py-3 h-[25px] md:h-auto border border-[#D9D9D9] rounded-full text-[10px] md:text-base text-black placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A792] transition-colors pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox - Mobile */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-[10px] h-[10px] border border-black rounded-[2px] flex items-center justify-center cursor-pointer ${
                    rememberMe ? "bg-[#00A792] border-[#00A792]" : "bg-white"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      className="w-2 h-2 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className="text-[9px] text-black cursor-pointer"
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  Remember for 30 days
                </span>
              </div>

              {/* Forget Password Link - Desktop */}
              <div className="hidden md:block">
                <Link href="/forgot-password" className="text-sm text-[#00A792] hover:underline">
                  Forget Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00A792] hover:bg-[#008F84] text-white font-semibold py-1.5 md:py-3.5 h-[26px] md:h-auto text-[10px] md:text-base rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    <span className="hidden md:inline">Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 md:gap-4 my-4 md:my-6">
              <div className="flex-1 h-px bg-[#D9D9D9]" />
              <span className="text-[7px] md:text-sm text-black">or</span>
              <div className="flex-1 h-px bg-[#D9D9D9]" />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2 md:space-y-3">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-1.5 md:gap-3 px-3 md:px-5 py-0.5 md:py-3 h-[26px] md:h-[50px] border border-[#D9D9D9] rounded-full hover:bg-[#F9FAFB] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3 md:w-6 md:h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[8px] md:text-base font-medium text-black">
                  Sign in with Google
                </span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-1.5 md:gap-3 px-3 md:px-5 py-0.5 md:py-3 h-[26px] md:h-[50px] border border-[#D9D9D9] rounded-full hover:bg-[#F9FAFB] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-[8px] md:text-base font-medium text-black">
                  Sign in with Apple
                </span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-[7px] md:text-sm text-black mt-5 md:mt-6">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#00A792] font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="space-y-4">
              <Link
                href="/"
                className="block text-gray-800 hover:text-[#00A792]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/tours"
                className="block text-gray-800 hover:text-[#00A792]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tours
              </Link>
              <Link
                href="/about"
                className="block text-gray-800 hover:text-[#00A792]"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-gray-800 hover:text-[#00A792]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
