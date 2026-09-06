import { Hero } from "@/components/site/Hero";
import { Ticker } from "@/components/site/Ticker";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { DriversSection } from "@/components/site/sections/DriversSection";
import { CarSpecsSection } from "@/components/site/sections/CarSpecsSection";
import { ScheduleSection } from "@/components/site/sections/ScheduleSection";
import { NewsSection } from "@/components/site/sections/NewsSection";
import { SponsorsSection } from "@/components/site/sections/SponsorsSection";
import { site } from "@/data/site-data";

const ticker = [
  site.tagline,
  `Season ${site.currentSeason} · ${site.championship}`,
  `Est. ${site.founded} · Chennai`,
  "Formula 4 · FIA certified",
  "#TurboRiders",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker items={ticker} />
      <AboutSection />
      <DriversSection />
      <CarSpecsSection />
      <ScheduleSection />
      <NewsSection />
      <SponsorsSection />
    </>
  );
}
