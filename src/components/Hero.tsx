"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import siteData from "@/data/siteData";

export default function Hero() {
  const { hero, site } = siteData;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={hero.videoSrc} type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-carbon-950"
      />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-carbon-950 via-transparent to-carbon-950/40" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-carbon-950/60 via-transparent to-transparent" />

      {/* Red accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-racing-red to-transparent z-10" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 section-container w-full"
      >
        <div className="max-w-4xl">
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-racing-red" />
            <span className="label-text">{hero.description}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-xl mb-4"
          >
            <span className="text-white">{site.abbreviation}</span>
            <br />
            <span className="text-racing-red">RACING</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-heading font-medium text-xl md:text-2xl text-carbon-300 tracking-wider uppercase mb-10"
          >
            {hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#about" className="btn-primary">
              Explore Team
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#drivers" className="btn-outline">
              Our Drivers
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="border-t border-white/10 bg-carbon-950/60 backdrop-blur-md">
          <div className="section-container py-5 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-12">
              {hero.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-heading font-bold text-2xl text-white">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-carbon-400 font-heading">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] text-carbon-400 font-heading">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-8 border border-carbon-500 rounded-full flex justify-center pt-1.5"
              >
                <div className="w-1 h-2 bg-racing-red rounded-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
