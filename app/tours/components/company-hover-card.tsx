"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Star, Building2, Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Tour } from "@/types"

interface CompanyHoverCardProps {
  tour: Tour
  children: React.ReactNode
}

export function CompanyHoverCard({ tour, children }: CompanyHoverCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="fixed z-50 w-96 bg-card dark:bg-card/98 rounded-xl shadow-2xl dark:shadow-primary/20 border border-border p-6 pointer-events-none"
          style={{
            left: position.x - 192, // Center the card (384px / 2 = 192px)
            top: position.y,
            transform: "translateY(-100%)",
          }}
        >
          <div className="space-y-4">
            {/* Header with logo, name, and country */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Company logo placeholder */}
                <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary dark:from-primary/80 dark:to-secondary/80 rounded-full flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">{tour.company}</h3>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                <span className="text-lg">{tour.companyFlag}</span>
                <span className="text-sm font-medium text-muted-foreground">{tour.companyCountry}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{tour.location}</span>
            </div>

            {/* Expertise badges */}
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs font-medium">
                Cooking Master
              </Badge>
              <Badge variant="secondary" className="text-xs font-medium">
                Market Expert
              </Badge>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Traditional {tour.companyCountry.toLowerCase()} cooking experts sharing authentic recipes and market
              secrets.
            </p>

            {/* Statistics grid */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-sm">{tour.rating}</span>
                <span className="text-xs text-muted-foreground">({tour.reviews})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">6 years</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">10 tours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">3 languages</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Link
                href={`/companies/${tour.companyId}`}
                className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors pointer-events-auto text-center"
              >
                View Profile
              </Link>
              <button className="flex items-center justify-center gap-2 bg-muted hover:bg-muted/80 text-muted-foreground text-sm font-medium py-2.5 px-4 rounded-lg transition-colors pointer-events-auto">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
