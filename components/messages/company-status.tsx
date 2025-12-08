"use client"

import { useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"

interface CompanyStatusProps {
  isOnline: boolean
  lastSeen: string // ISO timestamp
  responseTime: string // "Usually responds within 1 hour"
  timezone: string // IANA timezone like "Asia/Tokyo"
  className?: string
}

export function CompanyStatus({ isOnline, lastSeen, responseTime, timezone, className = "" }: CompanyStatusProps) {
  const [localTime, setLocalTime] = useState("")

  // Update local time every minute
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date()
        const timeString = now.toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        setLocalTime(timeString)
      } catch (error) {
        console.error("Error formatting timezone:", error)
        setLocalTime("")
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [timezone])

  const getLastSeenText = () => {
    try {
      return formatDistanceToNow(new Date(lastSeen), { addSuffix: true })
    } catch {
      return "recently"
    }
  }

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
        <span>
          {isOnline ? "Online" : `Last seen ${getLastSeenText()}`}
        </span>
      </div>

      {/* Separator */}
      <span>•</span>

      {/* Response Time */}
      <span>{responseTime}</span>

      {/* Separator */}
      {localTime && <span>•</span>}

      {/* Local Time */}
      {localTime && <span>{localTime} their time</span>}
    </div>
  )
}
