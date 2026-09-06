import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleSummary } from "@/lib/articles";
import { formatDate } from "@/lib/format";

/**
 * What a card needs, and nothing else.
 *
 * Narrower than `NewsArticle` on purpose: the same card is drawn from the static
 * JSON and from an `ArticleSummary` off the database, and neither should have to
 * grow the other's fields to be drawn.
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

/** A summary off the database, in the shape the card draws. */
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

function Meta({ article }: { article: NewsCardArticle }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-carbon-400">
      {article.category ? <span className="text-racing-yellow">{article.category}</span> : null}
      {article.category && article.publishDate ? <span className="size-1 rotate-45 bg-carbon-400" /> : null}
      {article.publishDate ? <span>{formatDate(article.publishDate)}</span> : null}
    </p>
  );
}

/**
 * A story in a list: cover on top, then the meta line, the title and a line
 * of standfirst. The cover is grayscale until the card is hovered, like the
 * drivers, so a page of stories reads as one surface.
 */
export function NewsCard({ article }: { article: NewsCardArticle }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex w-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-carbon-900">
        {article.image ? (
          <img
            src={article.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover grayscale-[0.4] transition-[transform,filter] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col border-t border-white/10 pt-4">
        <Meta article={article} />
        <h3 className="heading-font mt-3 line-clamp-2 text-2xl font-bold uppercase leading-[0.95] text-white transition-colors group-hover:text-racing-yellow">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-carbon-300">{article.excerpt}</p>
      </div>
    </Link>
  );
}

/**
 * The lead story: the cover across the left, the words on the right, at a
 * size that says this one comes first.
 */
export function FeaturedNews({ article }: { article: NewsCardArticle }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group grid gap-6 border-y border-white/10 py-6 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-carbon-900">
        {article.image ? (
          <img
            src={article.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
        <span className="absolute left-4 top-4 bg-racing-yellow px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-carbon-950">
          Latest
        </span>
      </div>
      <div>
        <Meta article={article} />
        <h3 className="heading-font mt-4 text-3xl font-bold uppercase leading-[0.92] text-white transition-colors group-hover:text-racing-yellow md:text-5xl">
          {article.title}
        </h3>
        <p className="mt-4 line-clamp-3 max-w-md text-base leading-relaxed text-carbon-300">
          {article.excerpt}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          Read the story
          <ArrowUpRight className="size-4 text-racing-yellow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
