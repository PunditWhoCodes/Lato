"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface Attraction {
  id: number
  name: string
  activities: number
  image: string
}

const attractions: Attraction[] = [
  {
    id: 1,
    name: "Golden Gate Bridge",
    activities: 45,
    image: "/top-attractions/attraction-1.png",
  },
  {
    id: 2,
    name: "Park Guell",
    activities: 25,
    image: "/top-attractions/attraction-2.png",
  },
  {
    id: 3,
    name: "Louvre Museum",
    activities: 95,
    image: "/top-attractions/attraction-3.png",
  },
  {
    id: 4,
    name: "Rijksmuseum",
    activities: 30,
    image: "/top-attractions/attraction-4.png",
  },
]

export function AttractionsVerticalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Track scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Update active index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const index = Math.floor(progress * attractions.length)
      setActiveIndex(Math.min(index, attractions.length - 1))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const handleDotClick = (index: number) => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop
      const windowHeight = window.innerHeight
      const progressPerCard = 1 / attractions.length

      // Calculate target scroll position
      const targetScroll = sectionTop + (index * progressPerCard * sectionRef.current.offsetHeight)

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FBFBFB] py-0 md:py-16 lg:py-20"
      style={{
        height: isMobile ? `${attractions.length * 50}vh` : `${attractions.length * 100}vh`,
      }}
    >
      {/* Sticky Header Container */}
      <div className="sticky top-4 md:top-36 h-screen flex items-start md:items-center justify-center overflow-hidden pt-2 md:pt-0">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
          <div
            className="relative h-[600px] md:h-[700px]"
            style={{
              clipPath: "inset(0 0 0 0 round 10.9px 10.9px 30px 30px)",
            }}
          >
            {attractions.map((attraction, index) => {
              // For the first card, it stays fixed at position 0 (doesn't move)
              // For subsequent cards, they slide up from the bottom
              const startPosition = index === 0 ? 0 : 700
              const endPosition = index * 80 // Stack offset

              // Smoother animation timing - longer animation window with gradual transitions
              // First card stays at position 0 and doesn't animate
              const startProgress = index === 0 ? 0 : Math.max(0, (index - 0.8) / attractions.length)
              const endProgress = index === 0 ? 0 : Math.min(1, (index + 0.3) / attractions.length)

              // Transform for sliding up - card slides up to its stacked position
              const yTransform = useTransform(
                scrollYProgress,
                [startProgress, endProgress],
                [startPosition, endPosition]
              )

              const scale = useTransform(
                scrollYProgress,
                [startProgress, endProgress],
                [0.92, 1]
              )

              // Opacity for content - fades out more gradually when next card comes
              const contentOpacity = useTransform(
                scrollYProgress,
                [
                  endProgress,
                  Math.min(1, (index + 0.7) / attractions.length),
                ],
                [1, 0.2]
              )

              return (
                <motion.div
                  key={attraction.id}
                  className="absolute inset-0"
                  style={{
                    y: yTransform,
                    scale: scale,
                    zIndex: index,
                  }}
                >
                  <div
                    className={`relative w-full h-full overflow-hidden ${
                      index === 0
                        ? "rounded-[10.9px] md:rounded-3xl"
                        : index === attractions.length - 1
                          ? "rounded-t-[10.9px] md:rounded-t-3xl rounded-b-[30px] md:rounded-b-[60px]"
                          : "rounded-[10.9px] md:rounded-3xl"
                    }`}
                    style={{
                      ...(index === 0 ? { backgroundColor: "#00A792" } : {}),
                      ...(index !== 0 ? { boxShadow: "0px 3.7px 17.9px rgba(7, 22, 51, 0.3), -6.3px -14.2px 17.9px rgba(7, 22, 51, 0.3)" } : {}),
                    }}
                  >
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      className={index === 0 ? "object-contain" : "object-cover"}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />

                    {/* Header on First Card - No blur effect */}
                    {index === 0 && (
                      <div className="absolute top-3 md:top-12 left-4 md:left-12 right-4 md:right-12 text-white z-20">
                        <div className="flex items-start justify-between gap-2 md:gap-4">
                          <div>
                            <p className="text-white/90 font-normal text-[6px] md:text-sm mb-1 md:mb-3 drop-shadow-md">
                              Find your next adventure in destinations that inspire you
                            </p>
                            <h2 className="text-[14px] md:text-3xl lg:text-4xl xl:text-5xl font-light drop-shadow-lg leading-tight">
                              Attractions You Can&apos;t Miss
                            </h2>
                          </div>
                          <button className="hidden md:flex items-center gap-2">
                            <span className="text-sm">View More</span>
                            <div className="relative size-9 rounded-full bg-white flex items-center justify-center overflow-hidden">
                              <ArrowUpRight className="relative z-10 text-black size-5 transition-transform duration-300 group-hover:rotate-45" />
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Centered Name & Activities Overlay for cards 2, 3, 4 */}
                    {index !== 0 && (
                      <>
                        {/* Arrow button at top right - Mobile: 9.81px, Desktop: 36px */}
                        <div className="absolute top-[5px] md:top-12 right-[6px] md:right-12 z-20">
                          <div className="relative w-[9.81px] h-[9.81px] md:size-9 rounded-[4.9px] md:rounded-full bg-white flex items-center justify-center overflow-hidden p-[2.18px] md:p-0">
                            <ArrowUpRight className="relative z-10 text-black w-[5.23px] h-[5.23px] md:size-5" strokeWidth={1} />
                          </div>
                        </div>

                        {/* Centered overlay - Mobile: 120.6px x 35.45px, blur 6.79px */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                          <div className="backdrop-blur-[6.79px] md:backdrop-blur-md bg-[rgba(58,85,106,0.31)] md:bg-black/30 rounded-[5.21px] md:rounded-2xl w-[120.6px] md:w-auto h-[35.45px] md:h-auto px-2 md:px-8 py-1 md:py-6 flex flex-col items-center justify-center">
                            <h3 className="font-roboto font-bold text-[13.9px] md:text-4xl lg:text-5xl leading-[16px] md:leading-normal text-white drop-shadow-lg text-center">
                              {attraction.name}
                            </h3>
                            <p className="text-white font-inter font-normal text-[10.43px] md:text-xl leading-[13px] md:leading-normal text-center">
                              {attraction.activities} activities
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
