"use client";

import Link from "next/link";

interface MarqueeProps {
  text: string;
  href: string;
}

export default function Marquee({ text, href }: MarqueeProps) {
  return (
    <Link
      href={href}
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center overflow-hidden bg-racing-yellow group"
    >
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {Array.from({ length: 2 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center shrink-0 px-4 font-heading font-bold text-xs uppercase tracking-widest text-carbon-950"
          >
            {text}
            <span className="mx-4 text-carbon-950/50">&bull;</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
