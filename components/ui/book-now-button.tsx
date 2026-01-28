"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ButtonSize = "xs" | "sm" | "md" | "lg"
type ButtonVariant = "primary" | "outline"

interface BookNowButtonProps {
  href?: string
  onClick?: () => void
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
  showArrow?: boolean
  children?: React.ReactNode
}

const sizeStyles: Record<ButtonSize, {
  mobile: string
  desktop: string
  text: string
  textDesktop: string
  arrow: string
  arrowDesktop: string
  gap: string
  gapDesktop: string
}> = {
  xs: {
    mobile: "h-[18.64px] px-[5.59px] py-[3.36px] rounded-[11.19px]",
    desktop: "md:h-[29.47px] md:px-[8.84px] md:py-[5.31px] md:rounded-[17.68px]",
    text: "text-[6.71px]",
    textDesktop: "md:text-[10.61px]",
    arrow: "w-[8.95px] h-[8.95px]",
    arrowDesktop: "md:w-[14.15px] md:h-[14.15px]",
    gap: "gap-[12.68px]",
    gapDesktop: "md:gap-[20.04px]",
  },
  sm: {
    mobile: "h-[20.5px] px-[6.2px] py-[3.7px] rounded-[30px]",
    desktop: "md:h-[37px] md:px-4 md:py-2 md:rounded-[24px]",
    text: "text-[7.4px]",
    textDesktop: "md:text-[11px]",
    arrow: "w-[9.9px] h-[9.9px]",
    arrowDesktop: "md:w-4 md:h-4",
    gap: "gap-2",
    gapDesktop: "md:gap-3",
  },
  md: {
    mobile: "h-[29.47px] px-[8.84px] py-[5.31px] rounded-[17.68px]",
    desktop: "md:h-[44.66px] md:px-[13.4px] md:py-[8.04px] md:rounded-[26.8px]",
    text: "text-[10.61px]",
    textDesktop: "md:text-[16.08px]",
    arrow: "w-[14.15px] h-[14.15px]",
    arrowDesktop: "md:w-[21.44px] md:h-[21.44px]",
    gap: "gap-[20.04px]",
    gapDesktop: "md:gap-4",
  },
  lg: {
    mobile: "h-auto py-2 px-5 rounded-full",
    desktop: "md:py-3 md:px-6 md:rounded-full",
    text: "text-base",
    textDesktop: "md:text-lg",
    arrow: "w-6 h-6",
    arrowDesktop: "md:w-8 md:h-8",
    gap: "gap-6",
    gapDesktop: "md:gap-[34px]",
  },
}

export function BookNowButton({
  href,
  onClick,
  size = "md",
  variant = "primary",
  className,
  showArrow = true,
  children = "Book Now",
}: BookNowButtonProps) {
  const [isActive, setIsActive] = useState(false)

  const handleTouchStart = () => {
    setIsActive(true)
  }

  const handleTouchEnd = () => {
    setTimeout(() => setIsActive(false), 300)
  }

  const handleClick = () => {
    setIsActive(true)
    setTimeout(() => setIsActive(false), 300)
    onClick?.()
  }

  const styles = sizeStyles[size]

  const baseClasses = cn(
    "group relative overflow-hidden font-poppins font-light flex items-center justify-center touch-manipulation transition-colors",
    styles.mobile,
    styles.desktop,
    variant === "primary" && "bg-black text-white",
    variant === "outline" && "bg-transparent border border-[#A7A9AF] text-[#3A3A3A] hover:bg-gray-50",
    className
  )

  const contentClasses = cn(
    "relative z-10 flex items-center justify-between",
    styles.gap,
    styles.gapDesktop
  )

  const textClasses = cn(
    "relative z-10 leading-[150%]",
    styles.text,
    styles.textDesktop
  )

  const arrowClasses = cn(
    "relative z-10 transition-transform duration-300",
    styles.arrow,
    styles.arrowDesktop,
    "group-hover:rotate-45",
    isActive && "rotate-45"
  )

  // Hover/tap overlay (only for primary variant)
  const overlayClasses = cn(
    "absolute inset-0 bg-[#00A792] transition-all duration-500 ease-out z-0",
    styles.mobile.includes("rounded-[11.19px]") && "rounded-[11.19px] md:rounded-[17.68px]",
    styles.mobile.includes("rounded-[30px]") && "rounded-[30px] md:rounded-[24px]",
    styles.mobile.includes("rounded-[17.68px]") && "rounded-[17.68px] md:rounded-[26.8px]",
    styles.mobile.includes("rounded-full") && "rounded-full",
    isActive ? "scale-150 opacity-100" : "scale-0 opacity-0 group-hover:scale-150 group-hover:opacity-100"
  )

  const content = (
    <>
      <div className={contentClasses}>
        <span className={textClasses}>{children}</span>
        {showArrow && (
          <ArrowUpRight className={arrowClasses} />
        )}
      </div>
      {variant === "primary" && <span className={overlayClasses}></span>}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {content}
    </button>
  )
}

// Specific size variants for different use cases
export function BookNowButtonXS(props: Omit<BookNowButtonProps, "size">) {
  return <BookNowButton {...props} size="xs" />
}

export function BookNowButtonSM(props: Omit<BookNowButtonProps, "size">) {
  return <BookNowButton {...props} size="sm" />
}

export function BookNowButtonMD(props: Omit<BookNowButtonProps, "size">) {
  return <BookNowButton {...props} size="md" />
}

export function BookNowButtonLG(props: Omit<BookNowButtonProps, "size">) {
  return <BookNowButton {...props} size="lg" />
}
