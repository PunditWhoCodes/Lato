'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar, Inbox, Star, Search } from 'lucide-react'

type EmptyStateType = 'bookings' | 'inbox' | 'reviews' | 'search' | 'custom'

interface EmptyStateProps {
  type?: EmptyStateType
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  className?: string
}

const defaultIcons: Record<EmptyStateType, React.ReactNode> = {
  bookings: <Calendar className="h-12 w-12 text-gray-300" />,
  inbox: <Inbox className="h-12 w-12 text-gray-300" />,
  reviews: <Star className="h-12 w-12 text-gray-300" />,
  search: <Search className="h-12 w-12 text-gray-300" />,
  custom: null,
}

export function EmptyState({
  type = 'custom',
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  const displayIcon = icon || defaultIcons[type]

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-4 text-center',
      className
    )}>
      {displayIcon && (
        <div className="mb-4">
          {displayIcon}
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-gray-500 max-w-md mb-6">
          {description}
        </p>
      )}

      {(actionLabel && (actionHref || onAction)) && (
        actionHref ? (
          <Button
            asChild
            className="bg-[#00A792] hover:bg-[#008577] text-white rounded-full px-8"
          >
            <Link href={actionHref}>
              {actionLabel}
            </Link>
          </Button>
        ) : (
          <Button
            onClick={onAction}
            className="bg-[#00A792] hover:bg-[#008577] text-white rounded-full px-8"
          >
            {actionLabel}
          </Button>
        )
      )}
    </div>
  )
}

export default EmptyState
