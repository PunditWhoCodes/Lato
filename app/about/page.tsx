"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/home/how-it-works"
import { ChevronRight } from "lucide-react"

const teamMembers = [
  { name: "Jessica Dobrev", role: "Customer success lead", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdpcmx8ZW58MHx8MHx8fDA%3D" },
  { name: "Michael Chen", role: "Travel experience director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D" },
  { name: "Sarah Williams", role: "Customer success lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop" },
  { name: "David Martinez", role: "Operations manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Emily Johnson", role: "Marketing specialist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
]

const values = [
  {
    title: "Customer First",
    description: "Every journey is designed around real needs, real comfort, and real expectations.",
    position: "tl",
  },
  {
    title: "Trust & Transparency",
    description: "Honest guidance, clear communication, no surprises.",
    position: "tr",
  },
  {
    title: "Quality Experiences",
    description: "We focus on meaningful travel, not just ticking destinations off a list.",
    position: "bl",
  },
  {
    title: "Attention to Detail",
    description: "From planning to return, nothing is rushed or overlooked.",
    position: "br",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />

      {/* Breadcrumb + Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-6 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-[14px] mb-6">
          <Link href="/" className="font-poppins text-[#686869] hover:underline">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#686869]/40" />
          <span className="font-poppins text-[#00A792]">About Us</span>
        </div>

        {/* Hero with Background Image */}
        <div className="relative h-[506px] lg:h-[506px] rounded-[30px] lg:rounded-[30px] overflow-hidden">
          <Image
            src="/destinations/italy.jpg"
            alt="About Us Hero"
            fill
            className="object-cover"
            priority
          />

          {/* Glass Card in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="backdrop-blur-[20px] lg:backdrop-blur-[20px] bg-white/80 rounded-[30px] lg:rounded-[30px] px-[22px] py-[32px] lg:px-[22px] lg:py-[32px] w-[292px] lg:w-[492px] h-[140px] lg:h-[140px] flex items-center justify-center">
              <h1 className="font-poppins font-normal text-[30px] lg:text-[50px] text-black leading-[150%] lg:leading-[1.498]">
                About Us
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Our Origin Section */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
            {/* Left - Title */}
            <div className="lg:w-2/4 shrink-0">
              <h2 className="font-poppins font-normal text-[20px] lg:text-[35px] leading-none text-black">
                Our Origin
              </h2>
            </div>

            {/* Right - Description */}
            <div className="">
              <p className="font-poppins font-light text-[10px] lg:text-[13px] leading-[150%] text-black">
                Explore stunning destinations, unique experience, The Tripadvisor Group connects people to experiences worth sharing, and aims to be the world&apos;s most trusted source for travel and experiences. We leverage our brands, technology, and capabilities to connect our global audience with partners through rich content, travel guidance, and two-sided marketplaces for experiences, accommodations, restaurants, and other travel categories. The subsidiaries of Tripadvisor, Inc. (Nasdaq: TRIP), include a portfolio of travel brands and businesses, including Tripadvisor, Viator, and TheFork and unforgettable journey with Lato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Lato Section - White Background */}
      <section className="bg-white py-6 lg:py-[28px]">
        <div className="max-w-7xl mx-auto px-4 lg:px-[74px]">
          {/* Section Header */}
          <div className="flex flex-col gap-[22px] lg:gap-[22px] mb-6 lg:mb-0">
            <p className="font-poppins font-light text-[10px] lg:text-[12px] leading-[150%] text-black">
              About
            </p>
            <h2 className="font-poppins font-light text-[28px] lg:text-[37px] leading-[55px] text-black">
              What is Lato
            </h2>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-6 lg:mt-[24px]">
            {/* Left - Text Content */}
            <div className="lg:w-[540px] flex-shrink-0">
              <div className="flex flex-col gap-[29px] lg:gap-[29px]">
                <p className="font-poppins font-light text-[12px] lg:text-[13px] leading-[150%] text-black">
                  Explore stunning destinations, unique experience, The Tripadvisor Group connects people to experiences worth sharing, and aims to be the world&apos;s most trusted source for travel and experiences. We leverage our brands, technology, and capabilities to connect our global audience with partners through rich content, travel guidance, and two-sided marketplaces for experiences, accommodations, restaurants, and other travel categories. The subsidiaries of Tripadvisor, Inc. (Nasdaq: TRIP), include a portfolio of travel brands and businesses, including Tripadvisor, Viator, and TheFork and unforgettable journey with Lato.
                </p>
                <p className="font-poppins font-light text-[12px] lg:text-[13px] leading-[150%] text-black">
                  Explore stunning destinations, unique experience, The Tripadvisor Group connects people to experiences worth sharing, and aims to be the world&apos;s most trusted source for travel and experiences.
                </p>
              </div>
            </div>

            {/* Right - Image - Figma mobile: 363px x 538px */}
            <div className="lg:flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[363px] h-[538px] lg:h-[257px] lg:w-[477px] overflow-hidden bg-[#D9D9D9]">
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

      {/* How It Works Section - Import from home component */}
      <HowItWorks />

      {/* Our Values Section - Teal Background */}
      <section className="bg-[#00A792] py-12 lg:py-[93px]">
        <div className="max-w-7xl mx-auto px-4 lg:px-[111px]">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-[70px]">
            {/* Left - Tagline (appears at bottom on mobile, left side on desktop) */}
            <div className="lg:w-[502px] lg:self-end lg:pb-0">
              <div className="flex flex-col gap-[22px] lg:gap-[22px]">
                <p className="font-poppins font-light text-[10px] lg:text-[12px] leading-[150%] text-white">
                  Our Values
                </p>
                <h2 className="font-poppins font-light text-[28px] lg:text-[37px] leading-[55px] text-white">
                  Travel, Done Right,<br />
                  Built on care, trust, and<br />
                  experiences that stay with<br />
                  you long after the trip ends.
                </h2>
              </div>
            </div>

            {/* Right - Values Grid */}
            <div className="lg:flex-1 flex lg:justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[26px] lg:gap-x-[13px] lg:gap-y-[32px] w-full lg:w-[613px]">
                {values.map((value, index) => {
                  // Different border-radius for each position
                  const radiusClass =
                    value.position === "tl" ? "rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[13px] rounded-br-0" :
                    value.position === "tr" ? "rounded-tl-[13px] rounded-tr-[13px] rounded-bl-0 rounded-br-[13px]" :
                    value.position === "bl" ? "rounded-tl-[13px] rounded-tr-0 rounded-bl-[13px] rounded-br-[13px]" :
                    "rounded-tl-0 rounded-tr-[13px] rounded-bl-[13px] rounded-br-[13px]"

                  return (
                    <div
                      key={index}
                      className={`bg-white/[0.08] ${radiusClass} px-[16px] lg:px-[16px] py-[27px] lg:py-[27px] w-full lg:w-[300px] h-auto lg:h-[145px] flex flex-col justify-center`}
                    >
                      <h3 className="font-poppins font-medium text-[16px] lg:text-[18px] leading-[150%] text-white mb-[53px] lg:mb-[53px]">
                        {value.title}
                      </h3>
                      <p className="font-poppins font-light text-[10px] lg:text-[12px] leading-[150%] text-white">
                        {value.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-[#F7F7F7] py-10 lg:py-[75px]">
        <div className="max-w-7xl mx-auto px-4 lg:px-[114px]">
          {/* Section Header */}
          <div className="flex flex-col gap-[22px] lg:gap-[22px] mb-8 lg:mb-[30px]">
            <p className="font-poppins font-light text-[10px] lg:text-[12px] leading-[150%] text-black">
              About
            </p>
            <h2 className="font-poppins font-light text-[28px] lg:text-[37px] leading-[55px] text-black">
              Our Team
            </h2>
          </div>

          {/* Team Cards - 5 cards in a row on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-[22px]">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative w-full lg:w-[202px] h-[200px] lg:h-[259px] rounded-[7px] overflow-hidden">
                {/* Background Image with Hue Effect */}
                <div className="absolute inset-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/[0.93] mix-blend-hue" />
                </div>

                {/* Name Card */}
                <div className="absolute bottom-[13px] lg:bottom-[13px] left-[13px] lg:left-[13px] right-[13px] lg:right-auto bg-white rounded-[7px] lg:w-[175px] h-auto lg:h-[64px] px-[17px] lg:px-[17px] py-[16px] lg:py-[16px] flex flex-col items-center justify-center">
                  <h3 className="font-poppins font-medium text-[10px] lg:text-[13px] leading-[150%] text-black">
                    {member.name}
                  </h3>
                  <p className="font-poppins font-light text-[8px] lg:text-[11px] leading-[150%] text-[#999] text-center">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
