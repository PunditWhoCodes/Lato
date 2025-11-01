import React from "react"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "", width = 120, height = 40 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Compass/Globe Icon */}
      <circle cx="20" cy="20" r="14" fill="#43a8a0" opacity="0.1" />
      <circle cx="20" cy="20" r="10" stroke="#43a8a0" strokeWidth="2" fill="none" />
      <path
        d="M20 10 L20 30 M10 20 L30 20"
        stroke="#43a8a0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3" fill="#43a8a0" />
      <path
        d="M20 14 L23 17 L20 20 L17 17 Z"
        fill="#ff817d"
        opacity="0.8"
      />

      {/* Text "LATO" */}
      <text
        x="42"
        y="28"
        fontFamily="Montserrat, sans-serif"
        fontSize="24"
        fontWeight="900"
        fill="#0f172a"
        letterSpacing="-0.5"
      >
        LATO
      </text>

      {/* Tagline */}
      <text
        x="42"
        y="35"
        fontFamily="Open Sans, sans-serif"
        fontSize="6"
        fontWeight="600"
        fill="#64748b"
        letterSpacing="1"
      >
        TRAVEL MARKETPLACE
      </text>
    </svg>
  )
}

export function LogoIcon({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Compass/Globe Icon Only */}
      <circle cx="20" cy="20" r="14" fill="#43a8a0" opacity="0.1" />
      <circle cx="20" cy="20" r="10" stroke="#43a8a0" strokeWidth="2" fill="none" />
      <path
        d="M20 10 L20 30 M10 20 L30 20"
        stroke="#43a8a0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3" fill="#43a8a0" />
      <path
        d="M20 14 L23 17 L20 20 L17 17 Z"
        fill="#ff817d"
        opacity="0.8"
      />
    </svg>
  )
}
