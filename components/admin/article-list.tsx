"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Eye, EyeOff } from "lucide-react";
import {
  deleteArticle,
  togglePublish,
} from "@/actions/articles";
import type { Article } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ArticleList({ articles }: { articles: Article[] }) {
  const [isPending, startTransition] = useTransition();

  if (articles.length === 0) {
    return (
      <Card className="p-6 text-center text-sm text-[var(--muted)]">
        No articles yet.
      </Card>
    );
  }

  function onToggle(a: Article) {
    startTransition(async () => {
      await togglePublish(a.id, !a.published);
      toast.success(a.published ? "Unpublished" : "Published");
    });
  }

  function onDelete(a: Article) {
    if (!confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteArticle(a.id);
      toast.success("Deleted");
    });
  }

  return (
    <div className="space-y-3">
      {articles.map((a) => (
        <Card
          key={a.id}
          className="flex items-center justify-between gap-3 p-4"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-medium">{a.title}</p>
              <Badge
                className={
                  a.published
                    ? "border-green-800 text-green-400"
                    : "text-[var(--muted)]"
                }
              >
                {a.published ? "Live" : "Draft"}
              </Badge>
            </div>
            <p className="truncate text-xs text-[var(--muted)]">/{a.slug}</p>
          </div>
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending}
              onClick={() => onToggle(a)}
              title={a.published ? "Unpublish" : "Publish"}
            >
              {a.published ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending}
              onClick={() => onDelete(a)}
              title="Delete"
            >
              <Trash2 className="size-4 text-red-400" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
