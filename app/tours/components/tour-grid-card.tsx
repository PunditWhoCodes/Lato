"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, Heart } from "lucide-react"
import { ChatButton } from "@/components/chat-button"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import { CompanyHoverCard } from "./company-hover-card"
import { useSavedTours } from "@/lib/saved-tours-context"
import { cn } from "@/lib/utils"
import type { Tour } from "@/types"

interface TourGridCardProps {
  tour: Tour
  onClick: (tourUuid: string, e: React.MouseEvent) => void
}

export function TourGridCard({ tour, onClick }: TourGridCardProps) {
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const tourIdentifier = tour.uuid || tour.id.toString()
  const isSaved = isTourSaved(tourIdentifier)

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSaveTour(tourIdentifier)
  }

  return (
    <div onClick={(e) => onClick(tour.uuid || tour.id.toString(), e)}>
      <Card className="group hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg bg-card dark:bg-card/95 h-full">
        <div className="relative overflow-hidden rounded-t-lg h-48 sm:h-52 md:h-56">
          <ShimmerImage
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "absolute top-3 sm:top-4 right-3 sm:right-4 h-8 w-8 p-0 backdrop-blur-sm transition-all hover:scale-110",
              isSaved
                ? "bg-primary hover:bg-primary/90"
                : "bg-background/80 dark:bg-background/90 hover:bg-background dark:hover:bg-background/95"
            )}
            onClick={handleSaveClick}
            aria-label={isSaved ? "Remove from saved tours" : "Save tour"}
          >
            <Heart className={cn("h-4 w-4 transition-all", isSaved ? "fill-white text-white" : "text-foreground")} />
          </Button>
        </div>
        <CardContent className="p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {tour.title}
            </h3>
            <div className="text-right ml-2">
              <span className="font-heading font-bold text-xl text-primary">€{tour.price}</span>
              {tour.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">€{tour.originalPrice}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <CompanyHoverCard tour={tour}>
              <span>{tour.company}</span>
            </CompanyHoverCard>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">{tour.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{tour.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-3 sm:mb-4">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">{tour.groupSize}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{tour.rating}</span>
              </div>
              <span className="text-muted-foreground">({tour.reviews} reviews)</span>
            </div>
            <div data-prevent-navigation onClick={(e) => e.stopPropagation()}>
              <ChatButton companyId={tour.companyId} tourId={tour.id} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {tour.badges.map((badge, badgeIndex) => (
              <Badge key={badgeIndex} className="bg-accent text-accent-foreground">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
