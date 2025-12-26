"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ShimmerImage } from "@/components/ui/shimmer-image"

interface DestinationCardProps {
  name: string
  image: string
  href: string
  tourCount?: number
  flag?: string
}

export function DestinationCard({
  name,
  image,
  href,
  tourCount,
  flag,
}: DestinationCardProps) {
  return (
    <Link href={href}>
      <Card className="group cursor-pointer border-0 bg-transparent shadow-none">
        
        {/* Image */}
        <div className="overflow-hidden rounded-2xl w-full h-52 md:h-64 mb-4">
          <ShimmerImage
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Destination Name */}
        <h3 className="text-center font-poppins text-lg md:text-xl font-medium text-black mb-1">
          {flag && <span className="mr-2">{flag}</span>}
          {name}
        </h3>

        {/* Tour Count */}
        {tourCount !== undefined && tourCount > 0 && (
          <p className="text-center text-sm text-gray-500 font-mulish">
            {tourCount}+ Tours
          </p>
        )}
      </Card>
    </Link>
  )
}
