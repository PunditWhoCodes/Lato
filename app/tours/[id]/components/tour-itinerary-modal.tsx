"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import type { DetailedItineraryItem } from "@/types"
import { TourItineraryModalProps } from "../types"

export function TourItineraryModal({ itinerary, selectedDay, onClose }: TourItineraryModalProps) {
  const dayItinerary = itinerary[selectedDay]

  if (!dayItinerary) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-background dark:bg-background/98 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-primary/20 border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background dark:bg-background/95 border-b border-border backdrop-blur-sm p-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-2xl">{dayItinerary.title}</h2>
            <p className="text-muted-foreground">Day {selectedDay + 1}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-muted">
            ✕
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {dayItinerary.activities.map((activity, actIndex) => (
            <div key={actIndex} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    activity.type === "activity"
                      ? "bg-primary"
                      : activity.type === "transportation"
                        ? "bg-secondary"
                        : "bg-ternary"
                  }`}
                >
                  {activity.type === "activity" ? "🎯" : activity.type === "transportation" ? "🚗" : "🏠"}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">{activity.title}</h3>
                  <Badge variant="outline" className="capitalize">
                    {activity.type}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">{activity.description}</p>

              {/* Activity images */}
              {"images" in activity && activity.images && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activity.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="aspect-video rounded-lg overflow-hidden">
                      <ShimmerImage
                        src={image || `/placeholder.svg?height=200&width=300&query=${activity.title}`}
                        alt={`${activity.title} ${imgIndex + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        shimmerClassName="rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/guided-city-tour.png"
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Activity-specific details */}
              <div className="grid md:grid-cols-2 gap-6">
                {activity.duration && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </h4>
                    <p className="text-muted-foreground">{activity.duration}</p>
                  </div>
                )}

                {"highlights" in activity && activity.highlights && (
                  <div>
                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {activity.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"included" in activity && activity.included && (
                  <div>
                    <h4 className="font-semibold mb-2">Included</h4>
                    <ul className="space-y-1">
                      {activity.included.map((item, iIndex) => (
                        <li key={iIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"requirements" in activity && activity.requirements && (
                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {activity.requirements.map((req, rIndex) => (
                        <li key={rIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="w-4 h-4 text-orange-500 mt-0.5 shrink-0">⚠️</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"amenities" in activity && activity.amenities && (
                  <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <ul className="space-y-1">
                      {activity.amenities.map((amenity, aIndex) => (
                        <li key={aIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"menu" in activity && activity.menu && (
                  <div>
                    <h4 className="font-semibold mb-2">Menu</h4>
                    <ul className="space-y-1">
                      {activity.menu.map((dish, mIndex) => (
                        <li key={mIndex} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="w-4 h-4 mt-0.5 shrink-0">🍽️</span>
                          {dish}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {actIndex < dayItinerary.activities.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
