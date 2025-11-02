"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, Heart } from "lucide-react"
import { ChatButton } from "@/components/chat-button"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import { CompanyHoverCard } from "./company-hover-card"
import type { Tour } from "@/types"

interface TourListCardProps {
  tour: Tour
  onClick: (tourId: number, e: React.MouseEvent) => void
}

export function TourListCard({ tour, onClick }: TourListCardProps) {
  return (
    <div onClick={(e) => onClick(tour.id, e)}>
      <Card className="group hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 cursor-pointer border-0 shadow-lg bg-card dark:bg-card/95">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-64 md:w-80 shrink-0">
              <div className="relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none h-48 sm:h-56 md:h-full">
                <ShimmerImage
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-48 sm:h-56 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-4 sm:p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <CompanyHoverCard tour={tour}>
                      <span className="text-sm sm:text-base">{tour.company}</span>
                    </CompanyHoverCard>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({tour.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {tour.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} className="bg-accent text-accent-foreground">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4 mt-3 md:mt-0 md:ml-6">
                  <div className="text-left sm:text-right">
                    <span className="font-heading font-bold text-xl sm:text-2xl text-primary">€{tour.price}</span>
                    {tour.originalPrice && (
                      <div className="text-xs sm:text-sm text-muted-foreground line-through">
                        €{tour.originalPrice}
                      </div>
                    )}
                  </div>
                  <div data-prevent-navigation onClick={(e) => e.stopPropagation()}>
                    <ChatButton companyId={tour.companyId} tourId={tour.id} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
