"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  shimmerClassName?: string
  onLoad?: () => void
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

export function ShimmerImage({
  src,
  alt,
  className,
  shimmerClassName,
  onLoad,
  onError,
  ...props
}: ShimmerImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true)
    setHasError(false)
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
    setIsLoading(false)
    setHasError(true)
    onError?.(e)
  }

  return (
    <div className="relative w-full h-full">
      {/* Shimmer skeleton - shown while loading */}
      {isLoading && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10",
            shimmerClassName
          )}
        />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
