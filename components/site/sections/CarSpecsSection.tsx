import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { carSpecs } from "@/data/site-data";
import Car3D from "@/components/site/three/Car3D";

export function CarSpecsSection() {
  return (
    <section id="machine" className="relative py-20 md:py-28">
      <div className="section-container">
        <SectionHeading
          align="center"
          label={carSpecs.tagline}
          title={`The ${carSpecs.name}`}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* Interactive 3D machine */}
          <Reveal className="relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,214,25,0.1),transparent_65%)]" />
            <Car3D
              className="h-[46vh] w-full rounded-2xl border border-white/10 bg-carbon-900/40 sm:h-[54vh]"
              interactive
              autoRotate={false}
            />
            <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-carbon-400">
              Drag to rotate · scroll to zoom
            </p>
          </Reveal>

          {/* Specs */}
          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-carbon-300">
                {carSpecs.description}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {carSpecs.specs.map((s) => (
                <div key={s.label} className="bg-carbon-800 p-4">
                  <p className="text-[11px] uppercase tracking-widest text-carbon-400">
                    {s.label}
                  </p>
                  <p className="heading-font mt-1 text-xl font-bold text-white">
                    {s.value}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
