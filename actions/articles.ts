"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { slugify } from "@/lib/utils";
import type { ActionState } from "./types";

const ArticleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  content: z.string().min(10, "Content is too short"),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  published: z.coerce.boolean().optional(),
});

export async function createArticle(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await requireAdmin();

  const parsed = ArticleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const data = parsed.data;
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);

  try {
    await db.insert(articles).values({
      title: data.title,
      slug,
      content: data.content,
      excerpt: data.excerpt || null,
      coverImageUrl: data.coverImageUrl || null,
      published: data.published ?? false,
      authorId: session.user.id,
    });
  } catch (err) {
    // Unique-violation on slug is the common failure.
    return {
      ok: false,
      message: "Could not save. Is the slug already in use?",
    };
  }

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/news");
  return { ok: true, message: "Article created." };
}

export async function updateArticle(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = ArticleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  await db
    .update(articles)
    .set({
      title: data.title,
      slug: data.slug?.trim() ? slugify(data.slug) : slugify(data.title),
      content: data.content,
      excerpt: data.excerpt || null,
      coverImageUrl: data.coverImageUrl || null,
      published: data.published ?? false,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id));

  revalidatePath("/admin/dashboard/articles");
  revalidatePath("/news");
  return { ok: true, message: "Article updated." };
}

export async function deleteArticle(id: string): Promise<ActionState> {
  await requireAdmin();
  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/admin/dashboard/articles");
  return { ok: true, message: "Article deleted." };
}

export async function togglePublish(
  id: string,
  next: boolean,
): Promise<ActionState> {
  await requireAdmin();
  await db
    .update(articles)
    .set({ published: next, updatedAt: new Date() })
    .where(eq(articles.id, id));
  revalidatePath("/admin/dashboard/articles");
  return { ok: true };
}
