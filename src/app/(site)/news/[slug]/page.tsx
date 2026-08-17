import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getRootSite();
  const article = await getArticleBySlug(site.id, slug);

  // A draft is not on the internet, and neither is an address nobody holds.
  if (!article || article.status !== "published") notFound();

  /*
   * The lookup matches former addresses as well as the current one, so a printed
   * link from before a rename still finds the piece. When it was a FORMER one,
   * correct the address bar rather than serving the article at two URLs — which
   * is what `former_slugs` exists to make possible.
   */
  if (article.slug !== slug) permanentRedirect(`/news/${article.slug}`);

  const related = (await listPublishedArticles(site.id))
    .filter((entry) => entry.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="pb-20">
      <div className="section-container max-w-3xl pt-28 md:pt-32">
        <Link
          href="/news"
          className="mb-6 inline-flex items-center gap-2 text-sm text-carbon-300 transition-colors hover:text-racing-yellow"
        >
          <ArrowLeft className="size-4" /> Back to news
        </Link>

        {article.category ? (
          <span className="rounded bg-racing-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-carbon-950">
            {article.category}
          </span>
        ) : null}
        <h1 className="heading-font mt-4 text-3xl font-bold uppercase leading-tight text-white md:text-5xl">
          {article.title}
        </h1>

        {/* Each half is omitted when it is blank rather than printed as an empty
            row with an icon and nothing beside it. */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-carbon-400">
          {article.published_at ? (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-racing-yellow" />
              {formatDate(article.published_at)}
            </span>
          ) : null}
          {article.author ? (
            <span className="flex items-center gap-1.5">
              <User className="size-4 text-racing-yellow" />
              {article.author}
            </span>
          ) : null}
        </div>
      </div>

      {article.cover_image ? (
        <div className="section-container mt-8 max-w-4xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="section-container mt-10 max-w-3xl">
        {/*
          The body is a tree of typed nodes, not markup — see the note at the top
          of ArticleBody. It is the same renderer the console previews with, so
          what a writer sees while typing is this page.
        */}
        <ArticleBody
          doc={article.body}
          className="space-y-5 text-lg leading-relaxed text-carbon-200"
        />

        {article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Tag className="size-4 text-carbon-400" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-carbon-800 px-3 py-1 text-xs text-carbon-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="section-container mt-20">
          <h2 className="heading-font mb-8 text-2xl font-bold uppercase text-white">
            More Stories
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((entry) => (
              <NewsCard key={entry.id} article={newsCardFrom(entry)} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
