import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { carSpecs } from "@/data/site-data";

/**
 * The machine.
 *
 * One wide photograph with the two detail shots and the eight figures set as a
 * bento beneath it: the specification read as a grid of hairlines, the numbers
 * large, the labels small. The two headline figures — power and top speed —
 * get double-width cells so the eye lands on them first.
 */
export function CarSpecsSection() {
  const [primary, secondary, tertiary] = [carSpecs.image, carSpecs.image2, carSpecs.image3];
  const lead = new Set(["Power", "Top Speed"]);

  return (
    <section id="machine" className="relative border-t border-white/10 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading index="03" label={carSpecs.tagline} title={`The ${carSpecs.name}`} />

        <Reveal className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4">
          <div className="relative aspect-[16/9] overflow-hidden bg-carbon-900 md:col-span-2 md:aspect-auto md:min-h-[420px]">
            <img
              src={primary}
              alt={carSpecs.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span className="heading-font absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
              {carSpecs.year} · {carSpecs.name}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4">
            {[secondary, tertiary].map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden bg-carbon-900">
                <img
                  src={src}
                  alt={`${carSpecs.name} — detail ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              Specification
            </p>
            <p className="mt-4 text-base leading-relaxed text-carbon-300 md:text-lg">
              {carSpecs.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {carSpecs.specs.map((s) => (
                <div
                  key={s.label}
                  className={`bg-carbon-950 p-5 ${lead.has(s.label) ? "sm:col-span-2" : ""}`}
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
                    {s.label}
                  </dt>
                  <dd
                    className={`heading-font mt-2 font-bold leading-none text-white ${
                      lead.has(s.label) ? "text-4xl text-racing-yellow md:text-5xl" : "text-2xl"
                    }`}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
