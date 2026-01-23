"use client"

import Image from "next/image"
import { Heart, Star, Plane, BadgeCheckIcon } from "lucide-react"
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
    <section className="rounded-[10px] lg:rounded-3xl bg-white px-[26px] py-[21px] lg:px-10 lg:py-10 border border-black/5 relative">
      {/* Save button - positioned absolute on mobile */}
      <button
        onClick={onSaveToggle}
        aria-label="Save company"
        className="absolute top-[30px] right-[26px] lg:relative lg:top-auto lg:right-auto w-[46px] h-[46px] lg:w-11 lg:h-11 rounded-full flex items-center justify-center bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border border-black/5 z-10"
      >
        <Heart
          className={cn(
            "w-5 h-5",
            isSaved ? "fill-red-500 text-red-500" : "text-red-500"
          )}
        />
      </button>

      {/* Desktop header actions - hidden on mobile */}
      <div className="hidden lg:flex justify-end items-center gap-3 mb-2">
        <Button
          onClick={onViewAllTours}
          variant="outline"
          className="rounded-full border-primary text-primary hover:bg-primary text-[#00A792] font-poppins font-extralight text-sm px-5 h-9 ml-4"
        >
          View all tours
        </Button>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-[26px]">
        {/* Logo/Image - Full width on mobile */}
        <div className="w-full h-[251px] rounded-[13px] bg-lime-300 flex items-center justify-center overflow-hidden">
          {logo ? (
            <Image
              src={logo}
              alt={name}
              width={320}
              height={251}
              className="object-cover w-full h-full"
            />
          ) : (
            <Plane className="w-20 h-20 text-black" />
          )}
        </div>

        {/* Company Info */}
        <div className="flex flex-col gap-[18px]">
          {/* Name and Location */}
          <div className="flex flex-col gap-[11px]">
            <div className="flex items-start gap-[5px]">
              <h1 className="font-poppins font-medium text-[29px] leading-[1.5] text-black">
                {name}
              </h1>
              {verified && (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1">
                  <circle cx="11" cy="11" r="11" fill="#00A792"/>
                  <path d="M6 11L9.5 14.5L16 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p className="font-poppins font-light text-[13.4px] leading-[1.5] text-black">
              {location}
            </p>
          </div>

          {/* Stats - Single column on mobile */}
          <div className="flex flex-col gap-[13px]">
            {/* First group */}
            <div className="flex flex-col gap-[13px]">
              <MobileStatRow label="Number of tours" value={stats.numberOfTours} />
              <MobileStatRow label="Number of reviews" value={stats.numberOfReviews} />
              <MobileStatRow label="Response rate" value={`${stats.responseRate}%`} />
              <MobileStatRow label="Years of Experience" value={`${stats.yearsExperience} Years`} />
            </div>

            {/* Second group */}
            <div className="flex flex-col gap-[13px] mt-[29px]">
              <MobileStatRow label="Age Range" value={stats.ageRange} />
              <MobileStatRow
                label="Rating"
                value={
                  <span className="flex items-center gap-1">
                    {stats.rating}/5
                    <Star className="w-[11px] h-[11px] fill-[#FFA432] text-[#FFA432]" />
                  </span>
                }
              />
              <MobileStatRow label="Response time" value={stats.responseTime} />
              <MobileStatRow label="Repeated customers" value={`${stats.repeatedCustomers}%`} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
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

/* Mobile Stat Row */
function MobileStatRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/25 py-[11.5px]">
      <span className="font-poppins font-light text-[11.5px] leading-[1.5] text-black">
        {label}
      </span>
      <span className="font-poppins text-[11.5px] leading-[1.5] text-black">
        {value}
      </span>
    </div>
  )
}

/* Desktop Stat Row */
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
