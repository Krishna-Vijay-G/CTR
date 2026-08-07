import { desc } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { ArticleForm } from "@/components/admin/article-form";
import { ArticleList } from "@/components/admin/article-list";

export default async function ArticlesPage() {
  const rows = await db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Articles &amp; News</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Publish race reports and announcements.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            New article
          </h2>
          <ArticleForm />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Published &amp; drafts ({rows.length})
          </h2>
          <ArticleList articles={rows} />
        </div>
      </div>
    </div>
  );
}
