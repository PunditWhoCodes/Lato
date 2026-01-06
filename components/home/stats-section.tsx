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
    <section className="py-5 md:py-12 px-4 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto flex justify-center">
        {/* Mobile Stats Container */}
        <div className="md:hidden bg-white w-full max-w-[358px] rounded-[20px] py-8 px-6">
          {/* Stats Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px]">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-[12px]"
              >
                {/* Number */}
                <div className="text-center font-poppins font-semibold text-[26px] leading-[39px] text-[#00A792]">
                  {stat.value}
                </div>
                {/* Label */}
                <div className="text-center font-poppins font-light text-[13px] leading-[150%] text-[#818181]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Stats Container */}
        <div className="hidden md:block bg-white w-full rounded-4xl p-6">
          {/* Stats Grid - 4 columns */}
          <div className="grid grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
              >
                {/* Number */}
                <div className="text-center font-poppins font-semibold text-4xl text-[#00A792] leading-tight">
                  {stat.value}
                </div>
                {/* Label */}
                <div className="text-center font-poppins font-light text-lg text-[#818181] leading-relaxed">
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
