"use client"

import Image from "next/image"
import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Accommodation {
  name: string
  image: string
  rating: number
  duration: string
}

interface WhereYouWillStayProps {
  accommodations?: Accommodation[]
}

const defaultAccommodations: Accommodation[] = [
  {
    name: "B&B Hotel Ljubljana Park",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    rating: 4.3,
    duration: "2/3 Days"
  },
  {
    name: "Mahal Hotel",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    rating: 4.3,
    duration: "2/3 Days"
  },
  {
    name: "Rainbow Mountain Hotel",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    rating: 4.3,
    duration: "2/3 Days"
  }
]

export function WhereYouWillStay({ accommodations = defaultAccommodations }: WhereYouWillStayProps) {
  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#1C1B1F] mb-1">Where you will stay</h2>
          <p className="text-sm text-[#6B7280]">All accommodations are subject to change</p>
        </div>
        <Button
          variant="outline"
          className="rounded-full border-[#00A792] text-[#00A792] hover:bg-[#00A792] hover:text-white font-poppins text-sm px-4 h-9"
        >
          View All Details
        </Button>
      </div>

      {/* Accommodation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accommodations.map((accommodation, index) => (
          <div key={index} className="group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#00A792] transition-colors">
              <Image
                src={accommodation.image}
                alt={accommodation.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Hotel Info */}
            <div>
              <h3 className="font-medium text-[#1C1B1F] mb-1">{accommodation.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(accommodation.rating)
                        ? "fill-[#FFA432] text-[#FFA432]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-sm text-[#6B7280] ml-1">{accommodation.rating}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                <Clock className="w-4 h-4" />
                <span>{accommodation.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
