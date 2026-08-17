import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";
import { formatDate } from "@/lib/format";

/**
 * What a card needs, and nothing else.
 *
 * Narrower than `NewsArticle` on purpose: the same card is drawn from the static
 * JSON the home page still reads and from an `ArticleSummary` off the database,
 * and neither should have to grow the other's fields to be drawn. `NewsArticle`
 * satisfies this structurally, so nothing that already passes one had to change.
 */
export type NewsCardArticle = {
  slug: string;
  title: string;
  image: string;
  /** "" draws no chip — an empty pill is worse than no pill. */
  category: string;
  publishDate: string;
  excerpt: string;
};

/**
 * A summary off the database, in the shape the card draws.
 *
 * `subtext` and `excerpt` are the same sentence under two names — the console
 * calls it the line under the title, this design calls it the excerpt — so the
 * rename happens once, here, rather than at every call site.
 */
export function newsCardFrom(article: ArticleSummary): NewsCardArticle {
  return {
    slug: article.slug,
    title: article.title,
    image: article.cover_image,
    category: article.category,
    publishDate: article.published_at,
    excerpt: article.subtext,
  };
}

export function NewsCard({ article }: { article: NewsCardArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-carbon-800/50 transition-colors hover:border-racing-yellow/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {article.category ? (
          <span className="absolute left-3 top-3 rounded bg-racing-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-carbon-950">
            {article.category}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-carbon-400">
          {formatDate(article.publishDate)}
        </p>
        <h3 className="heading-font mt-2 line-clamp-2 text-lg font-bold uppercase leading-tight text-white transition-colors group-hover:text-racing-yellow">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-carbon-300">
          {article.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-racing-yellow">
          Read more
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
