"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"
import { ImageIcon } from "lucide-react"

// Default fallback image for when images fail to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  shimmerClassName?: string
  fallbackSrc?: string
  showFallbackIcon?: boolean
  onLoad?: () => void
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

export function ShimmerImage({
  src,
  alt,
  className,
  shimmerClassName,
  fallbackSrc,
  showFallbackIcon = true,
  onLoad,
  onError,
  ...props
}: ShimmerImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [triedFallback, setTriedFallback] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true)
    setHasError(false)
    setTriedFallback(false)
    setImageSrc(src)

    const img = imgRef.current
    if (img && img.complete && img.naturalHeight !== 0) {
      setIsLoading(false)
      setHasError(false)
    }
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Try fallback image if not already tried
    if (!triedFallback) {
      setTriedFallback(true)
      setImageSrc(fallbackSrc || FALLBACK_IMAGE)
      return
    }

    // If fallback also failed, show error state
    setIsLoading(false)
    setHasError(true)
    onError?.(e)
  }

  return (
    <div className="relative w-full h-full">
      {/* Shimmer skeleton - shown while loading */}
      {isLoading && !hasError && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10",
            shimmerClassName
          )}
        />
      )}

      {/* Error fallback UI */}
      {hasError && showFallbackIcon && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="flex flex-col items-center text-gray-400">
            <ImageIcon className="w-8 h-8 mb-1" />
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading || hasError ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
