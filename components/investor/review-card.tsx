"use client"

import { Star, BadgeCheckIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { CompanyReview } from "@/lib/types/investor"

interface ReviewCardProps {
  review: CompanyReview
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { user, rating, ratingLabel, title, comment, date } = review

  return (
    <div className="bg-[#F9FAFBCC] rounded-[9px] lg:rounded-xl p-[14px] lg:p-6 border-[0.57px] lg:border border-[#E5E7EB]">
      <div className="flex flex-col gap-[9px] lg:gap-4">
        {/* User Info */}
        <div className="flex items-center gap-[9px] lg:gap-3">
          <Avatar className="w-[28px] h-[28px] lg:w-8 lg:h-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-[#FFA432] text-white font-poppins font-medium text-[10px] lg:text-sm">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-[6px] lg:gap-2">
            <span className="font-poppins font-medium text-[10px] lg:text-sm text-primary">
              {user.name}
            </span>
            {user.verified && (
              <span className="inline-flex items-center gap-[3px] lg:gap-1 text-[8px] lg:text-xs text-primary font-poppins bg-primary/10 px-[6px] lg:px-2 py-[2px] lg:py-0.5 rounded-full">
                <BadgeCheckIcon className="w-[12px] h-[12px] lg:size-5 text-[#00A792]" />
                <span className="lg:inline">Verified Traveler</span>
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-[6px] lg:gap-2">
          <div className="flex items-center gap-[2px] lg:gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-[10px] h-[10px] lg:w-4 lg:h-4 ${
                  i < rating
                    ? "fill-[#FFA432] text-[#FFA432]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="font-poppins font-semibold text-[9px] lg:text-sm text-black">
            {rating.toFixed(1)}
          </span>
          <span className="font-poppins text-[9px] lg:text-sm text-primary">
            {ratingLabel}
          </span>
        </div>

        {/* Review Title */}
        <h4 className="font-poppins font-semibold text-[10px] lg:text-sm text-black">
          {title}
        </h4>

        {/* Review Comment */}
        <p className="font-poppins text-[9px] lg:text-sm text-gray-500 leading-[1.5] lg:leading-relaxed">
          {comment}
        </p>

        {/* Date */}
        <span className="font-poppins text-[8px] lg:text-xs text-gray-400">
          {date}
        </span>
      </div>
    </div>
  )
}
