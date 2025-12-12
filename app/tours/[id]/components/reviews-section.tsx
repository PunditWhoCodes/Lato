"use client"

import Image from "next/image"
import { Star, BadgeCheck } from "lucide-react"

interface Review {
  id: number | string
  user: {
    name: string
    avatar?: string
    verified?: boolean
  }
  rating: number
  date: string
  title?: string
  comment: string
}

interface ReviewsSectionProps {
  reviews?: Review[]
  rating?: number
  totalReviews?: number
  tourName?: string
}

// Default reviews data
const defaultReviews: Review[] = [
  {
    id: 1,
    user: {
      name: "Leonie",
      avatar: "",
      verified: true
    },
    rating: 5,
    date: "Jan 2, 2018",
    title: "Peru Best Tours are awesome",
    comment: "The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it."
  }
]

// Rating distribution data
const ratingDistribution = [
  { stars: 5, count: 1 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 }
]

export function ReviewsSection({
  reviews = defaultReviews,
  rating = 5.0,
  totalReviews = 1,
  tourName = "Best of the Andes"
}: ReviewsSectionProps) {
  // Calculate max count for bar scaling
  const maxCount = Math.max(...ratingDistribution.map(r => r.count), 1)

  return (
    <div className="py-8">
      {/* Section Header */}
      <h2 className="text-xl font-semibold text-[#1C1B1F] mb-2">Customer Reviews</h2>
      <p className="text-[15px] text-[#6B7280] mb-6">
        Read what other travelers have to say about <span className="font-semibold text-[#1C1B1F]">{tourName}</span>
      </p>

      {/* Rating Summary Box - Teal border and background */}
      <div className="border border-[#00A79233] bg-[#00A79208] rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-8">
          {/* Left - Large Rating Number */}
          <div className="shrink-0">
            <div className="text-5xl font-bold text-[#1C1B1F]">{rating.toFixed(1)}</div>
            <div className="flex items-center gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? "fill-[#FFA432] text-[#FFA432]"
                      : "fill-[#E5E5E5] text-[#E5E5E5]"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-[#6B7280] mt-1">based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
          </div>

          {/* Right - Rating Bars */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-3">
                {/* Star icons */}
                <div className="flex items-center gap-0.5 w-24 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < stars
                          ? "fill-[#FFA432] text-[#FFA432]"
                          : "fill-[#D1D5DB] text-[#D1D5DB]"
                      }`}
                    />
                  ))}
                </div>
                {/* Progress bar */}
                <div className="flex-1 h-2.5 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00A699] rounded-full transition-all"
                    style={{ width: count > 0 ? `${(count / maxCount) * 100}%` : '0%' }}
                  />
                </div>
                {/* Count */}
                <span className="text-sm text-[#6B7280] w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-[#E5E5E5] rounded-2xl p-5">
            {/* Top Row - Avatar, Name, Verified, Date */}
            <div className="flex items-start gap-3 mb-3">
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#4ADE80] flex items-center justify-center">
                {review.user.avatar ? (
                  <Image
                    src={review.user.avatar}
                    alt={review.user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white text-lg font-semibold">
                    {review.user.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Name + Verified */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-[#1C1B1F]">{review.user.name}</h4>
                  {review.user.verified && (
                    <span className="inline-flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-[#3EB368]" />
                      <span className="text-sm text-[#6B7280]">Verified Traveler</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Date */}
              <span className="text-sm text-[#6B7280] shrink-0">{review.date}</span>
            </div>

            {/* Star Rating Row */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-[#FFA432] text-[#FFA432]"
                        : "fill-[#E5E5E5] text-[#E5E5E5]"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-[#1C1B1F]">{review.rating.toFixed(1)}</span>
              <span className="text-sm text-[#6B7280]">{review.rating.toFixed(1)} out of 5</span>
            </div>

            {/* Review Title */}
            {review.title && (
              <h5 className="font-semibold text-[#1C1B1F] mb-2">{review.title}</h5>
            )}

            {/* Review Comment */}
            <p className="text-[15px] text-[#6B7280] leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show More Reviews Link */}
      {totalReviews > reviews.length && (
        <button className="mt-6 text-sm text-[#00A699] font-medium hover:underline">
          Show all {totalReviews} reviews
        </button>
      )}
    </div>
  )
}
