"use client"

import { useState } from "react"
import { ReviewCard } from "./review-card"
import type { CompanyReview } from "@/lib/types/investor"

interface ReviewsListProps {
  reviews: CompanyReview[]
}

const REVIEWS_PER_PAGE = 4

export function ReviewsList({ reviews }: ReviewsListProps) {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE)

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMoreReviews = visibleCount < reviews.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + REVIEWS_PER_PAGE, reviews.length))
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="font-poppins text-gray-500">No reviews yet</p>
      </div>
    )
  }

  return (
    <div>
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
    </div>
  )
}
