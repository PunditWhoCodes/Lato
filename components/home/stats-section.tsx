import { StatCard } from "./stat-card"
import { Users, Map, Star, Globe } from "lucide-react"

interface Stat {
  value: string
  label: string
  icon: React.ReactNode
}

const STATS: Stat[] = [
  { value: "10K+", label: "Happy Travelers", icon: <Users className="w-10 h-10" /> },
  { value: "500+", label: "Local Experts", icon: <Map className="w-10 h-10" /> },
  { value: "50+", label: "Destinations", icon: <Globe className="w-10 h-10" /> },
  { value: "4.9", label: "Average Rating", icon: <Star className="w-10 h-10" /> },
]

export function StatsSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
