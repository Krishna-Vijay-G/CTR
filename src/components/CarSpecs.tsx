"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";

export default function CarSpecs() {
  const { carSpecs } = siteData;
  const images = [carSpecs.image, carSpecs.image2, carSpecs.image3];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section id="car" className="relative section-padding overflow-hidden">
      {/* Background: full bleed car image with overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={images[activeImage]}
            alt={carSpecs.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/95 to-carbon-950/70 z-[1]" />
      <div className="absolute inset-0 bg-carbon-fiber z-[2] opacity-30" />

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Specs */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <div className="red-line" />
                <span className="label-text">{carSpecs.year} Machine</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="heading-lg mb-3">
                <span className="text-racing-red">{carSpecs.name.split(" ")[0]} </span>
                <span className="text-white">{carSpecs.name.split(" ").slice(1).join(" ")}</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="font-heading text-sm uppercase tracking-[0.2em] text-carbon-400 mb-8">
                {carSpecs.tagline}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="body-text mb-10">{carSpecs.description}</p>
            </AnimatedSection>

            {/* Specs Grid */}
            <AnimatedSection delay={0.3}>
              <div className="grid grid-cols-2 gap-[1px] bg-carbon-700/20">
                {carSpecs.specs.map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="bg-carbon-900/80 p-5 group hover:bg-carbon-800/80 transition-colors duration-300"
                  >
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading mb-1">
                      {spec.label}
                    </span>
                    <span className="block font-heading font-bold text-xl text-white group-hover:text-racing-red transition-colors duration-300">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Car Image Showcase */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage]}
                    alt={carSpecs.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[350px] lg:h-[450px] object-cover"
                    loading="lazy"
                  />
                </AnimatePresence>
                {/* Number overlay */}
                <div className="absolute bottom-4 right-4 font-heading font-bold text-8xl text-white/5 select-none">
                  {carSpecs.year}
                </div>
              </div>

              {/* Image navigation dots */}
              <div className="flex gap-2 mt-4 justify-center">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-1 transition-all duration-300 ${
                      i === activeImage
                        ? "w-10 bg-racing-red"
                        : "w-6 bg-carbon-600 hover:bg-carbon-400"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
