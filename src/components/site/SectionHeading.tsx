import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * The header every band on the site opens with.
 *
 * An index number, a small label, and a headline set large — the rhythm of a
 * race programme, where each section is numbered like a round. The optional
 * action sits on the baseline at the right on wide screens and drops under
 * the title on a phone.
 */
export function SectionHeading({
  index,
  label,
  title,
  action,
  align = "left",
  className = "",
}: {
  index?: string;
  label?: string;
  title: string;
  action?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={`flex flex-col gap-6 ${
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={centered ? "flex flex-col items-center" : ""}>
        {(index || label) && (
          <div className="mb-4 flex items-center gap-3">
            {index ? (
              <span className="heading-font text-sm font-bold tabular-nums text-racing-yellow">
                {index}
              </span>
            ) : null}
            {index && label ? <span className="h-px w-8 bg-racing-yellow/60" /> : null}
            {label ? (
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-carbon-300">
                {label}
              </span>
            ) : null}
          </div>
        )}
        <h2 className="heading-font text-4xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>

      {action ? (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 self-start border-b border-white/20 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-racing-yellow hover:text-racing-yellow md:self-auto"
        >
          {action.label}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </Reveal>
  );
}
