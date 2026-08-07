import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { about, teamPrincipal } from "@/data/site-data";

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="section-container grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={about.image}
              alt="CTR Team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-carbon-950/70 via-transparent to-transparent" />
          </div>
          {/* Principal card */}
          <div className="absolute -bottom-6 -right-2 flex items-center gap-3 rounded-xl border border-white/10 bg-carbon-800/95 p-3 backdrop-blur md:right-6">
            <Image
              src={teamPrincipal.image}
              alt={teamPrincipal.name}
              width={48}
              height={48}
              className="size-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-white">
                {teamPrincipal.name}
              </p>
              <p className="text-xs uppercase tracking-wider text-racing-yellow">
                {teamPrincipal.title}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading label={about.subtitle} title={about.title} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-carbon-300">
              {about.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-carbon-300">
              {about.description2}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
    </section>
  );
}
