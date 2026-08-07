import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth-guard";
import { AdminSidebar } from "@/components/admin/sidebar";

export const metadata = { robots: { index: false, follow: false } };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authorization. Middleware is only an optimistic gate;
  // this is the real check for the role.
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userName={session.user.name} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
