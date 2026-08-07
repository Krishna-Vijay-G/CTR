import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NewsCard } from "@/components/site/NewsCard";
import { news } from "@/data/site-data";

export function NewsSection() {
  const latest = news.slice(0, 3);

  return (
    <section id="news" className="relative py-20 md:py-28">
      <div className="section-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="Paddock" title="Latest News" />
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-racing-yellow"
          >
            All stories
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.08} className="flex">
              <NewsCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
