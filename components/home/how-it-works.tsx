"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  MessageCircle,
  Ticket,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react"

interface Step {
  title: string
  subtitle: string
  description: string
  icon: any
  features: string[]
}

const STEPS: Step[] = [
  {
    title: "Discover and Browse",
    subtitle: "Find your perfect Experience",
    description:
      "Explore curated tours and experiences from verified local providers. Use our smart filters to find adventures that match your interests, budget, and travel style.",
    icon: Search,
    features: [
      "Smart search filters",
      "Verified providers",
      "Real reviews",
      "Price comparison",
    ],
  },
  {
    title: "Chat & Customise",
    subtitle: "Connect with local experts",
    description:
      "Start a conversation with your chosen tour provider. Discuss your preferences, ask questions, and customize your experience to create the perfect adventure.",
    icon: MessageCircle,
    features: [
      "Smart search filters",
      "Verified providers",
      "Real reviews",
      "Price comparison",
    ],
  },
  {
    title: "Book & Experience",
    subtitle: "Secure and enjoy your adventure",
    description:
      "Book with confidence using our secure payment system. Enjoy your personalized adventure with trusted local guides and create memories that last a lifetime.",
    icon: Ticket,
    features: [
      "Smart search filters",
      "Verified providers",
      "Real reviews",
      "Price comparison",
    ],
  },
]

export function HowItWorks() {
  return (
    <section className="w-full bg-[#F7F7F7] py-8 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER - Figma pixel-perfect */}
        <div className="flex justify-between items-start mb-6 md:mb-12 lg:mb-16">
          <div className="flex flex-col gap-[11.4px]">
            <p className="text-[6.3px] md:text-base font-light text-black font-poppins leading-[150%]">
              Our Process
            </p>
            <h2 className="text-[22px] md:text-4xl lg:text-5xl font-light text-black font-poppins leading-[150%]">
              How It Works
            </h2>
          </div>

          {/* View More - Mobile - Figma: 14.207px button, 6.314px text, rounded-7.103px */}
          <Link
            href="/about"
            className="md:hidden flex items-center gap-[2.5px] group"
          >
            <span className="font-mulish font-semibold text-[6.3px] text-[#495560] group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative flex items-center justify-center bg-black rounded-[7.1px] overflow-hidden w-[14.2px] h-[14.2px] p-[3.2px]">
              <ArrowUpRight className="relative z-10 text-white w-[7.6px] h-[7.6px] transition-transform duration-300 group-hover:rotate-45" />
              <span className="absolute inset-0 bg-[#00A792] rounded-[7.1px] scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>

          {/* DESKTOP VIEW MORE */}
          <Link
            href="/about"
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="text-[#495560] text-base group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center overflow-hidden">
              <ArrowUpRight className="relative z-10 text-white w-[22px] h-[22px] transition-transform duration-300 group-hover:rotate-45" />

              {/* Radial expanding hover overlay */}
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>
        </div>

        {/* CARDS - Mobile: Vertical Stack (292px width), Desktop: Grid */}
        <div className="flex flex-col items-center md:items-stretch md:max-w-6xl md:mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-[12.19px] md:gap-6 lg:gap-8 mb-6 md:mb-14">
          {STEPS.map((item, index) => (
            <Card
              key={index}
              className="group bg-white border-[0.61px] border-black/[0.09] md:border md:border-gray-100 rounded-[14.13px] md:rounded-2xl p-[15.24px] md:p-8 shadow-sm hover:shadow-xl hover:bg-[#00A792] transition-all duration-300 w-[292px] md:w-auto md:h-auto"
            >
              <CardContent className="p-0 w-[254px] md:w-auto">
                {/* ICON - Mobile: 48.77px, Desktop: 64px */}
                <div className="w-[48.77px] h-[48.77px] md:size-16 bg-[#00A792] group-hover:bg-white rounded-full flex items-center justify-center mb-[30.48px] md:mb-6 transition-all duration-300">
                  <item.icon className="text-white group-hover:text-[#00A792] w-[21px] h-[21px] md:size-6 transition-colors duration-300" />
                </div>

                {/* TITLE - Mobile: 18.29px, 500 weight */}
                <h3 className="text-[18.29px] md:text-xl font-medium md:font-semibold text-black group-hover:text-white font-poppins leading-[150%] mb-[9.75px] md:mb-1 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* SUBTITLE - Mobile: 12.19px, 300 weight, #00A792 */}
                <p className="text-[#00A792] group-hover:text-white font-light md:font-normal font-poppins text-[12.19px] md:text-sm leading-[150%] mb-[30.48px] md:mb-4 transition-colors duration-300">
                  {item.subtitle}
                </p>

                {/* DESCRIPTION - Mobile: 9.75px, 300 weight */}
                <p className="text-[#595959] group-hover:text-white text-[9.75px] md:text-sm leading-[150%] md:leading-relaxed font-poppins font-light mb-[35.97px] md:mb-6 transition-colors duration-300">
                  {item.description}
                </p>

                {/* FEATURES - Mobile: 9.75px, 300 weight */}
                <ul className="space-y-[3px] md:space-y-2 mb-[35.97px] md:mb-6">
                  {item.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-[9.75px] md:text-sm text-[#595959] group-hover:text-white font-poppins font-light leading-[150%] flex gap-1 items-start transition-colors duration-300"
                    >
                      <span className="text-[#595959] group-hover:text-white transition-colors duration-300">•</span> {feature}
                    </li>
                  ))}
                </ul>

                {/* LEARN MORE - Mobile: 9.75px, 300 weight */}
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-[4.27px] md:gap-1 text-[9.75px] md:text-sm font-light md:font-medium text-[#595959] md:text-gray-700 group-hover:text-white transition-colors duration-300"
                >
                  Learn More
                  <ChevronRight className="w-[14.63px] h-[14.63px] md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* EXPLORE MORE BUTTON - Mobile Only */}
        {/* <div className="flex justify-center md:hidden">
          <div className="group">
            <Button
              size="lg"
              className="
                relative overflow-hidden
                rounded-full px-12 py-6 text-base font-medium shadow-lg
                bg-[#00A792] w-full max-w-sm
              "
              asChild
            >
              <Link
                href="/tours"
                className="relative text-white"
              >
                <span className="relative z-20">Explore More</span>

                <span
                  className="
                    absolute inset-0
                    bg-black
                    rounded-full
                    scale-0 opacity-0
                    transition-all duration-700 ease-out
                    group-hover:scale-150 group-hover:opacity-100
                    z-0
                  "
                ></span>
              </Link>
            </Button>
          </div>
        </div> */}

      </div>
    </section>
  )
}
