"use client";

import { motion } from "framer-motion";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";

export default function SponsorsSection() {
  const { sponsors } = siteData;

  const tiers = [
    { key: "title" as const, label: "Title Sponsor", items: sponsors.title },
    { key: "principal" as const, label: "Principal Partners", items: sponsors.principal },
    { key: "official" as const, label: "Official Partners", items: sponsors.official },
    { key: "technical" as const, label: "Technical Partners", items: sponsors.technical },
  ].filter((tier) => tier.items.length > 0);

  return (
    <section id="sponsors" className="relative section-padding overflow-hidden bg-carbon-900">
      <div className="absolute inset-0 bg-carbon-fiber opacity-20" />

      <div className="relative z-10 section-container">
        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-carbon-600" />
            <span className="label-text">Partners & Sponsors</span>
            <div className="w-8 h-[2px] bg-carbon-600" />
          </div>
          <h2 className="heading-lg">
            <span className="text-white">OUR </span>
            <span className="text-racing-red">PARTNERS</span>
          </h2>
        </AnimatedSection>

        {/* Sponsor Tiers */}
        <div className="space-y-16">
          {tiers.map((tier, tierIdx) => (
            <AnimatedSection key={tier.key} delay={tierIdx * 0.1}>
              <div className="text-center mb-8">
                <span className="font-heading font-semibold text-xs uppercase tracking-[0.3em] text-carbon-400">
                  {tier.label}
                </span>
                <div className="w-12 h-[1px] bg-racing-red/30 mx-auto mt-3" />
              </div>

              <div
                className={`flex flex-wrap items-center justify-center ${
                  tier.key === "title" ? "gap-12" : "gap-8 md:gap-12"
                }`}
              >
                {tier.items.map((sponsor, i) => (
                  <motion.a
                    key={sponsor.id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group flex items-center justify-center p-6 carbon-card transition-all duration-300
                    hover:border-racing-red/30 hover:glow-red ${
                      tier.key === "title"
                        ? "w-64 h-32 md:w-80 md:h-40"
                        : "w-40 h-24 md:w-52 md:h-32"
                    }`}
                    title={sponsor.name}
                  >
                    <img
                      src={sponsor.fullLogo || sponsor.logo}
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 
                      transition-all duration-300 grayscale group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </motion.a>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
