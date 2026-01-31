"use client"

import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"
import Link from 'next/link'

interface HorizontalScrollCarouselProps {
  items: {
    id: string | number
    image: string
    firstName?: string
    lastName?: string
    number?: number | string
    flagEmoji?: string
  }[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ items }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-95%"])

  return (
    <section
      ref={targetRef}
      className="relative h-[400vh] w-full"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4 px-10"
        >
          {items.map((item, index) => (
            <Card
              item={item}
              key={`${item.id}-${index}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const Card: React.FC<{ item: HorizontalScrollCarouselProps['items'][0] }> = ({ item }) => {
  return (
    <Link 
      href={`/driver/${item.id}`}
      className="group relative h-[450px] w-[450px] overflow-hidden rounded-lg flex-shrink-0 driver-card"
    >
      <Image
        src={item.image}
        fill
        style={{ objectFit: "cover" }}
        alt={item.lastName || "carousel image"}
        className="transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="driver-card-overlay">
        {item.number && <span className="driver-number">{item.number}</span>}
        {item.lastName && <h3 className="driver-name">{item.lastName}</h3>}
        {item.flagEmoji && (
          <p className="driver-country">
            <span>{item.flagEmoji}</span>
            PROFILE
          </p>
        )}
        <span className="driver-cta">
          View Profile
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}

export { HorizontalScrollCarousel }
