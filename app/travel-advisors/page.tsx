"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronRight, ChevronDown, MapPin, Search } from "lucide-react"
import { useState } from "react"

// Sample advisor data
const advisors = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "8 Years Experience",
    image: "/destinations/italy.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "8 Years Experience",
    image: "/destinations/spain.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "8 Years Experience",
    image: "/destinations/thailand.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "12 Years Experience",
    image: "/destinations/greece.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "12 Years Experience",
    image: "/destinations/nepal.png",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "12 Years Experience",
    image: "/destinations/london.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 7,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "12 Years Experience",
    image: "/destinations/italy.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 8,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "12 Years Experience",
    image: "/destinations/spain.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
  {
    id: 9,
    name: "Sarah Jenkins",
    title: "Luxury Europe Specialist",
    experience: "12 Years Experience",
    image: "/destinations/thailand.jpg",
    tags: ["Italy", "Honeymoon", "Wine Tours"],
    description: "Specializing in slow travel across Italy and curated wine experiences. I design personalized itineraries that go beyond the tourist trail. My focus is on authentic places, local stories, and unforgettable journeys. Every trip is crafted to feel immersive, thoughtful, and distinctly yours.",
  },
]

// Advisor Card Component
function AdvisorCard({ advisor }: { advisor: typeof advisors[0] }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Profile Image */}
      <div className="relative w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full overflow-hidden mb-4 lg:mb-6">
        <Image
          src={advisor.image}
          alt={advisor.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="font-poppins font-semibold text-[18px] lg:text-[20px] text-[#1C1B1F] mb-1">
        {advisor.name}
      </h3>

      {/* Title */}
      <p className="font-poppins font-light text-[14px] lg:text-[15px] text-[#6B7280] mb-1">
        {advisor.title}
      </p>

      {/* Experience */}
      <div className="flex items-center gap-1 text-[12px] lg:text-[13px] text-[#6B7280] mb-4">
        <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
        <span className="font-poppins font-light">{advisor.experience}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-4 lg:mb-5">
        {advisor.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-[#00A792] text-[#00A792] font-poppins font-light text-[11px] lg:text-[12px]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="font-poppins font-light text-[12px] lg:text-[13px] text-[#6B7280] leading-[1.6] mb-4 lg:mb-6 max-w-[300px] lg:max-w-[320px]">
        {advisor.description}
      </p>

      {/* CTA Button */}
      <button className="px-5 lg:px-6 py-2 lg:py-2.5 bg-[#00A792] text-white rounded-full font-poppins font-light text-[13px] lg:text-[14px] hover:bg-[#008F7A] transition-colors">
        See my profile
      </button>
    </div>
  )
}

export default function TravelAdvisorsPage() {
  const [destinationOpen, setDestinationOpen] = useState(false)
  const [travelStyleOpen, setTravelStyleOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <div className="flex items-center gap-1 text-[14px]">
          <Link href="/" className="font-poppins text-[#686869] hover:underline">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#686869]/40" />
          <span className="font-poppins text-[#00A792]">Our Travel Advisors</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-6 lg:pt-8 pb-8 lg:pb-12">
        <div className="relative h-[350px] lg:h-[450px] rounded-[20px] lg:rounded-[30px] overflow-hidden">
          {/* Background Image */}
          <Image
            src="/destinations/nepal.png"
            alt="Travel Advisors Hero"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-12">
            <div className="max-w-[500px]">
              <h1 className="font-poppins font-bold text-[32px] lg:text-[48px] text-white leading-[1.15] mb-4 lg:mb-6">
                Meet Our<br />Travel Experts
              </h1>
              <p className="font-poppins font-light text-[14px] lg:text-[16px] text-white/90 leading-[1.6] mb-6 lg:mb-8 max-w-[420px]">
                Connect with certified professionals, who can turn your dream vacation into a reality, we hand picked advisors with deep local knowledge and global connection.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <button className="px-6 lg:px-8 py-3 lg:py-3.5 bg-[#00A792] text-white rounded-full font-poppins font-medium text-[14px] lg:text-[15px] hover:bg-[#008F7A] transition-colors">
                  Find An Advisor
                </button>
                <button className="px-6 lg:px-8 py-3 lg:py-3.5 bg-white text-[#1C1B1F] rounded-full font-poppins font-medium text-[14px] lg:text-[15px] hover:bg-gray-100 transition-colors">
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-8 lg:pb-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          {/* Left - Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            {/* Destination Expert */}
            <button
              onClick={() => setDestinationOpen(!destinationOpen)}
              className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-[#00A792] text-white rounded-full font-poppins font-light text-[13px] lg:text-[14px]"
            >
              Destination Expert
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Travel Style */}
            <button
              onClick={() => setTravelStyleOpen(!travelStyleOpen)}
              className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-white border border-[#E5E7EB] text-[#1C1B1F] rounded-full font-poppins font-light text-[13px] lg:text-[14px]"
            >
              Travel Style
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Language */}
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-white border border-[#E5E7EB] text-[#1C1B1F] rounded-full font-poppins font-light text-[13px] lg:text-[14px]"
            >
              Language
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Right - Search */}
          <div className="relative w-full lg:w-[300px]">
            <input
              type="text"
              placeholder="Search by name destination or travel style"
              className="w-full px-4 lg:px-5 py-2 lg:py-2.5 pr-10 lg:pr-12 bg-white border border-[#E5E7EB] rounded-full font-poppins font-light text-[13px] lg:text-[14px] text-[#6B7280] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00A792]"
            />
            <Search className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-[#9CA3AF]" />
          </div>
        </div>
      </section>

      {/* Advisors Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16 lg:pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-8 lg:gap-y-14">
          {advisors.map((advisor) => (
            <AdvisorCard key={advisor.id} advisor={advisor} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
