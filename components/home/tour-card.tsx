"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import type { Tour } from "@/types"
import { useSavedTours } from "@/lib/saved-tours-context"
import { cn } from "@/lib/utils"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface TourCardProps {
  tour: Tour
}

export function TourCard({ tour }: TourCardProps) {
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const isSaved = isTourSaved(tour.id)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaveTour(tour.id)
  }

  return (
    <Card className="group hover:shadow-2xl dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0 shadow-lg bg-card/80 dark:bg-card/95 backdrop-blur-sm overflow-hidden">
      <Link href={`/tours/${tour.id}`}>
        <div className="relative overflow-hidden h-56">
          <ShimmerImage
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tour.badges.map((badge, badgeIndex) => (
              <Badge key={badgeIndex} className="bg-background/90 dark:bg-background/95 text-foreground backdrop-blur-sm">
                {badge}
              </Badge>
            ))}
          </div>
          <div className="absolute top-4 right-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className={cn(
                "rounded-full shadow-lg hover:scale-110 transition-all",
                isSaved && "bg-primary hover:bg-primary/90"
              )}
              onClick={handleSaveClick}
              aria-label={isSaved ? "Remove from saved tours" : "Save tour"}
            >
              <Heart
                className={cn("w-4 h-4 transition-all", isSaved && "fill-white text-white")}
              />
            </Button>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight flex-1">
              {tour.title}
            </h3>
            <div className="text-right ml-4">
              <span className="font-heading font-black text-xl text-primary">€{tour.price}</span>
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
          </div>
          <p className="text-muted-foreground mb-3 font-medium text-sm">{tour.company}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-foreground">{tour.rating}</span>
              </div>
              <span className="text-muted-foreground">({tour.reviews})</span>
            </div>
            <div className="text-primary font-semibold text-sm">View Details →</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
