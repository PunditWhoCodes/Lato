"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  CompanyHeader,
  SectionNav,
  ReviewsList,
  ToursCarousel,
  TopDealsCarousel,
  AboutSection,
  PoliciesSection,
  ContactExperts,
} from "@/components/investor"
import type {
  CompanyProfile,
  CompanyReview,
  CompanyTour,
  Guide,
} from "@/lib/types/investor"

interface InvestorPageClientProps {
  company: CompanyProfile
  reviews: CompanyReview[]
  tours: CompanyTour[]
  topDeals: CompanyTour[]
  guides: Guide[]
}

export function InvestorPageClient({
  company,
  reviews,
  tours,
  topDeals,
  // guides - mapped to Contact Experts section
}: InvestorPageClientProps) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [activeSection, setActiveSection] = useState("reviews")

  // Refs for scroll targets
  const reviewsRef = useRef<HTMLDivElement>(null)
  const toursRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const guidesRef = useRef<HTMLDivElement>(null)

  const handleSaveToggle = () => {
    setIsSaved(!isSaved)
  }

  const handleViewAllTours = () => {
    router.push(`/tours?company=${company.slug}`)
  }

  const handleWriteReview = () => {
    // TODO: Open review modal or navigate to review page
    console.log("Write review clicked")
  }

  const handleAskQuestion = () => {
    router.push("/chats")
  }

  const handleChatWithUs = () => {
    router.push("/chats")
  }

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)

    // Scroll to the appropriate section
    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    switch (sectionId) {
      case "reviews":
        scrollToRef(reviewsRef)
        break
      case "find-tours":
        scrollToRef(toursRef)
        break
      case "about":
        scrollToRef(aboutRef)
        break
      case "guides":
        scrollToRef(guidesRef)
        break
    }
  }

  return (
    <div className="space-y-[14px] lg:space-y-6">
      {/* Company Header Card */}
      <CompanyHeader
        name={company.name}
        logo={company.logo}
        verified={company.verified}
        location={company.location}
        stats={company.stats}
        isSaved={isSaved}
        onSaveToggle={handleSaveToggle}
        onViewAllTours={handleViewAllTours}
      />

      {/* Centered Section Navigation */}
      <SectionNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onWriteReview={handleWriteReview}
      />

      {/* All Content Sections in One White Container */}
      <div className="bg-white rounded-[10px] lg:rounded-2xl px-[18px] py-[21px] lg:p-8 border border-black/5">
        {/* Reviews Section */}
        <div ref={reviewsRef} className="scroll-mt-4">
          <ReviewsList reviews={reviews} />
        </div>

        {/* Divider */}
        <hr className="my-[21px] lg:my-8 border-gray-100" />

        {/* Tours By Company Carousel */}
        <div ref={toursRef} className="scroll-mt-4">
          <ToursCarousel title={`Tours By ${company.name}`} tours={tours} />
        </div>

        {/* Divider */}
        <hr className="my-[21px] lg:my-8 border-gray-100" />

        {/* Top Deals Carousel */}
        <div>
          <TopDealsCarousel tours={topDeals} />
        </div>

        {/* Divider */}
        <hr className="my-[21px] lg:my-8 border-gray-100" />

        {/* About Section */}
        <div ref={aboutRef} className="scroll-mt-4">
          <AboutSection companyName={company.name} description={company.about} />
        </div>

        {/* Divider */}
        <hr className="my-[21px] lg:my-8 border-gray-100" />

        {/* Policies Section */}
        <div>
          <PoliciesSection policies={company.policies} />
        </div>
      </div>

      {/* Contact Experts Section (Guides) */}
      <div ref={guidesRef} className="scroll-mt-4">
        <ContactExperts
          onAskQuestion={handleAskQuestion}
          onChatWithUs={handleChatWithUs}
        />
      </div>
    </div>
  )
}
