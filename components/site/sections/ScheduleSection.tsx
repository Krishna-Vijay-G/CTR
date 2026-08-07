import Link from "next/link";
import { MapPin, Flag, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { races } from "@/data/site-data";
import { formatDateRange } from "@/lib/format";

export function ScheduleSection() {
  const now = Date.now();
  const upcoming =
    races.calendar.find((r) => new Date(r.dateStart).getTime() >= now) ??
    races.calendar[races.calendar.length - 1];

  return (
    <section id="schedule" className="relative border-y border-white/5 bg-carbon-900/40 py-20 md:py-28">
      <div className="section-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label={races.seasonName} title="Race Calendar" />
          <Link
            href="/schedule"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-racing-yellow"
          >
            Full schedule
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Next race highlight */}
          <Reveal className="relative overflow-hidden rounded-2xl border border-racing-yellow/30 bg-gradient-to-br from-carbon-800 to-carbon-900 p-6 md:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-racing-yellow/10 blur-3xl" />
            <span className="inline-block rounded bg-racing-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-carbon-950">
              Next Race
            </span>
            <h3 className="heading-font mt-4 text-3xl font-bold uppercase text-white md:text-4xl">
              {upcoming.name}
            </h3>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-carbon-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-racing-yellow" />
                {upcoming.flagEmoji} {upcoming.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Flag className="size-4 text-racing-yellow" />
                {formatDateRange(upcoming.dateStart, upcoming.dateEnd)}
              </span>
            </div>
            <div className="mt-6">
              <CountdownTimer targetIso={upcoming.dateStart} />
            </div>
          </Reveal>

          {/* Calendar list */}
          <Reveal delay={0.1} className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-carbon-800/40">
            {races.calendar.map((r) => {
              const isNext = r.round === upcoming.round;
              return (
                <div
                  key={r.round}
                  className={`flex items-center gap-4 px-5 py-3.5 ${
                    isNext ? "bg-racing-yellow/5" : ""
                  }`}
                >
                  <span className="heading-font w-8 text-lg font-bold text-racing-yellow">
                    {String(r.round).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-carbon-400">
                      {r.flagEmoji} {r.location}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-carbon-300">
                    {formatDateRange(r.dateStart, r.dateEnd)}
                  </span>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
