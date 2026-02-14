"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";

export default function DriversShowcase() {
  const { drivers } = siteData;

  return (
    <section id="drivers" className="relative section-padding overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-racing-red/5 to-transparent z-0" />

      <div className="relative z-10 section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="red-line" />
              <span className="label-text">Official Lineup</span>
            </div>
            <h2 className="heading-lg">
              <span className="text-white">OUR </span>
              <span className="text-racing-red">DRIVERS</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <Link href="/team" className="btn-outline text-sm">
              Full Team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-carbon-700/20">
          {drivers.map((driver, i) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={`/driver/${driver.id}`}
                className="group block relative bg-carbon-900 overflow-hidden h-full"
              >
                {/* Driver number watermark */}
                <div className="absolute top-3 right-3 font-heading font-bold text-7xl text-white/[0.04] z-0 select-none leading-none">
                  {String(driver.number).padStart(2, "0")}
                </div>

                {/* Driver Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img
                    src={driver.image}
                    alt={`${driver.firstName} ${driver.lastName}`}
                    className="w-full h-full object-cover object-top transition-all duration-700 
                    group-hover:scale-105 group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-carbon-900/30 to-transparent" />

                  {/* Red line on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>

                {/* Info */}
                <div className="relative p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-carbon-400 font-heading mb-1">
                        {driver.flagEmoji} {driver.nationality}
                      </p>
                      <p className="font-heading font-bold text-xl text-white tracking-wide group-hover:text-racing-red transition-colors duration-300">
                        {driver.firstName}
                        <br />
                        <span className="text-2xl">{driver.lastName.toUpperCase()}</span>
                      </p>
                    </div>
                    <span className="font-heading font-bold text-3xl text-racing-red/30 group-hover:text-racing-red/60 transition-colors duration-300">
                      {driver.number}
                    </span>
                  </div>

                  {/* Championship badge */}
                  {driver.championship && (
                    <span className="inline-block mt-2 px-3 py-1 text-[10px] uppercase tracking-wider font-heading 
                    bg-carbon-800 border border-carbon-600/30 text-carbon-300">
                      {driver.championship}
                    </span>
                  )}

                  {/* Arrow */}
                  <div className="absolute bottom-5 right-5 w-8 h-8 flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-racing-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
