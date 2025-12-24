"use client"

import { useState } from "react"
import { Check, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface IncludedItem {
  title: string
  content?: ReactNode
}

interface WhatsIncludedProps {
  included: IncludedItem[]
  notIncluded: IncludedItem[]
}

function AccordionItem({
  item,
  isIncluded,
}: {
  item: IncludedItem
  isIncluded: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-[#E5E5E5] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <div className="flex items-center gap-3">
          {isIncluded ? (
            <Check className="w-4 h-4 text-[#059669] shrink-0" />
          ) : (
            <X className="w-4 h-4 text-[#DC2626] shrink-0" />
          )}
          <span className="text-sm font-medium text-[#1C1B1F]">{item.title}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#6B7280] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && item.content && (
        <div className="pb-4 pl-7 text-sm text-[#4B5563]">
          {item.content}
        </div>
      )}
    </div>
  )
}

// Content components for rich accordion content
function AccommodationContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">🇵🇪 Peru</p>

      <div className="space-y-1">
        <p>• 🏨 <span className="font-medium">Lima</span></p>
        <p className="pl-4">1 Night In An Apartment Hotel With Breakfast Included</p>
        <p className="pl-4">🔼 <span className="font-medium">Upgrade</span> Option: Stay In A 5-Star Hotel Via The Book Now Page</p>
      </div>

      <div className="space-y-1">
        <p>🧳 <span className="font-medium">Scenic Journey & Cultural Highlights</span></p>
        <p>• <span className="font-medium">3 Nights</span> Exploring Peru&apos;s Iconic Destinations (Cusco / Sacred Valley / Machu Picchu)</p>
        <p className="pl-4">• 🍴 Meals Included: Daily Breakfast</p>
      </div>

      <div className="space-y-1">
        <p>🚃 <span className="font-medium">Train Transfers</span></p>
        <p>• <span className="font-medium">2 Nights</span> Scenic Train Journeys</p>
        <p className="pl-4">(Lima ↔️ Cusco / Sacred Valley ↔️ Lima Round Trip)</p>
        <p>🔼 <span className="font-medium">Upgrade</span> Option: Upgrade To A Luxury Or Sleeper Train Via The Book Now Page</p>
      </div>
    </div>
  )
}

function FlightsContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">✈️ Internal Flights Included</p>

      <div className="space-y-1">
        <p>• <span className="font-medium">Lima → Cusco</span></p>
        <p className="pl-4">Domestic flight with 23kg baggage allowance</p>
      </div>

      <div className="space-y-1">
        <p>• <span className="font-medium">Cusco → Lima</span></p>
        <p className="pl-4">Return domestic flight at end of tour</p>
      </div>

      <div className="space-y-1">
        <p>🔼 <span className="font-medium">Upgrade</span> Option: Business class available via Book Now Page</p>
      </div>
    </div>
  )
}

function MealsContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">🍽️ Meals Included</p>

      <div className="space-y-1">
        <p>• 🥐 <span className="font-medium">Breakfast</span></p>
        <p className="pl-4">Daily breakfast at all accommodations (10 breakfasts)</p>
      </div>

      <div className="space-y-1">
        <p>• 🥗 <span className="font-medium">Lunch</span></p>
        <p className="pl-4">Buffet lunch in the Sacred Valley</p>
        <p className="pl-4">Traditional Peruvian lunch in Cusco</p>
      </div>

      <div className="space-y-1">
        <p>• 🍷 <span className="font-medium">Special Dining</span></p>
        <p className="pl-4">Welcome dinner on Day 1 in Lima</p>
        <p className="pl-4">Farewell dinner on final evening</p>
      </div>

      <p className="text-xs text-[#6B7280] mt-2">Note: Dietary requirements can be accommodated with advance notice</p>
    </div>
  )
}

function GuidesContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">👤 Professional Guide Services</p>

      <div className="space-y-1">
        <p>• 🎓 <span className="font-medium">Certified Local Guides</span></p>
        <p className="pl-4">English-speaking licensed tour guides at all destinations</p>
        <p className="pl-4">Expert knowledge of Peruvian history & culture</p>
      </div>

      <div className="space-y-1">
        <p>• 📞 <span className="font-medium">24/7 Support</span></p>
        <p className="pl-4">Round-the-clock assistance throughout your journey</p>
        <p className="pl-4">Emergency contact available at all times</p>
      </div>

      <div className="space-y-1">
        <p>• 🏛️ <span className="font-medium">Specialized Tours</span></p>
        <p className="pl-4">Dedicated guide for Machu Picchu exploration</p>
        <p className="pl-4">Local expert for Sacred Valley visits</p>
      </div>
    </div>
  )
}

function TransportContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">🚐 Ground Transportation</p>

      <div className="space-y-1">
        <p>• 🚌 <span className="font-medium">Private Transfers</span></p>
        <p className="pl-4">Air-conditioned vehicles for all ground transfers</p>
        <p className="pl-4">Airport pickups and drop-offs included</p>
      </div>

      <div className="space-y-1">
        <p>• 🚃 <span className="font-medium">Train Journeys</span></p>
        <p className="pl-4">Scenic train to Machu Picchu (Expedition class)</p>
        <p className="pl-4">Panoramic windows for valley views</p>
      </div>

      <div className="space-y-1">
        <p>🔼 <span className="font-medium">Upgrade</span> Option: Vistadome or First Class train via Book Now Page</p>
      </div>
    </div>
  )
}

function AdditionalServicesContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">✨ Additional Services</p>

      <div className="space-y-1">
        <p>• 🎫 <span className="font-medium">Entrance Fees</span></p>
        <p className="pl-4">Machu Picchu entrance ticket</p>
        <p className="pl-4">Sacred Valley archaeological sites</p>
        <p className="pl-4">Museums and cultural attractions</p>
      </div>

      <div className="space-y-1">
        <p>• 🛡️ <span className="font-medium">Travel Insurance</span></p>
        <p className="pl-4">Basic travel insurance coverage included</p>
        <p className="pl-4">Medical emergency assistance</p>
      </div>

      <div className="space-y-1">
        <p>• 🎒 <span className="font-medium">Extras</span></p>
        <p className="pl-4">Luggage handling at hotels</p>
        <p className="pl-4">Bottled water during excursions</p>
      </div>
    </div>
  )
}

// Excluded content components
function InsuranceExcludedContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">🛡️ Insurance Not Included</p>

      <div className="space-y-1">
        <p>• <span className="font-medium">Comprehensive Travel Insurance</span></p>
        <p className="pl-4">Trip cancellation coverage</p>
        <p className="pl-4">Lost baggage protection</p>
        <p className="pl-4">Extended medical coverage beyond basic</p>
      </div>

      <div className="space-y-1">
        <p>💡 <span className="font-medium">Recommendation</span></p>
        <p className="pl-4">We strongly recommend purchasing comprehensive travel insurance before your trip</p>
      </div>
    </div>
  )
}

function FlightsExcludedContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">✈️ International Flights</p>

      <div className="space-y-1">
        <p>• <span className="font-medium">Flights To/From Peru</span></p>
        <p className="pl-4">International airfare to Lima not included</p>
        <p className="pl-4">Return flights to your home country</p>
      </div>

      <div className="space-y-1">
        <p>💡 <span className="font-medium">Tip</span></p>
        <p className="pl-4">Book early for best rates to Jorge Chávez International Airport (LIM)</p>
      </div>
    </div>
  )
}

function GuidesExcludedContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">💵 Gratuities</p>

      <div className="space-y-1">
        <p>• <span className="font-medium">Tips Not Included</span></p>
        <p className="pl-4">Gratuities for tour guides</p>
        <p className="pl-4">Tips for drivers and hotel staff</p>
        <p className="pl-4">Restaurant service charges</p>
      </div>

      <div className="space-y-1">
        <p>💡 <span className="font-medium">Suggested Tipping</span></p>
        <p className="pl-4">Guides: $10-15 USD per day</p>
        <p className="pl-4">Drivers: $5-10 USD per day</p>
      </div>
    </div>
  )
}

function TransportExcludedContent() {
  return (
    <div className="space-y-4">
      <p className="font-medium text-[#1C1B1F]">🚶 Optional Treks</p>

      <div className="space-y-1">
        <p>• <span className="font-medium">Hiking Excursions</span></p>
        <p className="pl-4">Huayna Picchu mountain climb</p>
        <p className="pl-4">Machu Picchu Mountain trek</p>
        <p className="pl-4">Rainbow Mountain day trip</p>
      </div>

      <div className="space-y-1">
        <p>• <span className="font-medium">Personal Transportation</span></p>
        <p className="pl-4">Taxi rides for personal excursions</p>
        <p className="pl-4">Transportation during free time</p>
      </div>

      <div className="space-y-1">
        <p>🔼 <span className="font-medium">Add-On</span> Option: Book optional treks via the Book Now Page</p>
      </div>
    </div>
  )
}

export function WhatsIncluded({ included, notIncluded }: WhatsIncludedProps) {
  return (
    <div className="py-8">
      {/* What's Included Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#1C1B1F] mb-4">What&apos;s Included</h2>
        <div>
          {included.map((item, index) => (
            <AccordionItem key={index} item={item} isIncluded={true} />
          ))}
        </div>
      </div>

      {/* What's Excluded Section */}
      <div>
        <h2 className="text-xl font-semibold text-[#1C1B1F] mb-4">What&apos;s Excluded</h2>
        <div>
          {notIncluded.map((item, index) => (
            <AccordionItem key={index} item={item} isIncluded={false} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Export content components for use in tour-detail-client
export {
  AccommodationContent,
  FlightsContent,
  MealsContent,
  GuidesContent,
  TransportContent,
  AdditionalServicesContent,
  InsuranceExcludedContent,
  FlightsExcludedContent,
  GuidesExcludedContent,
  TransportExcludedContent,
}
