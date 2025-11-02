import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Shield } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface ReviewCardProps {
  review: {
    name: string
    location: string
    avatar: string
    rating: number
    review: string
    tourImage: string
    tourTitle: string
    verified: boolean
    company: string
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="group hover:shadow-2xl dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-card/90 dark:bg-card/95 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-5">
        {/* Tour Image */}
        <div className="relative h-48 overflow-hidden rounded-lg mb-4">
          <ShimmerImage
            src={review.tourImage || "/placeholder.svg"}
            alt={review.tourTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h4 className="text-white font-semibold text-sm leading-tight">{review.tourTitle}</h4>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">"{review.review}"</p>

        {/* Reviewer Info */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <ShimmerImage
              src={review.avatar || "/placeholder.svg"}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
              shimmerClassName="rounded-full"
            />
            {review.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm">{review.name}</div>
            <div className="text-muted-foreground text-xs flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {review.location}
            </div>
            <div className="text-primary text-xs font-medium">via {review.company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
