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
    <Card className={cn('bg-white border border-[rgba(0,0,0,0.1)] rounded-[5px] px-6 py-6', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-4">
        <CardTitle className="font-poppins text-[18px] font-semibold text-black capitalize">
          {title}
        </CardTitle>
        {onEdit && (
          <Button
            variant="outline"
            onClick={onEdit}
            className="border-[#00a792] text-[#00a792] hover:bg-[#00a792] hover:text-white rounded-[30px] h-9 px-6 font-poppins font-normal text-[14px]"
          >
            {editLabel}
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {isEmpty ? (
          <p className="font-poppins font-light text-[14px] text-[#6b7280]">{emptyMessage}</p>
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
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="font-poppins font-medium text-[13px] text-[#6b7280] capitalize">{label}</p>
      <p className={cn(
        'font-poppins font-normal text-[14px] capitalize',
        value ? 'text-black' : 'text-[#6b7280]'
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
    <div className={cn('grid gap-x-16 gap-y-5', gridCols[columns], className)}>
      {children}
    </div>
  )
}

export default ProfileInfoCard
