import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";

export const metadata = {
  title: "About | Chennai Turbo Riders",
  description: "Learn about Chennai Turbo Riders - India's premier F4 racing team.",
};

export default function AboutPage() {
  const { site, about, teamPrincipal, drivers, races, sponsors } = siteData;

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-900 to-carbon-950" />
        <div className="absolute inset-0 bg-carbon-fiber opacity-30" />
        <div className="relative z-10 text-center section-container">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-carbon-600" />
            <span className="label-text">Welcome to</span>
            <div className="w-8 h-[2px] bg-carbon-600" />
          </div>
          <h1 className="heading-xl">
            <span className="text-white">CHENNAI </span>
            <span className="text-racing-red">TURBO RIDERS</span>
          </h1>
        </div>
      </section>

      {/* About Intro */}
      <section className="section-padding bg-carbon-950">
        <div className="section-container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="red-line" />
                <span className="label-text">Our Story</span>
              </div>
              <h2 className="heading-md mb-6 text-white">THE TEAM</h2>
              <p className="body-text mb-4 text-justify">{about.description}</p>
              <p className="body-text text-justify">{about.description2}</p>
            </div>
            <div className="relative inline-block">
              <div className="absolute -top-3 -right-3 w-full h-full border-2 border-racing-red/20" />
              <img
                src={about.image}
                alt="CTR Team"
                className="relative z-10 w-full object-contain grayscale hover:grayscale-0 transition-all duration-700 block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-carbon-700/30 py-12">
            {[
              { val: drivers.length, label: "Drivers" },
              { val: `S${site.currentSeason}`, label: "Current Season" },
              { val: races.calendar.length, label: "Races" },
              { val: Object.values(sponsors).flat().length, label: "Partners" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-heading font-bold text-4xl md:text-5xl text-white">{stat.val}</span>
                <span className="block mt-2 text-xs uppercase tracking-[0.25em] text-carbon-400 font-heading">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-carbon-900">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-12">
            <span className="label-text">Leadership</span>
            <h2 className="heading-md mt-3 text-white">TEAM PRINCIPAL</h2>
          </div>
          <div className="grid md:grid-cols-[250px_1fr] gap-8 carbon-card p-8">
            <div className="overflow-hidden">
              <img
                src={teamPrincipal.image}
                alt={teamPrincipal.name}
                className="w-full h-[300px] object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-2xl text-white tracking-wide mb-1">
                {teamPrincipal.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.2em] text-racing-red font-heading mb-6">
                {teamPrincipal.title}
              </p>
              <p className="body-text">
                Leading Chennai Turbo Riders with a vision to establish the team as a dominant force
                in Indian motorsport. Under their leadership, CTR has grown to include both local
                Chennai-based talent and international racing stars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Championship Info */}
      <section className="section-padding bg-carbon-950">
        <div className="section-container max-w-3xl text-center">
          <span className="label-text">The Championship</span>
          <h2 className="heading-md mt-3 mb-8 text-white">INDIAN RACING LEAGUE</h2>
          <p className="body-text mb-12">
            The Indian Racing League (IRL) is India&apos;s premier single-seater racing championship,
            featuring Formula 4 cars. With races across India&apos;s most iconic cities,
            the IRL brings world-class motorsport action to the subcontinent.
          </p>
          <div className="grid grid-cols-3 gap-8 border-t border-carbon-700/30 pt-8">
            {[
              { val: "F4", label: "Car Category" },
              { val: "FIA", label: "Certified" },
              { val: "FMSCI", label: "Sanctioned By" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-heading font-bold text-2xl text-racing-red">{stat.val}</span>
                <span className="block mt-2 text-[10px] uppercase tracking-[0.2em] text-carbon-400 font-heading">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
