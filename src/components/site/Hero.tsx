"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { carSpecs, hero } from "@/data/site-data";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16 md:pt-20">
      {/* Ambient video wash */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      >
        <source src={hero.videoSrc} type="video/mp4" />
      </video>

      {/* Backgrounds */}
      <div className="absolute inset-0 bg-carbon-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(247,214,25,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-carbon-weave opacity-60" />
      <div className="absolute inset-x-0 top-16 h-[2px] bg-gradient-to-r from-transparent via-racing-yellow to-transparent md:top-20" />

      <div className="section-container relative z-10 grid min-h-[calc(100vh-5rem)] items-center gap-6 lg:grid-cols-2">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-[2px] w-10 bg-racing-yellow" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              {hero.description}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-font text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl"
          >
            Chennai
            <br />
            Turbo
            <br />
            <span className="text-racing-yellow">Riders</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 max-w-md text-lg font-medium uppercase tracking-widest text-carbon-300"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/drivers"
              className="group inline-flex items-center gap-2 rounded bg-racing-yellow px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-carbon-950 transition-transform hover:scale-[1.03]"
            >
              Meet the Drivers
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 rounded border border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-racing-yellow hover:text-racing-yellow"
            >
              2026 Calendar
            </Link>
          </motion.div>
        </div>

        {/* The car. A photograph, at the size the canvas used to take, so the
            two-column balance of the hero is unchanged. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-1 flex items-center justify-center lg:order-2"
        >
          <img
            src={carSpecs.image}
            alt={`${carSpecs.name} — ${hero.title}`}
            /* The LCP element: eager, high priority, and never lazy. */
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-[42vh] w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] sm:h-[50vh] lg:h-[70vh]"
          />
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-carbon-950/70 backdrop-blur-md"
      >
        <div className="section-container flex items-center justify-between gap-4 py-4">
          <div className="grid flex-1 grid-cols-4 gap-2 md:flex md:gap-12">
            {hero.stats.map((s) => (
              <div key={s.label} className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                <span className="heading-font text-2xl font-bold text-white md:text-3xl">
                  {s.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-carbon-400">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="hidden items-center gap-2 text-carbon-400 lg:flex">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ChevronDown className="size-4 animate-bounce text-racing-yellow" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
