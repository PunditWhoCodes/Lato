"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronLeft, ChevronDown, Loader2, Menu } from "lucide-react"
import { RegisterOTPStep } from "@/components/auth/RegisterOTPStep"
import { RegisterSelectTypeStep, UserType } from "@/components/auth/RegisterSelectTypeStep"
import { RegisterVerifiedStep } from "@/components/auth/RegisterVerifiedStep"
import { RegisterCheckEmailStep } from "@/components/auth/RegisterCheckEmailStep"
import { useAuth } from "@/lib/hooks/useAuth"
import { signInWithGoogle, signInWithApple, resendVerificationEmail, verifyOTP, resendOTP } from "@/lib/api/auth"

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
  const [country, setCountry] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [localLoading, setLocalLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const selectedCountry = country ? countries.find(c => c.name === country) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    clearError()

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      setLocalError("Please enter a valid email address")
      return
    }

    if (!country) {
      setLocalError("Please select a country")
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
      // Registration successful - show OTP verification step
      setCurrentStep("otp")
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

  const handleOTPVerify = async (otp: string) => {
    setLocalError(null)
    setLocalLoading(true)
    try {
      const response = await verifyOTP(email, otp)
      // Store tokens and user in auth state
      if (response.tokens && response.user) {
        // Update auth store with verified user
        localStorage.setItem("accessToken", response.tokens.accessToken)
        localStorage.setItem("refreshToken", response.tokens.refreshToken)
      }
      setCurrentStep("verified")
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Invalid OTP. Please try again.")
    } finally {
      setLocalLoading(false)
    }
  }

  const handleOTPResend = async () => {
    setLocalError(null)
    try {
      await resendOTP(email)
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Failed to resend verification code")
    }
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
          <>
            {displayError && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 max-w-[357px] md:max-w-[540px] w-full px-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                  {displayError}
                </div>
              </div>
            )}
            <RegisterOTPStep
              email={email}
              onVerify={handleOTPVerify}
              onResend={handleOTPResend}
              isLoading={showLoading}
            />
          </>
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
          <div className="bg-white rounded-[10.5px] md:rounded-3xl shadow-2xl px-[27px] py-5 md:p-8 lg:p-10 w-full max-w-[357px] md:max-w-[540px] mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-4 md:mb-6">
              <Link href="/">
                <Image
                  src="/lato-logo.png"
                  alt="Lato"
                  width={71}
                  height={27}
                  className="h-[27px] md:h-12 w-auto"
                />
              </Link>
            </div>

            {/* Title */}
            <h2 className="text-center text-[18px] md:text-2xl lg:text-3xl font-normal text-black mb-4 md:mb-6">
              Create Account
            </h2>

            {/* Error Message */}
            {displayError && (
              <div className="mb-4 p-2 md:p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[9px] md:text-sm">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-[9px] md:gap-4 max-w-[284px] md:max-w-full mx-auto">
              {/* Name Field */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full px-[14px] md:px-6 py-[6px] md:py-3 h-[27px] md:h-auto border border-[#D9D9D9] rounded-[17px] md:rounded-full text-[10px] md:text-base text-black placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A792] transition-colors"
                  required
                  disabled={showLoading}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-[14px] md:px-6 py-[6px] md:py-3 h-[27px] md:h-auto border border-[#D9D9D9] rounded-[17px] md:rounded-full text-[10px] md:text-base text-black placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A792] transition-colors"
                  required
                  disabled={showLoading}
                />
              </div>

              {/* Country Dropdown */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">Select Country</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    disabled={showLoading}
                    className="w-full px-3.5 md:px-6 py-1.5 md:py-3 h-[27px] md:h-auto border border-[#D9D9D9] rounded-[28px] md:rounded-full text-[10px] md:text-base text-black text-left flex items-center justify-between focus:outline-none focus:border-[#00A792] transition-colors disabled:opacity-50"
                  >
                    <span className={country ? '' : 'text-[#D9D9D9]'}>
                      {country || "Select Country"}
                    </span>
                    <ChevronDown className={`w-3 h-3 md:w-5 md:h-5 text-black transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showCountryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#D9D9D9] rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCountry(c.name)
                            setShowCountryDropdown(false)
                          }}
                          className="w-full px-4 py-2 text-left text-[10px] md:text-sm text-black hover:bg-[#F9FAFB] transition-colors"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Number Field */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Mobile number (Optional)"
                  className="w-full px-[14px] md:px-6 py-[6px] md:py-3 h-[27px] md:h-auto border border-[#D9D9D9] rounded-[17px] md:rounded-full text-[10px] md:text-base text-black placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A792] transition-colors"
                  disabled={showLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[10px] md:text-sm text-black mb-1 md:mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-[14px] md:px-6 py-[6px] md:py-3 h-[27px] md:h-auto border border-[#D9D9D9] rounded-[17px] md:rounded-full text-[10px] md:text-base text-black placeholder:text-[#D9D9D9] focus:outline-none focus:border-[#00A792] transition-colors pr-10"
                    required
                    minLength={6}
                    disabled={showLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5 md:w-5 md:h-5" /> : <Eye className="w-3.5 h-3.5 md:w-5 md:h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-[3px] md:gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  disabled={showLoading}
                  className={`w-[9px] h-[10px] md:w-4 md:h-4 border border-black rounded-[2px] md:rounded flex items-center justify-center shrink-0 cursor-pointer ${
                    acceptTerms ? "bg-[#00A792] border-[#00A792]" : "bg-white"
                  }`}
                >
                  {acceptTerms && (
                    <svg
                      className="w-2 h-2 md:w-3 md:h-3 text-white"
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
                  className="text-[9px] md:text-sm text-black leading-tight cursor-pointer"
                  onClick={() => !showLoading && setAcceptTerms(!acceptTerms)}
                >
                  By proceeding, you accept our{" "}
                  <Link href="/terms" className="text-[#00A792] hover:underline" onClick={(e) => e.stopPropagation()}>Terms of Use</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#00A792] hover:underline" onClick={(e) => e.stopPropagation()}>Data Policy</Link>
                </span>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={showLoading}
                className="w-full max-w-[245px] md:max-w-full mx-auto bg-[#00A792] hover:bg-[#008F84] text-white font-semibold py-[7px] md:py-3.5 h-[30px] md:h-auto text-[8.5px] md:text-base rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
              >
                {showLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 md:w-5 md:h-5 animate-spin" />
                    <span className="hidden md:inline">Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 md:gap-4 my-4 md:my-6">
              <div className="flex-1 h-px bg-[#D9D9D9]" />
              <span className="text-[8.5px] md:text-sm text-black px-1.5 bg-white">or</span>
              <div className="flex-1 h-px bg-[#D9D9D9]" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col gap-2 md:gap-3 max-w-[289px] md:max-w-full mx-auto">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={showLoading}
                className="w-full flex items-center justify-center gap-[6px] md:gap-3 px-3 md:px-5 py-[2px] md:py-3 h-[29px] md:h-[50px] border border-[#D9D9D9] rounded-[20px] md:rounded-full hover:bg-[#F9FAFB] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-[14px] h-[14px] md:w-6 md:h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[9.25px] md:text-base font-medium text-black">Sign in with Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignIn}
                disabled={showLoading}
                className="w-full flex items-center justify-center gap-[6px] md:gap-3 px-3 md:px-5 py-[2px] md:py-3 h-[29px] md:h-[50px] border border-[#D9D9D9] rounded-[20px] md:rounded-full hover:bg-[#F9FAFB] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-[14px] h-[14px] md:w-6 md:h-6" viewBox="0 0 24 24" fill="#000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="text-[9.25px] md:text-base font-medium text-black">Sign in with Apple</span>
              </button>
            </div>
          </div>
        )
    }
  }

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
        onClick={handleBack}
        className="absolute top-[78px] left-4 md:top-8 md:left-8 z-20 w-[38px] h-[37px] md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors touch-manipulation cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white pointer-events-none" />
      </button>

      {/* Location Badge - Hidden on mobile */}
      <div className="hidden md:block absolute bottom-6 right-6 z-10">
        <span className="text-white text-2xl font-medium">Thailand</span>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 pt-12 md:pt-0 px-4 py-8">
        {renderStepContent()}
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
