"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface StatsCounterProps {
  value: string;
  label: string;
  delay?: number;
}

export default function StatsCounter({ value, label, delay = 0 }: StatsCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericPart = value.replace(/[^0-9]/g, "");
    const prefix = value.match(/^[^0-9]*/)?.[0] || "";
    const suffix = value.replace(/^[^0-9]*[0-9]+/, "") || "";

    if (!numericPart) {
      // Non-numeric value like "S4"
      const timer = setTimeout(() => setDisplayValue(value), delay * 1000);
      return () => clearTimeout(timer);
    }

    const target = parseInt(numericPart, 10);
    const duration = 2000;
    const startTime = Date.now() + delay * 1000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) return;

      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress >= 1) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <span className="block font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white">
        {displayValue}
      </span>
      <span className="block mt-2 text-xs uppercase tracking-[0.25em] text-carbon-400 font-heading">
        {label}
      </span>
    </div>
  );
}
