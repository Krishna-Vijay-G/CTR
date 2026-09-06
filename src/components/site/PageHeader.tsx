/**
 * The top of every inner page.
 *
 * A tall, quiet block: a small label above, the title set as large as the
 * viewport allows, the description pushed to the right so the two read as a
 * headline and its standfirst. A hairline rule with a short yellow segment
 * closes it, the same mark the footer opens with.
 */
export function PageHeader({
  label,
  title,
  description,
  aside,
}: {
  label?: string;
  title: string;
  description?: string;
  /** A small fact set on the right — "8 drivers", "Season 6". */
  aside?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-carbon-950 pb-12 pt-32 md:pb-16 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-carbon-weave opacity-60" />
      <div className="pointer-events-none absolute -right-24 top-10 size-[28rem] rounded-full bg-racing-yellow/[0.07] blur-[120px]" />

      <div className="section-container relative">
        <div className="flex items-center justify-between gap-6">
          {label ? (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-racing-yellow" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                {label}
              </span>
            </div>
          ) : (
            <span />
          )}
          {aside ? (
            <span className="heading-font text-xs font-semibold uppercase tracking-[0.25em] text-carbon-300">
              {aside}
            </span>
          ) : null}
        </div>

        <div className="mt-8 grid items-end gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          <h1 className="heading-font text-[clamp(3rem,10vw,7.5rem)] font-bold uppercase leading-[0.88] tracking-tight text-white">
            {title}
          </h1>
          {description ? (
            <p className="max-w-md text-base leading-relaxed text-carbon-300 md:justify-self-end md:pb-3 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-12 flex h-px w-full items-stretch bg-white/10">
          <span className="w-24 bg-racing-yellow" />
        </div>
      </div>
    </section>
  );
}
