import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Flag, Ruler, Users, Moon, Building2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { races } from "@/data/site-data";
import { formatDateRange } from "@/lib/format";

export const metadata: Metadata = {
  title: "Race Schedule",
  description: `The complete ${races.seasonName} race calendar for Chennai Turbo Riders.`,
};

export default function SchedulePage() {
  const now = Date.now();
  const upcoming =
    races.calendar.find((r) => new Date(r.dateStart).getTime() >= now) ??
    races.calendar[races.calendar.length - 1];
  const circuit = races.streetCircuit;

  return (
    <>
      <PageHeader
        label={races.seasonName}
        title="Race Calendar"
        description="Six rounds of pure adrenaline across the 2026 season."
      />

      <div className="section-container py-16 md:py-20">
        {/* Next race */}
        <Reveal className="relative mb-14 overflow-hidden rounded-2xl border border-racing-yellow/30 bg-gradient-to-br from-carbon-800 to-carbon-900 p-6 md:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-racing-yellow/10 blur-3xl" />
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded bg-racing-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-carbon-950">
                Next Race · Round {upcoming.round}
              </span>
              <h2 className="heading-font mt-4 text-4xl font-bold uppercase text-white md:text-5xl">
                {upcoming.name}
              </h2>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-carbon-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-racing-yellow" />
                  {upcoming.flagEmoji} {upcoming.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flag className="size-4 text-racing-yellow" />
                  {formatDateRange(upcoming.dateStart, upcoming.dateEnd)}
                </span>
              </div>
            </div>
            <CountdownTimer targetIso={upcoming.dateStart} />
          </div>
        </Reveal>

        {/* Full calendar */}
        <div className="grid gap-3">
          {races.calendar.map((r, i) => {
            const isNext = r.round === upcoming.round;
            return (
              <Reveal
                key={r.round}
                delay={i * 0.05}
                className={`flex flex-wrap items-center gap-4 rounded-xl border px-5 py-4 md:px-6 ${
                  isNext
                    ? "border-racing-yellow/40 bg-racing-yellow/5"
                    : "border-white/10 bg-carbon-800/40"
                }`}
              >
                <span className="heading-font w-12 text-3xl font-bold text-racing-yellow">
                  {String(r.round).padStart(2, "0")}
                </span>
                <div className="min-w-[180px] flex-1">
                  <p className="heading-font text-lg font-bold uppercase text-white">
                    {r.name}
                  </p>
                  <p className="text-sm text-carbon-400">
                    {r.flagEmoji} {r.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {r.isNightRace && (
                    <span className="flex items-center gap-1 rounded bg-carbon-700 px-2 py-1 text-[10px] uppercase text-carbon-200">
                      <Moon className="size-3" /> Night
                    </span>
                  )}
                  {r.isStreetCircuit && (
                    <span className="flex items-center gap-1 rounded bg-carbon-700 px-2 py-1 text-[10px] uppercase text-carbon-200">
                      <Building2 className="size-3" /> Street
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-white">
                  {formatDateRange(r.dateStart, r.dateEnd)}
                </span>
              </Reveal>
            );
          })}
        </div>

        {/* Street circuit feature */}
        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-carbon-800/40">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              {circuit.image && (
                <Image
                  src={circuit.image}
                  alt={circuit.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                Special Event
              </span>
              <h3 className="heading-font mt-2 text-3xl font-bold uppercase text-white">
                {circuit.name}
              </h3>
              <div className="mt-5 grid grid-cols-3 gap-4">
                <div>
                  <Ruler className="mb-1 size-4 text-racing-yellow" />
                  <p className="heading-font text-xl font-bold text-white">
                    {circuit.length}
                  </p>
                  <p className="text-[11px] uppercase text-carbon-400">Length</p>
                </div>
                <div>
                  <Users className="mb-1 size-4 text-racing-yellow" />
                  <p className="heading-font text-xl font-bold text-white">
                    {circuit.capacity.toLocaleString()}
                  </p>
                  <p className="text-[11px] uppercase text-carbon-400">Capacity</p>
                </div>
                <div>
                  <Building2 className="mb-1 size-4 text-racing-yellow" />
                  <p className="heading-font text-xl font-bold text-white">
                    {circuit.stands}
                  </p>
                  <p className="text-[11px] uppercase text-carbon-400">Stands</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {circuit.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-carbon-300">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-racing-yellow" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
