"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-3 sm:gap-5">
          <div className="text-center">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-carbon-800 border border-carbon-600/30">
              <span
                className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white"
                suppressHydrationWarning
              >
                {mounted ? String(block.value).padStart(2, "0") : "--"}
              </span>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-racing-red" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-racing-red" />
            </div>
            <span className="block mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-carbon-400 font-heading">
              {block.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className="font-heading text-xl sm:text-2xl text-racing-red/50 -mt-5">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
