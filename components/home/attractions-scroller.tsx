"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AttractionsScrollerProps {
  children: React.ReactNode
}

export function AttractionsScroller({ children }: AttractionsScrollerProps) {
  return (
    <div className="flex flex-col gap-20 md:gap-32 py-10">
      {Array.isArray(children)
        ? children.map((child, i) => (
            <AnimatedItem key={i}>{child}</AnimatedItem>
          ))
        : children}
    </div>
  )
}

function AnimatedItem({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)

  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px",
    once: false,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 80,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
