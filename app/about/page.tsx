"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { HowItWorks } from "@/components/home/how-it-works"
import { ChevronRight } from "lucide-react"

const teamMembers = [
  { name: "Jessica Dobrev", role: "Co-Founder", image: "/destinations/italy.jpg" },
  { name: "Jessica Dobrev", role: "Co-Founder", image: "/destinations/spain.jpg" },
  { name: "Jessica Dobrev", role: "Co-Founder", image: "/destinations/thailand.jpg" },
  { name: "Jessica Dobrev", role: "Co-Founder", image: "/destinations/greece.jpg" },
  { name: "Jessica Dobrev", role: "Co-Founder", image: "/destinations/nepal.png" },
  { name: "Jessica Dobrev", role: "Co-Founder", image: "/destinations/london.jpg" },
]

const values = [
  {
    title: "Customer First",
    description: "Every journey is designed around real needs, real comfort, and real expectations.",
    variant: "teal",
  },
  {
    title: "Trust & Transparency",
    description: "Honest guidance, clear communication, no surprises.",
    variant: "teal",
  },
  {
    title: "Quality Experiences",
    description: "We focus on meaningful travel, not just ticking destinations off a list.",
    variant: "white",
  },
  {
    title: "Attention to Detail",
    description: "From planning to return, nothing is rushed or overlooked.",
    variant: "white",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-1 text-sm">
          <Link href="/" className="hover:underline opacity-80">Home</Link>
          <ChevronRight className="w-4 h-4 opacity-80" />
          <span className="text-[#00A699]">About Us</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[250px] md:h-80">
        <Image
          src="/destinations/italy.jpg"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-white">About Us</h1>
        </div>
      </section>

      {/* Our Origin Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
            <div className="lg:w-1/4 flex-shrink-0">
              <h2 className="text-3xl md:text-4xl font-normal text-[#1C1B1F]">
                Our Origin
              </h2>
            </div>
            <div className="lg:w-3/4">
              <p className="text-gray-600 text-[15px] leading-[1.8]">
                Explore stunning destinations, unique experiences. The Tripadvisor Group connects people to experiences worth sharing, and aims to be the world's most trusted source for travel and experiences. We leverage our brands, technology, and capabilities to connect our global audience with partners through rich content, travel guidance, and two-sided marketplaces for experiences, accommodations, restaurants, and other travel categories. The subsidiaries of Tripadvisor, Inc. (Nasdaq: TRIP), include a portfolio of travel brands and businesses, including Tripadvisor, Viator, and TheFork and unforgettable journey with Lato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-gray-200" />
      </div>

      {/* What is Lato Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <div className="lg:w-1/2">
              <p className="text-sm text-gray-500 mb-2">About</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1B1F] mb-5">
                What is Lato
              </h2>
              <div className="text-gray-600 text-[15px] leading-[1.8] space-y-4">
                <p>
                  Explore stunning destinations, unique experiences. The Tripadvisor Group connects people to experiences worth sharing, and aims to be the world's most trusted source for travel and experiences. We leverage our brands, technology, and capabilities to connect our global audience with partners through rich content, travel guidance, and two-sided marketplaces for experiences, accommodations, restaurants, and other travel categories. The subsidiaries of Tripadvisor, Inc. (Nasdaq: TRIP), include a portfolio of travel brands and businesses, including Tripadvisor, Viator, and TheFork and unforgettable journey with Lato.
                </p>
                <p>
                  Explore stunning destinations, unique experiences. The Tripadvisor Group connects people to experiences worth sharing, and aims to be the world's most trusted source for travel and experiences.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-[260px] md:h-[320px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="/destinations/greece.jpg"
                  alt="What is Lato"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Reusing existing component */}
      <HowItWorks />

      {/* Our Values Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left - Tagline */}
            <div className="lg:w-1/2">
              <p className="text-sm text-gray-500 mb-3">Our Values</p>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-light text-[#1C1B1F] leading-[1.4]">
                Travel, Done Right,<br />
                Built on care, trust, and<br />
                experiences that stay with<br />
                you long after the trip ends.
              </h2>
            </div>

            {/* Right - Cards Grid + Image */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${value.variant === "teal"
                        ? "bg-[#00A699]"
                        : "bg-white border border-gray-200"
                      }`}
                  >
                    <h3 className={`text-sm font-semibold mb-1.5 ${value.variant === "teal" ? "text-white" : "text-[#00A699]"
                      }`}>
                      {value.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${value.variant === "teal" ? "text-white/90" : "text-gray-600"
                      }`}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative h-[160px] md:h-[180px] rounded-xl overflow-hidden">
                <Image
                  src="/destinations/thailand.jpg"
                  alt="Our Values"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-2">About</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1C1B1F] mb-8">
            Our Team
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-[#1C1B1F] text-sm">{member.name}</h3>
                <p className="text-xs text-[#00A699]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
