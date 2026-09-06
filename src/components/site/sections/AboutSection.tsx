import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { about, site, teamPrincipal } from "@/data/site-data";

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-white/10 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading
          index="01"
          label={about.subtitle}
          title={about.title}
          action={{ href: "/about", label: "The full story" }}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-carbon-900">
              <img
                src={about.image}
                alt={`${site.name} team`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 flex items-center gap-3 p-5">
                <img
                  src={teamPrincipal.image}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="size-12 rounded-full object-cover ring-2 ring-racing-yellow"
                />
                <div>
                  <p className="heading-font text-base font-bold uppercase leading-none text-white">
                    {teamPrincipal.name}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-racing-yellow">
                    {teamPrincipal.title}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-carbon-400">
              Est. {site.founded} · Chennai, Tamil Nadu
            </p>
          </Reveal>

          <div className="flex flex-col justify-between gap-10">
            <Reveal delay={0.1}>
              <p className="heading-font text-2xl font-semibold leading-snug text-white md:text-3xl">
                {about.description}
              </p>
              <p className="mt-6 text-base leading-relaxed text-carbon-300">{about.description2}</p>
              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-racing-yellow"
              >
                About the team
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>

            <Reveal delay={0.2}>
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
      </div>
    </section>
  );
}
