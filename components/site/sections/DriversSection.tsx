import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DriverCard } from "@/components/site/DriverCard";
import { drivers } from "@/data/site-data";

export function DriversSection() {
  const featured = drivers.slice(0, 4);

  return (
    <section id="drivers" className="relative border-y border-white/5 bg-carbon-900/40 py-20 md:py-28">
      <div className="section-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="The Grid" title="Our Drivers" />
          <Link
            href="/drivers"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-racing-yellow"
          >
            View full roster
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.08}>
              <DriverCard driver={d} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
