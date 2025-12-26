"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
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
      // Error is handled by the store, but we can also show local error
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
        <span className="text-white text-sm font-medium">Iceland</span>
      </div>

      <div className="relative z-10 w-full max-w-[520px] mx-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
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

          <h2 className="text-center text-2xl font-semibold text-[#1C1B1F] mb-8">
            Welcome back!
          </h2>

          {/* Error Message */}
          {displayError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#1C1B1F] mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A699] transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm text-[#1C1B1F] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A699] transition-colors pr-12"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D1D5DB] text-[#00A699] focus:ring-[#00A699]"
                />
                <label htmlFor="remember" className="text-sm">
                  Remember for 30 days
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-[#00A699] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-sm text-[#9CA3AF]">or</span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-[#1C1B1F]">Sign in with Google</span>
            </button>

            <button
              type="button"
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm font-medium text-[#1C1B1F]">Sign in with Apple</span>
            </button>
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#00A699] font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
