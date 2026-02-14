"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";

export default function Gallery() {
  const { gallery } = siteData;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...Array.from(new Set(gallery.map((g) => g.category)))];
  const filtered = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="relative section-padding overflow-hidden">
      <div className="relative z-10 section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-carbon-600" />
            <span className="label-text">Media</span>
            <div className="w-8 h-[2px] bg-carbon-600" />
          </div>
          <h2 className="heading-lg">
            <span className="text-white">GAL</span>
            <span className="text-racing-red">LERY</span>
          </h2>
        </AnimatedSection>

        {/* Category Filters */}
        <AnimatedSection delay={0.1} className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 font-heading font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 border ${
                filter === cat
                  ? "bg-racing-red border-racing-red text-white"
                  : "border-carbon-600/30 text-carbon-400 hover:border-racing-red/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedImage(i)}
                className="group relative overflow-hidden cursor-pointer aspect-[4/3]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-carbon-950/0 group-hover:bg-carbon-950/50 transition-all duration-300" />
                <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-racing-red font-heading">{item.category}</span>
                    <p className="text-sm text-white font-heading mt-1">{item.alt}</p>
                  </div>
                </div>
                {/* Red line on hover */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-carbon-950/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={filtered[selectedImage]?.src}
              alt={filtered[selectedImage]?.alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-racing-red transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
