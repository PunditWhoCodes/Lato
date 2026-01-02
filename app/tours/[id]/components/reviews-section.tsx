"use client"

import Image from "next/image"
import { Star, BadgeCheck, ExternalLink, Loader2 } from "lucide-react"
import { GoogleAttribution, GoogleReviewBadge } from "./google-attribution"
import type { RatingDistribution } from "@/lib/utils/review-aggregation"

interface Review {
  id: number | string
  user: {
    name: string
    avatar?: string
    location?: string
    verified?: boolean
  }
  rating: number
  date: string
  title?: string
  tourTitle?: string
  comment: string
  source?: 'google' | 'internal'
  googleReviewUrl?: string
  verified?: boolean
}

interface ReviewsSectionProps {
  reviews?: Review[]
  rating?: number
  totalReviews?: number
  tourName?: string
  /** Dynamic rating distribution from aggregated reviews */
  ratingDistribution?: RatingDistribution
  /** Number of Google reviews (for attribution) */
  googleReviewCount?: number
  /** Whether reviews are loading */
  isLoading?: boolean
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
    comment: "The most amazing place I have ever been, such breath taking scenery. Gorgeous friendly people. Loved it.",
    source: 'internal'
  }
]

// Default rating distribution data
const defaultRatingDistribution: RatingDistribution = {
  5: 1,
  4: 0,
  3: 0,
  2: 0,
  1: 0
}

/**
 * Loading skeleton for reviews section
 */
function ReviewsSkeleton() {
  return (
    <div className="py-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-72 mb-6" />

      {/* Rating summary skeleton */}
      <div className="border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-8">
          <div className="shrink-0">
            <div className="h-12 w-16 bg-gray-200 rounded" />
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 h-4 bg-gray-200 rounded" />
                <div className="flex-1 h-2.5 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review cards skeleton */}
      {[1, 2].map((i) => (
        <div key={i} className="border border-gray-200 rounded-2xl p-5 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      ))}
    </div>
  )
}

export function ReviewsSection({
  reviews = defaultReviews,
  rating = 5.0,
  totalReviews = 1,
  tourName = "Best of the Andes",
  ratingDistribution = defaultRatingDistribution,
  googleReviewCount = 0,
  isLoading = false
}: ReviewsSectionProps) {
  // Show loading skeleton
  if (isLoading) {
    return <ReviewsSkeleton />
  }

  // Convert rating distribution to array format for rendering
  const distributionArray = [
    { stars: 5, count: ratingDistribution[5] || 0 },
    { stars: 4, count: ratingDistribution[4] || 0 },
    { stars: 3, count: ratingDistribution[3] || 0 },
    { stars: 2, count: ratingDistribution[2] || 0 },
    { stars: 1, count: ratingDistribution[1] || 0 }
  ]

  // Calculate max count for bar scaling
  const maxCount = Math.max(...distributionArray.map(r => r.count), 1)

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
            {distributionArray.map(({ stars, count }) => (
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
                    unoptimized={review.source === 'google'} // Google avatar URLs may need unoptimized
                  />
                ) : (
                  <span className="text-white text-lg font-semibold">
                    {review.user.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Name + Verified/Source Badge */}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Name - link to Google profile if available */}
                  {review.source === 'google' && review.googleReviewUrl ? (
                    <a
                      href={review.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#1C1B1F] hover:text-[#00A699] hover:underline"
                    >
                      {review.user.name}
                    </a>
                  ) : (
                    <h4 className="font-semibold text-[#1C1B1F]">{review.user.name}</h4>
                  )}

                  {/* Verified badge for internal reviews */}
                  {(review.user.verified || review.verified) && review.source !== 'google' && (
                    <span className="inline-flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-[#3EB368]" />
                      <span className="text-sm text-[#6B7280]">Verified Traveler</span>
                    </span>
                  )}

                  {/* Google badge for Google reviews */}
                  {review.source === 'google' && <GoogleReviewBadge />}
                </div>

                {/* User location if available */}
                {review.user.location && (
                  <p className="text-sm text-[#6B7280] mt-0.5">{review.user.location}</p>
                )}
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
            {(review.title || review.tourTitle) && (
              <h5 className="font-semibold text-[#1C1B1F] mb-2">{review.title || review.tourTitle}</h5>
            )}

            {/* Review Comment */}
            <p className="text-[15px] text-[#6B7280] leading-relaxed">{review.comment}</p>

            {/* Link to original Google review */}
            {review.source === 'google' && review.googleReviewUrl && (
              <a
                href={review.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-[#00A699] hover:underline"
              >
                View on Google
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Show More Reviews Link */}
      {totalReviews > reviews.length && (
        <button className="mt-6 text-sm text-[#00A699] font-medium hover:underline">
          Show all {totalReviews} reviews
        </button>
      )}

      {/* Google Attribution - Required for TOS compliance */}
      {googleReviewCount > 0 && (
        <GoogleAttribution reviewCount={googleReviewCount} />
      )}
    </div>
  )
}
