"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ReviewCard } from "./review-card"
import type { CompanyReview } from "@/lib/types/investor"

interface ReviewsSectionProps {
  reviews: CompanyReview[]
  onWriteReview?: () => void
}

const REVIEWS_PER_PAGE = 4

export function ReviewsSection({ reviews, onWriteReview }: ReviewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE)

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMoreReviews = visibleCount < reviews.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + REVIEWS_PER_PAGE, reviews.length))
  }

  return (
    <div className="py-5">
      {/* Header with Write Review Button */}
      <div className="flex justify-end mb-5">
        <Button
          variant="outline"
          onClick={onWriteReview}
          className="rounded-full border-primary text-primary hover:bg-primary hover:text-white font-poppins text-sm px-5 h-9"
        >
          Write Your Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More */}
      {hasMoreReviews && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="font-poppins text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Load more Reviews
          </button>
        </div>
      )}

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-10">
          <p className="font-poppins text-gray-500 mb-4">No reviews yet</p>
          <Button
            onClick={onWriteReview}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-9"
          >
            Be the first to write a review
          </Button>
        </div>
      )}
    </div>
  )
}
