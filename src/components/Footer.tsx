import Link from "next/link";
import siteData from "@/data/siteData";

export default function Footer() {
  const { site, socialMedia, contact, drivers } = siteData;
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-carbon-950 border-t border-carbon-700/30 overflow-hidden">
      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-racing-red to-transparent" />

      <div className="section-container pt-16 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <img
                src="/images/logos/CTR_yellow.png"
                alt={site.abbreviation}
                className="h-10 w-auto"
              />
              <div>
                <span className="font-heading font-bold text-lg tracking-wider text-white block">
                  {site.abbreviation}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-carbon-400 font-heading">
                  Racing Team
                </span>
              </div>
            </Link>
            <p className="text-sm text-carbon-400 leading-relaxed mb-6 max-w-xs">
              {site.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {Object.entries(socialMedia).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-carbon-700/50 text-carbon-400 
                  hover:border-racing-red hover:text-racing-red transition-all duration-300 text-xs font-heading uppercase"
                  aria-label={platform}
                >
                  {platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-white mb-5">
              Quick Links
            </h4>
            <div className="w-8 h-[2px] bg-racing-red mb-5" />
            <nav className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Team", href: "/team" },
                { label: "Schedule", href: "/schedule" },
                { label: "News", href: "/news" },
                { label: "Sponsors", href: "/sponsors" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-carbon-400 hover:text-racing-red transition-colors duration-300 font-heading tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Drivers */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-white mb-5">
              Drivers
            </h4>
            <div className="w-8 h-[2px] bg-racing-red mb-5" />
            <nav className="space-y-3">
              {drivers.slice(0, 6).map((driver) => (
                <Link
                  key={driver.id}
                  href={`/driver/${driver.id}`}
                  className="block text-sm text-carbon-400 hover:text-racing-red transition-colors duration-300"
                >
                  <span className="text-carbon-500 font-heading mr-2">#{driver.number}</span>
                  {driver.firstName} {driver.lastName}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-white mb-5">
              Contact
            </h4>
            <div className="w-8 h-[2px] bg-racing-red mb-5" />
            <div className="space-y-4 text-sm text-carbon-400">
              <p>{contact.address}</p>
              <p>
                <a href={`mailto:${contact.email}`} className="hover:text-racing-red transition-colors">
                  {contact.email}
                </a>
              </p>
              <p>{contact.phone}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-carbon-700/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-carbon-500 font-heading tracking-wider">
            © {year} {site.name}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-carbon-500 font-heading tracking-wider">
              {site.championship}
            </span>
            <span className="text-xs text-carbon-500 font-heading tracking-wider">
              Season {site.currentSeason}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
