import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { site, socialMedia, contact } from "@/data/site-data";

const socials = [
  { href: socialMedia.instagram, Icon: Instagram, label: "Instagram" },
  { href: socialMedia.facebook, Icon: Facebook, label: "Facebook" },
  { href: socialMedia.twitter, Icon: Twitter, label: "Twitter" },
  { href: socialMedia.youtube, Icon: Youtube, label: "YouTube" },
];

const nav = [
  { href: "/about", label: "Team" },
  { href: "/drivers", label: "Drivers" },
  { href: "/schedule", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/sponsors", label: "Partners" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon-900">
      <div className="section-container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/images/logos/CTR_New_yellow.png"
            alt="CTR"
            width={64}
            height={64}
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-carbon-300">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-carbon-300 transition-colors hover:border-racing-yellow hover:text-racing-yellow"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="heading-font mb-4 text-sm font-semibold uppercase tracking-widest text-white">
            Explore
          </h3>
          <ul className="space-y-2">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-carbon-300 transition-colors hover:text-racing-yellow"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="heading-font mb-4 text-sm font-semibold uppercase tracking-widest text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-carbon-300">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-racing-yellow" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-racing-yellow" />
              <a href={`tel:${contact.phone}`} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-racing-yellow" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="section-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-carbon-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-widest">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
