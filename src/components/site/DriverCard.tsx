import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Driver } from "@/types/site";

/**
 * One driver on the roster page.
 *
 * The portrait in grayscale with the car number set large across the top,
 * the name in the display face along the bottom. Colour arrives on hover, and
 * the two numbers a fan asks about first — wins and podiums — sit in the
 * corner. No card chrome: the photograph is the card.
 */
export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Link
      href={`/drivers/${driver.id}`}
      className="group relative block overflow-hidden bg-carbon-900"
      aria-label={`${driver.firstName} ${driver.lastName}, #${driver.number}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={driver.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top grayscale brightness-90 transition-[transform,filter] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-100 group-focus-visible:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/10 to-transparent" />

        <span className="heading-font absolute left-3 top-1 text-6xl font-bold leading-none text-white/70 transition-colors group-hover:text-racing-yellow md:text-7xl">
          {driver.number}
        </span>

        <span className="absolute right-3 top-3 border border-white/20 bg-carbon-950/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          {driver.championship ?? driver.car}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-300">
            {driver.flagEmoji} {driver.nationality}
          </p>
          <h3 className="heading-font mt-1 text-2xl font-bold uppercase leading-[0.9] text-white md:text-3xl">
            {driver.firstName}
            <br />
            <span className="text-racing-yellow">{driver.lastName}</span>
          </h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-carbon-400">
            {driver.stats.raceWins} wins · {driver.stats.podiums} podiums
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center border border-white/25 text-white transition-colors group-hover:border-racing-yellow group-hover:bg-racing-yellow group-hover:text-carbon-950">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
