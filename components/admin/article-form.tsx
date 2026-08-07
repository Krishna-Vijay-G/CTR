"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createArticle } from "@/actions/articles";
import type { ActionState } from "@/actions/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadField } from "@/components/admin/upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

const initial: ActionState = { ok: false };

export function ArticleForm() {
  const [state, formAction] = useActionState(createArticle, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && state.message) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (!state.ok && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const err = state.fieldErrors ?? {};

  return (
    <Card>
      <CardContent className="pt-5">
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Race weekend recap" />
            {err.title && (
              <p className="text-xs text-red-400">{err.title[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (optional)</Label>
            <Input
              id="slug"
              name="slug"
              placeholder="auto-generated from title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input id="excerpt" name="excerpt" placeholder="Short summary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={8}
              placeholder="Write the article body (Markdown supported)…"
            />
            {err.content && (
              <p className="text-xs text-red-400">{err.content[0]}</p>
            )}
          </div>

          <UploadField
            endpoint="imageUploader"
            name="coverImageUrl"
            label="Cover image"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="published"
              value="true"
              className="size-4 accent-[var(--primary)]"
            />
            Publish immediately
          </label>

          <SubmitButton className="w-full">Save article</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
