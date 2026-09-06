import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { contact, sponsors } from "@/data/site-data";
import type { Sponsor } from "@/types/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "The partners and sponsors powering Chennai Turbo Riders.",
};

const tiers: { label: string; items: Sponsor[] }[] = [
  { label: "Title Partner", items: sponsors.title },
  { label: "Principal Partner", items: sponsors.principal },
  { label: "Official Partners", items: sponsors.official },
];

export default function SponsorsPage() {
  const all = tiers.flatMap((tier) => tier.items);

  return (
    <>
      <PageHeader
        label="Backed By The Best"
        title="Our Partners"
        description="Chennai Turbo Riders is proudly powered by organisations that share our drive for excellence."
        aside={`${all.length} partners`}
      />

      <Reveal className="mt-4">
        <LogoMarquee
          label="Partners"
          items={all.map((s) => ({ id: s.id, label: s.name, href: s.website, logo: s.logo }))}
        />
      </Reveal>

      <div className="section-container space-y-20 py-16 md:py-24">
        {tiers.map(
          (tier, ti) =>
            tier.items.length > 0 && (
              <section key={tier.label} aria-labelledby={`tier-${ti}`}>
                <Reveal className="mb-8 flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="heading-font text-sm font-bold text-racing-yellow">
                    {String(ti + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`tier-${ti}`} className="heading-font text-3xl font-bold uppercase leading-none text-white md:text-4xl">
                    {tier.label}
                  </h2>
                </Reveal>
                <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
                  {tier.items.map((s, i) => (
                    <Reveal
                      key={s.id}
                      delay={i * 0.06}
                      className="group grid gap-6 bg-carbon-950 p-6 sm:grid-cols-[10rem_1fr] sm:items-center md:p-8"
                    >
                      <div className="flex h-24 items-center justify-center bg-white p-4">
                        <img
                          src={s.fullLogo ?? s.logo}
                          alt={s.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-16 w-auto max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="heading-font text-2xl font-bold uppercase leading-tight text-white">
                          {s.name}
                        </h3>
                        {s.description ? (
                          <p className="mt-2 text-sm leading-relaxed text-carbon-300">{s.description}</p>
                        ) : null}
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-racing-yellow"
                        >
                          Visit website
                          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            ),
        )}

        <Reveal className="grid gap-6 border-y border-white/10 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              Become a partner
            </p>
            <h2 className="heading-font mt-3 text-4xl font-bold uppercase leading-[0.92] text-white md:text-5xl">
              Race with us in Season 6.
            </h2>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-3 self-start bg-racing-yellow px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-carbon-950 transition-colors hover:bg-white"
          >
            {contact.email}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </>
  );
}
