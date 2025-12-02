"use client"

import Image from "next/image"
import { TestimonialFloatingCard } from "./testimonial-floating-card"

const TESTIMONIALS = [
  {
    id: 1,
    image: "/testimonials/img-1.jpg",
    name: "Agnes Remi",
    avatar: "/avatars/agnes.jpg",
    rating: 5,
    text: "Dico is finally addressing a long time problem we had when building UIs. It’s ease of use and workflow seems really intuitive. Promising!",
    position: "left",
  },
  {
    id: 2,
    image: "/testimonials/img-2.jpg",
    name: "Agnes Remi",
    avatar: "/avatars/agnes.jpg",
    rating: 5,
    text: "Dico is finally addressing a long time problem we had when building UIs. It’s ease of use and workflow seems really intuitive. Promising!",
    position: "center",
  },
  {
    id: 3,
    image: "/testimonials/img-3.jpg",
    name: "Agnes Remi",
    avatar: "/avatars/agnes.jpg",
    rating: 5,
    text: "Dico is finally addressing a long time problem we had when building UIs. It’s ease of use and workflow seems really intuitive. Promising!",
    position: "right",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-lg font-mulish text-gray-500 mb-3">Testimonials</p>
        <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 mb-16">
          What are customers saying about Lato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {TESTIMONIALS.map((t) => (
            // wrapper must allow overflow-visible so floating card rounding isn't clipped
            <div key={t.id} className="relative w-full overflow-visible">
              {/* Image container keeps rounded corners for the image */}
              <div className="w-full h-80 md:h-[360px] lg:h-[420px] rounded-3xl overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card position (matches Figma: top-left, bottom-center, top-right) */}
              <div
                className={
                  t.position === "left"
                    ? "absolute top-10 right-30"            // slight overlap (inside image area)
                    : t.position === "center"
                    ? "absolute -bottom-10 -right-20 -translate-x-1/2"
                    : "absolute -top-10 left-30"
                }
              >
                <TestimonialFloatingCard {...t} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
