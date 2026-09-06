import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Spotlight } from "@/components/site/Spotlight";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-carbon-950 text-white">
      <Spotlight />
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
