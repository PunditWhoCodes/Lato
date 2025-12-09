"use client"

import Image from "next/image"
import { TestimonialFloatingCard } from "./testimonial-floating-card"
import { useEffect, useRef } from "react"

const TESTIMONIALS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "Lato made planning our trip to Japan effortless. The local guides were knowledgeable and the experience was unforgettable!",
    position: "left",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Best travel platform I've used! The verified providers and real reviews gave me confidence to book my dream adventure.",
    position: "center",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    name: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "The customization options and direct chat with tour providers made my African safari exactly what I wanted. Highly recommend!",
    position: "right",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    name: "James Patterson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Incredible service! From booking to the actual experience, everything was seamless. The local guides were amazing.",
    position: "left",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
    name: "Sophia Williams",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    text: "Lato helped me discover hidden gems in Southeast Asia. The smart filters made finding perfect experiences so easy!",
    position: "center",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    name: "David Martinez",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Outstanding platform for adventure seekers. Secure payments and trusted guides made our family vacation stress-free!",
    position: "right",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F7F7F7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <p className="text-lg font-mulish text-gray-500 mb-3">Testimonials</p>
        <h2 className="font-poppins font-light text-4xl md:text-5xl">
          What are customers saying about Lato
        </h2>
      </div>

      {/* Auto-scrolling container */}
      <div className="relative">
        <div className="flex gap-8 md:gap-12 lg:gap-16 animate-scroll">
          {/* Duplicate testimonials for infinite scroll effect */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="relative shrink-0 w-[260px] md:w-[380px] overflow-visible"
            >
              {/* Image container keeps rounded corners for the image */}
              <div className="w-full h-[300px] md:h-[320px] rounded-3xl overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card position - at corners like Figma design */}
              <div
                className={
                  t.position === "left"
                    ? "absolute top-0 -left-4"
                    : t.position === "center"
                    ? "absolute bottom-0 -left-6"
                    : "absolute top-0 right-0"
                }
              >
                <TestimonialFloatingCard {...t} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-260px * 6 - 2rem * 6));
          }
        }

        @media (min-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-280px * 6 - 3rem * 6));
            }
          }
        }

        @media (min-width: 1024px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-280px * 6 - 4rem * 6));
            }
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
