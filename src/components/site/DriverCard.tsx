import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Driver } from "@/types/site";

export function DriverCard({ driver }: { driver: Driver }) {
  return (
    <Link
      href={`/drivers/${driver.id}`}
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-carbon-800"
    >
      {/* Number watermark */}
      <span className="heading-font pointer-events-none absolute right-3 top-1 z-10 text-7xl font-bold text-white/5 transition-colors group-hover:text-racing-yellow/20">
        {driver.number}
      </span>

      <div className="relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-900/20 to-transparent" />
        <Image
          src={driver.image}
          alt={`${driver.firstName} ${driver.lastName}`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 z-10 rounded bg-racing-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-carbon-950">
          {driver.championship ?? driver.car}
        </div>
      </div>

      <div className="relative z-10 -mt-10 px-4 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-carbon-400">
              {driver.flagEmoji} {driver.nationality}
            </p>
            <h3 className="heading-font text-xl font-bold uppercase text-white">
              {driver.firstName}
              <br />
              <span className="text-racing-yellow">{driver.lastName}</span>
            </h3>
          </div>
          <span className="flex size-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-racing-yellow group-hover:bg-racing-yellow group-hover:text-carbon-950">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
