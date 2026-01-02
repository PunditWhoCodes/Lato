/**
 * Review Aggregation Utilities
 *
 * Utilities for combining Google Places reviews with internal reviews,
 * calculating weighted ratings, and generating rating distributions.
 */

import type { Review } from '@/types'
import type { TourReview } from '@/lib/types/google-maps'

/**
 * Aggregated reviews result
 */
export interface AggregatedReviews {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingDistribution: RatingDistribution
  googleReviewCount: number
  internalReviewCount: number
}

/**
 * Rating distribution for 1-5 stars
 */
export interface RatingDistribution {
  1: number
  2: number
  3: number
  4: number
  5: number
}

/**
 * Calculate weighted average rating between Google and internal reviews
 * Internal reviews are weighted slightly higher (1.2x) as they're more relevant
 *
 * @param googleRating - Average rating from Google Places
 * @param googleCount - Number of Google reviews
 * @param internalRating - Average rating from internal reviews
 * @param internalCount - Number of internal reviews
 * @returns Weighted average rating rounded to 1 decimal place
 */
export function calculateWeightedRating(
  googleRating: number,
  googleCount: number,
  internalRating: number,
  internalCount: number
): number {
  const totalCount = googleCount + internalCount

  if (totalCount === 0) return 0

  // Weight internal reviews slightly higher (1.2x) as they're more tour-specific
  const internalWeight = 1.2
  const weightedGoogle = googleRating * googleCount
  const weightedInternal = internalRating * internalCount * internalWeight
  const totalWeight = googleCount + internalCount * internalWeight

  const average = (weightedGoogle + weightedInternal) / totalWeight

  // Round to 1 decimal place
  return Math.round(average * 10) / 10
}

/**
 * Convert a TourReview (from Google Places) to our internal Review format
 *
 * @param tourReview - Review from Google Places
 * @returns Review in internal format
 */
export function tourReviewToReview(tourReview: TourReview): Review {
  return {
    id: tourReview.id,
    user: {
      name: tourReview.user.name,
      avatar: tourReview.user.avatar,
      location: tourReview.user.location,
    },
    rating: tourReview.rating,
    date: tourReview.date,
    comment: tourReview.comment,
    helpful: tourReview.helpful,
    images: tourReview.images,
    source: tourReview.source,
    googleReviewUrl: tourReview.googleReviewUrl,
  }
}

/**
 * Merge Google reviews with internal reviews
 * Converts TourReview[] to Review[] and combines with internal reviews
 * Sorts by rating (highest first)
 *
 * @param googleReviews - Reviews from Google Places API
 * @param internalReviews - Internal app reviews
 * @returns Combined and sorted reviews
 */
export function mergeReviews(
  googleReviews: TourReview[],
  internalReviews: Review[] = []
): Review[] {
  // Convert Google reviews to internal format
  const mappedGoogle: Review[] = googleReviews.map(tourReviewToReview)

  // Ensure internal reviews have source set
  const normalizedInternal = internalReviews.map((r) => ({
    ...r,
    source: r.source || ('internal' as const),
  }))

  // Combine and sort by rating (highest first)
  return [...mappedGoogle, ...normalizedInternal].sort((a, b) => {
    // Sort by rating first (descending)
    if (b.rating !== a.rating) return b.rating - a.rating
    // Could add secondary sort by date if needed
    return 0
  })
}

/**
 * Calculate rating distribution (1-5 stars)
 * Counts how many reviews fall into each star rating
 *
 * @param reviews - Array of reviews
 * @returns Object with count for each star rating (1-5)
 */
export function calculateRatingDistribution(
  reviews: Review[]
): RatingDistribution {
  const distribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  reviews.forEach((review) => {
    // Round to nearest integer for distribution
    const rounded = Math.round(review.rating)

    // Clamp to valid range (1-5)
    if (rounded >= 1 && rounded <= 5) {
      distribution[rounded as 1 | 2 | 3 | 4 | 5]++
    }
  })

  return distribution
}

/**
 * Calculate average rating from an array of reviews
 *
 * @param reviews - Array of reviews
 * @returns Average rating rounded to 1 decimal place
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0

  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  const average = sum / reviews.length

  return Math.round(average * 10) / 10
}

/**
 * Get rating distribution as percentages
 *
 * @param distribution - Rating distribution counts
 * @param total - Total number of reviews
 * @returns Object with percentage for each star rating
 */
export function getRatingDistributionPercentages(
  distribution: RatingDistribution,
  total: number
): RatingDistribution {
  if (total === 0) {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  }

  return {
    1: Math.round((distribution[1] / total) * 100),
    2: Math.round((distribution[2] / total) * 100),
    3: Math.round((distribution[3] / total) * 100),
    4: Math.round((distribution[4] / total) * 100),
    5: Math.round((distribution[5] / total) * 100),
  }
}

/**
 * Aggregate all review data
 * Main function that combines Google and internal reviews with full statistics
 *
 * @param googleReviews - Reviews from Google Places API
 * @param googleRating - Average rating from Google
 * @param googleTotalCount - Total review count from Google
 * @param internalReviews - Internal app reviews
 * @returns Fully aggregated review data
 */
export function aggregateReviews(
  googleReviews: TourReview[],
  googleRating: number,
  googleTotalCount: number,
  internalReviews: Review[] = []
): AggregatedReviews {
  // Merge all reviews
  const mergedReviews = mergeReviews(googleReviews, internalReviews)

  // Calculate internal rating from reviews
  const internalRating =
    internalReviews.length > 0
      ? internalReviews.reduce((sum, r) => sum + r.rating, 0) /
        internalReviews.length
      : 0

  // Calculate weighted average
  const averageRating = calculateWeightedRating(
    googleRating,
    googleTotalCount,
    internalRating,
    internalReviews.length
  )

  // Calculate distribution from merged reviews
  const ratingDistribution = calculateRatingDistribution(mergedReviews)

  return {
    reviews: mergedReviews,
    averageRating,
    totalReviews: googleTotalCount + internalReviews.length,
    ratingDistribution,
    googleReviewCount: googleTotalCount,
    internalReviewCount: internalReviews.length,
  }
}

/**
 * Format rating for display (e.g., 4.5 → "4.5")
 *
 * @param rating - Numeric rating
 * @returns Formatted rating string
 */
export function formatRating(rating: number): string {
  // Ensure single decimal place
  return rating.toFixed(1)
}

/**
 * Get rating label based on score
 *
 * @param rating - Numeric rating (1-5)
 * @returns Human-readable label
 */
export function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return 'Excellent'
  if (rating >= 4.0) return 'Very Good'
  if (rating >= 3.5) return 'Good'
  if (rating >= 3.0) return 'Average'
  if (rating >= 2.0) return 'Below Average'
  return 'Poor'
}
