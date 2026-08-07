import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag, Instagram } from "lucide-react";
import { news } from "@/data/site-data";
import { formatDate } from "@/lib/format";
import { NewsCard } from "@/components/site/NewsCard";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) return { title: "News" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();

  const paragraphs = article.content.split("\n").filter((p) => p.trim());
  const related = news.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <article className="pb-20">
      <div className="section-container max-w-3xl pt-28 md:pt-32">
        <Link
          href="/news"
          className="mb-6 inline-flex items-center gap-2 text-sm text-carbon-300 transition-colors hover:text-racing-yellow"
        >
          <ArrowLeft className="size-4" /> Back to news
        </Link>

        <span className="rounded bg-racing-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-carbon-950">
          {article.category}
        </span>
        <h1 className="heading-font mt-4 text-3xl font-bold uppercase leading-tight text-white md:text-5xl">
          {article.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-carbon-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4 text-racing-yellow" />
            {formatDate(article.publishDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="size-4 text-racing-yellow" />
            {article.author}
          </span>
        </div>
      </div>

      <div className="section-container mt-8 max-w-4xl">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="section-container mt-10 max-w-3xl">
        <div className="space-y-5 text-lg leading-relaxed text-carbon-200">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {article.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Tag className="size-4 text-carbon-400" />
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-carbon-800 px-3 py-1 text-xs text-carbon-300"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {article.instagramUrl && (
          <a
            href={article.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-lg border border-racing-yellow/40 px-4 py-2.5 text-sm font-semibold text-racing-yellow transition-colors hover:bg-racing-yellow hover:text-carbon-950"
          >
            <Instagram className="size-4" /> View on Instagram
          </a>
        )}
      </div>

      {/* Related */}
      <div className="section-container mt-20">
        <h2 className="heading-font mb-8 text-2xl font-bold uppercase text-white">
          More Stories
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </article>
  );
}
