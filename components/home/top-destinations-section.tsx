import Link from "next/link"
import { DestinationCard } from "./destination-card"
import { ArrowUpRight } from "lucide-react"

interface Destination {
  name: string
  image: string
  href: string
  tourCount: number
}

const DESTINATIONS: Destination[] = [
  { name: "Peru", image: "/destinations/peru.jpg", href: "/tours?destination=peru", tourCount: 450 },
  { name: "Nepal", image: "/destinations/nepal.png", href: "/tours?destination=nepal", tourCount: 450 },
  { name: "Italy", image: "/destinations/italy.jpg", href: "/tours?destination=italy", tourCount: 450 },
  { name: "Thailand", image: "/destinations/thailand.jpg", href: "/tours?destination=thailand", tourCount: 450 },
  { name: "Milan", image: "/destinations/milan.jpg", href: "/tours?destination=milan", tourCount: 450 },
  { name: "Greece", image: "/destinations/greece.jpg", href: "/tours?destination=greece", tourCount: 450 },
  { name: "Spain", image: "/destinations/spain.jpg", href: "/tours?destination=spain", tourCount: 450 },
  { name: "London", image: "/destinations/london.jpg", href: "/tours?destination=london", tourCount: 450 },
]

export function TopDestinationsSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-sm md:text-base font-light font-poppins text-black">
              Find your next adventure in destinations that inspire you
            </p>
            <h2 className="font-poppins font-normal text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
              Top Destinations
            </h2>
          </div>

          {/* View More Button */}
          <Link
            href="/tours"
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="text-[#495560] font-semibold text-[18px] group-hover:text-black transition-colors">
              View More
            </span>
            <div className="relative w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center overflow-hidden">
              <ArrowUpRight className="relative z-10 text-white w-[22px] h-[22px] transition-transform duration-300 group-hover:rotate-45" />

              {/* Radial expanding hover overlay */}
              <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
            </div>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {DESTINATIONS.map((destination, index) => (
            <DestinationCard
              key={index}
              name={destination.name}
              image={destination.image}
              href={destination.href}
              tourCount={destination.tourCount}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
