import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleBody } from "@/app/(site)/_shell/articles/ArticleBody";
import { NewsCard, newsCardFrom } from "@/components/site/NewsCard";
import { formatDate } from "@/lib/format";
import { getArticleBySlug, listPublishedArticles } from "@/lib/server/articlesRepo";
import { getRootSite } from "@/lib/server/sitesRepo";

export async function generateStaticParams() {
  const site = await getRootSite();
  const articles = await listPublishedArticles(site.id);
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getRootSite();
  const article = await getArticleBySlug(site.id, slug);

  if (!article) return { title: "News" };
  return { title: article.title, description: article.subtext };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = await getRootSite();
  const article = await getArticleBySlug(site.id, slug);

  // A draft is not on the internet, and neither is an address nobody holds.
  if (!article || article.status !== "published") notFound();

  // A former address still finds the piece; correct the address bar rather
  // than serving the article at two URLs.
  if (article.slug !== slug) permanentRedirect(`/news/${article.slug}`);

  const related = (await listPublishedArticles(site.id))
    .filter((entry) => entry.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="pb-20">
      {/* Masthead */}
      <header className="relative overflow-hidden bg-carbon-950 pt-32 md:pt-44">
        <div className="pointer-events-none absolute inset-0 bg-carbon-weave opacity-60" />
        <div className="section-container relative">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-carbon-300 transition-colors hover:text-racing-yellow"
          >
            <ArrowLeft className="size-4" /> All stories
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
            {article.category ? <span className="text-racing-yellow">{article.category}</span> : null}
            {article.published_at ? <span>{formatDate(article.published_at)}</span> : null}
            {article.author ? <span>By {article.author}</span> : null}
          </div>

          <h1 className="heading-font mt-5 max-w-5xl text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-white">
            {article.title}
          </h1>

          {article.subtext ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-carbon-300">{article.subtext}</p>
          ) : null}

          <div className="mt-10 flex h-px w-full bg-white/10">
            <span className="w-24 bg-racing-yellow" />
          </div>
        </div>
      </header>

      {article.cover_image ? (
        <div className="section-container mt-10">
          <div className="relative aspect-[21/9] overflow-hidden bg-carbon-900">
            <img
              src={article.cover_image}
              alt={article.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="section-container mt-12 grid gap-12 md:grid-cols-[1fr_3fr]">
        <aside className="hidden md:block">
          <div className="sticky top-28 space-y-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
            {article.published_at ? (
              <div>
                <p>Published</p>
                <p className="mt-1 text-white">{formatDate(article.published_at)}</p>
              </div>
            ) : null}
            {article.author ? (
              <div>
                <p>Words</p>
                <p className="mt-1 text-white">{article.author}</p>
              </div>
            ) : null}
            {article.tags.length > 0 ? (
              <div>
                <p>Tags</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li key={tag} className="border border-white/15 px-2 py-1 text-[10px] text-carbon-200">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="max-w-3xl">
          {/* The body is a tree of typed nodes rendered by the same component
              the console previews with, so what a writer sees is this page. */}
          <ArticleBody doc={article.body} className="space-y-6 text-lg leading-relaxed text-carbon-100" />

          {article.tags.length > 0 ? (
            <ul className="mt-10 flex flex-wrap gap-2 md:hidden">
              {article.tags.map((tag) => (
                <li key={tag} className="border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-carbon-200">
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="section-container mt-24 border-t border-white/10 pt-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-racing-yellow" />
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-racing-yellow">
              More stories
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((entry) => (
              <NewsCard key={entry.id} article={newsCardFrom(entry)} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
