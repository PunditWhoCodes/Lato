"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, MapPin } from "lucide-react"
import { TourOverviewProps } from "../types"

export function TourOverview({ tour }: TourOverviewProps) {
  return (
    <section id="overview" className="space-y-6 pt-4">
      <div>
        <h3 className="font-heading font-bold text-xl mb-4">About This Experience</h3>
        <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
      </div>

      <div>
        <h3 className="font-heading font-bold text-xl mb-4">Highlights</h3>
        <ul className="space-y-2">
          {tour.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-heading font-bold text-xl mb-4">What's Included</h3>
          <ul className="space-y-2">
            {tour.included.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-bold text-xl mb-4">Not Included</h3>
          <ul className="space-y-2">
            {tour.notIncluded.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Card className="mb-8 bg-card dark:bg-card/95 border-border">
        <CardContent className="p-6">
          <h4 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Interactive Route Map
          </h4>
          <div className="relative bg-linear-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
              <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-green-100 rounded-lg opacity-50"></div>

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#43a8a0" />
                    <stop offset="100%" stopColor="#ff817d" />
                  </linearGradient>
                </defs>
                <path
                  d="M 60 220 Q 120 80 180 150 Q 240 200 300 120 Q 360 160 420 90"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="drop-shadow-sm"
                />
              </svg>

              <div className="relative grid grid-cols-3 gap-6 h-72 p-4">
                {tour.itinerary.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center ${
                      index % 2 === 0 ? "self-end" : "self-start"
                    }`}
                  >
                    <div className="relative group">
                      <div className="w-12 h-12 bg-linear-to-br from-primary to-primary dark:to-primary/80 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer border-4 border-background">
                        {index + 1}
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-xs text-center mt-3 max-w-24">
                      <div className="font-bold text-primary bg-background px-2 py-1 rounded-full shadow-sm">
                        {item.time}
                      </div>
                      <div className="text-foreground font-semibold mt-1 leading-tight">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute top-4 right-4 bg-background/95 dark:bg-background/98 backdrop-blur rounded-lg p-3 shadow-lg">
                <div className="text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-linear-to-r from-primary to-primary-dark rounded-full"></div>
                    <span className="font-medium">Tour Route</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Live Location</span>
                  </div>
                  <div className="text-muted-foreground">Total: ~8 hours</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 dark:bg-background/90 px-2 py-1 rounded">
                Interactive map powered by Google Maps
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
