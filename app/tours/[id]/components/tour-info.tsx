"use client"

import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Globe, Star, Shield } from "lucide-react"
import type { TourDetail } from "@/types"
import { TourInfoProps } from "../types"

export function TourInfo({ tour, onCompanyClick }: TourInfoProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tour.badges.map((badge, index) => (
          <Badge key={index} className="bg-accent text-accent-foreground">
            {badge}
          </Badge>
        ))}
      </div>

      <h1 className="font-heading font-black text-3xl md:text-4xl text-foreground mb-2">{tour.title}</h1>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onCompanyClick}
          className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          by {tour.company.name}
        </button>
        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
          <span className="text-sm">{tour.company.countryFlag}</span>
          <span className="text-xs text-muted-foreground">{tour.company.country}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{tour.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{tour.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>{tour.groupSize}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <span>{tour.languages.join(", ")}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-lg">{tour.rating}</span>
          <span className="text-muted-foreground">({tour.reviews.length} reviews)</span>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <Shield className="w-4 h-4 mr-1" />
          Verified
        </Badge>
      </div>
    </div>
  )
}
