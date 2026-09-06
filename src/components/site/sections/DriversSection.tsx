import { DriverReel } from "@/components/site/DriverReel";
import { SectionHeading } from "@/components/site/SectionHeading";
import { drivers } from "@/data/site-data";

export function DriversSection() {
  return (
    <section id="drivers" className="relative border-y border-white/10 bg-carbon-900/50 py-24 lg:py-0">
      <DriverReel
        drivers={drivers}
        header={
          <SectionHeading
            index="02"
            label="The Grid"
            title="Our Drivers"
            action={{ href: "/drivers", label: "Full roster" }}
          />
        }
      />
    </section>
  );
}
