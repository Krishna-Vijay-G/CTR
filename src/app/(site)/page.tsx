import { Hero } from "@/components/site/Hero";
import { TextMarquee } from "@/components/site/TextMarquee";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { DriversSection } from "@/components/site/sections/DriversSection";
import { CarSpecsSection } from "@/components/site/sections/CarSpecsSection";
import { ScheduleSection } from "@/components/site/sections/ScheduleSection";
import { NewsSection } from "@/components/site/sections/NewsSection";
import { SponsorsSection } from "@/components/site/sections/SponsorsSection";
import { site } from "@/data/site-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TextMarquee
        primary={site.tagline.replace(/\.$/, "")}
        secondary={`Season ${site.currentSeason} · ${site.championship.split(" (")[0]}`}
        className="border-b border-white/10"
      />
      <AboutSection />
      <DriversSection />
      <CarSpecsSection />
      <ScheduleSection />
      <NewsSection />
      <SponsorsSection />
    </>
  );
}
