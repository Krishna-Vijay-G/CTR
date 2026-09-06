import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { drivers } from "@/data/site-data";
import type { DriverStats } from "@/types/site";

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

const statLabels: { key: keyof DriverStats; label: string }[] = [
  { key: "grandPrix", label: "Grands Prix" },
  { key: "raceWins", label: "Wins" },
  { key: "podiums", label: "Podiums" },
  { key: "polePositions", label: "Poles" },
  { key: "fastestLaps", label: "Fastest Laps" },
  { key: "points", label: "Points" },
];

export default async function DriverPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = drivers.findIndex((d) => d.id === id);
  if (index === -1) notFound();

  const driver = drivers[index];
  const prev = drivers[(index - 1 + drivers.length) % drivers.length];
  const next = drivers[(index + 1) % drivers.length];

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden bg-carbon-950 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-carbon-weave opacity-60" />
        <span
          aria-hidden
          className="heading-font pointer-events-none absolute -right-6 top-10 select-none text-[40vw] font-bold leading-none text-white/[0.04] md:-right-10 md:top-0 md:text-[26rem]"
        >
          {driver.number}
        </span>

        <div className="section-container relative grid items-end gap-8 md:grid-cols-[1.2fr_1fr]">
          <div className="pb-10 md:pb-16">
            <Link
              href="/drivers"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-carbon-300 transition-colors hover:text-racing-yellow"
            >
              <ArrowLeft className="size-4" /> All drivers
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="bg-racing-yellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-carbon-950">
                {driver.championship ?? driver.car}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-carbon-300">
                {driver.flagEmoji} {driver.nationality}
              </span>
            </div>

            <h1 className="heading-font mt-5 text-[clamp(3.5rem,11vw,8rem)] font-bold uppercase leading-[0.85] tracking-tight text-white">
              {driver.firstName}
              <br />
              <span className="text-stroke-yellow">{driver.lastName}</span>
            </h1>

            <dl className="mt-8 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10">
              {[
                { l: "Car No.", v: `#${driver.number}` },
                { l: "Height", v: driver.height },
                { l: "Weight", v: driver.weight },
              ].map((f, i) => (
                <div key={f.l} className={`py-4 ${i === 0 ? "pr-4" : "px-4"}`}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
                    {f.l}
                  </dt>
                  <dd className="heading-font mt-1 text-2xl font-bold leading-none text-white">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto h-[46vh] w-full max-w-sm md:h-[60vh]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-carbon-950 to-transparent" />
            <img
              src={driver.heroImage}
              alt={`${driver.firstName} ${driver.lastName}`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-carbon-900/40">
        <dl className="section-container grid grid-cols-3 divide-x divide-white/10 md:grid-cols-6">
          {statLabels.map((s, i) => (
            <div key={s.key} className={`py-8 text-center ${i % 3 === 0 ? "md:pl-0" : ""}`}>
              <dd className="heading-font text-4xl font-bold leading-none text-racing-yellow md:text-5xl">
                {driver.stats[s.key]}
              </dd>
              <dt className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Bio + highlights */}
      <section className="section-container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr] md:gap-16 md:py-24">
        <Reveal>
          <blockquote className="border-l-2 border-racing-yellow pl-6">
            <Quote className="mb-3 size-6 text-racing-yellow" />
            <p className="heading-font text-2xl font-medium italic leading-snug text-white md:text-3xl">
              “{driver.quote}”
            </p>
          </blockquote>
          <h2 className="mt-12 text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
            Biography
          </h2>
          <p className="mt-4 text-base leading-relaxed text-carbon-200 md:text-lg">{driver.biography}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
            Career highlights
          </h2>
          <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {driver.careerHighlights.map((h, i) => (
              <li key={h} className="flex gap-5 py-4">
                <span className="heading-font text-lg font-bold tabular-nums text-carbon-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-carbon-100">{h}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Previous / next */}
      <nav aria-label="Other drivers" className="border-t border-white/10">
        <div className="section-container grid divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          <Link href={`/drivers/${prev.id}`} className="group flex items-center gap-5 py-8 md:pr-8">
            <ArrowLeft className="size-5 shrink-0 text-carbon-400 transition-[transform,color] group-hover:-translate-x-1 group-hover:text-racing-yellow" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">Previous</p>
              <p className="heading-font mt-1 text-2xl font-bold uppercase leading-none text-white">
                <span className="text-carbon-400">{String(prev.number).padStart(2, "0")}</span>{" "}
                {prev.firstName} {prev.lastName}
              </p>
            </div>
          </Link>
          <Link href={`/drivers/${next.id}`} className="group flex items-center justify-end gap-5 py-8 text-right md:pl-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">Next</p>
              <p className="heading-font mt-1 text-2xl font-bold uppercase leading-none text-white">
                {next.firstName} {next.lastName}{" "}
                <span className="text-carbon-400">{String(next.number).padStart(2, "0")}</span>
              </p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-carbon-400 transition-[transform,color] group-hover:translate-x-1 group-hover:text-racing-yellow" />
          </Link>
        </div>
      </nav>
    </article>
  );
}
