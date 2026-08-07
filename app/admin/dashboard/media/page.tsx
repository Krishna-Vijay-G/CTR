import { desc } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";
import { MediaGrid } from "@/components/admin/media-grid";

export default async function MediaPage() {
  const rows = await db.select().from(media).orderBy(desc(media.createdAt));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Media Gallery</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        Every uploaded asset. Copy a URL to reuse it anywhere on the site.
      </p>
      <MediaGrid items={rows} />
    </div>
  );
}
