"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { mockTourDetail, detailedItinerary } from "./data"
import {
  ImageGallery,
  TourInfo,
  SectionNavigation,
  TourOverview,
  TourItinerary,
  CompanySection,
  ReviewsSection,
  BookingSidebar,
  RelatedTours,
} from "./components"
import { TourItineraryModal } from "./components/tour-itinerary-modal"

export default function TourDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const tour = mockTourDetail

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "itinerary", "company", "reviews"]
      const navHeight = 80
      const sectionNavHeight = 60
      const offset = navHeight + sectionNavHeight + 40

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= offset) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (selectedDay !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedDay])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const sectionNavHeight = 60
      const totalOffset = navHeight + sectionNavHeight + 20
      const elementPosition = element.offsetTop - totalOffset
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-foreground">
            Tours
          </Link>
          <span>/</span>
          <span className="text-foreground">{tour.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery
              images={tour.images}
              title={tour.title}
              tourId={tour.id}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
            />

            <TourInfo tour={tour} onCompanyClick={() => scrollToSection("company")} />

            <SectionNavigation activeSection={activeSection} onSectionClick={scrollToSection} />

            <TourOverview tour={tour} />

            <TourItinerary itinerary={tour.itinerary} onDayClick={setSelectedDay} />

            <CompanySection company={tour.company} />

            <ReviewsSection reviews={tour.reviews} rating={tour.rating} />

            <RelatedTours tours={tour.relatedTours} />
          </div>

          {/* Booking Sidebar */}
          <BookingSidebar tour={tour} />
        </div>
      </div>

      {/* Itinerary Modal */}
      {selectedDay !== null && (
        <TourItineraryModal
          itinerary={detailedItinerary}
          selectedDay={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  )
}
