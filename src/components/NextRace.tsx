"use client";

import Link from "next/link";
import siteData from "@/data/siteData";
import AnimatedSection from "./AnimatedSection";
import CountdownTimer from "./CountdownTimer";

export default function NextRace() {
  const { races } = siteData;
  const nextRace = races.calendar[0];

  if (!nextRace) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { day: "2-digit", month: "short" });

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon-950 via-carbon-900 to-carbon-950" />
      <div className="absolute inset-0 bg-carbon-fiber opacity-20" />

      {/* Red glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-racing-red/5 rounded-full blur-[100px]" />

      <div className="relative z-10 section-container text-center">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-carbon-600" />
            <span className="label-text">Next Race</span>
            <div className="w-8 h-[2px] bg-carbon-600" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10">
          <CountdownTimer targetDate={nextRace.dateStart} />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="inline-flex items-center gap-4 p-5 carbon-card">
            <span className="text-3xl">{nextRace.flagEmoji}</span>
            <div className="text-left">
              <p className="font-heading font-bold text-xl text-white tracking-wide">
                {nextRace.name}
              </p>
              <p className="text-sm text-carbon-400">
                {formatDate(nextRace.dateStart)} – {formatDate(nextRace.dateEnd)}{" "}
                {new Date(nextRace.dateEnd).getFullYear()} · {nextRace.location}
              </p>
            </div>
            <div className="flex gap-2 ml-2">
              {nextRace.isStreetCircuit && (
                <span className="px-2 py-1 text-[9px] uppercase tracking-wider font-heading bg-racing-red/20 text-racing-red border border-racing-red/30">
                  Street
                </span>
              )}
              {nextRace.isNightRace && (
                <span className="px-2 py-1 text-[9px] uppercase tracking-wider font-heading bg-racing-red/20 text-racing-red border border-racing-red/30">
                  Night
                </span>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Race Calendar Preview */}
        {races.calendar.length > 1 && (
          <AnimatedSection delay={0.3} className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-carbon-700/20 max-w-2xl mx-auto">
              {races.calendar.map((race, i) => (
                <div
                  key={race.round}
                  className={`p-5 bg-carbon-900 flex items-center gap-4 ${
                    i === 0 ? "border-l-2 border-racing-red" : ""
                  }`}
                >
                  <span className="font-heading font-bold text-3xl text-white/10">
                    {String(race.round).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-sm text-white">{race.name}</p>
                    <p className="text-xs text-carbon-400">
                      {formatDate(race.dateStart)} · {race.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/schedule" className="btn-outline text-sm">
                Full Calendar
              </Link>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
