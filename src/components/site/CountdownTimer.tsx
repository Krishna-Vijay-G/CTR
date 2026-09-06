"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/**
 * Four numerals on a hairline, counting down to lights out.
 *
 * Renders dashes until it has mounted, so the server's HTML and the browser's
 * first paint agree — a clock rendered on the server is wrong by the time it
 * arrives.
 */
export function CountdownTimer({
  targetIso,
  label = "Lights out in",
}: {
  targetIso: string;
  label?: string;
}) {
  const target = new Date(targetIso).getTime();
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { v: t.days, l: "Days" },
    { v: t.hours, l: "Hours" },
    { v: t.minutes, l: "Minutes" },
    { v: t.seconds, l: "Seconds" },
  ];

  return (
    <div role="timer" aria-label={label}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-carbon-300">
        {label}
      </p>
      <div className="grid grid-cols-4 divide-x divide-white/10 border-y border-white/10">
        {cells.map((c) => (
          <div key={c.l} className="py-4 text-center">
            <div className="heading-font text-4xl font-bold tabular-nums leading-none text-white sm:text-5xl">
              {mounted ? String(c.v).padStart(2, "0") : "--"}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-carbon-400">
              {c.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
