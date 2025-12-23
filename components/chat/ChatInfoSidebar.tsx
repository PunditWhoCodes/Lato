"use client"

import { X, Clock, Users, Star, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

interface ChatInfoSidebarProps {
  isOpen: boolean
  onClose: () => void
  company: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    responseTime: string
    reviewCount?: number
    isOnline?: boolean
    timezone?: string
  }
  tour: {
    id: number
    title: string
    price: number
    duration?: string
    groupSize?: string
    image?: string
  }
}

export function ChatInfoSidebar({
  isOpen,
  onClose,
  company,
  tour,
}: ChatInfoSidebarProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()

  const getLocalTime = (timezone?: string) => {
    if (!timezone) return null
    try {
      return new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    } catch {
      return null
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  return (
    <>
      {/* Backdrop (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative right-0 top-0 h-full
          w-[340px] bg-white z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full lg:hidden"}
          overflow-y-auto p-4 space-y-4
        `}
      >
        {/* Close Button (subtle, intentional) */}
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Company Header */}
        <div className="flex items-start gap-3 pt-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={company.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-[#00A699] text-white">
              {getInitials(company.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#1C1B1F]">
                {company.name}
              </span>
              {company.verified && (
                <CheckCircle2 className="w-4 h-4 fill-[#00A699] text-white" />
              )}
            </div>

            {/* Status Line */}
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
              {/* Online Indicator */}
              <span
                className={`w-2 h-2 rounded-full ${
                  company.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <span>{company.isOnline ? "Online" : "Offline"}</span>
              <span className="text-gray-300">•</span>
              <span>{company.responseTime}</span>
              {company.timezone && getLocalTime(company.timezone) && (
                <>
                  <span className="text-gray-300">•</span>
                  <span>Local time: {getLocalTime(company.timezone)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tour Details Card */}
        <div className="border border-[#00A792A3] rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium mb-3">Tour Details</h3>

          {tour.image && (
            <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h4 className="font-light mb-3 leading-tight">
            {tour.title}
          </h4>

          <div className="space-y-2 mb-4">
            {tour.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {tour.duration}
              </div>
            )}
            {tour.groupSize && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {tour.groupSize}
              </div>
            )}
          </div>

          <div className="flex items-end justify-between mb-5">
            <span className="text-xl font-bold text-[#7BBCB0]">
              USD {tour.price.toLocaleString()}
            </span>
            <span className="text-sm text-[#6B7280]">
              Per person
            </span>
          </div>

          <div className="space-y-3">
            <Link
              href={`/tours/${tour.id}`}
              className="block w-full rounded-full bg-[#00A792] py-3 text-center text-white text-sm font-normal border-2 border-[#00A792]"
            >
              View Tour Details
            </Link>

            <Link
              href={`/tours/${tour.id}/book`}
              className="block w-full rounded-full border border-[#A7A9AF] py-3 text-center text-[#3A3A3A] text-sm font-normal hover:bg-gray-50"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* About Company Card */}
        <div className="border border-[#00A792A3] rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium text-xl leading-tight mb-3">About Company</h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(company.rating)}</div>
            <span className="font-semibold">
              {company.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({company.reviewCount || 0} Reviews)
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            {company.responseTime}
          </p>

          <Link
            href={`/companies/${company.id}`}
            className="block w-full rounded-full border border-[#A7A9AF] py-3 text-center text-[#3A3A3A] text-sm font-normal hover:bg-gray-50"
          >
            View Company Profile
          </Link>
        </div>
      </aside>
    </>
  )
}
