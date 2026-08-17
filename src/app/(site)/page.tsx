import { Hero } from "@/components/site/Hero";
import { AboutSection } from "@/components/site/sections/AboutSection";
import { DriversSection } from "@/components/site/sections/DriversSection";
import { CarSpecsSection } from "@/components/site/sections/CarSpecsSection";
import { ScheduleSection } from "@/components/site/sections/ScheduleSection";
import { NewsSection } from "@/components/site/sections/NewsSection";
import { SponsorsSection } from "@/components/site/sections/SponsorsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DriversSection />
      <CarSpecsSection />
      <ScheduleSection />
      <NewsSection />
      <SponsorsSection />
    </>
  );
}
