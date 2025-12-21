"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ContactExpertsProps {
  onAskQuestion?: () => void
  onChatWithUs?: () => void
}

export function ContactExperts({
  onAskQuestion,
  onChatWithUs,
}: ContactExpertsProps) {
  return (
    <section className="py-10">
      <div className="rounded-2xl bg-[#7BBCB038] px-6 py-10 md:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-black mb-4">
              Contact Our Travel Experts
            </h2>

            <p className="text-black/80 leading-relaxed">
              Our team of experienced tour specialists have travelled to
              hundreds of countries around the globe and have decades of
              first-hand travel experience to share. Contact us now to have
              all of your tour-related questions answered!
            </p>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center gap-6">
            
            {/* Avatars */}
            <div className="flex items-center">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
              ].map((src, i) => (
                <div
                  key={i}
                  className="-ml-3 first:ml-0 rounded-full border-2 border-black"
                >
                  <Image
                    src={src}
                    alt="Travel expert"
                    width={48}
                    height={48}
                    className="rounded-full object-cover size-16"
                  />
                </div>
              ))}
            </div>

            <span className="text-black items-start">
              24/7 Support
            </span>

            {/* Buttons */}
            <div className="amplification flex flex-col gap-3">
              <Button
                onClick={onAskQuestion}
                className="rounded-full bg-[#00A88E] px-6 text-white hover:bg-[#00927b]"
              >
                Ask a question
              </Button>

              <Button
                variant="outline"
                onClick={onChatWithUs}
                className="rounded-full border-black px-6 text-black hover:bg-black hover:text-white"
              >
                Chat with us
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
