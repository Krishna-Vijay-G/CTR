import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { carSpecs } from "@/data/site-data";

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
          {/* The machine, photographed. One large frame with the two detail
              shots beneath it — the same block of space the canvas held, and
              the arrangement the three pictures in the data were shot for. */}
          <Reveal className="relative">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,214,25,0.1),transparent_65%)]" />

            <img
              src={carSpecs.image}
              alt={carSpecs.name}
              loading="lazy"
              decoding="async"
              className="h-[34vh] w-full rounded-2xl border border-white/10 bg-carbon-900/40 object-cover sm:h-[40vh]"
            />

            <div className="mt-3 grid grid-cols-2 gap-3">
              {[carSpecs.image2, carSpecs.image3].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${carSpecs.name} — detail ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-[14vh] w-full rounded-xl border border-white/10 bg-carbon-900/40 object-cover sm:h-[16vh]"
                />
              ))}
            </div>

            <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-carbon-400">
              {carSpecs.year} · {carSpecs.name}
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
