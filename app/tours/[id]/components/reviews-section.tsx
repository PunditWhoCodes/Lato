"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import type { TourDetail } from "@/types"
import { ReviewsSectionProps } from "../types"

export function ReviewsSection({ reviews, rating }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-2xl">Reviews ({reviews.length})</h3>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-lg">{rating}</span>
          <span className="text-muted-foreground">average</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-card dark:bg-card/95 border-border">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.user.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.user.location}</p>
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
