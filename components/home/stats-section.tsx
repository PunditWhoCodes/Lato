interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: "10K", label: "Happy Travellers" },
  { value: "500+", label: "Local Experts" },
  { value: "50+", label: "Destinations" },
  { value: "4.9", label: "Average Rating" },
]

export function StatsSection() {
  return (
    <section className="py-8 md:py-12 px-4 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto flex justify-center">
        {/* Stats Container */}
        <div className="bg-white w-full rounded-4xl p-6">
          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
              >
                {/* Number */}
                <div className="text-center font-poppins font-semibold text-2xl sm:text-3xl md:text-4xl text-[#00A792] leading-tight">
                  {stat.value}
                </div>
                {/* Label */}
                <div className="text-center font-poppins font-light text-xs sm:text-sm md:text-lg text-[#818181] leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
