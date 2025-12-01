"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface DestinationCardProps {
  name: string
  image: string
  href: string
  tourCount?: number
}

export function DestinationCard({ name, image, href, tourCount }: DestinationCardProps) {
  return (
    <Link href={href}>
      <Card className="group relative overflow-hidden rounded-4xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-80">
        <div className="relative w-full h-full">
          <ShimmerImage
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-poppins font-bold text-2xl mb-2">
              {name}
            </h3>
            {tourCount && (
              <p className="text-white/90 font-mulish text-sm">
                {tourCount} {tourCount === 1 ? 'tour' : 'tours'} available
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
