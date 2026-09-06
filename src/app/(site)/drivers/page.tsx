import type { Metadata } from "next";
import { DriverCard } from "@/components/site/DriverCard";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { drivers } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Meet the Chennai Turbo Riders driver roster across IRL and F4.",
};

const groups = [
  { key: "IRL", label: "Indian Racing League" },
  { key: "F4", label: "F4 Indian Championship" },
];

export default function DriversPage() {
  return (
    <>
      <PageHeader
        label="The Grid"
        title="Our Drivers"
        description="Eight drivers. Two championships. One team chasing glory across the Indian motorsport calendar."
        aside={`${drivers.length} drivers`}
      />

      <div className="section-container space-y-20 py-16 md:py-24">
        {groups.map((g, gi) => {
          const list = drivers.filter((d) => d.championship === g.key);
          if (list.length === 0) return null;
          return (
            <section key={g.key} aria-labelledby={`grid-${g.key}`}>
              <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <span className="heading-font text-sm font-bold text-racing-yellow">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`grid-${g.key}`} className="heading-font text-3xl font-bold uppercase leading-none text-white md:text-4xl">
                    {g.label}
                  </h2>
                </div>
                <span className="bg-racing-yellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-carbon-950">
                  {g.key} · {list.length} drivers
                </span>
              </Reveal>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {list.map((d, i) => (
                  <Reveal key={d.id} delay={i * 0.06}>
                    <DriverCard driver={d} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
