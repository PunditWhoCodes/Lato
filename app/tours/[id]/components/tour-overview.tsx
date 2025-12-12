"use client"

import { CheckCircle } from "lucide-react"
import { TourOverviewProps } from "../types"

export function TourOverview({ tour }: TourOverviewProps) {
  return (
    <section id="overview" className="space-y-8">
      {/* What to expect */}
      <div>
        <h3 className="font-heading font-bold text-xl mb-4">What to expect</h3>
        <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
      </div>

      {/* Highlights */}
      <div>
        <h3 className="font-heading font-bold text-xl mb-4">Highlights</h3>
        <ul className="space-y-3">
          {tour.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
