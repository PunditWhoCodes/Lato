"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Loader2, ExternalLink } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import type { TourDetail } from "@/types"
import { ReviewsSectionProps } from "../types"
import { useGoogleReviews } from "../hooks/useGoogleReviews"
import { GOOGLE_MAPS_CONFIG } from "@/config/google-maps"

interface ReviewsSectionWithGoogleProps extends ReviewsSectionProps {
  tourLocation?: { lat: number; lng: number; name?: string }
  enableGoogleReviews?: boolean
}

export function ReviewsSection({
  reviews: fallbackReviews,
  rating: fallbackRating,
  tourLocation,
  enableGoogleReviews = true
}: ReviewsSectionWithGoogleProps) {
  // Fetch Google reviews if enabled and location is provided
  const { data: googleData, isLoading, error } = useGoogleReviews({
    lat: tourLocation?.lat,
    lng: tourLocation?.lng,
    name: tourLocation?.name,
    enabled: enableGoogleReviews && Boolean(tourLocation) && GOOGLE_MAPS_CONFIG.features.enableGoogleReviews,
  })

  // Determine which reviews to show
  const shouldUseGoogleReviews =
    enableGoogleReviews &&
    googleData?.success &&
    googleData.data.reviews.length > 0

  const displayReviews = shouldUseGoogleReviews
    ? googleData!.data.reviews
    : fallbackReviews

  const displayRating = shouldUseGoogleReviews
    ? googleData!.data.rating
    : fallbackRating

  const totalReviewCount = shouldUseGoogleReviews
    ? googleData!.data.totalReviews
    : fallbackReviews.length

  return (
    <section id="reviews" className="space-y-6 pt-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <h3 className="font-heading font-bold text-2xl">Reviews ({totalReviewCount})</h3>
          {shouldUseGoogleReviews && (
            <Badge variant="secondary" className="gap-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Reviews
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-lg">{displayRating.toFixed(1)}</span>
          <span className="text-muted-foreground">average</span>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && enableGoogleReviews && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading reviews from Google...</span>
        </div>
      )}

      {/* Error State (fallback to mock reviews) */}
      {error && enableGoogleReviews && !isLoading && (
        <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Unable to load Google reviews. Showing sample reviews below.
          </p>
        </div>
      )}

      {/* Reviews List */}
      {!isLoading && (
        <div className="space-y-6">
          {displayReviews.map((review) => (
            <Card key={review.id} className="bg-card dark:bg-card/95 border-border">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.user.name}</h4>
                          {review.source === 'google' && (
                            <Badge variant="outline" className="text-xs">
                              <svg className="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              </svg>
                              Verified
                            </Badge>
                          )}
                        </div>
                        {review.user.location && (
                          <p className="text-sm text-muted-foreground">{review.user.location}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-3">{review.comment}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3 overflow-x-auto">
                        {review.images.map((image, index) => (
                          <div key={index} className="w-20 h-20 shrink-0">
                            <ShimmerImage
                              src={image || "/placeholder.svg?height=80&width=80&query=review+photo"}
                              alt={`Review photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                              shimmerClassName="rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = "/photo-review.png"
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {review.helpful !== undefined && (
                        <Button variant="ghost" size="sm" className="h-auto p-0">
                          Helpful ({review.helpful})
                        </Button>
                      )}
                      {review.googleReviewUrl && (
                        <a
                          href={review.googleReviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
                        >
                          View on Google <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Reviews State */}
      {!isLoading && displayReviews.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
          <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <h4 className="font-semibold text-lg mb-2">No reviews yet</h4>
          <p className="text-muted-foreground">Be the first to review this tour!</p>
        </div>
      )}
    </section>
  )
}
