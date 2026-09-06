import { DriverShowcase } from "@/components/site/DriverShowcase";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { drivers } from "@/data/site-data";

export function DriversSection() {
  return (
    <section id="drivers" className="relative border-t border-white/10 bg-carbon-900/40 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading
          index="02"
          label="The Grid"
          title="Our Drivers"
          action={{ href: "/drivers", label: "Full roster" }}
        />
        <Reveal className="mt-12" delay={0.1}>
          <DriverShowcase drivers={drivers} />
        </Reveal>
      </div>
    </section>
  );
}
