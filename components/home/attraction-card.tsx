"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface AttractionCardProps {
  name: string
  location: string
  description: string
  image: string
  href: string
}

export function AttractionCard({ name, location, description, image, href }: AttractionCardProps) {
  return (
    <Card className="bg-white border-0 shadow-xl rounded-4xl overflow-hidden h-full">
      <div className="relative h-96">
        <ShimmerImage
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>

      <CardContent className="p-8">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
          <span className="font-mulish font-semibold text-text-muted text-sm">
            {location}
          </span>
        </div>

        <h3 className="font-poppins font-bold text-2xl md:text-3xl text-text-primary mb-4">
          {name}
        </h3>

        <p className="font-openSans text-text-secondary text-base leading-relaxed mb-6">
          {description}
        </p>

        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-4xl py-6 font-montserrat font-semibold text-base shadow-md hover:shadow-lg transition-all"
        >
          <Link href={href}>
            Explore Now
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
