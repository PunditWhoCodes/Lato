"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Shield, Award } from "lucide-react"
import { ChatButton } from "@/components/chat-button"
import type { TourDetail } from "@/types"

interface CompanySectionProps {
  company: TourDetail["company"]
}

export function CompanySection({ company }: CompanySectionProps) {
  return (
    <section id="company" className="space-y-6 pt-4">
      <h3 className="font-heading font-bold text-2xl mb-6">About the Company</h3>
      <Card className="bg-card dark:bg-card/95 border-border">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={company.avatar || "/placeholder.svg"} />
              <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-heading font-bold text-xl">{company.name}</h4>
                <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full">
                  <span className="text-sm">{company.countryFlag}</span>
                  <span className="text-xs text-muted-foreground">{company.country}</span>
                </div>
                {company.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{company.rating}</span>
                  <span className="text-muted-foreground">({company.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">5 years experience</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{company.responseTime}</p>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/companies/${company.id}`}>View Profile</Link>
                </Button>
                <ChatButton companyId={company.id} variant="outline" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
