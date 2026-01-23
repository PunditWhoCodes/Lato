"use client"

import { useState } from "react"
import Image from "next/image"
import { Images, LayoutGrid, X, Heart } from "lucide-react"
import { useSavedTours } from "@/lib/saved-tours-context"
import type { Tour } from "@/types"

interface ImageGalleryProps {
  images: string[]
  title: string
  discountPercent?: number
  tourId?: string
  tourData?: Partial<Tour>
}

export function ImageGallery({ images, title, discountPercent, tourId, tourData }: ImageGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const isFavorite = tourId ? isTourSaved(tourId) : false

  const handleToggleSave = () => {
    if (!tourId) return
    if (tourData) {
      toggleSaveTour(tourId, {
        id: tourData.id || 0,
        uuid: tourData.uuid || tourId,
        title: tourData.title || title,
        company: tourData.company || "",
        companyId: tourData.companyId || "",
        companyCountry: tourData.companyCountry || "",
        companyFlag: tourData.companyFlag || "",
        price: tourData.price || 0,
        originalPrice: tourData.originalPrice,
        rating: tourData.rating || 0,
        reviews: tourData.reviews || 0,
        duration: tourData.duration || "",
        groupSize: tourData.groupSize || "",
        location: tourData.location || "",
        destination: tourData.destination || "",
        travelStyle: tourData.travelStyle || "",
        image: tourData.image || images[0] || "",
        badges: tourData.badges || [],
        category: tourData.category || "",
        difficulty: tourData.difficulty || "",
        highlights: tourData.highlights || [],
        tourType: tourData.tourType || "",
      })
    } else {
      toggleSaveTour(tourId)
    }
  }

  // Ensure we have at least 4 images for the grid
  const displayImages = images.length >= 4 ? images : [...images, ...images, ...images, ...images].slice(0, 4)

  return (
    <>
      {/* Desktop Gallery Grid - Main image left, 3 stacked images right */}
      <div className="hidden md:flex gap-2 h-[420px] md:h-[550px] rounded-2xl overflow-hidden bg-white p-3">
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

      {/* Mobile Gallery - Figma: 368px x 296px container */}
      <div className="md:hidden flex justify-center">
        <div className="bg-white rounded-[8.76px] p-[10px] w-[368px]">
          {/* Main Image - Figma: 348.24px x 195.34px */}
          <div className="relative w-[348px] h-[195px] rounded-[8.69px] overflow-hidden">
            <Image
              src={displayImages[0]}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* OFF Badge - Figma: 41.43px x 11.07px, 4.72px font */}
            {discountPercent && discountPercent > 0 && (
              <div className="absolute top-[6px] left-[6px] bg-[#F23813] text-white px-[4.72px] py-0 h-[11px] rounded-[6.29px] text-[4.72px] font-poppins font-medium uppercase flex items-center justify-center">
                Up to {discountPercent}% Off
              </div>
            )}
            {/* Heart/Wishlist Icon - Figma: 27.32px x 25.94px, top right */}
            {tourId && (
              <button
                onClick={handleToggleSave}
                className="absolute top-[9.69px] right-[9px] w-[27.32px] h-[25.94px] bg-white rounded-full flex items-center justify-center shadow-[0px_6.22px_9.32px_-1.86px_rgba(0,0,0,0.1),0px_2.49px_3.73px_-2.49px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 p-[3.73px]"
                aria-label={isFavorite ? "Remove from saved tours" : "Save tour"}
              >
                <Heart
                  className={`w-[19.86px] h-[18.48px] transition-colors ${
                    isFavorite ? "fill-[#F23813] text-[#F23813]" : "fill-[#F23813] text-[#F23813]"
                  }`}
                />
              </button>
            )}
          </div>

          {/* Thumbnail Row - Figma: gap 6.31px, mt 9.64px */}
          <div className="flex items-center gap-[6.31px] mt-[9.64px]">
            {/* Thumbnail 1 - Figma: 109.78px x 61.54px */}
            <div className="relative w-[109.78px] h-[61.54px] rounded-[10.51px] overflow-hidden flex-shrink-0">
              <Image
                src={displayImages[1]}
                alt={`${title} - Image 2`}
                fill
                className="object-cover"
              />
            </div>
            {/* Thumbnail 2 - Figma: 109.78px x 61.54px */}
            <div className="relative w-[109.78px] h-[61.54px] rounded-[10.51px] overflow-hidden flex-shrink-0">
              <Image
                src={displayImages[2]}
                alt={`${title} - Image 3`}
                fill
                className="object-cover"
              />
            </div>
            {/* View All Photos Button - Figma: 116.08px x 65.07px */}
            <button
              onClick={() => setShowAllPhotos(true)}
              className="w-[116.08px] h-[65.07px] bg-white rounded-[10.51px] shadow-[0px_7.86px_9.83px_-1.97px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center flex-shrink-0"
            >
              <div className="flex items-center gap-[3.88px] bg-white/95 rounded-full px-[9.71px] py-[5.82px]">
                <LayoutGrid className="w-[9.06px] h-[10.4px] text-[#111928]" strokeWidth={1.5} />
                <span className="font-poppins text-[6.8px] font-medium text-[#111928]">View all photos</span>
              </div>
            </button>
          </div>
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
