"use client"

/**
 * Google Attribution Component
 *
 * Required by Google Terms of Service when displaying Google Places reviews.
 * Shows "Powered by Google" logo and review count.
 */

import { ExternalLink } from 'lucide-react'

interface GoogleAttributionProps {
  /**
   * Number of Google reviews displayed
   */
  reviewCount: number
  /**
   * Optional className for styling
   */
  className?: string
}

/**
 * Google attribution component for TOS compliance
 * Must be displayed near Google Places reviews
 */
export function GoogleAttribution({ reviewCount, className = '' }: GoogleAttributionProps) {
  if (reviewCount === 0) return null

  return (
    <div
      className={`flex items-center justify-between pt-4 mt-4 border-t border-[#E5E5E5] ${className}`}
    >
      <div className="flex items-center gap-3">
        {/* Google logo - using SVG for TOS compliance */}
        <svg
          width="66"
          height="22"
          viewBox="0 0 66 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          <path
            d="M8.43 11.24c0 3.46-2.7 6-6.04 6-3.33 0-6.04-2.54-6.04-6s2.71-6 6.04-6c3.34 0 6.04 2.54 6.04 6zm-2.65 0c0-2.15-1.56-3.63-3.39-3.63-1.83 0-3.39 1.48-3.39 3.63 0 2.13 1.56 3.63 3.39 3.63 1.83 0 3.39-1.5 3.39-3.63z"
            fill="#4285F4"
            transform="translate(5.65, 1)"
          />
          <path
            d="M24.04 11.24c0 3.46-2.71 6-6.04 6-3.34 0-6.04-2.54-6.04-6s2.7-6 6.04-6c3.33 0 6.04 2.54 6.04 6zm-2.66 0c0-2.15-1.56-3.63-3.38-3.63-1.83 0-3.39 1.48-3.39 3.63 0 2.13 1.56 3.63 3.39 3.63 1.82 0 3.38-1.5 3.38-3.63z"
            fill="#EA4335"
            transform="translate(5.65, 1)"
          />
          <path
            d="M39.04 5.53v10.97c0 4.51-2.66 6.35-5.8 6.35-2.96 0-4.74-1.98-5.41-3.6l2.31-.96c.42 1 1.43 2.18 3.1 2.18 2.02 0 3.28-1.25 3.28-3.6v-.88h-.1c-.6.74-1.77 1.4-3.24 1.4-3.08 0-5.9-2.69-5.9-6.14 0-3.47 2.82-6.19 5.9-6.19 1.46 0 2.63.66 3.24 1.38h.1V5.53h2.52zm-2.33 5.74c0-2.11-1.41-3.66-3.21-3.66-1.82 0-3.35 1.55-3.35 3.66 0 2.09 1.53 3.6 3.35 3.6 1.8 0 3.21-1.51 3.21-3.6z"
            fill="#FBBC05"
            transform="translate(5.65, 1)"
          />
          <path
            d="M45.25.77v16.16h-2.6V.77h2.6z"
            fill="#34A853"
            transform="translate(5.65, 1)"
          />
          <path
            d="M55.84 13.48l2.06 1.37c-.66.98-2.26 2.68-5.03 2.68-3.43 0-5.99-2.65-5.99-6.03 0-3.59 2.58-6.03 5.7-6.03 3.13 0 4.67 2.49 5.17 3.84l.28.69-8.08 3.35c.62 1.21 1.58 1.83 2.93 1.83 1.36 0 2.3-.67 2.96-1.7zm-6.34-2.17l5.4-2.24c-.3-.75-1.19-1.28-2.25-1.28-1.35 0-3.23 1.19-3.15 3.52z"
            fill="#EA4335"
            transform="translate(5.65, 1)"
          />
        </svg>

        <span className="text-sm text-[#6B7280]">
          {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'} from Google
        </span>
      </div>

      <a
        href="https://www.google.com/maps"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-[#00A699] hover:underline"
      >
        View on Google Maps
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  )
}

/**
 * Badge shown on individual Google reviews
 */
export function GoogleReviewBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F3F4F6] rounded text-xs text-[#6B7280]">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Google
    </span>
  )
}
