"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { db } from "@/db";
import { media } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import type { ActionState } from "./types";

const utapi = new UTApi();

/** Deletes the file from Uploadthing storage AND the media record. */
export async function deleteMedia(
  id: string,
  key: string,
): Promise<ActionState> {
  await requireAdmin();

  try {
    await utapi.deleteFiles(key);
  } catch {
    // If remote delete fails we still remove the DB pointer so the
    // gallery stays consistent; the orphan can be swept later.
  }

  await db.delete(media).where(eq(media.id, id));
  revalidatePath("/admin/dashboard/media");
  return { ok: true, message: "Media deleted." };
}
