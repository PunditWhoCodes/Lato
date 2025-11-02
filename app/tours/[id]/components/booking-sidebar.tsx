"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Shield } from "lucide-react"
import { ChatButton } from "@/components/chat-button"
import type { TourDetail } from "@/types"

interface BookingSidebarProps {
  tour: TourDetail
}

export function BookingSidebar({ tour }: BookingSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 z-20">
        <Card className="shadow-xl dark:shadow-primary/20 bg-card dark:bg-card/95 border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-3xl text-primary">€{tour.price}</span>
                  {tour.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">€{tour.originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>
              {tour.originalPrice && (
                <Badge className="bg-destructive text-destructive-foreground">
                  Save €{tour.originalPrice - tour.price}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold">{tour.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Group size:</span>
                <span className="font-semibold">{tour.groupSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Difficulty:</span>
                <Badge variant="outline">{tour.difficulty}</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Check Availability
              </Button>
              <ChatButton
                companyId={tour.company.id}
                tourId={tour.id}
                variant="outline"
                size="lg"
                className="w-full bg-transparent"
              />
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <Shield className="w-4 h-4 inline mr-1" />
              Free cancellation up to 24 hours before
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
