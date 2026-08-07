"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { machineSpecs, raceEvents } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import type { ActionState } from "./types";

/* ── Machine specs ─────────────────────────────────────────── */

const SpecSchema = z.object({
  carName: z.string().min(1, "Car name is required"),
  horsepower: z.coerce.number().int().min(0).max(2000).optional(),
  topSpeedKph: z.coerce.number().int().min(0).max(600).optional(),
  weightKg: z.coerce.number().int().min(0).max(5000).optional(),
  engine: z.string().optional(),
  gltfModelUrl: z.string().url().optional().or(z.literal("")),
});

export async function upsertMachineSpec(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = SpecSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;
  const values = {
    carName: d.carName,
    horsepower: d.horsepower ?? null,
    topSpeedKph: d.topSpeedKph ?? null,
    weightKg: d.weightKg ?? null,
    engine: d.engine || null,
    gltfModelUrl: d.gltfModelUrl || null,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(machineSpecs).set(values).where(eq(machineSpecs.id, id));
  } else {
    await db.insert(machineSpecs).values(values);
  }

  revalidatePath("/admin/dashboard/stats");
  revalidatePath("/machine");
  return { ok: true, message: "Machine specs saved." };
}

export async function deleteMachineSpec(id: string): Promise<ActionState> {
  await requireAdmin();
  await db.delete(machineSpecs).where(eq(machineSpecs.id, id));
  revalidatePath("/admin/dashboard/stats");
  return { ok: true, message: "Spec deleted." };
}

/* ── Race schedule ─────────────────────────────────────────── */

const RaceSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  circuit: z.string().optional(),
  category: z.enum(["IRL", "F4"]).optional(),
  raceDate: z.coerce.date(),
  resultSummary: z.string().optional(),
});

export async function upsertRaceEvent(
  id: string | null,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAdmin();

  const parsed = RaceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const d = parsed.data;
  const values = {
    name: d.name,
    circuit: d.circuit || null,
    category: d.category ?? null,
    raceDate: d.raceDate,
    resultSummary: d.resultSummary || null,
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(raceEvents).set(values).where(eq(raceEvents.id, id));
  } else {
    await db.insert(raceEvents).values(values);
  }

  revalidatePath("/admin/dashboard/stats");
  revalidatePath("/schedule");
  return { ok: true, message: "Race event saved." };
}

export async function deleteRaceEvent(id: string): Promise<ActionState> {
  await requireAdmin();
  await db.delete(raceEvents).where(eq(raceEvents.id, id));
  revalidatePath("/admin/dashboard/stats");
  return { ok: true, message: "Event deleted." };
}
