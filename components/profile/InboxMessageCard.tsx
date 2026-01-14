'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { InboxMessage } from '@/lib/types/profile'

interface InboxMessageCardProps {
  message: InboxMessage
  onOpen?: (message: InboxMessage) => void
  className?: string
}

export function InboxMessageCard({
  message,
  onOpen,
  className,
}: InboxMessageCardProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  return (
    <Card
      className={cn(
        'p-4 hover:shadow-md transition-shadow cursor-pointer bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]',
        !message.isRead && 'border-l-4 border-l-[#00A792]',
        className
      )}
      onClick={() => onOpen?.(message)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Sender and unread indicator */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{message.sender.name}</h3>
            {!message.isRead && (
              <span className="w-2 h-2 rounded-full bg-[#00A792]" />
            )}
          </div>

          {/* Subject */}
          <p className="text-sm text-gray-600 mb-2">{message.subject}</p>

          {/* Preview */}
          <p className="text-sm text-gray-500 line-clamp-2">{message.preview}</p>
        </div>

        {/* Right side - timestamp and action */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-xs text-gray-400">
            {formatTimestamp(message.timestamp)}
          </span>
          <Button
            size="sm"
            className="bg-gray-900 hover:bg-gray-800 text-white text-xs px-4"
            onClick={(e) => {
              e.stopPropagation()
              onOpen?.(message)
            }}
          >
            Open
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default InboxMessageCard
