"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CarSpecs from "@/components/CarSpecs";
import NewsCarousel from "@/components/NewsCarousel";
import DriversShowcase from "@/components/DriversShowcase";
import NextRace from "@/components/NextRace";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import SponsorsSection from "@/components/SponsorsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Diagonal separator */}
        <div className="relative h-20 bg-carbon-950">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom right, transparent 49.5%, #0a0a0a 50%)",
            }}
          />
        </div>

        <About />
        <CarSpecs />

        {/* Red accent divider */}
        <div className="relative py-1">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-racing-red/40 to-transparent" />
        </div>

        <NewsCarousel />

        {/* Red accent divider */}
        <div className="relative py-1">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-racing-red/40 to-transparent" />
        </div>

        <DriversShowcase />
        <NextRace />
        <Achievements />
        <Gallery />
        <SponsorsSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
