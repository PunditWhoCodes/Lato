interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: "10K", label: "Happy Travellers" },
  { value: "500 +", label: "Local Experts" },
  { value: "50+", label: "Destinations" },
  { value: "4.9", label: "Average Raiting" },
]

export function StatsSection() {
  return (
    <section className="pt-[32px] pb-0 md:py-12 px-[14px] bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto flex justify-center">
        {/* Mobile Stats Container - Figma: 357.639px x 202px */}
        <div className="md:hidden bg-white w-[358px] h-[202px] rounded-[20px] py-[33px] px-0 flex flex-col items-center justify-between">
          {/* Top Row */}
          <div className="flex gap-[30px] items-start">
            {/* 10K */}
            <div className="flex flex-col items-center gap-[12px] w-[144px]">
              <p className="font-poppins font-semibold text-[26px] leading-[100%] text-[#00A792] text-center w-full">
                10K
              </p>
              <p className="font-poppins font-light text-[13px] leading-[150%] text-[#818181] text-center w-full">
                Happy Travellers
              </p>
            </div>
            {/* 500+ */}
            <div className="flex flex-col items-center gap-[12px] w-[144px]">
              <p className="font-poppins font-semibold text-[26px] leading-[100%] text-[#00A792] text-center">
                500 +
              </p>
              <p className="font-poppins font-light text-[13px] leading-[150%] text-[#818181] text-center">
                Local Experts
              </p>
            </div>
          </div>
          {/* Bottom Row */}
          <div className="flex gap-[30px] items-start">
            {/* 50+ */}
            <div className="flex flex-col items-center gap-[12px] w-[144px]">
              <p className="font-poppins font-semibold text-[26px] leading-[100%] text-[#00A792] text-center w-full">
                50+
              </p>
              <p className="font-poppins font-light text-[13px] leading-[150%] text-[#818181] text-center w-full">
                Destinations
              </p>
            </div>
            {/* 4.9 */}
            <div className="flex flex-col items-center gap-[12px] w-[144px]">
              <p className="font-poppins font-semibold text-[26px] leading-[100%] text-[#00A792] text-center w-full">
                4.9
              </p>
              <p className="font-poppins font-light text-[13px] leading-[150%] text-[#818181] text-center w-full">
                Average Raiting
              </p>
            </div>
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
