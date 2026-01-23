"use client"

interface AboutSectionProps {
  companyName: string
  description: string
}

export function AboutSection({ companyName, description }: AboutSectionProps) {
  return (
    <div>
      <h2 className="font-poppins font-semibold text-[12px] lg:text-xl text-black mb-[9px] lg:mb-3">
        About {companyName}
      </h2>
      <p className="font-poppins text-[9px] lg:text-sm text-gray-500 leading-[1.5] lg:leading-relaxed">
        {description}
      </p>
    </div>
  )
}
