interface Stat {
  number: string
  label: string
}

const STATS: Stat[] = [
  { number: "10K+", label: "Happy Travelers" },
  { number: "500+", label: "Local Experts" },
  { number: "50+", label: "Destinations" },
  { number: "4.9", label: "Average Rating" },
]

export function StatsSection() {
  return (
    <section className="py-6 sm:py-8 md:py-10 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center py-2">
              <div className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-primary mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
