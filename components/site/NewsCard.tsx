import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { NewsArticle } from "@/types/site";
import { formatDate } from "@/lib/format";

export function NewsCard({ article }: { article: NewsArticle }) {
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
        <span className="absolute left-3 top-3 rounded bg-racing-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-carbon-950">
          {article.category}
        </span>
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
