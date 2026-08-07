export function PageHeader({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-carbon-900 pb-14 pt-28 md:pb-16 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(247,214,25,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-carbon-weave opacity-50" />
      <div className="section-container relative">
        {label && (
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-racing-yellow" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              {label}
            </span>
          </div>
        )}
        <h1 className="heading-font text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-carbon-300">{description}</p>
        )}
      </div>
    </section>
  );
}
