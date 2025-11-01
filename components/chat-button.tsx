"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface ChatButtonProps {
  companyId: string
  tourId?: number
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary"
}

export function ChatButton({ companyId, tourId, className, size = "sm", variant = "default" }: ChatButtonProps) {
  // In a real app, this would create a new conversation or navigate to existing one
  const chatUrl = `/messages/conv-${companyId}${tourId ? `-${tourId}` : ""}`

  return (
    <Button size={size} variant={variant} className={className} asChild>
      <Link href={chatUrl}>
        <MessageCircle className="w-4 h-4 mr-2" />
        Chat
      </Link>
    </Button>
  )
}
