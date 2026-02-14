"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";
import AnimatedSection from "@/components/AnimatedSection";

export default function TeamPage() {
  const { site, teamPrincipal, drivers } = siteData;

  const irlDrivers = drivers.filter((d) => d.championship === "IRL");
  const f4Drivers = drivers.filter((d) => d.championship === "F4");

  const totalWins = drivers.reduce((s, d) => s + d.stats.raceWins, 0);
  const totalPodiums = drivers.reduce((s, d) => s + d.stats.podiums, 0);
  const totalPoints = drivers.reduce((s, d) => s + d.stats.points, 0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/car/hero.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-carbon-950/70" />
        </div>
        <div className="absolute inset-0 bg-carbon-fiber opacity-20" />
        <div className="relative z-10 text-center">
          <span className="label-text">Season {site.currentSeason}</span>
          <h1 className="heading-xl mt-3">
            <span className="text-white">OUR </span>
            <span className="text-racing-red">TEAM</span>
          </h1>
        </div>
      </section>

      {/* Team Principal */}
      <section className="section-padding bg-carbon-900">
        <div className="section-container">
          <AnimatedSection>
            <div className="grid md:grid-cols-[280px_1fr] gap-8 carbon-card p-8 max-w-4xl mx-auto">
              <div className="overflow-hidden">
                <img
                  src={teamPrincipal.image}
                  alt={teamPrincipal.name}
                  className="w-full h-[320px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="label-text mb-2">{teamPrincipal.title}</span>
                <h2 className="font-heading font-bold text-3xl text-white uppercase tracking-wider mb-4">
                  {teamPrincipal.name}
                </h2>
                <p className="body-text mb-6">
                  Leading Chennai Turbo Riders with vision and passion, {teamPrincipal.name} has been
                  instrumental in establishing the team as a competitive force in the Indian Racing League.
                </p>
                <blockquote className="pl-4 border-l-2 border-racing-red italic text-carbon-300 text-sm">
                  &ldquo;Racing is in our DNA. CTR represents the future of Indian motorsport.&rdquo;
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 bg-carbon-950">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-carbon-700/30 py-12">
            {[
              { val: drivers.length, label: "Drivers" },
              { val: totalWins, label: "Wins" },
              { val: totalPodiums, label: "Podiums" },
              { val: totalPoints, label: "Points" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-heading font-bold text-4xl md:text-5xl text-white">{stat.val}</span>
                <span className="block mt-2 text-xs uppercase tracking-[0.25em] text-carbon-400 font-heading">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IRL Drivers */}
      <section className="section-padding bg-carbon-950 relative">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/car/hero2.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-carbon-950/80" />
        <div className="relative z-10 section-container">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-3 h-3 rounded-full bg-racing-red animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-carbon-400 font-heading">
                2025 Indian Racing League · Wolf GB08
              </span>
            </div>
            <h2 className="heading-lg">
              <span className="text-white">IRL </span>
              <span className="text-racing-red">DRIVERS</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-carbon-700/20">
            {irlDrivers.map((driver, i) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/driver/${driver.id}`}
                  className="group block bg-carbon-900 overflow-hidden"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={driver.image}
                      alt={`${driver.firstName} ${driver.lastName}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <span className="absolute top-4 right-4 font-heading font-bold text-6xl text-white/5">
                      {String(driver.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-carbon-400 font-heading mb-1">
                          {driver.flagEmoji} {driver.nationality}
                        </p>
                        <p className="font-heading font-bold text-xl text-white group-hover:text-racing-red transition-colors">
                          {driver.firstName}<br />
                          <span className="text-2xl">{driver.lastName.toUpperCase()}</span>
                        </p>
                      </div>
                      <span className="font-heading font-bold text-3xl text-racing-red/30">
                        {driver.number}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* F4 Drivers */}
      <section className="section-padding bg-carbon-900 relative">
        <div className="relative z-10 section-container">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-3 h-3 rounded-full bg-racing-red animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-carbon-400 font-heading">
                2025 Indian F4 Championship
              </span>
            </div>
            <h2 className="heading-lg">
              <span className="text-white">F4 </span>
              <span className="text-racing-red">DRIVERS</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-carbon-700/20">
            {f4Drivers.map((driver, i) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/driver/${driver.id}`}
                  className="group block bg-carbon-800 overflow-hidden"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={driver.image}
                      alt={`${driver.firstName} ${driver.lastName}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-800 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-racing-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-carbon-400 font-heading mb-1">
                          {driver.flagEmoji} {driver.nationality}
                        </p>
                        <p className="font-heading font-bold text-xl text-white group-hover:text-racing-red transition-colors">
                          {driver.firstName}<br />
                          <span className="text-2xl">{driver.lastName.toUpperCase()}</span>
                        </p>
                      </div>
                      <span className="font-heading font-bold text-3xl text-racing-red/30">
                        {driver.number}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
