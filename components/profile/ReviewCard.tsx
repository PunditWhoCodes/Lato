'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Star, CheckCircle } from 'lucide-react'
import type { UserReview } from '@/lib/types/profile'

interface ReviewCardProps {
  review: UserReview
  className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get initials for avatar fallback
  const getInitials = () => {
    if (review.reviewer.name) {
      return review.reviewer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    return 'U'
  }

  return (
    <Card className={cn('p-6 bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]', className)}>
      <div className="flex items-start justify-between gap-4">
        {/* Left side - reviewer info and review */}
        <div className="flex-1">
          {/* Reviewer info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
              <AvatarFallback className="bg-green-500 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {review.reviewer.name}
              </span>
              {review.reviewer.verified && (
                <span className="flex items-center gap-1 text-xs text-[#00A792]">
                  <CheckCircle className="h-3 w-3" />
                  Verified Traveler
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-4 w-4',
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900">
              {review.rating.toFixed(1)}
            </span>
            <span className="text-sm text-green-600">{review.ratingLabel}</span>
          </div>

          {/* Tour title */}
          <h3 className="font-semibold text-gray-900 mb-2">
            {review.title || review.tourTitle}
          </h3>

          {/* Review comment */}
          <p className="text-gray-600 text-sm">{review.comment}</p>
        </div>

        {/* Right side - date */}
        <div className="text-right shrink-0">
          <p className="text-sm text-gray-400">
            Written on {formatDate(review.date)}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default ReviewCard
