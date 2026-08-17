import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NewsCard, newsCardFrom } from "@/components/site/NewsCard";
import { listPublishedArticles } from "@/lib/server/articlesRepo";
import { getRootSite } from "@/lib/server/sitesRepo";

export async function NewsSection() {
  const site = await getRootSite();
  const latest = (await listPublishedArticles(site.id)).slice(0, 3);

  // Nothing published yet: the band goes entirely rather than leaving a heading
  // over an empty grid. The /news index says so in words; the home page does not
  // need to raise the subject at all.
  if (latest.length === 0) return null;

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
          {latest.map((article, i) => (
            <Reveal key={article.id} delay={i * 0.08} className="flex">
              <NewsCard article={newsCardFrom(article)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
