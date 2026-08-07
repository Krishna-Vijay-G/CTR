import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth-guard";
import { LoginForm } from "@/components/admin/login-form";

// Not linked anywhere public. Reachable only by typing /admin/login.
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  // Already signed in as admin? Skip straight to the dashboard.
  const session = await getAdminSession();
  if (session) redirect("/admin/dashboard");

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-[var(--primary)] font-black">
            CTR
          </div>
          <h1 className="text-xl font-semibold">Control Room</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Restricted access — authorized staff only.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
