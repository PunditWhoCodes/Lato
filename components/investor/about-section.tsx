"use client"

interface AboutSectionProps {
  companyName: string
  description: string
}

export function AboutSection({ companyName, description }: AboutSectionProps) {
  return (
    <div>
      <h2 className="font-poppins font-semibold text-lg md:text-xl text-black mb-3">
        About {companyName}
      </h2>
      <p className="font-poppins text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
