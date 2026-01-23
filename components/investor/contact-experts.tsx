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
    <section className="py-[14px] lg:py-10">
      <div className="rounded-[9px] lg:rounded-2xl bg-[#7BBCB038] px-[18px] py-[28px] lg:px-12 lg:py-10">
        <div className="flex flex-col gap-[28px] lg:gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Left Content */}
          <div className="lg:max-w-xl">
            <h2 className="font-poppins font-semibold text-[14px] lg:text-3xl text-black mb-[9px] lg:mb-4">
              Contact Our Travel Experts
            </h2>

            <p className="font-poppins text-[9px] lg:text-base text-black/80 leading-[1.5] lg:leading-relaxed">
              Our team of experienced tour specialists have travelled to
              hundreds of countries around the globe and have decades of
              first-hand travel experience to share. Contact us now to have
              all of your tour-related questions answered!
            </p>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center gap-[14px] lg:gap-6">

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
                  className="-ml-[8px] lg:-ml-3 first:ml-0 rounded-full border-[1.4px] lg:border-2 border-black"
                >
                  <Image
                    src={src}
                    alt="Travel expert"
                    width={48}
                    height={48}
                    className="rounded-full object-cover w-[36px] h-[36px] lg:size-16"
                  />
                </div>
              ))}
            </div>

            <span className="font-poppins text-[10px] lg:text-base text-black">
              24/7 Support
            </span>

            {/* Buttons */}
            <div className="flex flex-col gap-[9px] lg:gap-3 w-full max-w-[200px]">
              <Button
                onClick={onAskQuestion}
                className="rounded-full bg-[#00A88E] h-[32px] lg:h-10 text-[10px] lg:text-sm px-[18px] lg:px-6 text-white hover:bg-[#00927b]"
              >
                Ask a question
              </Button>

              <Button
                variant="outline"
                onClick={onChatWithUs}
                className="rounded-full border-black h-[32px] lg:h-10 text-[10px] lg:text-sm px-[18px] lg:px-6 text-black hover:bg-black hover:text-white"
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
