"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Copy, Check, Trash2, FileBox } from "lucide-react";
import type { Media } from "@/db/schema";
import { deleteMedia } from "@/actions/media";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function MediaCard({ item }: { item: Media }) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function copyUrl() {
    await navigator.clipboard.writeText(item.url);
    setCopied(true);
    toast.success("URL copied");
    setTimeout(() => setCopied(false), 1500);
  }

  function onDelete() {
    if (!confirm(`Delete "${item.name}"? It will be removed from storage.`))
      return;
    startTransition(async () => {
      const res = await deleteMedia(item.id, item.key);
      if (res.ok) toast.success("Deleted");
    });
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative flex aspect-video items-center justify-center bg-black/40">
        {item.type === "image" ? (
          <Image
            src={item.url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <FileBox className="size-10 text-[var(--primary)]" />
        )}
        <Badge className="absolute left-2 top-2 bg-black/70 backdrop-blur">
          {item.type}
        </Badge>
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium" title={item.name}>
          {item.name}
        </p>
        <div className="mt-2 flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={copyUrl}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            Copy URL
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            disabled={isPending}
          >
            <Trash2 className="size-4 text-red-400" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function MediaGrid({ items }: { items: Media[] }) {
  if (items.length === 0) {
    return (
      <Card className="p-10 text-center text-sm text-[var(--muted)]">
        No media yet. Files uploaded from the Articles, Drivers or Machine
        editors will appear here.
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
