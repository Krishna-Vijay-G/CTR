import { LogoMarquee } from "@/components/site/LogoMarquee";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { sponsors } from "@/data/site-data";
import type { Sponsor } from "@/types/site";

const tiers: { label: string; items: Sponsor[] }[] = [
  { label: "Title Partner", items: sponsors.title },
  { label: "Principal Partner", items: sponsors.principal },
  { label: "Official Partners", items: sponsors.official },
];

export function SponsorsSection() {
  const all = tiers.flatMap((tier) => tier.items);

  return (
    <section id="sponsors" className="relative border-t border-white/10 bg-carbon-900/40 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading
          index="06"
          label="Backed By The Best"
          title="Our Partners"
          action={{ href: "/sponsors", label: "All partners" }}
        />
      </div>

      <Reveal className="mt-12">
        <LogoMarquee
          label="Partners"
          items={all.map((s) => ({ id: s.id, label: s.name, href: s.website, logo: s.logo }))}
        />
      </Reveal>

      <div className="section-container mt-12">
        <Reveal delay={0.1} className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.label} className="bg-carbon-950 p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                {tier.label}
              </p>
              <ul className="mt-4 space-y-2">
                {tier.items.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noreferrer"
                      className="heading-font text-lg font-bold uppercase leading-tight text-white transition-colors hover:text-racing-yellow"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
