import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsCard } from "@/components/site/NewsCard";
import { Reveal } from "@/components/site/Reveal";
import { news } from "@/data/site-data";

export const metadata: Metadata = {
  title: "News",
  description: "The latest news, race results and announcements from Chennai Turbo Riders.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        label="Paddock"
        title="News & Updates"
        description="Race results, team announcements and everything from the CTR garage."
      />
      <div className="section-container py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 0.08} className="flex">
              <NewsCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
