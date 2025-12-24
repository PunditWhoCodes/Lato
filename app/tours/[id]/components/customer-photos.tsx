"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

interface CustomerPhotosProps {
  photos?: string[]
}

const defaultPhotos = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
]

export function CustomerPhotos({ photos = defaultPhotos }: CustomerPhotosProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed

      // Reset scroll position when reaching half (since we duplicate photos)
      const halfWidth = scrollContainer.scrollWidth / 2
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    // Start animation
    animationId = requestAnimationFrame(scroll)

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Duplicate photos for seamless infinite scroll
  const duplicatedPhotos = [...photos, ...photos]

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#1C1B1F]">Customer Photos</h2>
        <button className="text-sm text-[#1C1B1F] hover:text-[#00A792] transition-colors">
          View All Details
        </button>
      </div>

      {/* Auto-scrolling Photo Slider */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-xl overflow-hidden"
          >
            <Image
              src={photo}
              alt={`Customer photo ${(index % photos.length) + 1}`}
              width={240}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
