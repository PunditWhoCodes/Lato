"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import type { TourDetail } from "@/types"
import { TourItineraryProps } from "../types"

export function TourItinerary({ itinerary, onDayClick }: TourItineraryProps) {
  return (
    <section id="itinerary" className="space-y-6 pt-4">
      <h3 className="font-heading font-bold text-2xl mb-6">Daily Itinerary</h3>

      <div className="space-y-6">
        {itinerary.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-xl dark:hover:shadow-primary/20 transition-all duration-300 group border-0 bg-linear-to-br from-card to-muted/20 dark:from-card/95 dark:to-muted/10 cursor-pointer"
            onClick={() => onDayClick(index)}
          >
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3 gap-0">
                <div className="relative aspect-video md:aspect-square overflow-hidden">
                  <ShimmerImage
                    src={
                      item.image ||
                      `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(item.title) || "/placeholder.svg"}`
                    }
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "/guided-city-tour.png"
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="w-14 h-14 bg-linear-to-br from-primary via-primary to-primary dark:to-primary/80 rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl border-2 border-background/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <span className="text-lg">{index + 1}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="md:col-span-2 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-2xl mb-3 group-hover:text-primary transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm font-medium">
                            Stop {index + 1} of {itinerary.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="capitalize bg-primary/10 text-primary border-primary/20 font-medium px-3 py-1"
                    >
                      {index === 0 ? "Start" : index === itinerary.length - 1 ? "End" : `Day ${index + 1}`}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <p className="text-muted-foreground">{item.description}</p>
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
