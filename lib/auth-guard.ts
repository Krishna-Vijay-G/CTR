import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Server-side session gate used by Server Actions and RSC pages.
 * Returns the session or throws — never trust the middleware alone.
 */
export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("UNAUTHORIZED: no active session.");
  }
  if (session.user.role !== "admin") {
    throw new Error("FORBIDDEN: admin role required.");
  }
  return session;
}

/** Non-throwing variant for pages that want to redirect instead. */
export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") return null;
  return session;
}
