import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { about, teamPrincipal, achievements, site } from "@/data/site-data";

export const metadata: Metadata = {
  title: "The Team",
  description: about.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label={about.subtitle}
        title="About The Team"
        description={site.description}
      />

      <div className="section-container py-16 md:py-20">
        {/* Intro */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={about.image}
              alt="CTR Team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-carbon-300">
                {about.description}
              </p>
              <p className="mt-4 text-base leading-relaxed text-carbon-300">
                {about.description2}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-white/10 bg-carbon-800/60 p-4 text-center"
                >
                  <p className="heading-font text-3xl font-bold text-racing-yellow">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-carbon-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Principal */}
        <Reveal className="mt-16 flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-carbon-800/40 p-8 text-center sm:flex-row sm:text-left">
          <Image
            src={teamPrincipal.image}
            alt={teamPrincipal.name}
            width={96}
            height={96}
            className="size-24 rounded-full object-cover ring-2 ring-racing-yellow"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              {teamPrincipal.title}
            </p>
            <h3 className="heading-font mt-1 text-2xl font-bold uppercase text-white">
              {teamPrincipal.name}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-carbon-300">
              Leading Chennai Turbo Riders&apos; charge to put Indian motorsport
              on the global map.
            </p>
          </div>
        </Reveal>

        {/* Achievements timeline */}
        <div className="mt-20">
          <h2 className="heading-font mb-10 text-center text-3xl font-bold uppercase text-white">
            Our Journey
          </h2>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
            <div className="space-y-8">
              {achievements.map((a, i) => (
                <Reveal
                  key={a.year}
                  delay={i * 0.05}
                  className={`relative flex gap-6 pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:ml-0 md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    className={`absolute top-1.5 size-3 rounded-full bg-racing-yellow ring-4 ring-carbon-950 left-[10px] md:left-auto ${
                      i % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
                    }`}
                  />
                  <div className="rounded-xl border border-white/10 bg-carbon-800/50 p-5">
                    <p className="heading-font text-2xl font-bold text-racing-yellow">
                      {a.year}
                    </p>
                    <h3 className="mt-1 font-semibold text-white">{a.title}</h3>
                    <p className="mt-1 text-sm text-carbon-300">
                      {a.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
