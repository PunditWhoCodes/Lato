"use client"

import { useState } from "react"
import Link from "next/link"

export function EmailSubscriptionSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual subscription logic
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail("")
  }

  return (
    <section className="py-6 md:py-12 lg:py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto flex justify-center md:block">
        {/* Mobile Layout - Figma: 350x366, rounded-20px, centered content */}
        <div className="md:hidden bg-[#00A792] rounded-[20px] w-[350px] h-[366px] flex items-center justify-center">
          <div className="flex flex-col items-start w-[236px]">
            {/* Title & Description Container - gap 6.25px */}
            <div className="flex flex-col items-start gap-[6.25px] mb-[11px]">
              {/* Title - Figma: 23.294px, 35px line-height, 300 weight */}
              <h2 className="font-poppins font-light text-[23.29px] leading-[35px] text-white w-full">
                Subscribe to our Newsletter
              </h2>

              {/* Description - Figma: 8.735px, 150% line-height, 400 weight, #ECECEC */}
              <p className="font-poppins font-normal text-[8.74px] leading-[150%] text-[#ECECEC] w-[236px]">
                Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter.
              </p>
            </div>

            {isSubscribed ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left w-[204px]">
                <p className="text-white font-poppins font-semibold text-[10px]">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <div className="w-[204px] flex flex-col gap-[7.24px]">
                {/* Stay up to date - Figma: 6.582px, 150% line-height, #ECECEC */}
                <p className="font-poppins font-normal text-[6.58px] leading-[150%] text-[#ECECEC] text-left">
                  Stay up to date
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[7.24px]">
                  {/* Input Row - Figma: 203.55px x 21.72px */}
                  <div className="flex items-stretch h-[21.72px] w-[204px] rounded-[6.58px]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-[155px] px-[10.53px] py-[8.89px] bg-white/10 text-white placeholder:text-white text-[5.92px] font-inter rounded-l-[9.87px] border-0 outline-none focus:ring-1 focus:ring-white/30"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-[48px] bg-white text-[#00A792] font-inter font-bold text-[5.27px] px-[10.53px] rounded-r-[9.87px] hover:bg-white/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-[0px_3.29px_3.29px_rgba(16,137,255,0.1)]"
                    >
                      {isSubmitting ? "..." : "Subscribe"}
                    </button>
                  </div>

                  {/* Privacy text - Figma: 6.582px, 150% line-height, #ECECEC */}
                  <p className="font-poppins font-normal text-[6.58px] leading-[150%] text-[#ECECEC] text-left">
                    by subscribing you agree to our{" "}
                    <Link
                      href="/privacy-policy"
                      className="underline hover:text-white transition-colors"
                    >
                      Privacy and Policy
                    </Link>
                    .
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div
          className="hidden md:block rounded-[40px] p-12 lg:p-16 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #1BA098 0%, #17BAA4 100%)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <h2 className="font-poppins font-normal text-4xl lg:text-[48px] lg:leading-[60px] text-white mb-6">
                Subscribe to our Newsletter
              </h2>
              <p className="font-poppins font-light text-lg lg:text-[18px] lg:leading-7 text-white/95">
                Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter.
              </p>
            </div>

            {/* Right Side - Form */}
            <div>
              {isSubscribed ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-left">
                  <p className="text-white font-poppins font-semibold text-lg">
                    Thank you for subscribing! Check your email for confirmation.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-poppins font-normal text-lg text-white mb-4">
                    Stay up to date
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-6 pr-36 py-5 rounded-full border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/50 font-poppins text-base"
                        style={{
                          backdropFilter: 'blur(10px)',
                        }}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-[#1BA098] hover:bg-white/95 rounded-tl-none rounded-tr-full rounded-br-full rounded-bl-none px-8 py-5 font-poppins font-semibold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                      </button>
                    </div>
                    <p className="text-white/90 text-sm font-poppins">
                      by subscribing you agree to our{" "}
                      <Link
                        href="/privacy-policy"
                        className="underline hover:text-white transition-colors"
                      >
                        Privacy and Policy
                      </Link>
                      .
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
