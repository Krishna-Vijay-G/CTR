"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import siteData from "@/data/siteData";
import AnimatedSection from "@/components/AnimatedSection";

export default function SchedulePage() {
  const { races } = siteData;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { day: "2-digit", month: "short" });

  const nextRace = races.calendar[0];

  return (
    <>
      <Navbar />

      {/* Hero with video background */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-carbon-950/70" />
        <div className="relative z-10 text-center">
          <span className="label-text">{races.seasonName}</span>
          <h1 className="heading-xl mt-3">
            <span className="text-white">RACE </span>
            <span className="text-racing-red">CALENDAR</span>
          </h1>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 bg-carbon-900 relative">
        <div className="absolute inset-0 bg-carbon-fiber opacity-20" />
        <div className="relative z-10 section-container text-center">
          <AnimatedSection>
            <span className="label-text block mb-8">Next Race Starts In</span>
            <CountdownTimer targetDate={nextRace.dateStart} />
            <div className="mt-8 inline-flex items-center gap-4 p-5 carbon-card">
              <span className="text-3xl">{nextRace.flagEmoji}</span>
              <div className="text-left">
                <p className="font-heading font-bold text-xl text-white">
                  {nextRace.name}
                </p>
                <p className="text-sm text-carbon-400">
                  {formatDate(nextRace.dateStart)} – {formatDate(nextRace.dateEnd)}{" "}
                  {new Date(nextRace.dateEnd).getFullYear()} · {nextRace.location}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full Calendar */}
      <section className="section-padding bg-carbon-950">
        <div className="section-container max-w-4xl">
          <div className="space-y-[1px] bg-carbon-700/20">
            {races.calendar.map((race, i) => (
              <AnimatedSection key={race.round} delay={i * 0.1}>
                <div
                  className={`bg-carbon-900 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8
                  ${i === 0 ? "border-l-2 border-racing-red" : ""}`}
                >
                  <span className="font-heading font-bold text-4xl text-white/10 w-14 flex-shrink-0">
                    {String(race.round).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-heading font-bold text-xl text-white mb-1">{race.name}</p>
                    <p className="text-sm text-carbon-400">
                      {race.flagEmoji} {race.location}, {race.country}
                    </p>
                    <p className="text-xs text-carbon-500 mt-1">
                      {race.circuitLength} · {race.laps} Laps
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm text-carbon-300 font-heading">
                      {formatDate(race.dateStart)} – {formatDate(race.dateEnd)}{" "}
                      {new Date(race.dateEnd).getFullYear()}
                    </span>
                    <div className="flex gap-2">
                      {race.isStreetCircuit && (
                        <span className="px-2 py-1 text-[9px] uppercase tracking-wider font-heading bg-racing-red/20 text-racing-red border border-racing-red/30">
                          Street
                        </span>
                      )}
                      {race.isNightRace && (
                        <span className="px-2 py-1 text-[9px] uppercase tracking-wider font-heading bg-racing-red/20 text-racing-red border border-racing-red/30">
                          Night
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Street Circuit Info */}
      {races.streetCircuit && (
        <section className="section-padding bg-carbon-900">
          <div className="section-container max-w-5xl">
            <AnimatedSection className="text-center mb-12">
              <span className="label-text">Special Event</span>
              <h2 className="heading-md mt-3 text-white">{races.streetCircuit.name.toUpperCase()}</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8">
              {races.streetCircuit.image && (
                <AnimatedSection direction="left">
                  <img
                    src={races.streetCircuit.image}
                    alt={races.streetCircuit.name}
                    className="w-full h-[350px] object-cover"
                    loading="lazy"
                  />
                </AnimatedSection>
              )}

              <AnimatedSection direction="right" delay={0.1}>
                <div className="carbon-card p-6">
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { val: races.streetCircuit.length, label: "Length" },
                      { val: races.streetCircuit.capacity.toLocaleString(), label: "Capacity" },
                      { val: races.streetCircuit.stands, label: "Stands" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <span className="block font-heading font-bold text-2xl text-white">{stat.val}</span>
                        <span className="block mt-1 text-[10px] uppercase tracking-wider text-carbon-400 font-heading">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="label-text mb-3">Circuit Route</h4>
                  <div className="flex flex-wrap gap-2">
                    {races.streetCircuit.route.map((point, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-carbon-700/30 text-sm text-carbon-300 font-heading"
                      >
                        {point}
                        {i < races.streetCircuit.route.length - 1 && (
                          <span className="text-racing-red ml-2">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
