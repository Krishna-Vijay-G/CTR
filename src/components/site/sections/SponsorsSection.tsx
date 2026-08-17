import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { sponsors } from "@/data/site-data";
import type { Sponsor } from "@/types/site";

const tiers: { label: string; items: Sponsor[] }[] = [
  { label: "Title Partner", items: sponsors.title },
  { label: "Principal Partner", items: sponsors.principal },
  { label: "Official Partners", items: sponsors.official },
];

function LogoTile({ s }: { s: Sponsor }) {
  return (
    <a
      href={s.website}
      target="_blank"
      rel="noreferrer"
      title={s.name}
      className="group flex h-28 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-racing-yellow/40 hover:bg-white/[0.08]"
    >
      <Image
        src={s.logo}
        alt={s.name}
        width={200}
        height={80}
        className="max-h-16 w-auto object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </a>
  );
}

export function SponsorsSection() {
  return (
    <section id="sponsors" className="relative border-t border-white/5 bg-carbon-900/40 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading align="center" label="Backed By The Best" title="Our Partners" />

        <div className="mt-12 space-y-12">
          {tiers.map(
            (tier) =>
              tier.items.length > 0 && (
                <Reveal key={tier.label} className="text-center">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-carbon-400">
                    {tier.label}
                  </p>
                  <div
                    className={`mx-auto grid max-w-4xl gap-4 ${
                      tier.items.length === 1
                        ? "max-w-xs grid-cols-1"
                        : "grid-cols-2 md:grid-cols-3"
                    }`}
                  >
                    {tier.items.map((s) => (
                      <LogoTile key={s.id} s={s} />
                    ))}
                  </div>
                </Reveal>
              ),
          )}
        </div>
      </div>
    </section>
  );
}
