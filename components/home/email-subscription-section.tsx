"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

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
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-primary rounded-5xl p-8 md:p-12 text-center shadow-2xl">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
              Get Exclusive Travel Deals
            </h2>
            <p className="text-base md:text-lg font-poppins text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive the best travel offers, insider tips, and exclusive discounts straight to your inbox
            </p>
          </div>

          {isSubscribed ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-4xl p-6">
              <p className="text-white font-poppins font-semibold text-lg">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-4xl border-0 font-montserrat text-text-primary placeholder:text-text-light outline-none focus:ring-2 focus:ring-white"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-primary hover:bg-white/90 rounded-4xl px-8 py-4 font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-white/70 text-sm font-mulish mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
