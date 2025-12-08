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
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-4xl md:rounded-[40px] p-8 md:p-12 lg:p-16 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #1BA098 0%, #17BAA4 100%)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              <h2 className="font-poppins font-normal text-3xl md:text-4xl lg:text-[48px] lg:leading-[60px] text-white mb-4 md:mb-6">
                Subscribe to our Newsletter
              </h2>
              <p className="font-poppins font-light text-base md:text-lg lg:text-[18px] lg:leading-7 text-white/95">
                Subscribe for Updates: Stay informed about the latest investor updates, financial results, and announcements by subscribing to our newsletter.
              </p>
            </div>

            {/* Right Side - Form */}
            <div>
              {isSubscribed ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <p className="text-white font-poppins font-semibold text-lg">
                    Thank you for subscribing! Check your email for confirmation.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-poppins font-normal text-base md:text-lg text-white mb-4">
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
                        className="w-full pl-6 pr-32 md:pr-36 py-4 md:py-5 rounded-full border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/50 font-poppins text-base"
                        style={{
                          backdropFilter: 'blur(10px)',
                        }}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-[#1BA098] hover:bg-white/95 rounded-tl-none rounded-tr-full rounded-br-full rounded-bl-none px-6 md:px-8 py-2.5 md:py-5 font-poppins font-semibold text-sm md:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
