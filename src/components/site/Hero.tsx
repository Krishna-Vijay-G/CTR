"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { carSpecs, hero, site } from "@/data/site-data";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The opening of the home page.
 *
 * One photograph of the car, full bleed, under a wash dark enough to set type
 * on. The team's name runs down the left edge at the largest size the screen
 * allows, the last word outlined in yellow rather than filled, and the season's
 * numbers sit on a hairline along the bottom. Nothing is in a card.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const up = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease },
        };

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-carbon-950">
      {/* Backdrop */}
      <div className="absolute inset-0">
        <img
          src={carSpecs.image}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[65%_center]"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen"
        >
          <source src={hero.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-carbon-950 via-carbon-950/70 to-carbon-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-carbon-950/60" />
        <div className="absolute inset-0 bg-carbon-weave opacity-40" />
      </div>

      {/* Copy */}
      <div className="section-container relative z-10 flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14 md:pt-40">
        <motion.div {...up(0.1)} className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-racing-yellow" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
            {hero.description}
          </span>
        </motion.div>

        <motion.h1
          {...up(0.2)}
          className="heading-font text-[clamp(3.5rem,13vw,11rem)] font-bold uppercase leading-[0.82] tracking-tight text-white"
        >
          Chennai
          <br />
          Turbo
          <br />
          <span className="text-stroke-yellow">Riders</span>
        </motion.h1>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div {...up(0.35)}>
            <p className="heading-font max-w-md text-lg font-semibold uppercase tracking-[0.2em] text-carbon-200 md:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/drivers"
                className="group inline-flex items-center gap-2 bg-racing-yellow px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-carbon-950 transition-colors hover:bg-white"
              >
                Meet the drivers
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-racing-yellow hover:text-racing-yellow"
              >
                Season {site.currentSeason} calendar
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...up(0.5)}
            className="hidden items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-carbon-300 md:flex"
          >
            Scroll
            <ArrowDown className="size-4 animate-bounce text-racing-yellow" />
          </motion.div>
        </div>
      </div>

      {/* Stats on the baseline */}
      <motion.div {...up(0.6)} className="section-container relative z-10 pb-6">
        <dl className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/15 sm:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={s.label} className={`py-5 ${i % 2 === 0 ? "pr-4" : "pl-4"} sm:px-5 sm:first:pl-0`}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.3em] text-carbon-400">
                {s.label}
              </dt>
              <dd className="heading-font mt-1 text-4xl font-bold leading-none text-white md:text-5xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
