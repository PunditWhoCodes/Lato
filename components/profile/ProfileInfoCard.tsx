'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProfileInfoCardProps {
  title: string
  onEdit?: () => void
  editLabel?: string
  children: React.ReactNode
  isEmpty?: boolean
  emptyMessage?: string
  className?: string
}

export function ProfileInfoCard({
  title,
  onEdit,
  editLabel = 'Edit',
  children,
  isEmpty = false,
  emptyMessage = 'No information provided',
  className,
}: ProfileInfoCardProps) {
  return (
    <Card className={cn('bg-[#FAFBFC] border border-[#CCCCCC] rounded-[20px]', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="border-[#00A792] text-[#00A792] hover:bg-[#00A792] hover:text-white rounded-full px-6"
          >
            {editLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}

// Info field component for displaying label-value pairs
interface InfoFieldProps {
  label: string
  value?: string | null
  placeholder?: string
  className?: string
}

export function InfoField({
  label,
  value,
  placeholder = 'Not Provided',
  className,
}: InfoFieldProps) {
  return (
    <div className={cn('', className)}>
      <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
      <p className={cn(
        'text-sm',
        value ? 'text-gray-600' : 'text-gray-400'
      )}>
        {value || placeholder}
      </p>
    </div>
  )
}

// Grid layout for info fields
interface InfoGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function InfoGrid({
  children,
  columns = 2,
  className,
}: InfoGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {children}
    </div>
  )
}

export default ProfileInfoCard
