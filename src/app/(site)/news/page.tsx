import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsCard, newsCardFrom } from "@/components/site/NewsCard";
import { Reveal } from "@/components/site/Reveal";
import { listPublishedArticles } from "@/lib/server/articlesRepo";
import { getRootSite } from "@/lib/server/sitesRepo";

export const metadata: Metadata = {
  title: "News",
  description: "The latest news, race results and announcements from Chennai Turbo Riders.",
};

export default async function NewsPage() {
  const site = await getRootSite();
  const articles = await listPublishedArticles(site.id);

  return (
    <>
      <PageHeader
        label="Paddock"
        title="News & Updates"
        description="Race results, team announcements and everything from the CTR garage."
      />
      <div className="section-container py-16 md:py-20">
        {articles.length === 0 ? (
          /* An empty index says so. Before this read the database the list came
             from a JSON file that always had entries, so "no articles" was not a
             state the page could reach; it is now, on a fresh install and any
             time every piece is a draft. */
          <p className="text-center text-carbon-300">
            Nothing published yet — check back shortly.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.id} delay={(i % 3) * 0.08} className="flex">
                <NewsCard article={newsCardFrom(article)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
