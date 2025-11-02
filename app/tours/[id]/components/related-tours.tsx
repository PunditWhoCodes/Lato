"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import type { TourDetail } from "@/types"
import { RelatedToursProps } from "../types"

export function RelatedTours({ tours }: RelatedToursProps) {
  return (
    <div>
      <h3 className="font-heading font-bold text-2xl mb-6">You Might Also Like</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            className="group hover:shadow-lg dark:hover:shadow-primary/20 transition-shadow cursor-pointer bg-card dark:bg-card/95 border-border"
          >
            <Link href={`/tours/${tour.id}`}>
              <div className="flex gap-4 p-4">
                <div className="w-24 h-24 shrink-0">
                  <ShimmerImage
                    src={tour.image || "/placeholder.svg?height=96&width=96&query=related+tour"}
                    alt={tour.title}
                    className="w-24 h-24 object-cover rounded-lg"
                    shimmerClassName="rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/related-tour.png"
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold group-hover:text-primary transition-colors mb-2">
                    {tour.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{tour.rating}</span>
                  </div>
                  <p className="font-heading font-bold text-primary">€{tour.price}</p>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
