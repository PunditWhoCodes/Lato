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
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - Figma: 350x366, rounded-20px, centered content */}
        <div className="md:hidden bg-[#00A792] rounded-[20px] px-[57px] py-[84px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center w-[236px]">
            {/* Title - Figma: 23.294px, leading ~35px, Poppins Light */}
            <h2 className="font-poppins font-light text-[23px] leading-[35px] text-white mb-[6px]">
              Subscribe to our Newsletter
            </h2>

            {/* Description - Figma: 8.735px, Poppins Regular, #ECECEC */}
            <p className="font-poppins font-normal text-[9px] leading-[150%] text-[#ECECEC] mb-0">
              Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter.
            </p>

            {isSubscribed ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left w-full mt-5">
                <p className="text-white font-poppins font-semibold text-[10px]">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <div className="w-[204px] mt-0">
                {/* Stay up to date - Figma: 6.582px, Poppins Regular, #ECECEC */}
                <p className="font-poppins font-normal text-[7px] leading-[150%] text-[#ECECEC] mb-[17px] text-left">
                  Stay up to date
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Input Row - Figma: 21.721px height, rounded-[10px] */}
                  <div className="flex items-stretch mb-[7px] h-[22px]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-[10px] py-2 bg-white/10 text-white placeholder:text-white/70 text-[6px] font-inter rounded-l-[10px] border-0 outline-none focus:ring-1 focus:ring-white/30"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-white text-[#00A792] font-inter font-bold text-[5px] px-[10px] rounded-r-[10px] hover:bg-white/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isSubmitting ? "..." : "Subscribe"}
                    </button>
                  </div>

                  {/* Privacy text - Figma: 6.582px, Poppins Regular, #ECECEC */}
                  <p className="font-poppins font-normal text-[7px] leading-[150%] text-[#ECECEC] text-left">
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
