"use client";

import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";
import StatsCounter from "./StatsCounter";

export default function About() {
  const { about, teamPrincipal } = siteData;

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-carbon-fiber opacity-50" />

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <div className="red-line" />
                <span className="label-text">{about.subtitle}</span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="heading-lg mb-8">
                <span className="text-white">ABOUT </span>
                <span className="text-racing-red">CTR</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="body-text mb-6">{about.description}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="body-text mb-10">{about.description2}</p>
            </AnimatedSection>

            {/* Team Principal */}
            <AnimatedSection delay={0.4}>
              <div className="flex items-center gap-5 p-5 carbon-card">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-racing-red/50 flex-shrink-0">
                  <img
                    src={teamPrincipal.image}
                    alt={teamPrincipal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-lg tracking-wide">
                    {teamPrincipal.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-racing-red font-heading">
                    {teamPrincipal.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Image */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="relative">
              {/* Red accent border */}
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-racing-red/20 z-0" />
              <div className="relative z-10 overflow-hidden inline-block">
                <img
                  src={about.image}
                  alt="Chennai Turbo Riders Team"
                  className="w-full h-[400px] lg:h-[400px] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/60 to-transparent" />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Stats Row */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-carbon-700/30">
            {about.stats.map((stat, i) => (
              <StatsCounter key={i} value={stat.value} label={stat.label} delay={i * 0.15} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
