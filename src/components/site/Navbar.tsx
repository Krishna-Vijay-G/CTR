"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { socialMedia } from "@/data/site-data";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Team" },
  { href: "/drivers", label: "Drivers" },
  { href: "/schedule", label: "Calendar" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Partners" },
];

const socials = [
  { href: socialMedia.instagram, label: "Instagram" },
  { href: socialMedia.facebook, label: "Facebook" },
  { href: socialMedia.twitter, label: "X" },
  { href: socialMedia.youtube, label: "YouTube" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * The site's header.
 *
 * Transparent over whatever it starts on, a blurred carbon bar once the page
 * has moved. The active link carries a shared yellow underline that slides
 * between items rather than blinking from one to the next. On a phone the
 * menu is the whole screen: six numbered lines set in the display face, with
 * the socials underneath — a menu, not a dropdown.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation, and never leave the page locked behind a menu that
  // is no longer there.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-white/10 bg-carbon-950/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="section-container flex h-16 items-center justify-between md:h-20" aria-label="Primary">
        <Link href="/" className="flex items-center gap-3" aria-label="Chennai Turbo Riders — home">
          <img
            src="/images/logos/CTR_New_yellow.png"
            alt=""
            width={44}
            height={44}
            className="h-9 w-auto md:h-10"
            decoding="async"
          />
          <span className="heading-font hidden flex-col leading-none sm:flex">
            <span className="text-[15px] font-bold uppercase tracking-[0.18em] text-white">
              Chennai Turbo
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              Riders
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors",
                    active ? "text-white" : "text-carbon-300 hover:text-white",
                  )}
                >
                  {l.label}
                </Link>
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    className="absolute inset-x-3.5 -bottom-0.5 h-[2px] bg-racing-yellow"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/schedule"
            className="group hidden items-center gap-2 bg-racing-yellow px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-carbon-950 transition-colors hover:bg-white md:inline-flex"
          >
            Race calendar
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex size-10 items-center justify-center text-white md:hidden"
          >
            <span
              className={cn(
                "absolute h-[2px] w-6 bg-current transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[5px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[2px] w-6 bg-current transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[5px]",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-carbon-950 md:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-carbon-weave opacity-60" />
            <ul className="section-container relative flex flex-1 flex-col justify-center gap-1 py-10">
              {links.map((l, i) => {
                const active = isActive(pathname, l.href);
                return (
                  <motion.li
                    key={l.href}
                    initial={reduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline gap-4 border-b border-white/10 py-4"
                    >
                      <span className="heading-font w-8 text-sm font-bold tabular-nums text-racing-yellow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "heading-font text-4xl font-bold uppercase leading-none",
                          active ? "text-racing-yellow" : "text-white",
                        )}
                      >
                        {l.label}
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <div className="section-container relative flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold uppercase tracking-[0.25em] text-carbon-300 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 bg-racing-yellow px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-carbon-950"
              >
                Race calendar <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
