/**
 * Creates (or promotes) the first admin account. Because public sign-up
 * is disabled in Better Auth, we seed the account server-side using the
 * framework's own password hasher so the credentials login works.
 *
 * Usage:  npx tsx scripts/seed-admin.ts
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD from your .env.
 */
import "dotenv/config";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user, account } from "@/db/schema";
import { auth } from "@/lib/auth";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.");
  }

  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(user)
      .set({ role: "admin", updatedAt: new Date() })
      .where(eq(user.email, email));
    console.log(`✓ Existing user ${email} promoted to admin.`);
    return;
  }

  // Hash with Better Auth's own scrypt implementation.
  const ctx = await auth.$context;
  const hashed = await ctx.password.hash(password);

  const userId = randomUUID();
  const now = new Date();

  await db.insert(user).values({
    id: userId,
    name: "CTR Admin",
    email,
    emailVerified: true,
    role: "admin",
    createdAt: now,
    updatedAt: now,
  });

  await db.insert(account).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: hashed,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`✓ Admin created: ${email}`);
  console.log("  Sign in at /admin/login");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
