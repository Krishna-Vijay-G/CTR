import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/data/siteData";

interface DriverPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return siteData.drivers.map((driver) => ({ id: driver.id }));
}

export async function generateMetadata({ params }: DriverPageProps) {
  const { id } = await params;
  const driver = siteData.drivers.find((d) => d.id === id);
  if (!driver) return { title: "Driver Not Found" };
  return {
    title: `${driver.firstName} ${driver.lastName} | Chennai Turbo Riders`,
    description: driver.biography,
  };
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { id } = await params;
  const driver = siteData.drivers.find((d) => d.id === id);
  if (!driver) notFound();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const fullName = `${driver.firstName} ${driver.lastName}`;

  const statItems = [
    { label: "Race Wins", value: driver.stats.raceWins, max: 10 },
    { label: "Pole Positions", value: driver.stats.polePositions, max: 10 },
    { label: "Podiums", value: driver.stats.podiums, max: 15 },
    { label: "Fastest Laps", value: driver.stats.fastestLaps, max: 10 },
  ];

  return (
    <>
      <Navbar />

      {/* Immersive Hero */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={driver.heroImage}
          >
            <source src="/video/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-950/80 to-transparent" />
        </div>

        {/* Number Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span className="text-[20rem] md:text-[30rem] font-heading font-black text-white/[0.03] leading-none">
            {driver.number}
          </span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 section-container pb-16 pt-32">
          <span className="label-text text-racing-red mb-2 block">
            Official CTR Driver
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight leading-none mb-8">
            {driver.firstName}
            <br />
            <span className="text-racing-red">{driver.lastName}</span>
          </h1>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Wins", value: driver.stats.raceWins },
              { label: "Poles", value: driver.stats.polePositions },
              { label: "Podiums", value: driver.stats.podiums },
              { label: "Grand Prix", value: driver.stats.grandPrix },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 bg-carbon-900/60 backdrop-blur-sm border border-carbon-700/30"
              >
                <span className="font-heading font-bold text-xl text-racing-red">
                  {s.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-carbon-400 font-heading">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver Info Ribbon */}
      <section className="bg-carbon-900 border-y border-carbon-800">
        <div className="section-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Date of Birth", value: formatDate(driver.dateOfBirth) },
              { label: "Nationality", value: driver.nationality },
              { label: "Height", value: driver.height },
              { label: "Weight", value: driver.weight },
            ].map((info) => (
              <div key={info.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-racing-red/10 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-racing-red" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">
                    {info.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-carbon-500">
                    {info.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-16 md:py-24 bg-carbon-950">
        <div className="section-container max-w-4xl">
          <span className="label-text text-racing-red mb-2 block">
            Performance
          </span>
          <h2 className="heading-lg mb-12">Career Statistics</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {statItems.map((stat) => {
              const pct = Math.min((stat.value / stat.max) * 100, 100);
              return (
                <div
                  key={stat.label}
                  className="carbon-card p-6 hover:border-racing-red/30 transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs uppercase tracking-wider text-carbon-400 font-heading">
                      {stat.label}
                    </p>
                    <p className="font-heading font-bold text-3xl text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className="h-1 bg-carbon-800 w-full overflow-hidden">
                    <div
                      className="h-full bg-racing-red transition-all duration-1000"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Biography & Image */}
      <section className="py-16 md:py-24 bg-carbon-900">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Bio Card */}
            <div>
              <span className="label-text text-racing-red mb-2 block">
                About
              </span>
              <h2 className="heading-lg mb-6">Biography</h2>

              <div className="carbon-card p-8">
                <p className="body-text leading-relaxed mb-6">
                  {driver.biography}
                </p>
                <blockquote className="border-l-2 border-racing-red pl-6 italic text-carbon-300 text-lg">
                  &ldquo;{driver.quote}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Driver Image */}
            <div className="relative overflow-hidden group">
              <div className="absolute -inset-1 bg-racing-red/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={driver.image}
                alt={fullName}
                className="relative w-full h-auto min-h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-racing-red" />
            </div>
          </div>
        </div>
      </section>

      {/* Career Highlights */}
      <section className="py-16 md:py-24 bg-carbon-950">
        <div className="section-container max-w-4xl">
          <span className="label-text text-racing-red mb-2 block">
            Achievements
          </span>
          <h2 className="heading-lg mb-12">Career Highlights</h2>

          <div className="space-y-4">
            {driver.careerHighlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 carbon-card hover:border-racing-red/30 transition-colors group"
              >
                <div className="w-8 h-8 bg-racing-red/10 flex items-center justify-center shrink-0 group-hover:bg-racing-red/20 transition-colors">
                  <svg
                    className="w-4 h-4 text-racing-red"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 3V2H7v1H2v3c0 2.76 2.24 5 5 5 .22 0 .43-.02.64-.05A5.97 5.97 0 0 0 11 15v3H9v2h6v-2h-2v-3a5.97 5.97 0 0 0 3.36-4.05c.21.03.42.05.64.05 2.76 0 5-2.24 5-5V3h-5Zm-8 6c-1.66 0-3-1.34-3-3V5h3v4Zm9-3c0 1.66-1.34 3-3 3V5h3v1Z" />
                  </svg>
                </div>
                <p className="font-heading text-sm text-carbon-300 group-hover:text-white transition-colors leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Team CTA */}
      <section className="py-12 bg-carbon-900 border-t border-carbon-800">
        <div className="section-container text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-3 btn-outline"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Back to Team
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
