import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { sponsors } from "@/data/site-data";
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
  return (
    <>
      <PageHeader
        label="Backed By The Best"
        title="Our Partners"
        description="Chennai Turbo Riders is proudly powered by organisations that share our drive for excellence."
      />

      <div className="section-container space-y-14 py-16 md:py-20">
        {tiers.map(
          (tier) =>
            tier.items.length > 0 && (
              <div key={tier.label}>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                  {tier.label}
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  {tier.items.map((s, i) => (
                    <Reveal
                      key={s.id}
                      delay={i * 0.06}
                      className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-carbon-800/40 p-6 sm:flex-row sm:items-center"
                    >
                      <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] p-4">
                        <Image
                          src={s.logo}
                          alt={s.name}
                          width={160}
                          height={80}
                          className="max-h-16 w-auto object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="heading-font text-lg font-bold uppercase text-white">
                          {s.name}
                        </h3>
                        {s.description && (
                          <p className="mt-1 text-sm text-carbon-300">
                            {s.description}
                          </p>
                        )}
                        <a
                          href={s.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-racing-yellow hover:underline"
                        >
                          Visit website <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ),
        )}
      </div>
    </>
  );
}
