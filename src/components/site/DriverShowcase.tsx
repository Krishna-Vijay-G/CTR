"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Driver } from "@/types/site";
import { cn } from "@/lib/utils";

/**
 * The drivers, magazine-style.
 *
 * Adapted from makviesainte's "Team Showcase" on 21st.dev: a staggered grid of
 * portraits on one side, a list of names on the other, and the two tied
 * together — resting on either lights up the other. Portraits sit in
 * grayscale until they are chosen, which is what makes the yellow and the one
 * colour photograph land.
 *
 * Every row is a real link to the driver's page, and focus does what hover
 * does, so the pairing works from a keyboard too.
 */
export function DriverShowcase({ drivers }: { drivers: Driver[] }) {
  const [active, setActive] = useState<string | null>(null);

  const columns = [0, 1, 2].map((c) => drivers.filter((_, i) => i % 3 === c));
  const offsets = ["md:mt-0", "md:mt-16", "md:mt-8"];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      {/* Portraits */}
      <div className="rail-scroll flex gap-3 overflow-x-auto pb-2 md:gap-4 lg:overflow-visible">
        {columns.map((column, c) => (
          <div key={c} className={cn("flex shrink-0 flex-col gap-3 md:gap-4", offsets[c])}>
            {column.map((driver) => {
              const on = active === driver.id;
              const dim = active !== null && !on;
              return (
                <Link
                  key={driver.id}
                  href={`/drivers/${driver.id}`}
                  tabIndex={-1}
                  aria-hidden
                  onMouseEnter={() => setActive(driver.id)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "relative block w-[120px] overflow-hidden bg-carbon-800 transition-opacity duration-500 sm:w-[150px] md:w-[170px]",
                    dim ? "opacity-40" : "opacity-100",
                  )}
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={driver.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "h-full w-full object-cover object-top transition-[filter,transform] duration-500",
                        on ? "scale-[1.03] grayscale-0" : "grayscale brightness-75",
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "heading-font absolute left-2 top-1 text-3xl font-bold leading-none transition-colors",
                      on ? "text-racing-yellow" : "text-white/60",
                    )}
                  >
                    {driver.number}
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Names */}
      <ul className="divide-y divide-white/10 border-y border-white/10">
        {drivers.map((driver) => {
          const on = active === driver.id;
          const dim = active !== null && !on;
          return (
            <li key={driver.id}>
              <Link
                href={`/drivers/${driver.id}`}
                onMouseEnter={() => setActive(driver.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(driver.id)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group flex items-center gap-4 py-4 transition-opacity duration-300 md:gap-6",
                  dim ? "opacity-50" : "opacity-100",
                )}
              >
                <span
                  className={cn(
                    "heading-font w-10 shrink-0 text-2xl font-bold tabular-nums transition-colors",
                    on ? "text-racing-yellow" : "text-carbon-400",
                  )}
                >
                  {String(driver.number).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "heading-font block truncate text-2xl font-bold uppercase leading-none transition-colors md:text-3xl",
                      on ? "text-white" : "text-carbon-100",
                    )}
                  >
                    {driver.firstName} <span className={on ? "text-racing-yellow" : ""}>{driver.lastName}</span>
                  </span>
                  <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
                    {driver.flagEmoji} {driver.nationality} · {driver.championship ?? driver.car}
                  </span>
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-5 shrink-0 transition-[transform,opacity,color]",
                    on ? "translate-x-0 text-racing-yellow opacity-100" : "-translate-x-2 text-carbon-400 opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
