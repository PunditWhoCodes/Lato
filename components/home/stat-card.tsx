"use client"

interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
}

export function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {icon && (
        <div className="mb-4 text-primary">
          {icon}
        </div>
      )}
      <div className="font-poppins font-bold text-5xl md:text-6xl text-text-primary mb-2">
        {value}
      </div>
      <div className="font-mulish font-semibold text-text-muted text-base md:text-lg">
        {label}
      </div>
    </div>
  )
}
