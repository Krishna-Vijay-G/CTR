import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { contact, site, socialMedia } from "@/data/site-data";

const socials = [
  { href: socialMedia.instagram, name: "instagram", label: "Instagram" },
  { href: socialMedia.facebook, name: "facebook", label: "Facebook" },
  { href: socialMedia.twitter, name: "twitter", label: "X" },
  { href: socialMedia.youtube, name: "youtube", label: "YouTube" },
] as const;

const nav = [
  { href: "/about", label: "Team" },
  { href: "/drivers", label: "Drivers" },
  { href: "/schedule", label: "Calendar" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Partners" },
];

/**
 * The foot of every page.
 *
 * Opens with the hazard bars — the pit-lane sign — then a call to partner,
 * three columns of the practical things, and the initials set enormous along
 * the bottom edge as the site's sign-off.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-carbon-950">
      <div className="hazard-bars h-2 w-full bg-racing-yellow" aria-hidden />

      {/* Call to partner */}
      <div className="border-b border-white/10">
        <div className="section-container flex flex-col gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              Partner with the team
            </p>
            <h2 className="heading-font mt-3 max-w-2xl text-4xl font-bold uppercase leading-[0.92] text-white md:text-6xl">
              Put your name on the fastest grid in India.
            </h2>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex shrink-0 items-center gap-3 bg-racing-yellow px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-carbon-950 transition-colors hover:bg-white"
          >
            Talk to us
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="section-container grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logos/CTR_New_yellow.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-auto"
              loading="lazy"
              decoding="async"
            />
            <span className="heading-font flex flex-col leading-none">
              <span className="text-base font-bold uppercase tracking-[0.18em] text-white">
                Chennai Turbo
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-racing-yellow">
                Riders
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-carbon-300">{site.description}</p>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center border border-white/15 text-carbon-200 transition-colors hover:border-racing-yellow hover:bg-racing-yellow hover:text-carbon-950"
                >
                  <SocialIcon name={s.name} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-explore">
          <h3
            id="footer-explore"
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-carbon-400"
          >
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {nav.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-baseline gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-racing-yellow"
                >
                  <span className="heading-font text-[11px] tabular-nums text-carbon-400 group-hover:text-racing-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-carbon-400">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-carbon-200">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-racing-yellow" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-racing-yellow" />
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-racing-yellow" />
              <span className="leading-relaxed">{contact.address}</span>
            </li>
          </ul>
        </address>
      </div>

      {/* Sign-off */}
      <div className="relative border-t border-white/10">
        <div className="section-container flex flex-col justify-between gap-4 py-6 text-[11px] uppercase tracking-[0.2em] text-carbon-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-racing-yellow">{site.tagline}</p>
        </div>
        <div
          aria-hidden
          className="heading-font pointer-events-none select-none overflow-hidden text-center text-[22vw] font-bold uppercase leading-[0.75] tracking-tight text-white/[0.04] md:text-[16vw]"
        >
          CTR
        </div>
      </div>
    </footer>
  );
}
