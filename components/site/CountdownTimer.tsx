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

export function CountdownTimer({ targetIso }: { targetIso: string }) {
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
    { v: t.hours, l: "Hrs" },
    { v: t.minutes, l: "Min" },
    { v: t.seconds, l: "Sec" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {cells.map((c) => (
        <div
          key={c.l}
          className="rounded-lg border border-white/10 bg-carbon-950/60 py-3 text-center"
        >
          <div className="heading-font text-2xl font-bold tabular-nums text-racing-yellow md:text-3xl">
            {mounted ? String(c.v).padStart(2, "0") : "--"}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-carbon-400">
            {c.l}
          </div>
        </div>
      ))}
    </div>
  );
}
