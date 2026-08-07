"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Team" },
  { href: "/drivers", label: "Drivers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Partners" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-carbon-950/80 backdrop-blur-lg"
          : "bg-gradient-to-b from-black/50 to-transparent",
      )}
    >
      <nav className="section-container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logos/CTR_New_yellow.png"
            alt="Chennai Turbo Riders"
            width={44}
            height={44}
            className="h-9 w-auto md:h-11"
            priority
          />
          <span className="heading-font hidden text-lg font-bold tracking-widest text-white sm:block">
            CTR
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
                    active
                      ? "text-racing-yellow"
                      : "text-carbon-300 hover:text-white",
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-racing-yellow" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-carbon-950/95 backdrop-blur-lg transition-[max-height] duration-300 md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <ul className="section-container flex flex-col py-2">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block py-3 text-sm font-medium uppercase tracking-wider",
                    active ? "text-racing-yellow" : "text-carbon-300",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
