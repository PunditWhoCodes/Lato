"use client"

import { Calendar, Users, Orbit, Activity, Globe } from "lucide-react"

interface TourInfoProps {
  duration: string
  tourType: string
  groupSize: string
  difficulty: string
  minAge?: string
  languages: string[]
}

export function TourInfo({
  duration,
  tourType,
  groupSize,
  difficulty,
  minAge = "5 – 79 years",
  languages
}: TourInfoProps) {

  const infoItems = [
    {
      icon: <Calendar className="w-5 h-5 text-[#00C29A]" />, // smaller icon
      label: duration,
      sublabel: "Duration"
    },
    {
      icon: <Orbit className="w-5 h-5 text-[#00C29A]" />,
      label: tourType,
      sublabel: "Private experience, no group joining"
    },
    {
      icon: <Users className="w-5 h-5 text-[#00C29A]" />,
      label: groupSize,
      sublabel: "Minimum to book"
    },
    {
      icon: <Activity className="w-5 h-5 text-[#00C29A]" />,
      label: difficulty,
      sublabel: "Minimal Physical Effort"
    },
    {
      icon: <Users className="w-5 h-5 text-[#00C29A]" />,
      label: minAge,
      sublabel: "Age range for participants"
    },
    {
      icon: <Globe className="w-5 h-5 text-[#00C29A]" />,
      label: languages.join(", ") || "English",
      sublabel: "Guide language"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 mb-4 lg:mb-10 gap-x-4 lg:gap-x-10 gap-y-4 lg:gap-y-8 p-4 lg:p-8 bg-white rounded-[16px] lg:rounded-3xl border border-[#E5E7EB]">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-start gap-2 lg:gap-3">

          <div className="mt-0.5 shrink-0">
            <span className="[&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-5 lg:[&>svg]:h-5">
              {item.icon}
            </span>
          </div>

          <div className="space-y-0.5 min-w-0">
            <p className="text-[13px] lg:text-[15px] font-semibold text-[#1C1B1F] leading-tight truncate">
              {item.label}
            </p>
            <p className="text-[11px] lg:text-[13px] text-[#6B7280] leading-tight line-clamp-2">
              {item.sublabel}
            </p>
          </div>

        </div>
      ))}
    </div>
  )
}
