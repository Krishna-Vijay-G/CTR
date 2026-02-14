import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";

export const metadata = {
  title: "Sponsors | Chennai Turbo Riders",
  description: "Our valued partners and sponsors who make CTR racing possible.",
};

export default function SponsorsPage() {
  const { sponsors } = siteData;

  const tiers = [
    { key: "title" as const, label: "Title Sponsor", items: sponsors.title },
    { key: "principal" as const, label: "Principal Partners", items: sponsors.principal },
    { key: "official" as const, label: "Official Partners", items: sponsors.official },
    { key: "technical" as const, label: "Technical Partners", items: sponsors.technical },
  ].filter((t) => t.items.length > 0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-900 to-carbon-950" />
        <div className="absolute inset-0 bg-carbon-fiber opacity-30" />
        <div className="relative z-10 text-center">
          <span className="label-text">Our Partners</span>
          <h1 className="heading-xl mt-3">
            <span className="text-white">SPON</span>
            <span className="text-racing-red">SORS</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-carbon-950">
        <div className="section-container max-w-3xl text-center">
          <p className="body-text">
            Chennai Turbo Riders is proud to partner with leading organizations that share our passion
            for motorsport excellence. Together, we&apos;re driving the future of racing in India.
          </p>
        </div>
      </section>

      {/* Sponsor Tiers */}
      {tiers.map((tier) => (
        <section
          key={tier.key}
          className={`section-padding ${tier.key === "title" ? "bg-carbon-900" : "bg-carbon-950"}`}
        >
          <div className="section-container">
            <div className="text-center mb-12">
              <span className="label-text">{tier.label}</span>
              <div className="w-12 h-[1px] bg-racing-red/30 mx-auto mt-3" />
            </div>

            {tier.key === "title" ? (
              /* Title sponsor - large feature card */
              tier.items.map((s) => (
                <div key={s.id} className="carbon-card p-8 md:p-12 max-w-4xl mx-auto grid md:grid-cols-[1fr_2fr] gap-8 items-center">
                  <div className="flex items-center justify-center p-6">
                    <img
                      src={s.fullLogo || s.logo}
                      alt={s.name}
                      className="max-w-full max-h-[180px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-white mb-3">{s.name}</h3>
                    <p className="body-text mb-6">{s.description}</p>
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              ))
            ) : (
              /* Other tiers - grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {tier.items.map((s) => (
                  <a
                    key={s.id}
                    href={s.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group carbon-card p-6 flex flex-col items-center text-center hover:border-racing-red/30 transition-all duration-300"
                  >
                    <div className="h-24 flex items-center justify-center mb-4">
                      <img
                        src={s.logo}
                        alt={s.name}
                        className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="font-heading font-semibold text-sm text-white">{s.name}</h4>
                    {s.description && (
                      <p className="text-xs text-carbon-400 mt-2 line-clamp-2">{s.description}</p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Partnership Inquiry */}
      <section className="section-padding bg-carbon-900 text-center">
        <div className="section-container max-w-xl">
          <span className="label-text">Become a Partner</span>
          <h2 className="heading-md mt-3 mb-6 text-white">JOIN US</h2>
          <p className="body-text mb-8">
            Interested in partnering with Chennai Turbo Riders? Connect with us to explore
            sponsorship opportunities and be part of India&apos;s premier racing team.
          </p>
          <a href={`mailto:${siteData.contact.email}`} className="btn-primary">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
