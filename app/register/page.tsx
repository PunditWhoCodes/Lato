"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronLeft, ChevronDown, Loader2 } from "lucide-react"
import { RegisterOTPStep } from "@/components/auth/RegisterOTPStep"
import { RegisterSelectTypeStep, UserType } from "@/components/auth/RegisterSelectTypeStep"
import { RegisterVerifiedStep } from "@/components/auth/RegisterVerifiedStep"
import { RegisterCheckEmailStep } from "@/components/auth/RegisterCheckEmailStep"
import { useAuth } from "@/lib/hooks/useAuth"
import { signInWithGoogle, signInWithApple, resendVerificationEmail } from "@/lib/api/auth"

type RegistrationStep = "form" | "otp" | "select_type" | "check_email" | "verified"

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const countries = [
  { code: "GR", name: "Greece", dialCode: "+30" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "IT", name: "Italy", dialCode: "+39" },
  { code: "ES", name: "Spain", dialCode: "+34" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "PE", name: "Peru", dialCode: "+51" },
]

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading, error, clearError } = useAuth()

  const [currentStep, setCurrentStep] = useState<RegistrationStep>("select_type")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("Greece")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [localLoading, setLocalLoading] = useState(false)

  const selectedCountry = countries.find(c => c.name === country) || countries[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    clearError()

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      setLocalError("Please enter a valid email address")
      return
    }

    if (!acceptTerms) {
      setLocalError("Please accept the Terms of Use and Data Policy")
      return
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }

    try {
      setLocalLoading(true)
      await register({
        email,
        password,
        name,
        role: userType === "tour_operator" ? "PROVIDER" : "TRAVELER",
      })
      // Registration successful - show check email step
      setCurrentStep("check_email")
    } catch (err) {
      // Handle specific error messages
      const errorMessage = err instanceof Error ? err.message : "Registration failed. Please try again."

      // Check for duplicate email error from Supabase
      if (errorMessage.toLowerCase().includes("already registered") ||
          errorMessage.toLowerCase().includes("already exists") ||
          errorMessage.toLowerCase().includes("duplicate") ||
          errorMessage.toLowerCase().includes("user already")) {
        setLocalError("An account with this email already exists. Please sign in or use a different email.")
      } else {
        setLocalError(errorMessage)
      }
    } finally {
      setLocalLoading(false)
    }
  }

  const handleOTPVerify = (otp: string) => {
    // OTP verification is handled by Supabase via email link
    // This is kept for UI flow compatibility
    setCurrentStep("verified")
  }

  const handleOTPResend = () => {
    // Resend verification email would be handled here
    alert("Verification email has been resent")
  }

  const handleResendVerificationEmail = async () => {
    // Use the proper Supabase resend API
    await resendVerificationEmail(email)
  }

  const handleChangeEmail = () => {
    // Go back to form to change email
    setCurrentStep("form")
  }

  const handleSelectType = (type: UserType) => {
    setUserType(type)
    setCurrentStep("form")
  }

  const handleVerificationComplete = () => {
    router.push("/")
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

  const handleBack = () => {
    switch (currentStep) {
      case "form":
        setCurrentStep("select_type")
        break
      case "otp":
        setCurrentStep("form")
        break
      case "check_email":
        setCurrentStep("form")
        break
      case "verified":
        break
      default:
        router.back()
    }
  }

  const displayError = localError || error
  const showLoading = localLoading || isLoading

  const renderStepContent = () => {
    switch (currentStep) {
      case "otp":
        return (
          <RegisterOTPStep
            email={email}
            onVerify={handleOTPVerify}
            onResend={handleOTPResend}
            isLoading={showLoading}
          />
        )

      case "select_type":
        return (
          <RegisterSelectTypeStep
            onSelect={handleSelectType}
            isLoading={showLoading}
          />
        )

      case "check_email":
        return (
          <RegisterCheckEmailStep
            email={email}
            onResend={handleResendVerificationEmail}
            onChangeEmail={handleChangeEmail}
          />
        )

      case "verified":
        return (
          <RegisterVerifiedStep
            onContinue={handleVerificationComplete}
            autoRedirect={true}
            redirectDelay={3000}
          />
        )

      default:
        return (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
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

            <h2 className="text-center text-2xl font-semibold text-[#1C1B1F] mb-6">
              Create Account
            </h2>

            {/* Error Message */}
            {displayError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#1C1B1F] mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A699] transition-colors"
                  required
                  disabled={showLoading}
                />
              </div>

              <div>
                <label className="block text-sm text-[#1C1B1F] mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A699] transition-colors"
                  required
                  disabled={showLoading}
                />
              </div>

              <div>
                <label className="block text-sm text-[#1C1B1F] mb-2">Select Country</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    disabled={showLoading}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] text-left flex items-center justify-between focus:outline-none focus:border-[#00A699] transition-colors disabled:opacity-50"
                  >
                    <span>{country}</span>
                    <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCountry(c.name)
                            setShowCountryDropdown(false)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-[#1C1B1F] hover:bg-[#F9FAFB] transition-colors"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#1C1B1F] mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile number (optional)"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A699] transition-colors"
                  disabled={showLoading}
                />
              </div>

              <div>
                <label className="block text-sm text-[#1C1B1F] mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min 6 characters)"
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#1C1B1F] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A699] transition-colors pr-12"
                    required
                    minLength={6}
                    disabled={showLoading}
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

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[#D1D5DB] text-[#00A699] focus:ring-[#00A699]"
                  disabled={showLoading}
                />
                <label htmlFor="terms" className="text-sm text-[#6B7280]">
                  By proceeding, you accept our{" "}
                  <Link href="/terms" className="text-[#00A699] hover:underline">Terms of Use</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#00A699] hover:underline">Data Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={showLoading}
                className="w-full bg-[#00A699] hover:bg-[#008F84] text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {showLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
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
                disabled={showLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-[#1C1B1F]">Sign up with Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={showLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-sm font-medium text-[#1C1B1F]">Sign up with Apple</span>
              </button>
            </div>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[#00A699] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-8">
      <div className="absolute inset-0 z-0">
        <Image
          src="/register-page-bg.jpg"
          alt="Thailand mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 right-6 z-10">
        <span className="text-white text-sm font-medium">Thailand</span>
      </div>

      <div className="relative z-10 w-full max-w-[540px] mx-4">
        {renderStepContent()}
      </div>
    </div>
  )
}
