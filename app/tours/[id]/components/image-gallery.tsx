"use client"

import { useState } from "react"
import Image from "next/image"
import { Images, LayoutGrid, X } from "lucide-react"

interface ImageGalleryProps {
  images: string[]
  title: string
  discountPercent?: number
}

export function ImageGallery({ images, title, discountPercent }: ImageGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  // Ensure we have at least 4 images for the grid
  const displayImages = images.length >= 4 ? images : [...images, ...images, ...images, ...images].slice(0, 4)

  return (
    <>
      {/* Desktop Gallery Grid - Main image left, 3 stacked images right */}
      <div className="hidden md:flex gap-2 h-[420px] md:h-[550px] rounded-2xl overflow-hidden">
        {/* Main Large Image - Left Side with OFF Badge */}
        <div className="relative w-[80%] h-full rounded-2xl overflow-hidden">
          <Image
            src={displayImages[0]}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* OFF Badge - Top Left */}
          {discountPercent && discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-[#F23813] text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              -{discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Right Side - 3 images stacked in single column */}
        <div className="w-[20%] flex flex-col gap-2">
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <Image
              src={displayImages[1]}
              alt={`${title} - Image 2`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <Image
              src={displayImages[2]}
              alt={`${title} - Image 3`}
              fill
              className="object-cover"
            />
          </div>
          {/* Last image with View All Photos button */}
          <div className="relative flex-1 rounded-xl overflow-hidden">
            <Image
              src={displayImages[3]}
              alt={`${title} - Image 4`}
              fill
              className="object-cover"
            />
            {/* View All Photos Button - Bottom Right */}
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-full flex items-center gap-2 text-[#1C1B1F] hover:bg-gray-100 transition-colors shadow-md"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-sm font-medium">View all photos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Gallery */}
      <div className="md:hidden relative">
        <div className="relative h-[280px] rounded-2xl overflow-hidden">
          <Image
            src={displayImages[0]}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* OFF Badge - Top Left */}
          {discountPercent && discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-[#F23813] text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{discountPercent}% OFF
            </div>
          )}
          {/* View All Photos Button */}
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium text-[#1C1B1F]"
          >
            <Images className="w-3.5 h-3.5" />
            View all
          </button>
        </div>
      </div>

      {/* Full Screen Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/80">
            <h3 className="text-white text-lg font-medium">{title}</h3>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="text-white hover:text-gray-300 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Photo Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
