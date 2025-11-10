"use client"

import { useState, useEffect } from "react"
import { ImageGallery } from "./image-gallery"
import { TourInfo } from "./tour-info"
import { SectionNavigation } from "./section-navigation"
import { TourOverview } from "./tour-overview"
import { TourItinerary } from "./tour-itinerary"
import { CompanySection } from "./company-section"
import { ReviewsSection } from "./reviews-section"
import { BookingSidebar } from "./booking-sidebar"
import { RelatedTours } from "./related-tours"
import { TourItineraryModal } from "./tour-itinerary-modal"

interface TourDetailClientProps {
  tourDetail: any
  detailedItinerary: any
}

export function TourDetailClient({ tourDetail, detailedItinerary }: TourDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

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

  const handleSectionClick = (sectionId: string) => {
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
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ImageGallery
            images={tourDetail.images}
            title={tourDetail.title}
            tourId={tourDetail.id}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />

          <TourInfo tour={tourDetail} onCompanyClick={() => {}} />

          <SectionNavigation activeSection={activeSection} onSectionClick={handleSectionClick} />

          <div id="overview">
            <TourOverview tour={tourDetail} />
          </div>

          <div id="itinerary">
            <TourItinerary
              itinerary={tourDetail.itinerary}
              onDayClick={(day) => setSelectedDay(day)}
            />
          </div>

          <div id="company">
            <CompanySection company={tourDetail.company} />
          </div>

          <div id="reviews">
            <ReviewsSection reviews={tourDetail.reviews} rating={tourDetail.rating} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <BookingSidebar tour={tourDetail} />
        </div>
      </div>

      <RelatedTours tours={tourDetail.relatedTours} />

      {selectedDay !== null && (
        <TourItineraryModal
          selectedDay={selectedDay}
          itinerary={detailedItinerary}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </>
  )
}
