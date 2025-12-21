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
    <div className="bg-[#F9FAFBCC] rounded-xl p-5 md:p-6 border border-[#E5E7EB]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Left Side - User Info and Review */}
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#FFA432] text-white font-poppins font-medium text-sm">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <span className="font-poppins font-medium text-sm text-primary">
                {user.name}
              </span>
              {user.verified && (
                <span className="inline-flex items-center gap-1 text-xs text-primary font-poppins bg-primary/10 px-2 py-0.5 rounded-full">
                  <BadgeCheckIcon className="size-5 text-[#00A792]" />
                  Verified Traveler
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-[#FFA432] text-[#FFA432]"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="font-poppins font-semibold text-sm text-black">
              {rating.toFixed(1)}
            </span>
            <span className="font-poppins text-sm text-primary">
              {ratingLabel}
            </span>
          </div>

          {/* Review Title */}
          <h4 className="font-poppins font-semibold text-sm text-black mb-2">
            {title}
          </h4>

          {/* Review Comment */}
          <p className="font-poppins text-sm text-gray-500 leading-relaxed">
            {comment}
          </p>
        </div>
        {/* Right Side - Date */}
        <div className="md:text-right flex-shrink-0">
          <span className="font-poppins text-xs text-gray-400">
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}
