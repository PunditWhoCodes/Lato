"use client"

import Image from "next/image"
import { Heart, Star, Plane, Check, BadgeCheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { CompanyStats } from "@/lib/types/investor"

interface CompanyHeaderProps {
  name: string
  logo?: string
  verified: boolean
  location: string
  stats: CompanyStats
  isSaved?: boolean
  onSaveToggle?: () => void
  onViewAllTours?: () => void
}

export function CompanyHeader({
  name,
  logo,
  verified,
  location,
  stats,
  isSaved = false,
  onSaveToggle,
  onViewAllTours,
}: CompanyHeaderProps) {
  return (
    <section className="rounded-3xl bg-white px-6 py-8 md:px-10 md:py-10 border border-black/5">
      {/* Header actions */}
      <div className="flex justify-end items-center gap-3 mb-2">
        <Button
          onClick={onViewAllTours}
          variant="outline"
          className="rounded-full  border-primary text-primary hover:bg-primary text-[#00A792] font-poppins font-extralight text-sm px-5 h-9 ml-4"
        >
          View all tours
        </Button>

        <button
          onClick={onSaveToggle}
          aria-label="Save company"
          className="w-11 h-11 rounded-full flex items-center justify-center transition shadow-lg"
        >
          <Heart
            className={cn(
              "w-5 h-5",
              isSaved
                ? "fill-red-500 text-red-500"
                : "text-red-500"
            )}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <div className="size-60 md:size-72 rounded-2xl bg-lime-300 flex items-center justify-center overflow-hidden">
            {logo ? (
              <Image
                src={logo}
                alt={name}
                width={240}
                height={240}
                className="object-cover"
              />
            ) : (
              <Plane className="w-20 h-20 text-black" />
            )}
          </div>
        </div>

        {/* Company Info */}
        <div>
          {/* Name */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-semibold text-black">
                {name}
              </h1>
              {verified && (
                <span className="inline-flex w-6 h-6 rounded-full bg-primary items-center justify-center">
                  <BadgeCheckIcon className="w-4 h-4 text-white" strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="text-gray-500">
              {location}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {/* Left column */}
            <div className="space-y-5">
              <StatRow label="Number of tours" value={stats.numberOfTours} />
              <StatRow label="Number of reviews" value={stats.numberOfReviews} />
              <StatRow label="Response rate" value={`${stats.responseRate}%`} />
              <StatRow label="Years of Experience" value={`${stats.yearsExperience} Years`} />
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <StatRow label="Age Range" value={stats.ageRange} />
              <StatRow
                label="Rating"
                value={
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#FFA432] text-[#FFA432]" />
                    {stats.rating}
                    <span className="text-gray-400">/5</span>
                  </span>
                }
              />
              <StatRow label="Response time" value={stats.responseTime} />
              <StatRow label="Repeated customers" value={`${stats.repeatedCustomers}%`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Helper */
function StatRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 pb-2">
      <span className="text-gray-500 text-sm">
        {label}
      </span>
      <span className="text-black font-light">
        {value}
      </span>
    </div>
  )
}
