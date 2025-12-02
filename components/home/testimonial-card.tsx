"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface TestimonialCardProps {
  name: string
  avatar: string
  rating: number
  review: string
  location?: string
}

export function TestimonialCard({ name, avatar, rating, review, location }: TestimonialCardProps) {
  return (
    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-4xl overflow-hidden">
      <CardContent className="p-8">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="w-10 h-10 text-primary/20" fill="currentColor" />
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? "fill-orange text-orange"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-text-secondary font-openSans text-base leading-relaxed mb-6">
          &ldquo;{review}&rdquo;
        </p>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <ShimmerImage
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-poppins font-semibold text-text-primary text-base">
              {name}
            </div>
            {location && (
              <div className="font-mulish text-text-muted text-sm">
                {location}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
