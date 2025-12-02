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
        <div className="bg-white w-full max-w-[1590px] rounded-3xl md:rounded-[46.65px] p-6 md:p-12 lg:py-[54.12px] lg:px-[74.65px]">
          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-[62.52px]">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 md:gap-4 lg:gap-[26.13px]"
              >
                {/* Number */}
                <div className="text-center font-poppins font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[55.99px] text-[#00A792] leading-tight">
                  {stat.value}
                </div>
                {/* Label */}
                <div className="text-center font-poppins font-light text-xs sm:text-sm md:text-lg lg:text-[27.99px] text-[#818181] leading-relaxed">
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
