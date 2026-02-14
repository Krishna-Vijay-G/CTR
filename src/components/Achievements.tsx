"use client";

import { motion } from "framer-motion";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";

export default function Achievements() {
  const { achievements } = siteData;

  return (
    <section id="achievements" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-carbon-fiber opacity-30" />

      <div className="relative z-10 section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-carbon-600" />
            <span className="label-text">Our Journey</span>
            <div className="w-8 h-[2px] bg-carbon-600" />
          </div>
          <h2 className="heading-lg">
            <span className="text-white">ACHIEVE</span>
            <span className="text-racing-red">MENTS</span>
          </h2>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-carbon-700/50 -translate-x-1/2" />

          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot on timeline */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-carbon-950 border-2 border-racing-red z-10" />

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <span className="font-heading font-bold text-4xl text-racing-red/20 block mb-2">
                  {item.year}
                </span>
                <h3 className="font-heading font-bold text-xl text-white mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-carbon-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
