"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { drivers } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import type { ActionState } from "./types";

const DriverSchema = z.object({
  name: z.string().min(2, "Name is required"),
  carNumber: z.coerce.number().int().min(0).max(999),
  category: z.enum(["IRL", "F4"]),
  bio: z.string().optional(),
  headshotUrl: z.string().url().optional().or(z.literal("")),
  active: z.coerce.boolean().optional(),
});

export async function createDriver(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = DriverSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  await db.insert(drivers).values({
    name: data.name,
    carNumber: data.carNumber,
    category: data.category,
    bio: data.bio || null,
    headshotUrl: data.headshotUrl || null,
    active: data.active ?? true,
  });

  revalidatePath("/admin/dashboard/drivers");
  revalidatePath("/drivers");
  return { ok: true, message: "Driver added." };
}

export async function updateDriver(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = DriverSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  await db
    .update(drivers)
    .set({
      name: data.name,
      carNumber: data.carNumber,
      category: data.category,
      bio: data.bio || null,
      headshotUrl: data.headshotUrl || null,
      active: data.active ?? true,
      updatedAt: new Date(),
    })
    .where(eq(drivers.id, id));

  revalidatePath("/admin/dashboard/drivers");
  revalidatePath("/drivers");
  return { ok: true, message: "Driver updated." };
}

export async function deleteDriver(id: string): Promise<ActionState> {
  await requireAdmin();
  await db.delete(drivers).where(eq(drivers.id, id));
  revalidatePath("/admin/dashboard/drivers");
  return { ok: true, message: "Driver removed." };
}
