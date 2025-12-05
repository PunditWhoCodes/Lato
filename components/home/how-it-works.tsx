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
    <section className="w-full bg-[#F7F7F7] py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-sm md:text-base font-light text-black font-poppins">
              Our Process
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black font-poppins leading-tight">
              How It Works
            </h2>
          </div>

          {/* DESKTOP VIEW MORE */}
          <Link
            href="/tours"
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="text-[#495560] text-base group-hover:text-black transition-colors">
              View More
            </span>
            <div className="w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center group-hover:bg-gray-900 transition-colors">
              <ArrowUpRight className="text-white w-[22px] h-[22px]" />
            </div>
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {STEPS.map((item, index) => (
            <Card
              key={index}
              className="group bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:bg-[#00A792] transition-all duration-300"
            >
              <CardContent className="p-0">
                {/* ICON */}
                <div className="size-12 md:size-16 bg-[#00A792] group-hover:bg-white rounded-full flex items-center justify-center mb-6 transition-all duration-300">
                  <item.icon className="text-white group-hover:text-[#00A792] size-4 md:size-6 transition-colors duration-300" />
                </div>

                {/* TITLE */}
                <h3 className="text-lg md:text-xl font-semibold text-black group-hover:text-white font-poppins mb-1 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* SUBTITLE */}
                <p className="text-[#00A792] group-hover:text-white font-normal font-poppins text-sm mb-4 transition-colors duration-300">
                  {item.subtitle}
                </p>

                {/* DESCRIPTION */}
                <p className="text-[#595959] group-hover:text-white text-sm leading-relaxed font-poppins mb-6 transition-colors duration-300">
                  {item.description}
                </p>

                {/* FEATURES */}
                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-sm text-[#595959] group-hover:text-white flex gap-2 items-start transition-colors duration-300"
                    >
                      <span className="text-gray-400 group-hover:text-white transition-colors duration-300">•</span> {feature}
                    </li>
                  ))}
                </ul>

                {/* LEARN MORE */}
                <Link
                  href="/tours"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-300"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* EXPLORE MORE BUTTON */}
        <div className="flex justify-center">
          <div className="group">
            <Button
              size="lg"
              className="
                relative overflow-hidden
                rounded-full px-12 py-6 text-base md:text-lg font-medium shadow-lg
                bg-[#00A792]
              "
              asChild
            >
              <Link
                href="/tours"
                className="relative text-white"
              >
                <span className="relative z-20">Explore More</span>

                {/* Radial expanding hover overlay */}
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
        </div>



      </div>
    </section>
  )
}
