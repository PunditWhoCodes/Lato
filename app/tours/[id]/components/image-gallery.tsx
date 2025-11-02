"use client"

import { Button } from "@/components/ui/button"
import { Heart, Share2, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import { useSavedTours } from "@/lib/saved-tours-context"
import { cn } from "@/lib/utils"
import { ImageGalleryProps } from "../types"

export function ImageGallery({ images, title, tourId, currentImageIndex, setCurrentImageIndex }: ImageGalleryProps) {
  const { toggleSaveTour, isTourSaved } = useSavedTours()
  const isSaved = isTourSaved(tourId)

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)
  }

  const handleSaveClick = () => {
    toggleSaveTour(tourId)
  }

  return (
    <div className="relative">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <ShimmerImage
          src={images[currentImageIndex] || "/placeholder.svg?height=400&width=600&query=tour+image"}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/guided-city-tour.png"
          }}
        />
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute top-4 right-4 backdrop-blur-sm transition-all hover:scale-110",
            isSaved
              ? "bg-primary hover:bg-primary/90"
              : "bg-background/80 dark:bg-background/90 hover:bg-background dark:hover:bg-background/95"
          )}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Remove from saved tours" : "Save tour"}
        >
          <Heart className={cn("h-5 w-5 transition-all", isSaved ? "fill-white text-white" : "text-foreground")} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-16 bg-background/80 dark:bg-background/90 hover:bg-background dark:hover:bg-background/95 backdrop-blur-sm"
        >
          <Share2 className="h-5 w-5 text-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 dark:bg-background/90 hover:bg-background dark:hover:bg-background/95 backdrop-blur-sm"
          onClick={prevImage}
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 dark:bg-background/90 hover:bg-background dark:hover:bg-background/95 backdrop-blur-sm"
          onClick={nextImage}
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </Button>
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          <Camera className="w-4 h-4 inline mr-1" />
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
      <div className="flex gap-2 mt-4 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
              index === currentImageIndex ? "border-primary" : "border-transparent"
            }`}
          >
            <ShimmerImage
              src={image || "/placeholder.svg?height=80&width=80&query=tour+thumbnail"}
              alt=""
              className="w-full h-full object-cover"
              shimmerClassName="rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/vibrant-city-tour.png"
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
