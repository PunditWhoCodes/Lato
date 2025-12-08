import { Card } from "@/components/ui/card"
import { ShimmerImage } from "@/components/ui/shimmer-image"
import { Bike, Utensils, Camera, Waves } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface Activity {
  name: string
  icon: LucideIcon
  image: string
  href: string
  tourCount: number
}

const ACTIVITIES: Activity[] = [
  {
    name: "Adventure Sports",
    icon: Bike,
    image: "/activities/adventure.jpg",
    href: "/tours?category=adventure",
    tourCount: 89,
  },
  {
    name: "Food & Culinary",
    icon: Utensils,
    image: "/activities/culinary.jpg",
    href: "/tours?category=culinary",
    tourCount: 67,
  },
  {
    name: "Photography Tours",
    icon: Camera,
    image: "/activities/photography.jpg",
    href: "/tours?category=photography",
    tourCount: 54,
  },
  {
    name: "Water Activities",
    icon: Waves,
    image: "/activities/water.jpg",
    href: "/tours?category=water",
    tourCount: 72,
  },
]

export function FeaturedActivitiesSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Explore by Activity
          </h2>
          <p className="text-base md:text-lg font-poppins text-text-muted max-w-2xl mx-auto">
            Find your perfect adventure based on your interests
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTIVITIES.map((activity, index) => (
            <Link key={index} href={activity.href}>
              <Card className="group relative overflow-hidden rounded-4xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-64">
                <div className="relative w-full h-full">
                  <ShimmerImage
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <div className="mb-3 flex justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <activity.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-white font-poppins font-semibold text-lg mb-1">
                      {activity.name}
                    </h3>
                    <p className="text-white/90 font-mulish text-sm">
                      {activity.tourCount} tours
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
