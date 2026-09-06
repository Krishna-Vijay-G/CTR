/**
 * The strip of words that runs under the hero.
 *
 * A pit-wall board: one line of facts repeating without end, separated by the
 * team's yellow mark. The track is rendered twice so the `marquee` keyframe —
 * which travels exactly half the width — lands the copy where the original
 * started, seamlessly. Reduced motion stops it dead via globals.css.
 */
export function Ticker({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border-y border-white/10 bg-carbon-950 py-3 ${className}`}
    >
      <div className="flex w-max animate-marquee items-center whitespace-nowrap">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="heading-font px-6 text-sm font-semibold uppercase tracking-[0.25em] text-carbon-200">
              {item}
            </span>
            <span className="size-1.5 rotate-45 bg-racing-yellow" />
          </span>
        ))}
      </div>
    </div>
  );
}
