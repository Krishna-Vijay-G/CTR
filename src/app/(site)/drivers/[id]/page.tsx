import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote } from "lucide-react";
import { drivers } from "@/data/site-data";
import { Reveal } from "@/components/site/Reveal";

export function generateStaticParams() {
  return drivers.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const driver = drivers.find((d) => d.id === id);
  if (!driver) return { title: "Driver" };
  return {
    title: `${driver.firstName} ${driver.lastName}`,
    description: driver.biography.slice(0, 155),
  };
}

const statLabels: { key: keyof import("@/types/site").DriverStats; label: string }[] = [
  { key: "grandPrix", label: "Grands Prix" },
  { key: "raceWins", label: "Wins" },
  { key: "podiums", label: "Podiums" },
  { key: "polePositions", label: "Poles" },
  { key: "fastestLaps", label: "Fastest Laps" },
  { key: "points", label: "Points" },
];

export default async function DriverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const driver = drivers.find((d) => d.id === id);
  if (!driver) notFound();

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-carbon-900 pt-24 md:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(247,214,25,0.15),transparent_60%)]" />
        <span className="heading-font pointer-events-none absolute -right-4 top-16 select-none text-[24rem] font-bold leading-none text-white/[0.03] md:top-8">
          {driver.number}
        </span>

        <div className="section-container relative grid items-end gap-8 md:grid-cols-2">
          <div className="pb-10 md:pb-16">
            <Link
              href="/drivers"
              className="mb-6 inline-flex items-center gap-2 text-sm text-carbon-300 transition-colors hover:text-racing-yellow"
            >
              <ArrowLeft className="size-4" /> All drivers
            </Link>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-racing-yellow px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-carbon-950">
                {driver.championship}
              </span>
              <span className="text-sm uppercase tracking-widest text-carbon-300">
                {driver.flagEmoji} {driver.nationality}
              </span>
            </div>
            <h1 className="heading-font text-5xl font-bold uppercase leading-none text-white md:text-7xl">
              {driver.firstName}
              <br />
              <span className="text-racing-yellow">{driver.lastName}</span>
            </h1>
            <div className="mt-6 flex gap-8 text-sm">
              <div>
                <p className="text-carbon-400">Car No.</p>
                <p className="heading-font text-2xl font-bold text-white">
                  #{driver.number}
                </p>
              </div>
              <div>
                <p className="text-carbon-400">Height</p>
                <p className="heading-font text-2xl font-bold text-white">
                  {driver.height}
                </p>
              </div>
              <div>
                <p className="text-carbon-400">Weight</p>
                <p className="heading-font text-2xl font-bold text-white">
                  {driver.weight}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[42vh] w-full max-w-sm md:h-[52vh]">
            <Image
              src={driver.heroImage}
              alt={`${driver.firstName} ${driver.lastName}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/5 bg-carbon-950 py-10">
        <div className="section-container grid grid-cols-3 gap-4 md:grid-cols-6">
          {statLabels.map((s) => (
            <div key={s.key} className="text-center">
              <p className="heading-font text-3xl font-bold text-racing-yellow md:text-4xl">
                {driver.stats[s.key]}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-carbon-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bio + highlights */}
      <section className="section-container grid gap-12 py-16 md:grid-cols-3 md:py-20">
        <Reveal className="md:col-span-2">
          <div className="mb-6 border-l-2 border-racing-yellow pl-5">
            <Quote className="mb-2 size-6 text-racing-yellow" />
            <p className="heading-font text-xl font-medium italic text-white md:text-2xl">
              “{driver.quote}”
            </p>
          </div>
          <h2 className="heading-font mb-3 text-lg font-bold uppercase text-white">
            Biography
          </h2>
          <p className="leading-relaxed text-carbon-300">{driver.biography}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="heading-font mb-4 text-lg font-bold uppercase text-white">
            Career Highlights
          </h2>
          <ul className="space-y-3">
            {driver.careerHighlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-white/10 bg-carbon-800/50 p-3 text-sm text-carbon-200"
              >
                <span className="heading-font font-bold text-racing-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </article>
  );
}
