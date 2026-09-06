import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { about, achievements, site, teamPrincipal } from "@/data/site-data";

export const metadata: Metadata = {
  title: "The Team",
  description: about.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label={about.subtitle}
        title="The Team"
        description={site.description}
        aside={`Est. ${site.founded} · Chennai`}
      />

      {/* Intro */}
      <section className="section-container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-carbon-900">
            <img
              src={about.image}
              alt={`${site.name} team`}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <div className="flex flex-col justify-between gap-10">
            <Reveal>
              <p className="heading-font text-2xl font-semibold leading-snug text-white md:text-3xl">
                {about.description}
              </p>
              <p className="mt-6 text-base leading-relaxed text-carbon-300">{about.description2}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 divide-x divide-white/10 border-y border-white/10 sm:grid-cols-4">
                {about.stats.map((s, i) => (
                  <div key={s.label} className={`py-5 ${i % 2 === 0 ? "pr-4" : "pl-4"} sm:px-5 sm:first:pl-0`}>
                    <dd className="heading-font text-4xl font-bold leading-none text-racing-yellow">
                      {s.value}
                    </dd>
                    <dt className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principal */}
      <section className="border-y border-white/10 bg-carbon-900/40">
        <Reveal className="section-container grid items-center gap-8 py-14 md:grid-cols-[auto_1fr_auto] md:gap-12">
          <img
            src={teamPrincipal.image}
            alt={teamPrincipal.name}
            width={128}
            height={128}
            loading="lazy"
            decoding="async"
            className="size-28 rounded-full object-cover ring-2 ring-racing-yellow md:size-32"
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              {teamPrincipal.title}
            </p>
            <h2 className="heading-font mt-2 text-4xl font-bold uppercase leading-none text-white md:text-5xl">
              {teamPrincipal.name}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-carbon-300">
              Leading Chennai Turbo Riders&apos; charge to put Indian motorsport on the global map —
              from the first car in {site.founded} to a grid of eight across two championships.
            </p>
          </div>
          <blockquote className="heading-font max-w-xs border-l-2 border-racing-yellow pl-5 text-xl font-medium italic leading-snug text-carbon-100 md:text-2xl">
            “{site.tagline}”
          </blockquote>
        </Reveal>
      </section>

      {/* Journey */}
      <section className="section-container py-16 md:py-24">
        <SectionHeading index="02" label="Since 2022" title="Our Journey" />
        <ol className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {[...achievements].reverse().map((a, i) => (
            <Reveal key={a.year} as="li" delay={i * 0.06} className="flex flex-col bg-carbon-950 p-6 md:min-h-[260px]">
              <span className="heading-font text-5xl font-bold leading-none text-racing-yellow">
                {a.year}
              </span>
              <span className="mt-4 h-px w-10 bg-white/20" />
              <h3 className="heading-font mt-auto pt-8 text-xl font-bold uppercase leading-tight text-white">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-carbon-300">{a.description}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
