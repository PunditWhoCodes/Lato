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
      <Card className="group cursor-pointer border-0 bg-transparent shadow-none flex flex-col items-center gap-[7px] lg:gap-4">

        {/* Image - Mobile: 139px x 104.55px, 6.45px radius | Desktop: larger */}
        <div className="overflow-hidden rounded-[6.45px] lg:rounded-2xl w-full h-[105px] lg:h-64">
          <ShimmerImage
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Text Container */}
        <div className="flex flex-col items-center gap-[6.78px] lg:gap-1">
          {/* Destination Name - Mobile: 9.68px, 500 weight | Desktop: larger */}
          <h3 className="text-center font-poppins text-[9.68px] lg:text-xl font-medium text-black leading-[150%]">
            {name}
          </h3>

          {/* Tour Count - Mobile: 5.16px, 300 weight | Desktop: larger */}
          {tourCount !== undefined && tourCount > 0 && (
            <p className="text-center text-[5.16px] lg:text-sm text-[#595959] font-poppins font-light leading-[150%]">
              {tourCount}+ Tours
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
