import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { DriverCard } from "@/components/site/DriverCard";
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
      />
      <div className="section-container space-y-16 py-16 md:py-20">
        {groups.map((g) => {
          const list = drivers.filter((d) => d.championship === g.key);
          if (list.length === 0) return null;
          return (
            <div key={g.key}>
              <div className="mb-8 flex items-center gap-3">
                <span className="rounded bg-racing-yellow px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-carbon-950">
                  {g.key}
                </span>
                <h2 className="heading-font text-xl font-bold uppercase text-white">
                  {g.label}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {list.map((d, i) => (
                  <Reveal key={d.id} delay={i * 0.06}>
                    <DriverCard driver={d} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
